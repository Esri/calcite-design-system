import { TemplateResult } from "lit-html";
import { h } from "@arcgis/lumina";

interface InternalLabelProps {
  alignmentCenter?: boolean;
  bottomSpacingDisabled?: boolean;
  labelText?: string;
  onClick?: () => void;
  required?: boolean;
  spacingInlineEnd?: boolean;
  spacingInlineStart?: boolean;
  tooltipText?: string;
}

export const CSS = {
  alignmentCenter: "internal-label-alignment--center",
  alignmentEnd: "internal-label-alignment--end",
  container: "internal-label--container",
  requiredIndicator: "internal-label-required--indicator",
  spacingBottom: "internal-label-spacing--bottom",
  spacingInlineEnd: "internal-label-spacing-inline--end",
  spacingInlineStart: "internal-label-spacing-inline--start",
  text: "internal-label--text",
};

/**
 * @slot label-content - A slot for rendering content next to the component's `labelText`.
 */

export const InternalLabel = ({
  alignmentCenter,
  bottomSpacingDisabled,
  labelText,
  onClick,
  required,
  spacingInlineEnd,
  spacingInlineStart,
  tooltipText,
}: InternalLabelProps): TemplateResult => (
  <div
    class={{
      [CSS.alignmentCenter]: alignmentCenter,
      [CSS.alignmentEnd]: !alignmentCenter,
      [CSS.container]: true,
      [CSS.spacingBottom]: !bottomSpacingDisabled,
      [CSS.spacingInlineEnd]: spacingInlineEnd,
      [CSS.spacingInlineStart]: spacingInlineStart,
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
