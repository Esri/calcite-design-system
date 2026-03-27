import { makeGenericController } from "@arcgis/lumina/controllers";
import { InteractiveComponent } from "./useInteractive";

export interface FormTriggerComponent extends InteractiveComponent {
  type: HTMLButtonElement["type"];
}

interface UseFormTriggerOptions {
  /**
   * When defined, provides a condition to disable form trigger behavior. When `true`, prevents form submit or reset.
   */
  disabled?: () => boolean;
}

/**
 * A controller for managing form behaviors of "button" components.
 */
export const useFormTrigger = (
  options?: UseFormTriggerOptions,
): ReturnType<typeof makeGenericController<void, FormTriggerComponent>> =>
  makeGenericController<void, FormTriggerComponent>((component) => {
    let lastAssociatedForm: HTMLFormElement | null = null;

    function submitHandler(event: Event) {
      if (event.defaultPrevented) {
        return;
      }
      if (component.disabled || options?.disabled?.()) {
        return;
      }
      if (component.type === "submit") {
        component.elementInternals.form.requestSubmit();
      } else if (component.type === "reset") {
        component.elementInternals.form.reset();
      }
    }

    component.listen("luminaFormAssociatedCallback", ({ detail: [form] }) => {
      if (form) {
        component.listen("click", submitHandler);
      } else {
        lastAssociatedForm?.removeEventListener("click", submitHandler);
      }
      lastAssociatedForm = form;
    });
  });
