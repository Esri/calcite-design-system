import { FunctionalComponent, h } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import { Scale, Status } from "../interfaces";

interface ValidationProps extends JSXBase.HTMLAttributes {
  scale: Scale;
  status: Status;
  icon?: string | boolean;
  message: string;
}

export const CSS = {
  validationContainer: "validation-container",
};

export const Validation: FunctionalComponent<ValidationProps> = ({
  scale,
  status,
  icon,
  message,
}) => (
  <div class={CSS.validationContainer}>
    <calcite-input-message icon={icon} scale={scale} status={status}>
      {message}
    </calcite-input-message>
  </div>
);
