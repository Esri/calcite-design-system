export interface ItemKeyboardEvent {
  keyboardEvent: KeyboardEvent;
}

export interface Selection {
  /**
   * The item that caused a selection event to emit.
   */
  item: HTMLCalciteDropdownItemElement;
}
