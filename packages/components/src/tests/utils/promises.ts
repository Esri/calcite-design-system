type PromiseExecutor<T> = ConstructorParameters<typeof Promise<T>>[0];
type Resolve<T> = Parameters<PromiseExecutor<T>>[0];
type Reject = Parameters<PromiseExecutor<unknown>>[1];

/**
 * Creates a promise along with its resolve and reject functions.
 */
export function createControlledPromise<T>(): {
  promise: Promise<T>;
  resolve: Resolve<T>;
  reject: Reject;
} {
  let resolve!: Resolve<T>;
  let reject!: Reject;

  const promise = new Promise<T>((internalResolve, internalReject) => {
    resolve = internalResolve;
    reject = internalReject;
  });

  return { promise, resolve, reject };
}
