type FilterWorkerRequest = {
  requestId: number;
  data: object[];
  value: string;
  filterProps?: string[];
};

export const DEFAULT_FILTER_WORKER_MIN_ITEMS = 100;

type FilterWorkerResponse = {
  requestId: number;
  filteredIndexes: number[];
};

type PendingRequest = {
  resolve: (filteredIndexes: number[] | null) => void;
};

let filterWorker: Worker | null = null;
let currentRequestId = 0;
const pendingRequests = new Map<number, PendingRequest>();
const cloneableRecordCache = new WeakMap<object, boolean>();

function isDataCloneError(error: unknown): boolean {
  return error instanceof DOMException && error.name === "DataCloneError";
}

function isStructuredCloneable(value: unknown): boolean {
  const structuredCloneFn = globalThis.structuredClone;

  if (typeof structuredCloneFn !== "function") {
    return true;
  }

  try {
    structuredCloneFn(value);
    return true;
  } catch {
    return false;
  }
}

function hasCloneableWorkerData(data: object[]): boolean {
  for (const item of data) {
    const cachedCloneable = cloneableRecordCache.get(item);

    if (cachedCloneable !== undefined) {
      if (!cachedCloneable) {
        return false;
      }

      continue;
    }

    const cloneable = isStructuredCloneable(item);
    cloneableRecordCache.set(item, cloneable);

    if (!cloneable) {
      return false;
    }
  }

  return true;
}

function resolvePendingRequests(filteredIndexes: number[] | null): void {
  pendingRequests.forEach(({ resolve }) => resolve(filteredIndexes));
  pendingRequests.clear();
}

function initializeWorker(): Worker | null {
  if (typeof Worker === "undefined") {
    return null;
  }

  if (filterWorker) {
    return filterWorker;
  }

  try {
    filterWorker = new Worker(new URL("./filter.worker.ts", import.meta.url), { type: "module" });
  } catch {
    return null;
  }

  filterWorker.addEventListener("message", (event: MessageEvent<FilterWorkerResponse>) => {
    const { requestId, filteredIndexes } = event.data;
    const pendingRequest = pendingRequests.get(requestId);

    if (!pendingRequest) {
      return;
    }

    pendingRequest.resolve(filteredIndexes);
    pendingRequests.delete(requestId);
  });

  filterWorker.addEventListener("error", () => {
    resolvePendingRequests(null);
    filterWorker?.terminate();
    filterWorker = null;
  });

  return filterWorker;
}

export function filterInWorker(data: object[], value: string, filterProps?: string[]): Promise<number[] | null> {
  if (!hasCloneableWorkerData(data)) {
    return Promise.resolve(null);
  }

  const worker = initializeWorker();

  if (!worker) {
    return Promise.resolve(null);
  }

  const requestId = ++currentRequestId;

  return new Promise<number[] | null>((resolve) => {
    pendingRequests.set(requestId, { resolve });

    try {
      worker.postMessage({ requestId, data, value, filterProps } satisfies FilterWorkerRequest);
    } catch (error) {
      const cloneable = !isDataCloneError(error);

      data.forEach((item) => {
        cloneableRecordCache.set(item, cloneable ? isStructuredCloneable(item) : false);
      });

      pendingRequests.delete(requestId);
      resolve(null);
    }
  });
}

export function shouldFilterInWorker(
  items: object[] | undefined,
  workerMinItems = DEFAULT_FILTER_WORKER_MIN_ITEMS,
): items is object[] {
  return !!items && items.length >= workerMinItems;
}

export function terminateFilterWorker(): void {
  resolvePendingRequests(null);
  filterWorker?.terminate();
  filterWorker = null;
}
