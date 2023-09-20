import { FunctionalComponent, h } from "@stencil/core";
import { StepBarProps } from "./interfaces";

export const StepBar: FunctionalComponent<StepBarProps> = ({ isActive, isEnd, isStart }) => (
  <svg
    class={{
      "step-bar": true,
      "step-bar--start": isStart,
      "step-bar--end": isEnd,
    }}
    height="2"
    width="20%"
  >
    <rect
      class={{
        "step-bar-svg": true,
        "step-bar-svg--active": isActive,
      }}
      height="2"
      width="100%"
      x="0"
      y="0"
    />
  </svg>
);
