export interface StepperItemEventDetail {
  position: number;
}

export interface StepperItemKeyEventDetail {
  item: KeyboardEvent;
}

export interface StepperItemChangeEventDetail {
  position: number;
  totalItems?: number;
}

export interface StepBarProps {
  isStart?: boolean;
  isEnd?: boolean;
  isActive: boolean;
}
