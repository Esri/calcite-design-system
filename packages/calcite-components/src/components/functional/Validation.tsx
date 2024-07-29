import { FunctionalComponent, h } from "@stencil/core";
import { JSXBase } from "@stencil/core/internal";
import { Scale, Status } from "../interfaces";
import { IconName } from "../icon/interfaces";

interface ValidationProps extends JSXBase.HTMLAttributes {
  ariaLive?: boolean;
  scale: Scale;
  status: Status;
  icon?: IconName | boolean;
  id?: string;
  message: string;
}

export const CSS = {
  validationContainer: "validation-container",
};

export const Validation: FunctionalComponent<ValidationProps> = ({
  ariaLive,
  scale,
  status,
  id,
  icon,
  message,
}) => (
  <div class={CSS.validationContainer}>
    <calcite-input-message icon={icon} scale={scale} status={status}>
      <span aria-live={ariaLive ? "polite" : "off"} id={id}>
        {message}
      </span>
    </calcite-input-message>
  </div>
);
