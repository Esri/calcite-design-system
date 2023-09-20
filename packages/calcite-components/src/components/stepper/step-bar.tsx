import { FunctionalComponent, h } from "@stencil/core";
import { StepBarProps } from "./interfaces";

export const StepBar: FunctionalComponent<StepBarProps> = ({ isActive, isEnd, isStart, width }) => (
  <svg
    class={{
      "step-bar": true,
      "step-bar--start": isStart,
      "step-bar--end": isEnd,
    }}
    width={width}
  >
    <rect
      class={{
        "step-bar-svg": true,
        "step-bar-svg--active": isActive,
      }}
      x="0"
      y="0"
    />
  </svg>
);
