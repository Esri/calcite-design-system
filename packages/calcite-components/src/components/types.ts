/**
 * This type is used to represent a union of all possible values in a given object.
 */
export type ValueUnion<T> = T[keyof T];
