import { FunctionalComponent, h, VNode } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import { Scale, Status } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";

interface ValidationProps extends JSXBase.HTMLAttributes {
  scale: Scale;
  status: Status;
  icon?: IconNameOrString | boolean;
  id?: string;
  message: string;
}

export const CSS = {
  validationContainer: "validation-container",
};

export const Validation: FunctionalComponent<ValidationProps> = ({
  scale,
  status,
  id,
  icon,
  message,
}): VNode => (
  <div class={CSS.validationContainer}>
    <calcite-input-message aria-live="polite" icon={icon} id={id} scale={scale} status={status}>
      {message}
    </calcite-input-message>
  </div>
);
