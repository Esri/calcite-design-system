import { FunctionalComponent, h } from "@stencil/core";
import { JSXAttributes, JSXBase } from "@stencil/core/internal";
import { Scale } from "../interfaces";

export interface XButtonOptions extends JSXAttributes {
  disabled: boolean;
  label: string;
  scale: Scale;
  onClick?: JSXBase.DOMAttributes<HTMLElement>["onClick"];
}

export const CSS = {
  button: "x-button"
};

export function XButton({
  disabled,
  key,
  label,
  onClick,
  ref,
  scale
}: XButtonOptions): FunctionalComponent {
  return (
    <button
      aria-label={label}
      class={CSS.button}
      disabled={disabled}
      key={key}
      onClick={onClick}
      tabIndex={-1}
      type="button"
      // eslint-disable-next-line react/jsx-sort-props
      ref={ref}
    >
      <calcite-icon icon="x" scale={scale === "l" ? "m" : "s"} />
    </button>
  );
}
