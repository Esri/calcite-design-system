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

const setValidationReference = ({
  referenceElement,
  ref,
}: {
  referenceElement: HTMLDivElement;
  ref?: (el: HTMLDivElement) => void;
}): HTMLDivElement => {
  if (ref) {
    ref(referenceElement);
  }
  return referenceElement;
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
    ref={(referenceElement): HTMLDivElement => setValidationReference({ referenceElement, ref })}
  >
    <calcite-input-message ariaLive="polite" icon={icon} id={id} scale={scale} status={status}>
      {message}
    </calcite-input-message>
  </div>
);
