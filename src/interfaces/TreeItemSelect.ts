export interface TreeItemSelectDetail {
  /**
   * Indicate if an item should be added to the current selection.
   */
  modifyCurrentSelection: boolean;
  /**
   * Indicate if an item should collapsed even if child selection is enabled.
   */
  forceCollapse: boolean;
}
