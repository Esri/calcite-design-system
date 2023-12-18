import { FunctionalComponent, h } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import { Scale, Status } from "../interfaces";

interface ValidationProps extends JSXBase.HTMLAttributes {
  scale: Scale;
  status: Status;
  icon?: string | boolean;
  message: string;
}

const validationStyle = {
  display: "flex",
  "padding-block-start": "0.5rem",
  "flex-direction": "column",
  "align-items": "flex-start",
  "align-self": "stretch",
};

export const Validation: FunctionalComponent<ValidationProps> = ({
  scale,
  status,
  icon,
  message,
}) => (
  <div style={validationStyle}>
    <calcite-input-message icon={icon} scale={scale} status={status}>
      {message}
    </calcite-input-message>
  </div>
);
