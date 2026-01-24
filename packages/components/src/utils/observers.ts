import { isServer } from "lit";

export interface ExtendedMutationObserver extends MutationObserver {
  new: () => ExtendedMutationObserver;
  unobserve: (target: Node) => void;
}

declare const ExtendedMutationObserver: {
  prototype: ExtendedMutationObserver;
  new (callback: MutationCallback): ExtendedMutationObserver;
};

type ObserverType = "mutation" | "intersection" | "resize";

type ObserverCallbackType<T extends ObserverType> = T extends "mutation"
  ? MutationCallback
  : T extends "intersection"
    ? IntersectionObserverCallback
    : T extends "resize"
      ? ResizeObserverCallback
      : never;

type ObserverOptions<T extends ObserverType> = T extends "intersection" ? IntersectionObserverInit : never;

type ObserverClassType<T extends ObserverType> = T extends "mutation"
  ? typeof ExtendedMutationObserver
  : T extends "intersection"
    ? typeof IntersectionObserver
    : T extends "resize"
      ? typeof ResizeObserver
      : never;

type ObserverInstanceType<T extends ObserverType> = T extends "mutation"
  ? ExtendedMutationObserver
  : T extends "intersection"
    ? IntersectionObserver
    : T extends "resize"
      ? ResizeObserver
      : never;

/**
 * This utility ensures observers are created only for browser contexts.
 *
 * @param type - the type of observer to create
 * @param callback - the observer callback
 * @param options - the observer options
 */
export function createObserver<T extends ObserverType>(
  type: T,
  callback: ObserverCallbackType<T>,
  options?: ObserverOptions<T>,
): ObserverInstanceType<T> | undefined {
  if (isServer) {
    return undefined;
  }

  const Observer = getObserver<T>(type);
  return new Observer(callback as any, options) as any;
}

function getObserver<T extends ObserverType>(type: T): ObserverClassType<T> {
  // based on https://github.com/whatwg/dom/issues/126#issuecomment-1049814948
  class ExtendedMutationObserver extends window.MutationObserver implements ExtendedMutationObserver {
    private observedEntry: Array<{
      target: Node;
      options?: MutationObserverInit;
    }> = [];

    private readonly callback: MutationCallback;

    constructor(callback: MutationCallback) {
      super(callback);
      this.callback = callback;
    }

    observe(target: Node, options?: MutationObserverInit): void {
      this.observedEntry.push({ target, options });

      return super.observe(target, options);
    }

    unobserve(target: Node): void {
      const newObservedEntries = this.observedEntry.filter((observed) => observed.target !== target);
      this.observedEntry = [];
      this.callback(super.takeRecords(), this);
      this.disconnect();
      newObservedEntries.forEach((observed) => this.observe(observed.target, observed.options));
    }
  }

  return (function () {
    return (
      type === "intersection"
        ? window.IntersectionObserver
        : type === "mutation"
          ? ExtendedMutationObserver
          : window.ResizeObserver
    ) as any;
  })();
}

/**
 * This utility helps to safely update observers within a ref callback
 * by unobserving the old target and observing the new target.
 *
 * Note: this should be called before the ref is updated
 *
 * @param observer
 * @param oldTarget
 * @param target
 * @param options
 */
export function updateRefObserver<T extends ObserverType>(
  observer: ObserverInstanceType<T> | undefined,
  oldTarget: Element | undefined,
  target: Element | undefined,
  options?: ObserverOptions<T>,
): void {
  if (!observer) {
    return;
  }

  if (oldTarget) {
    observer.unobserve(oldTarget);
  }

  if (!target) {
    return;
  }

  if (observer instanceof MutationObserver) {
    observer.observe(target, options as ObserverOptions<"mutation">);
    return;
  }

  observer.observe(target);
}
