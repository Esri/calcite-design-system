export interface StepperItemLookup {
  item: HTMLCalciteStepperItemElement;
  position: number;
  content: Node[];
}

export interface StepperItemEventDetail {
  position: number;
  content: Node[];
}

export interface StepperItemKeyEventDetail {
  item: KeyboardEvent;
}

export interface StepperItemChangeEventDetail {
  position: number;
}
