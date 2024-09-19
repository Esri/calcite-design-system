import { FunctionalComponent, h, VNode } from "@stencil/core";
import { JSXAttributes, JSXBase } from "@stencil/core/internal";
import { Scale } from "../interfaces";
import { getIconScale } from "../../utils/component";

export interface XButtonProps extends JSXAttributes {
  disabled: boolean;
  label: string;
  scale: Scale;
  onClick?: JSXBase.DOMAttributes<HTMLElement>["onClick"];
}

export const CSS = {
  button: "x-button",
};

export const XButton: FunctionalComponent<XButtonProps> = ({
  disabled,
  key,
  label,
  onClick,
  ref,
  scale,
}): VNode => (
  <button
    aria-label={label}
    class={CSS.button}
    disabled={disabled}
    key={key}
    onClick={onClick}
    ref={ref}
    tabIndex={-1}
    type="button"
  >
    <calcite-icon icon="x" scale={getIconScale(scale)} />
  </button>
);
