import { TemplateResult } from "lit-html";
import { h, LuminaJsx } from "@arcgis/lumina";
import { Scale } from "../interfaces";
import { getIconScale } from "../../utils/component";

export interface XButtonProps extends LuminaJsx.CustomAttributes {
  disabled: boolean;
  label: string;
  scale: Scale;
  onClick?: LuminaJsx.DOMAttributes<HTMLElement>["onClick"];
}

export const CSS = {
  button: "x-button",
};

export const XButton = ({ disabled, key, label, scale }: XButtonProps): TemplateResult => (
  <button
    ariaLabel={label}
    class={CSS.button}
    disabled={disabled}
    key={key}
    tabIndex={-1}
    type="button"
  >
    <calcite-icon icon="x" scale={getIconScale(scale)} />
  </button>
);
