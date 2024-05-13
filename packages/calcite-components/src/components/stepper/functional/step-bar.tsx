import { FunctionalComponent, h } from "@stencil/core";

interface StepBarProps {
  selected: boolean;
  complete: boolean;
  error: boolean;
  disabled: boolean;
  key: number;
}

export const CSS = {
  stepBar: "step-bar",
  stepBarActive: "step-bar--selected",
  stepBarComplete: "step-bar--complete",
  stepBarDisabled: "step-bar--disabled",
  stepBarError: "step-bar--error",
};

export const StepBar: FunctionalComponent<StepBarProps> = ({
  disabled,
  selected,
  complete,
  error,
  key,
}) => (
  <svg
    class={{
      [CSS.stepBar]: true,
    }}
    key={key}
  >
    <rect
      class={{
        [CSS.stepBarActive]: selected,
        [CSS.stepBarComplete]: complete,
        [CSS.stepBarDisabled]: disabled,
        [CSS.stepBarError]: error,
      }}
      width="100%"
      x="0"
      y="0"
    />
  </svg>
);
