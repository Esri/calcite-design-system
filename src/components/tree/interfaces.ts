export interface TreeSelectDetail {
  selected: HTMLCalciteTreeItemElement[];
}

export type TreeSelectionMode = "single" | "multi" | "none" | "children" | "multichildren" | "ancestors" | "multiple";
