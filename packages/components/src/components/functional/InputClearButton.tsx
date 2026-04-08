import { TemplateResult } from "lit";
import { Ref } from "lit/directives/ref.js";
import { h } from "@arcgis/lumina";
import { Scale } from "../interfaces";

interface InputClearButtonProps {
  ariaLabel: string;
  ref?: Ref<HTMLDivElement>;
  disabled?: boolean;
  focusable?: boolean;
  onClick?: (event: MouseEvent | KeyboardEvent) => void;
  scale: Scale;
  title?: string;
}

export const CSS = {
  container: "input-clear-button--container",
};

const clearButtonReference = (): void => {
  return;
};

export const InputClearButton = ({
  ariaLabel,
  ref,
  disabled,
  focusable,
  onClick,
  scale,
  title,
}: InputClearButtonProps): TemplateResult => {
  return (
    <div class={CSS.container} inert={disabled} ref={ref ? ref : clearButtonReference}>
      <calcite-action
        disabled={disabled}
        icon="x"
        label={ariaLabel}
        onClick={onClick}
        scale={scale}
        tabIndex={focusable ? undefined : -1}
        text={title}
        title={title}
      />
    </div>
  );
};
