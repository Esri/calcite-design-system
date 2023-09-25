import { FunctionalComponent, h } from "@stencil/core";
import { StepBarProps } from "./interfaces";

export const StepBar: FunctionalComponent<StepBarProps> = ({ isActive, isComplete, isError }) => (
  <svg
    class={{
      "step-bar": true,
    }}
  >
    <rect
      class={{
        "step-bar-svg": true,
        "step-bar-svg--active": isActive,
        "step-bar-svg--complete": isComplete,
        "step-bar-svg--error": isError,
      }}
      x="0"
      y="0"
    />
  </svg>
);
