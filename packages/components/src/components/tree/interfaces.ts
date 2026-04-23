export type TreeSelectItemType = "header" | "leaf";

export interface TreeSelectDetail {
  /** Indicates whether the interacted item behaves as a header or leaf node. */
  itemType: TreeSelectItemType;
}
