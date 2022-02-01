export interface TreeSelectDetail {
  selected: HTMLCalciteTreeItemElement[];
}

export enum TreeSelectionMode {
  Single = "single",
  Multi = "multi",
  Children = "children",
  MultiChildren = "multi-children",
  Ancestors = "ancestors"
}
