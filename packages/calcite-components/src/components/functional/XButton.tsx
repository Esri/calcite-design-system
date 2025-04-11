import { TemplateResult } from "lit-html";
import { h, LuminaJsx } from "@arcgis/lumina";
import { Scale } from "../interfaces";
import { getIconScale } from "../../utils/component";

export interface XButtonProps extends LuminaJsx.CustomAttributes<HTMLButtonElement> {
  disabled: boolean;
  focusable?: boolean;
  label: string;
  round?: boolean;
  scale: Scale;
  title?: string;
  onClick?: LuminaJsx.DOMAttributes<HTMLElement>["onClick"];
}

export const CSS = {
  button: "x-button",
  buttonRound: "x-button--round",
};

export const XButton = ({
  disabled,
  focusable,
  key,
  label,
  onClick,
  ref,
  round = true,
  scale,
  title,
}: XButtonProps): TemplateResult => (
  <button
    ariaLabel={label}
    class={{
      [((scale) => `x-button--${scale}`)(scale)]: true,
      [CSS.button]: true,
      [CSS.buttonRound]: round,
    }}
    disabled={disabled}
    key={key}
    onClick={onClick}
    ref={ref}
    tabIndex={focusable ? 0 : -1}
    title={title}
    type="button"
  >
    <calcite-icon icon="x" scale={getIconScale(scale)} />
  </button>
);
