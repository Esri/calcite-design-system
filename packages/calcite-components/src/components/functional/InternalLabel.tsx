import { TemplateResult } from "lit-html";
import { h } from "@arcgis/lumina";

interface InternalLabelProps {
  alignItemsCenter?: boolean;
  labelText?: string;
  onClick?: () => void;
  required?: boolean;
  spaceBottom?: boolean;
  spaceInlineEnd?: boolean;
  spaceInlineStart?: boolean;
  tooltipText?: string;
}

export const CSS = {
  alignItemsCenter: "internal-label-align-items-center",
  alignItemsEnd: "internal-label-align-items-end",
  container: "internal-label-container",
  requiredIndicator: "internal-label-required-indicator",
  spaceBottom: "internal-label-space-bottom",
  spaceInlineEnd: "internal-label-space-inline-end",
  spaceInlineStart: "internal-label-space-inline-start",
  text: "internal-label-text",
};

export const InternalLabel = ({
  alignItemsCenter,
  labelText,
  onClick,
  required,
  spaceBottom,
  spaceInlineEnd,
  spaceInlineStart,
  tooltipText,
}: InternalLabelProps): TemplateResult => (
  <div
    class={{
      [CSS.alignItemsCenter]: alignItemsCenter,
      [CSS.alignItemsEnd]: !alignItemsCenter,
      [CSS.container]: true,
      [CSS.spaceBottom]: spaceBottom,
      [CSS.spaceInlineEnd]: spaceInlineEnd,
      [CSS.spaceInlineStart]: spaceInlineStart,
    }}
    onClick={onClick}
  >
    <div class={CSS.text}>
      {labelText}
      {required && (
        <span aria-hidden="true" class={CSS.requiredIndicator} title={tooltipText}>
          *
        </span>
      )}
    </div>
    <slot name="label-content" />
  </div>
);
