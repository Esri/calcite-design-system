/**
 * This type is used to represent a union of all possible values in a given object.
 */
export type ValueUnion<T> = T[keyof T];

/**
 * Creates a bivariant function type using TypeScript's method bivariance behavior.
 * Commonly used for callback and event handler types.
 */
export type BivariantHandler<Arg, Return> = {
  // eslint-disable-next-line @typescript-eslint/method-signature-style -- needed for bivariance see https://www.typescriptlang.org/tsconfig/#strictFunctionTypes
  bivarianceHack(detail: Arg): Return;
}["bivarianceHack"];
