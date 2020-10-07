export interface ItemRegistration {
  position: number;
}

export interface ItemKeyboardEvent {
  keyboardEvent: KeyboardEvent;
}

export interface GroupRegistration {
  items: HTMLCalciteDropdownItemElement[];
  position: number;
  group: HTMLCalciteDropdownGroupElement;
  titleEl: HTMLSpanElement;
  separatorEl: HTMLDivElement;
}

export interface RegisteredItem {
  item: HTMLCalciteDropdownItemElement;
  position: number;
}
