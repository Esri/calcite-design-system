import { FunctionalComponent, h } from "@stencil/core";
import { StepBarProps } from "./interfaces";

export const CSS = {
  stepBar: "step-bar",
  stepBarActive: "step-bar--active",
  stepBarInActive: "step-bar--inactive",
  stepBarComplete: "step-bar--complete",
  stepBarError: "step-bar--error",
};

export const StepBar: FunctionalComponent<StepBarProps> = ({ isActive, isComplete, isError }) => (
  <svg
    class={{
      [CSS.stepBar]: true,
    }}
  >
    <rect
      class={{
        [CSS.stepBarInActive]: true,
        [CSS.stepBarActive]: isActive,
        [CSS.stepBarComplete]: isComplete,
        [CSS.stepBarError]: isError,
      }}
      x="0"
      y="0"
    />
  </svg>
);
