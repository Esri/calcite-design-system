export interface StepperItemEventDetail {
  position: number;
}

export interface StepperItemKeyEventDetail {
  item: KeyboardEvent;
}

export interface StepperItemChangeEventDetail {
  position: number;
}

export type StepperLayout = "horizontal" | "vertical" | "horizontal-single";
