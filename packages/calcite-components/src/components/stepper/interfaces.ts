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
  width: number;
  isEnd?: boolean;
  isStart?: boolean;
}
