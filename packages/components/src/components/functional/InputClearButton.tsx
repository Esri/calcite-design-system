import { TemplateResult } from "lit";
import { h } from "@arcgis/lumina";
import { Scale } from "../interfaces";

interface InputClearButtonProps {
  ariaLabel: string;
  disabled?: boolean;
  focusable?: boolean;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  scale: Scale;
  title?: string;
}

export const CSS = {
  container: "input-clear-button--container",
  containerDisabled: "input-clear-button--container--disabled",
};

export const InputClearButton = ({
  ariaLabel,
  disabled,
  focusable,
  onClick,
  scale,
  title,
}: InputClearButtonProps): TemplateResult => (
  <div
    class={{
      [CSS.container]: true,
      [CSS.containerDisabled]: disabled,
    }}
  >
    <calcite-action
      disabled={disabled}
      icon="x"
      label={ariaLabel}
      onClick={onClick}
      scale={scale}
      tabIndex={focusable ? undefined : -1}
      text="input-clear-button"
      title={title}
    />
  </div>
);
