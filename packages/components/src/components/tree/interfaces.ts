import type { TreeItemSelectNodeType } from "../tree-item/interfaces";

export interface TreeSelectDetail {
  /** Indicates whether the interacted item behaves as a header or leaf node. */
  nodeType: TreeItemSelectNodeType;
}
