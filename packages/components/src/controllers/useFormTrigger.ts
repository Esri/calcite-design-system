import { makeGenericController } from "@arcgis/lumina/controllers";
import { LitElement } from "@arcgis/lumina";

export interface FormTriggerComponent extends LitElement {
  disabled: boolean;
  /**
   * When defined, provides a condition to disable form trigger behavior. When `true`, prevents form submit or reset.
   */
  formTriggerDisabled?: () => boolean;
  type: HTMLButtonElement["type"];
}

/**
 * A controller for managing form behaviors of "button" components.
 */
export const useFormTrigger = makeGenericController<void, FormTriggerComponent>((component) => {
  component.listen("click", () => {
    if (typeof component.formTriggerDisabled === "function" ? component.formTriggerDisabled() : component.disabled) {
      return;
    }
    if (component.type === "submit") {
      component.elementInternals.form?.requestSubmit();
    } else if (component.type === "reset") {
      component.elementInternals.form?.reset();
    }
  });

  return useFormTrigger;
});
