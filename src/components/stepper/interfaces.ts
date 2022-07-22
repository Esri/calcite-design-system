import { DeprecatedEventPayload } from "../interfaces";

export interface StepperItemEventDetail {
  position: number;
}

export interface StepperItemKeyEventDetail {
  item: KeyboardEvent;
}

export interface StepperItemChangeEventDetail extends DeprecatedEventPayload {
  position: number;
}
