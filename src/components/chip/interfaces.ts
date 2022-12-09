export type ChipColor = "brand" | "neutral" | "inverse";

export interface ItemKeyEvent {
  parent: HTMLCalciteChipGroupElement;
  item: KeyboardEvent;
}

export interface RequestedItem {
  requestedChip: HTMLCalciteChipElement;
}

export interface RegistryEntry {
  parent: HTMLCalciteChipGroupElement;
  position: number;
}

export interface SelectedChip {
  el: HTMLCalciteChipElement;
}
