import { Writable } from "type-fest";
import { LitElement } from "@arcgis/lumina";
import { makeGenericController } from "@arcgis/lumina/controllers";
import { PropertyValues } from "lit";
import { kebabToPascal, uncapitalize } from "@arcgis/toolkit/string";
import type { IconName } from "../components/icon/interfaces";
import { Status } from "../components/interfaces";
import { InputComponent, isSupportedType, syncInputDelegate } from "../components/input/common/input";
import { isCalciteFocusable, SetFocusable } from "../utils/dom";

/** Any form <Component> with a `calcite<Component>Input` event needs to be included in this array. */
export const componentsWithInputEvent = [
  "calcite-input",
  "calcite-input-number",
  "calcite-input-text",
  "calcite-text-area",
];

/**
 * Get the event name to listen for that, when emitted, will clear the
 * validation message that displays after form submission. Only validation
 * messages that are set by the browser will be cleared. If a user sets
 * validationMessage to a custom value, they are responsible for clearing it.
 *
 * Exported for testing purposes.
 *
 * @returns the event name
 */
export function getClearValidationEventName(componentTag: string): string {
  const componentTagCamelCase = uncapitalize(kebabToPascal(componentTag));
  return `${componentTagCamelCase}${componentsWithInputEvent.includes(componentTag) ? "Input" : "Change"}`;
}

export type MutableValidityState = Writable<ValidityState>;

/**
 * Defines interface for form owning components.
 *
 * Allows calling submit/reset methods on the form.
 */
interface FormOwner extends LitElement {
  /**
   * The ID of the form to associate with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   *
   * Note that this prop should use the `@property` decorator.
   */
  form: string;
}

/**
 * Defines interface for form-associated components.
 *
 * Along with the interface, use the matching form utils to help set up the component behavior.
 */
export interface FormComponent<T = any>
  extends
    FormOwner,
    LitElement,
    SetFocusable,
    // 👇 needed, otherwise types don't come through when using FormComponent | CheckableFormComponent
    Partial<Pick<CheckableFormComponent, "checked" | "defaultChecked">> {
  /** When true, this component's value will not be submitted in the form. */
  disabled: boolean;

  /**
   * When true, form submit requests will enforce field requirement.
   *
   * @todo remove optional in follow-up PR
   */
  required?: boolean;

  /**
   * The name used to submit the value to the associated form.
   *
   * Note that this prop should use the `@property` decorator.
   */
  name: string;

  /**
   * This form component's value.
   *
   * Note that this prop should use the `@property` decorator.
   */
  value: T;

  /**
   * The initial value for this form component.
   *
   * When the form is reset, the value will be set to this property.
   *
   * Note: this property will be initialized in the first update cycle, so make sure that the component's value is set before then to ensure defaultValue is properly initialized.
   */
  defaultValue: T;

  /** The validation icon to display. */
  validationIcon?: IconName | boolean;

  /** The validation message to display. */
  validationMessage?: string;

  /** The validity state of the form component. */
  validity?: MutableValidityState;
}

/**
 * Defines interface for checkable form-associated components.
 *
 * Along with the interface, use the matching form utils to help set up the component behavior.
 */
interface CheckableFormComponent<T = any> extends FormComponent<T> {
  /** For boolean-valued components, this property defines whether the associated value is submitted to the form or not. */
  checked: boolean;

  /**
   * The initial checked value for this form component.
   *
   * When the form is reset, the checked property will be set to this value.
   *
   * Note: this property will be initialized in the first update cycle, so make sure that the component's value is set before then to ensure defaultValue is properly initialized.
   */
  defaultChecked: boolean;
}

/**
 * exported for test purposes only
 */
export interface ValidationProps {
  status: Status;
  message: string;
  icon: IconName | boolean;
}

function isFormComponentEl(el: HTMLElement): el is FormComponent["el"] {
  return "form" in el && "name" in el && isCalciteFocusable(el);
}

function displayValidationMessage(component: FormComponent, { status, message, icon }: ValidationProps): void {
  if ("status" in component) {
    component.status = status;
  }

  if ("validationIcon" in component && typeof component.validationIcon !== "string") {
    component.validationIcon = icon;
  }

  if ("validationMessage" in component && !component.validationMessage) {
    component.validationMessage = message;
  }
}

function syncInternalInput(component: FormComponent, input: HTMLInputElement): void {
  const { disabled, required } = component;

  input.disabled = disabled;
  input.required = !!required;

  if (isCheckable(component)) {
    input.checked = component.checked;
  } else if (isInputComponent(component, input)) {
    syncInputDelegate(input.type, component, input);
  }
}

function isCheckable(component: FormComponent): component is CheckableFormComponent {
  return "checked" in component;
}

function isInputComponent(
  component: FormComponent,
  input: HTMLInputElement,
): component is FormComponent & InputComponent {
  return component && isSupportedType(input.type);
}

export function focusFirstInvalidFormElement(form: HTMLFormElement): void {
  const formElements = Array.from(form.elements);

  requestAnimationFrame(() => {
    const invalidEls = formElements.filter(
      (el): el is FormComponent["el"] => el.matches("[status=invalid]") && isFormComponentEl(el as HTMLElement),
    );

    // focus the first invalid element that has a validation message
    for (const el of invalidEls) {
      if (el.validationMessage) {
        el.setFocus();
        break;
      }
    }
  });
}

/**
 * Helper for setting the initial default value on the first update pass.
 *
 * Note that this is only needed if the default value cannot be determined on connectedCallback.
 * Be careful not to call this more than once, or form reset behavior might be incorrect.
 *
 * @param component
 * @param value
 */
export function overrideDefaultValue<T>(component: FormComponent<T>, value: any): void {
  component.defaultValue = value;
}

interface UseForm {
  /**
   * When true, this component is associated with a form and will have its value submitted when the form is submitted.
   */
  active: boolean;

  /**
   * For components that support multiple input types (e.g. "text", "email", etc.), this method allows changing the input type.
   */
  overrideInputType: (type: HTMLInputElement["type"]) => void;

  /**
   * Calls `requestSubmit()` on the associated form, if there is one.
   */
  requestSubmit: () => void;

  /**
   * Sets the custom validity of the component.
   */
  setCustomValidity: (message: string) => void;
}

interface UseFormOptions {
  /**
   * When set, the component will validate as if it were the specified input type (e.g. "email").
   */
  inputType?: HTMLInputElement["type"];
}

/**
 * A controller for managing form-associated components.
 */
export const useForm = <T extends FormComponent>(
  options: UseFormOptions,
): ReturnType<typeof makeGenericController<UseForm, T>> => {
  return makeGenericController<UseForm, T>((component, controller) => {
    let customValidityMessage = "";
    let inputDelegate: HTMLInputElement | undefined;
    let lastAssociatedForm: HTMLFormElement | null = null;
    let effectiveInputType = options.inputType;

    if (effectiveInputType) {
      // intentionally not appended to the DOM, we just need it for validation
      inputDelegate = document.createElement("input");
    }

    function invalidFormHandler(event: Event): void {
      if (event.defaultPrevented) {
        return;
      }

      // prevent the browser from showing the native validation popover
      event.preventDefault();

      const form = event.currentTarget as HTMLFormElement;
      focusFirstInvalidFormElement(form);
    }

    function onFormReset(): void {
      if ("status" in component) {
        component.status = "idle";
      }

      if ("validationIcon" in component) {
        component.validationIcon = false;
      }

      if ("validationMessage" in component) {
        component.validationMessage = "";
      }

      if (isCheckable(component)) {
        component.checked = component.defaultChecked;
      }

      component.value = component.defaultValue;
    }

    component.listen("luminaFormResetCallback", () => {
      onFormReset();
    });

    component.listen("luminaFormAssociatedCallback", ({ detail: [form] }) => {
      if (form) {
        form.addEventListener("invalid", invalidFormHandler, { capture: true });
      } else {
        lastAssociatedForm?.removeEventListener("invalid", invalidFormHandler, { capture: true });
      }

      lastAssociatedForm = form;
    });

    function handleInvalidInput(): void {
      const validationMsg = customValidityMessage || inputDelegate?.validationMessage || "";

      component.el.dispatchEvent(
        // allows users to set custom validation messages
        new CustomEvent("calciteInvalid", { bubbles: true, composed: true }),
      );

      displayValidationMessage(component, {
        message: validationMsg,
        icon: true,
        status: "invalid",
      });

      const clearValidationEvent = getClearValidationEventName(component.el.tagName.toLowerCase());

      component.listen(
        clearValidationEvent,
        () => {
          if ("status" in component) {
            component.status = "idle";
          }

          // only clear icon if not set by user
          if ("validationIcon" in component && (!component.validationIcon || component.validationIcon === true)) {
            component.validationIcon = false;
          }

          if ("validationMessage" in component && component.validationMessage === validationMsg) {
            component.validationMessage = "";
          }
        },
        { once: true },
      );
    }

    controller.onConnected(() => {
      component.el.addEventListener("invalid", handleInvalidInput);
    });

    controller.onDisconnected(() => {
      component.el.removeEventListener("invalid", handleInvalidInput);
    });

    controller.onUpdate((changes: PropertyValues<typeof component>) => {
      if (!component.hasUpdated) {
        component.defaultValue = component.value;

        if (isCheckable(component)) {
          component.defaultChecked = component.checked;
        }
      }

      if (changes.has("value") || (isCheckable(component) && changes.has("checked"))) {
        component.elementInternals.setFormValue(getFormValue());
      }

      updateValidity();
    });

    function updateValidity(): void {
      const { elementInternals } = component;

      let validity: ValidityStateFlags = {};
      let validationMessage = "";

      if (inputDelegate) {
        inputDelegate.type = effectiveInputType!;
        const { value } = component;
        const normalizedValue =
          value == null || /* type=file only accepts empty string as a value */ inputDelegate.type === "file"
            ? ``
            : Array.isArray(value)
              ? value.join(",")
              : `${value}`;

        inputDelegate.value = normalizedValue;
        syncInternalInput(component, inputDelegate);

        if (!inputDelegate.validity.valid) {
          // copy flags since ValidityState is not a plain object and cannot be spread or assigned
          for (const key in inputDelegate.validity) {
            if (
              // see https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals/setValidity#flags
              key !== "valid"
            ) {
              validity[key] = inputDelegate.validity[key];
            }
          }

          validationMessage = inputDelegate.validationMessage;
        }
      }

      // custom error has higher precedence
      if (customValidityMessage) {
        validity = { ...validity, customError: true };
        validationMessage = customValidityMessage;
      }

      elementInternals.setValidity(validity, validationMessage);

      if ("validity" in component) {
        component.validity = elementInternals.validity;
      }
    }

    function getFormValue(): any {
      if (Array.isArray(component.value)) {
        const formData = new FormData();
        component.value.forEach((value) => formData.append(component.name, value));
        return formData;
      }

      if (isCheckable(component)) {
        if (component.checked) {
          // matches https://html.spec.whatwg.org/multipage/input.html#dom-input-value-default-on
          return component.value || "on";
        }

        return null;
      }

      return component.value;
    }

    return {
      get active() {
        return !!component.elementInternals.form;
      },
      overrideInputType: (type) => {
        if (import.meta.env.DEV && !inputDelegate) {
          throw new Error("Cannot override input type because no input delegate is configured.");
        }

        effectiveInputType = type;
        updateValidity();
      },
      requestSubmit: () => {
        component.elementInternals.form?.requestSubmit();
      },
      setCustomValidity: (message) => {
        customValidityMessage = message;
        updateValidity();
      },
    };
  });
};
