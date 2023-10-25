import { FunctionalComponent, h } from "@stencil/core";
import { JSXAttributes, JSXBase } from "@stencil/core/internal";
import { Scale } from "../interfaces";
import { getIconScale } from "../../utils/component";

export interface XButtonOptions extends JSXAttributes {
  disabled: boolean;
  label: string;
  scale: Scale;
  onClick?: JSXBase.DOMAttributes<HTMLElement>["onClick"];
}

export const CSS = {
  button: "x-button",
};

export function XButton({
  disabled,
  key,
  label,
  onClick,
  ref,
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
      // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
      ref={ref}
    >
      <calcite-icon icon="x" scale={getIconScale(this.scale)} />
    </button>
  );
}
