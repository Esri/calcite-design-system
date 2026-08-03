import { afterEach, describe, expect, it, vi } from "vitest";

import {
  DEFAULT_FILTER_WORKER_MIN_ITEMS,
  filterInWorker,
  shouldFilterInWorker,
  terminateFilterWorker,
} from "./filter-worker";

describe("filter-worker", () => {
  afterEach(() => {
    terminateFilterWorker();
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("falls back when worker creation fails", async () => {
    const nativeWorker = globalThis.Worker;

    globalThis.Worker = class {
      constructor() {
        throw new Error("worker not available");
      }
    } as unknown as typeof Worker;

    try {
      await expect(filterInWorker([{ label: "one" }], "one", ["label"])).resolves.toBeNull();
    } finally {
      globalThis.Worker = nativeWorker;
    }
  });

  it("falls back when worker postMessage throws", async () => {
    const nativeWorker = globalThis.Worker;
    let postMessageCallCount = 0;
    const item: { label: string; callback?: () => void } = { label: "one" };

    class MockWorker {
      private errorListeners: Array<() => void> = [];

      addEventListener(type: string, listener: () => void): void {
        if (type === "error") {
          this.errorListeners.push(listener);
        }
      }

      postMessage(): void {
        postMessageCallCount++;

        if (typeof item.callback === "function") {
          throw new Error("postMessage failed");
        }

        this.errorListeners.forEach((listener) => listener());
      }

      terminate(): void {
        // no-op
      }
    }

    globalThis.Worker = MockWorker as unknown as typeof Worker;

    try {
      await expect(filterInWorker([item], "one", ["label"])).resolves.toBeNull();

      item.callback = () => {};

      await expect(filterInWorker([item], "one", ["callback"])).resolves.toBeNull();
      await expect(filterInWorker([item], "one", ["callback"])).resolves.toBeNull();
      expect(postMessageCallCount).toBe(2);
    } finally {
      globalThis.Worker = nativeWorker;
    }
  });

  it("caches data as non-cloneable after DataCloneError when structuredClone is unavailable", async () => {
    let workerConstructorCallCount = 0;
    let postMessageCallCount = 0;
    const item: { label: string; callback?: () => void } = { label: "one", callback: () => {} };

    class MockWorker {
      constructor() {
        workerConstructorCallCount++;
      }

      addEventListener(): void {
        // no-op
      }

      postMessage(): void {
        postMessageCallCount++;
        throw new DOMException("postMessage failed", "DataCloneError");
      }

      terminate(): void {
        // no-op
      }
    }

    vi.stubGlobal("Worker", MockWorker);
    vi.stubGlobal("structuredClone", undefined);

    await expect(filterInWorker([item], "one", ["callback"])).resolves.toBeNull();
    await expect(filterInWorker([item], "one", ["callback"])).resolves.toBeNull();

    expect(workerConstructorCallCount).toBe(1);
    expect(postMessageCallCount).toBe(1);
  });

  it("falls back when data is not structured-cloneable", async () => {
    const nativeWorker = globalThis.Worker;
    let postMessageCallCount = 0;

    class MockWorker {
      addEventListener(): void {
        // no-op
      }

      postMessage(): void {
        postMessageCallCount++;
      }

      terminate(): void {
        // no-op
      }
    }

    globalThis.Worker = MockWorker as unknown as typeof Worker;

    try {
      await expect(filterInWorker([{ callback: () => {} }], "one", ["callback"])).resolves.toBeNull();
      expect(postMessageCallCount).toBe(0);
    } finally {
      globalThis.Worker = nativeWorker;
    }
  });

  it("resolves pending requests when worker errors", async () => {
    const nativeWorker = globalThis.Worker;

    class MockWorker {
      private errorListeners: Array<() => void> = [];

      addEventListener(type: string, listener: () => void): void {
        if (type === "error") {
          this.errorListeners.push(listener);
        }
      }

      postMessage(): void {
        this.errorListeners.forEach((listener) => listener());
      }

      terminate(): void {
        // no-op
      }
    }

    globalThis.Worker = MockWorker as unknown as typeof Worker;

    try {
      await expect(filterInWorker([{ label: "one" }], "one", ["label"])).resolves.toBeNull();
    } finally {
      globalThis.Worker = nativeWorker;
    }
  });

  it("applies default worker threshold", () => {
    expect(shouldFilterInWorker(Array.from({ length: DEFAULT_FILTER_WORKER_MIN_ITEMS }))).toBe(true);
    expect(shouldFilterInWorker(Array.from({ length: DEFAULT_FILTER_WORKER_MIN_ITEMS - 1 }))).toBe(false);
  });

  it("supports custom worker threshold", () => {
    expect(shouldFilterInWorker(Array.from({ length: 5 }), 4)).toBe(true);
    expect(shouldFilterInWorker(Array.from({ length: 5 }), 6)).toBe(false);
  });
});
