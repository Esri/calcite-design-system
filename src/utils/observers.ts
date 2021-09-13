import { Build } from "@stencil/core";

type ObserverType = "mutation" | "intersection" | "resize";

type ObserverCallbackType<T extends ObserverType> = T extends "mutation"
  ? MutationCallback
  : T extends "intersection"
  ? IntersectionObserverCallback
  : T extends "resize"
  ? ResizeObserverCallback
  : never;

type ObserverOptions<T extends ObserverType> = T extends "mutation"
  ? MutationObserverInit
  : T extends "intersection"
  ? IntersectionObserverInit
  : T extends "resize"
  ? never
  : never;

type ObserverClassType<T extends ObserverType> = T extends "mutation"
  ? typeof MutationObserver
  : T extends "intersection"
  ? typeof IntersectionObserver
  : T extends "resize"
  ? typeof ResizeObserver
  : never;

type ObserverInstanceType<T extends ObserverType> = T extends "mutation"
  ? MutationObserver
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
  options?: ObserverOptions<T>
): ObserverInstanceType<T> | undefined {
  const Observer = getObserver<T>(type);
  return Build.isBrowser ? (new Observer(callback as any, options as any) as any) : undefined;
}

function getObserver<T extends ObserverType>(type: T): ObserverClassType<T> {
  return (
    type === "intersection" ? IntersectionObserver : type === "mutation" ? MutationObserver : ResizeObserver
  ) as any;
}
