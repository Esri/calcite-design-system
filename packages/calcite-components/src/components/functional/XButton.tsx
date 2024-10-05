import { FunctionalComponent, h, VNode } from "@stencil/core";
import { JSXAttributes, JSXBase } from "@stencil/core/internal";
import { Scale } from "../interfaces";
import { getIconScale } from "../../utils/component";

export interface XButtonProps extends JSXAttributes<HTMLButtonElement> {
  disabled: boolean;
  focusable?: boolean;
  label: string;
  round?: boolean;
  scale: Scale;
  title?: string;
  onClick?: JSXBase.DOMAttributes<HTMLElement>["onClick"];
}

export const CSS = {
  button: "x-button",
  buttonRound: "x-button--round",
};

export const XButton: FunctionalComponent<XButtonProps> = ({
  disabled,
  focusable,
  key,
  label,
  ref,
  round = true,
  scale,
  title,
}): VNode => (
  <button
    aria-label={label}
    class={{
      [((scale) => `x-button--${scale}`)(scale)]: true,
      [CSS.button]: true,
      [CSS.buttonRound]: round,
    }}
    disabled={disabled}
    key={key}
    ref={ref}
    tabIndex={focusable ? 0 : -1}
    title={title}
    type="button"
  >
    <calcite-icon icon="x" scale={getIconScale(scale)} />
  </button>
);
