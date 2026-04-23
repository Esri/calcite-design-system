import type { TreeSelectDetail } from "../tree/interfaces";

export interface TreeItemSelectDetail {
  /** Indicate if an item should be added to the current selection. */
  modifyCurrentSelection: boolean;

  /** Indicates whether the interacted item behaves as a header or leaf node. */
  itemType: TreeSelectDetail["itemType"];

  /**
   * Indicates if an item selected & indeterminate properties should be updated.
   * This will be set to true for user interaction changes and false for programmatic changes.
   */
  updateItem?: boolean;
}
