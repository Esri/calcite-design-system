import { getFilteredIndexes } from "./filter";

type FilterWorkerRequest = {
  requestId: number;
  data: object[];
  value: string;
  filterProps?: string[];
};

type FilterWorkerResponse = {
  requestId: number;
  filteredIndexes: number[];
};

type WorkerScope = {
  addEventListener: (type: "message", listener: (event: MessageEvent<FilterWorkerRequest>) => void) => void;
  postMessage: (message: FilterWorkerResponse) => void;
};

const workerScope = globalThis as unknown as WorkerScope;

workerScope.addEventListener("message", (event: MessageEvent<FilterWorkerRequest>) => {
  const { requestId, data, value, filterProps } = event.data;
  const filteredIndexes = getFilteredIndexes(data, value, filterProps);

  workerScope.postMessage({
    requestId,
    filteredIndexes,
  } satisfies FilterWorkerResponse);
});
