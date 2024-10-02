import { FunctionalComponent, h, VNode } from "@stencil/core";
import { JSXAttributes, JSXBase } from "@stencil/core/internal";
import { Scale } from "../interfaces";
import { getIconScale } from "../../utils/component";

export interface XButtonProps extends JSXAttributes<HTMLButtonElement> {
  disabled: boolean;
  label: string;
  scale: Scale;
  title?: string;
  onClick?: JSXBase.DOMAttributes<HTMLElement>["onClick"];
}

export const CSS = {
  button: "x-button",
  buttonSquare: "x-button--square",
};

export const XButton: FunctionalComponent<XButtonProps> = ({
  disabled,
  key,
  label,
  ref,
  scale,
  title,
}): VNode => (
  <button
    aria-label={label}
    class={CSS.button}
    disabled={disabled}
    key={key}
    ref={ref}
    tabIndex={-1}
    title={title}
    type="button"
  >
    <calcite-icon icon="x" scale={getIconScale(scale)} />
  </button>
);
