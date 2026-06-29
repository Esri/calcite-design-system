/**
 * This type is used to represent a union of all possible values in a given object.
 */
export type ValueUnion<T> = T[keyof T];

/**
 * This type is used to create a bivariant function type, which allows for more flexible type inference in certain situations. It is often used in event handler types to allow for both covariant and contravariant behavior.
 */
export type BivariantHandler<Arg, Return> = {
  // eslint-disable-next-line @typescript-eslint/method-signature-style
  bivarianceHack(detail: Arg): Return;
}["bivarianceHack"];
