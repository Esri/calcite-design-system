import { TemplateResult } from "lit-html";
import { h, LuminaJsx } from "@arcgis/lumina";
import { Scale, Status } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";

interface ValidationProps extends LuminaJsx.CustomAttributes {
  scale: Scale;
  status: Status;
  icon?: IconNameOrString | boolean;
  id?: string;
  message: string;
  ref?: (el: HTMLDivElement) => void;
}

export const CSS = {
  validationContainer: "validation-container",
};

export const Validation = ({
  scale,
  status,
  id,
  icon,
  message,
  ref,
}: ValidationProps): TemplateResult => (
  <div
    class={CSS.validationContainer}
    ref={ref ? ref : (referenceElement): HTMLDivElement => referenceElement}
  >
    <calcite-input-message ariaLive="polite" icon={icon} id={id} scale={scale} status={status}>
      {message}
    </calcite-input-message>
  </div>
);
