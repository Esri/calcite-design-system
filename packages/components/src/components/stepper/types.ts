/** @internal */
export interface StepperItemEventDetail {
  /** @internal */
  position: number;
}

/** @internal */
export interface StepperItemChangeEventDetail {
  /** @internal */
  position: number;
}

/** @public */
export type StepperLayout = "horizontal" | "vertical" | "horizontal-single";
