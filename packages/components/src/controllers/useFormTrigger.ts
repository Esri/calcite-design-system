import { makeGenericController } from "@arcgis/lumina/controllers";
import { InteractiveComponent } from "./useInteractive";
import { FormOwnerComponent } from "./useForm";

export interface FormTriggerComponent extends InteractiveComponent, FormOwnerComponent {
  type: HTMLButtonElement["type"];
}

interface UseFormTriggerOptions {
  /**
   * A function that returns a boolean indicating whether the form trigger should be disabled. This can be used to conditionally disable the form trigger based on external factors or component state.
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
    function submitHandler(event: Event) {
      const { form } = component.elementInternals;

      if (event.defaultPrevented || component.disabled || options?.disabled?.() || !form) {
        return;
      }

      if (component.type === "submit") {
        form.requestSubmit();
      } else if (component.type === "reset") {
        form.reset();
      }
    }

    component.listen("luminaFormAssociatedCallback", ({ detail: [form] }) => {
      if (form) {
        component.el.addEventListener("click", submitHandler);
      } else {
        component.el.removeEventListener("click", submitHandler);
      }
    });
  });
