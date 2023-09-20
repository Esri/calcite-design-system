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
  isStart?: boolean;
  isEnd?: boolean;
  isActive: boolean;
  width: number;
}
