import { makeGenericController } from "@arcgis/lumina/controllers";
import { LitElement } from "@arcgis/lumina";

export interface FormTriggerComponent extends LitElement {
  href?: string;
  type: HTMLButtonElement["type"];
}

/**
 * A controller for managing form trigger behaviors via "button" components.
 */
export const useFormTrigger = makeGenericController<void, FormTriggerComponent>((component, controller) => {
  controller.onConnected(() => console.log("connectedCallback"));

  component.listen("luminaFormAssociatedCallback", ({ detail: [form] }) => {
    console.log("luminaFormAssociatedCallback", form);
  });

  component.listen("click", () => {
    if (component.href) {
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
