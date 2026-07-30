export type CloneSafeValue = string | number | boolean | null | CloneSafeValue[] | CloneSafeRecord;

export type CloneSafeRecord = {
  [key: string]: CloneSafeValue;
};

export function isStructuredCloneable(value: unknown): boolean {
  const structuredCloneFn = globalThis.structuredClone;

  if (typeof structuredCloneFn !== "function") {
    return true;
  }

  try {
    structuredCloneFn(value);
    return true;
  } catch {
    return false;
  }
}
