/** @public */
export type CloneSafeValue = string | number | boolean | null | CloneSafeValue[] | CloneSafeRecord;

/** @public */
export type CloneSafeRecord = {
  [key: string]: CloneSafeValue;
};
