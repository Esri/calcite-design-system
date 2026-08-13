import { TemplateResult } from "lit";
import { Ref } from "lit/directives/ref.js";
import { h } from "@arcgis/lumina";
import { Scale } from "../interfaces";

interface ClearButtonProps {
  ariaLabel: string | undefined;
  ref?: Ref<HTMLDivElement>;
  disabled?: boolean;
  focusable?: boolean;
  onClick?: (event: MouseEvent) => void;
  scale: Scale;
  title?: string;
}

export const CSS = {
  container: "clear-button--container",
};

const clearButtonReference = (): void => {
  return;
};

export const ClearButton = ({
  ariaLabel,
  ref,
  disabled,
  focusable,
  onClick,
  scale,
  title,
}: ClearButtonProps): TemplateResult => {
  return (
    <div class={CSS.container} inert={disabled} ref={ref ? ref : clearButtonReference}>
      <calcite-action
        disabled={disabled}
        icon="x"
        label={ariaLabel ?? ""}
        onClick={onClick}
        scale={scale}
        tabIndex={focusable ? undefined : -1}
        text={title}
        title={title}
      />
    </div>
  );
};
