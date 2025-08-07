import { TemplateResult } from "lit-html";
import { h, JsxNode } from "@arcgis/lumina";

interface InternalLabelProps {
  labelText?: string;
  onClick?: () => void;
  required?: boolean;
  slot?: JsxNode;
  spaceBottom?: boolean;
  spaceInlineEnd?: boolean;
  spaceInlineStart?: boolean;
  tooltipText?: string;
}

export const CSS = {
  container: "internal-label-container",
  requiredIndicator: "internal-label-required-indicator",
  spaceBottom: "internal-label-space-bottom",
  spaceInlineEnd: "internal-label-space-inline-end",
  spaceInlineStart: "internal-label-space-inline-start",
  text: "internal-label-text",
};

const onClickHandler = (onClick?: () => void): void => {
  if (onClick) {
    onClick();
  }
};

export const InternalLabel = ({
  labelText,
  onClick,
  required,
  slot,
  spaceBottom,
  spaceInlineEnd,
  spaceInlineStart,
  tooltipText,
}: InternalLabelProps): TemplateResult => (
  <div
    class={{
      [CSS.container]: true,
      [CSS.spaceBottom]: spaceBottom,
      [CSS.spaceInlineEnd]: spaceInlineEnd,
      [CSS.spaceInlineStart]: spaceInlineStart,
    }}
    onClick={() => onClickHandler(onClick)}
  >
    <div class={CSS.text}>
      {labelText}
      {required && (
        <span aria-hidden="true" class={CSS.requiredIndicator} title={tooltipText}>
          *
        </span>
      )}
    </div>
    {slot}
  </div>
);
