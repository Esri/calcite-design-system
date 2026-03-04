import { makeGenericController } from "@arcgis/lumina/controllers";
import { InteractiveComponent } from "./useInteractive";

export interface FormTriggerComponent extends InteractiveComponent {
  type: HTMLButtonElement["type"];
}

interface UseFormTriggerOptions {
  /**
   * When defined, provides a condition to disable form trigger behavior. When `true`, prevents form submit or reset.
   */
  formTriggerDisabled?: () => boolean;
}

/**
 * A controller for managing form behaviors of "button" components.
 */
export const useFormTrigger = (
  options?: UseFormTriggerOptions,
): ReturnType<typeof makeGenericController<void, FormTriggerComponent>> =>
  makeGenericController<void, FormTriggerComponent>((component) => {
    component.listen("click", () => {
      if (
        component.disabled ||
        (typeof options?.formTriggerDisabled === "function" && options?.formTriggerDisabled())
      ) {
        return;
      }
      if (component.type === "submit") {
        component.elementInternals.form?.requestSubmit();
      } else if (component.type === "reset") {
        component.elementInternals.form?.reset();
      }
    });
  });
