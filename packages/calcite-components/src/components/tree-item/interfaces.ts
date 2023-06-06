export interface TreeItemSelectDetail {
  /**
   * Indicate if an item should be added to the current selection.
   */
  modifyCurrentSelection: boolean;
  /**
   * Indicate if an item should be collapsed/expanded even if child selection is enabled.
   */
  forceToggle: boolean;
}
