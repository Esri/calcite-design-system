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

    class MockWorker {
      addEventListener(): void {
        // no-op
      }

      postMessage(): never {
        throw new Error("postMessage failed");
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
