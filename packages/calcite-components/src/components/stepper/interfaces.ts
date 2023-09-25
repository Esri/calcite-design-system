export interface StepperItemEventDetail {
  position: number;
}

export interface StepperItemKeyEventDetail {
  item: KeyboardEvent;
}

export interface StepperItemChangeEventDetail {
  position: number;
}

export interface StepBarProps {
  isActive: boolean;
  isComplete: boolean;
  isError: boolean;
}
