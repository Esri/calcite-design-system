import { FunctionalComponent, h } from "@stencil/core";

interface StepBarProps {
  active: boolean;
  complete: boolean;
  error: boolean;
  disabled: boolean;
  key: number;
}

export const CSS = {
  stepBar: "step-bar",
  stepBarActive: "step-bar--active",
  stepBarComplete: "step-bar--complete",
  stepBarDisabled: "step-bar--disabled",
  stepBarError: "step-bar--error",
  stepBarInActive: "step-bar--inactive",
};

export const StepBar: FunctionalComponent<StepBarProps> = ({
  disabled,
  active,
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
        [CSS.stepBarActive]: active,
        [CSS.stepBarComplete]: complete,
        [CSS.stepBarDisabled]: disabled,
        [CSS.stepBarError]: error,
        [CSS.stepBarInActive]: true,
      }}
      width="100%"
      x="0"
      y="0"
    />
  </svg>
);
