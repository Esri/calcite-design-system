import { TemplateResult } from "lit-html";
import { h } from "@arcgis/lumina";

interface InternalLabelProps {
  labelText?: string;
  required?: boolean;
  slot?: any;
  tooltipText: string;
}

export const CSS = {
  internalLabelContainer: "internal-label-container",
  internalLabelText: "internal-label-text",
  requiredIndicator: "required-indicator",
};

export const InternalLabel = ({
  labelText,
  required,
  slot,
  tooltipText,
}: InternalLabelProps): TemplateResult => (
  <div class={CSS.internalLabelContainer}>
    <div class={CSS.internalLabelText}>
      {labelText}{" "}
      {required && (
        <span class={CSS.requiredIndicator} id="required-indicator">
          *
        </span>
      )}
      <calcite-tooltip placement="top" reference-element="required-indicator">
        {tooltipText}
      </calcite-tooltip>
    </div>
    {slot}
  </div>
);
