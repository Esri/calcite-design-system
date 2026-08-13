import { TemplateResult } from "lit";
import { h, LuminaJsx } from "@arcgis/lumina";
import { resolveAriaLive } from "../../utils/aria";
import { Scale, Status } from "../interfaces";
import { IconName } from "../icon/interfaces";

interface ValidationProps extends LuminaJsx.CustomAttributes {
  scale: Scale;
  status: Status;
  icon?: IconName | boolean;
  ariaLive?: string | null;
  id?: string;
  message: string;
  ref?: (el: HTMLDivElement) => void;
}

export const CSS = {
  validationContainer: "validation-container",
};

const validationReference = (): void => {
  return;
};

export const Validation = ({
  scale,
  status,
  id,
  icon,
  ariaLive,
  message,
  ref,
}: ValidationProps): TemplateResult => {
  return (
    <div class={CSS.validationContainer} ref={ref ? ref : validationReference}>
      <calcite-input-message
        ariaLive={resolveAriaLive(ariaLive)}
        icon={icon}
        id={id}
        scale={scale}
        status={status}
      >
        {message}
      </calcite-input-message>
    </div>
  );
};
