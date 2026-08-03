export type CloneSafeValue = string | number | boolean | null | CloneSafeValue[] | CloneSafeRecord;

export type CloneSafeRecord = {
  [key: string]: CloneSafeValue;
};
