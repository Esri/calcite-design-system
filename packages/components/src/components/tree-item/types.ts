/** @internal */
export interface TreeItemSelectDetail {
  /**
   * Indicate if an item should be added to the current selection.
   * @internal
   */
  modifyCurrentSelection: boolean;

  /**
   * Indicates if an item selected & indeterminate properties should be updated.
   * This will be set to true for user interaction changes and false for programmatic changes.
   * @internal
   */
  updateItem?: boolean;
}
