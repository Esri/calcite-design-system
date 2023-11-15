import { FunctionalComponent, h } from "@stencil/core";
interface StepBarProps {
  isActive: boolean;
  isComplete: boolean;
  isError: boolean;
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
  isActive,
  isComplete,
  isError,
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
        [CSS.stepBarActive]: isActive,
        [CSS.stepBarComplete]: isComplete,
        [CSS.stepBarDisabled]: disabled,
        [CSS.stepBarError]: isError,
        [CSS.stepBarInActive]: true,
      }}
      width="100%"
      x="0"
      y="0"
    />
  </svg>
);
