/** Util to help type global props for testing. */
export type GlobalTestProps<T> = T & Window & typeof globalThis;

type FilterPropsByPropertyName<T, PropName extends string> = {
  [K in keyof T]: PropName extends keyof T[K] ? T[K] : never;
};

/** Helper to extract a type by filtering the type by the property name. */
export type IntrinsicElementsWithProp<T extends string> = FilterPropsByPropertyName<
  DeclareElements,
  T
>[keyof FilterPropsByPropertyName<DeclareElements, T>];
