export interface RegistryEntry {
  parent: HTMLCalciteAccordionElement;
  position: number;
}

export interface ItemKeyEvent {
  parent: HTMLCalciteAccordionElement;
  item: KeyboardEvent;
}

export interface RequestedItem {
  requestedAccordionItem: HTMLCalciteAccordionItemElement;
}
