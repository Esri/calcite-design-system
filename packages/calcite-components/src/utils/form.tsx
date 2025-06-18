// @ts-strict-ignore
import { Writable } from "type-fest";
import { isServer } from "lit";
import { TemplateResult } from "lit-html";
import { h } from "@arcgis/lumina";
import type { IconNameOrString } from "../components/icon/interfaces";
import { Status } from "../components/interfaces";
import type { Input } from "../components/input/input";
import type { RadioButtonGroup } from "../components/radio-button-group/radio-button-group";
import { closestElementCrossShadowBoundary, queryElementRoots } from "./dom";

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
 * @param componentTag the tag of the component, e.g. "calcite-input"
 * @returns the event name
 */
export function getClearValidationEventName(componentTag: string): string {
  const componentTagCamelCase = componentTag
    .split("-")
    .map((part: string, index: number) =>
      index === 0 ? part : `${part[0].toUpperCase()}${part.slice(1)}`,
    )
    .join("");

  const clearValidationEvent = `${componentTagCamelCase}${
    componentsWithInputEvent.includes(componentTag) ? "Input" : "Change"
  }`;

  return clearValidationEvent;
}

export type MutableValidityState = Writable<ValidityState>;

/** Exported for testing purposes. */
export const hiddenFormInputSlotName = "hidden-form-input";

/**
 * Defines interface for form owning components.
 *
 * Allows calling submit/reset methods on the form.
 */
export interface FormOwner {
  /** The host element. */
  readonly el: HTMLElement;

  /**
   * The ID of the form to associate with the component.
   *
   * When not set, the component will be associated with its ancestor form element, if any.
   *
   * Note that this prop should use the `@Prop` decorator.
   */
  form: string;

  /**
   * The form this component is associated with.
   *
   * @private
   */
  formEl: HTMLFormElement;
}

/**
 * Defines interface for form-associated components.
 *
 * Along with the interface, use the matching form utils to help set up the component behavior.
 */
export interface FormComponent<T = any> extends FormOwner {
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
   * Note that this prop should use the `@Prop` decorator.
   */
  name: string;

  /**
   * This form component's value.
   *
   * Note that this prop should use the `@Prop` decorator.
   */
  value: T;

  /**
   * The initial value for this form component.
   *
   * When the form is reset, the value will be set to this property.
   */
  defaultValue: T;

  /** The validation icon to display. */
  validationIcon?: string | boolean;

  /** The validation message to display. */
  validationMessage?: string;

  /** The validity state of the form component. */
  validity?: MutableValidityState;

  /** Hook for components to provide custom form reset behavior. */
  onFormReset?: () => void;

  /**
   * Hook for components to sync _extra_ props on the hidden input form element used for form-submitting.
   *
   * Note: The following props are set by default: disabled, hidden, name, required, value.
   */
  syncHiddenFormInput?: (input: HTMLInputElement) => void;
}

/**
 * Defines interface for checkable form-associated components.
 *
 * Along with the interface, use the matching form utils to help set up the component behavior.
 */
export interface CheckableFormComponent<T = any> extends FormComponent<T> {
  /** For boolean-valued components, this property defines whether the associated value is submitted to the form or not. */
  checked: boolean;

  /**
   * The initial checked value for this form component.
   *
   * When the form is reset, the checked property will be set to this value.
   */
  defaultChecked: boolean;
}

function isCheckable(component: FormComponent): component is CheckableFormComponent {
  return "checked" in component;
}

const onFormResetMap = new WeakMap<HTMLElement, FormComponent["onFormReset"]>();
const formComponentSet = new WeakSet<HTMLElement>();

/**
 * This helps determine if our form component is part of a composite form-associated component.
 *
 * @param form
 * @param formComponentEl
 */
function hasRegisteredFormComponentParent(
  form: HTMLFormElement,
  formComponentEl: HTMLElement,
): boolean {
  // if we have a parent component using the form ID attribute, we assume it is form-associated
  const hasParentComponentWithFormIdSet = closestElementCrossShadowBoundary(
    formComponentEl.parentElement,
    "[form]",
  );

  if (hasParentComponentWithFormIdSet) {
    return true;
  }

  // we use events as a way to test for nested form-associated components across shadow bounds
  const formComponentRegisterEventName = "calciteInternalFormComponentRegister";

  let hasRegisteredFormComponentParent = false;

  form.addEventListener(
    formComponentRegisterEventName,
    (event) => {
      hasRegisteredFormComponentParent = event
        .composedPath()
        .some((element) => formComponentSet.has(element as HTMLElement));
      event.stopPropagation();
    },
    { once: true },
  );

  formComponentEl.dispatchEvent(
    new CustomEvent(formComponentRegisterEventName, {
      bubbles: true,
      composed: true,
    }),
  );

  return hasRegisteredFormComponentParent;
}

// exported for test purposes only
export interface ValidationProps {
  status: Status;
  message: string;
  icon: IconNameOrString | boolean | "";
}

function displayValidationMessage(
  component: Input["el"] | FormComponent,
  { status, message, icon }: ValidationProps,
): void {
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

function getValidationComponent(
  el: Input["el"],
  // TODO: create an HTMLCalciteFormAssociatedElement base type
): Input["el"] | RadioButtonGroup["el"] {
  // radio-button is formAssociated, but the validation props are on the parent group
  if (el.nodeName === "CALCITE-RADIO-BUTTON") {
    return closestElementCrossShadowBoundary(el, "calcite-radio-button-group");
  }
  return el;
}

const invalidEvent = new CustomEvent("calciteInvalid", { bubbles: true, composed: true });

function invalidHandler(event: Event) {
  // target is the hidden input, which is slotted in the actual form component
  const hiddenInput = event?.target as HTMLInputElement;
  const hiddenInputMessage = hiddenInput?.validationMessage;

  // not necessarily a calcite-input, but we don't have an HTMLCalciteFormAssociatedElement type
  const formComponent = getValidationComponent(
    hiddenInput?.parentElement as Input["el"],
  ) as Input["el"];

  if (!formComponent) {
    return;
  }

  const componentTag = formComponent?.nodeName?.toLowerCase();
  const componentTagParts = componentTag?.split("-");

  if (componentTagParts.length < 2 || componentTagParts[0] !== "calcite") {
    return;
  }

  // prevent the browser from showing the native validation popover
  event?.preventDefault();

  if ("validity" in formComponent) {
    formComponent.validity = hiddenInput?.validity;
  }

  // dispatch a "calciteInvalid" so users can set custom validation messages
  formComponent.dispatchEvent(invalidEvent);

  displayValidationMessage(formComponent, {
    message: hiddenInputMessage,
    icon: true,
    status: "invalid",
  });

  const clearValidationEvent = getClearValidationEventName(componentTag);
  formComponent.addEventListener(
    clearValidationEvent,
    () => {
      if ("status" in formComponent) {
        formComponent.status = "idle";
      }

      // don't clear if an icon was specified by the user
      if (
        "validationIcon" in formComponent &&
        (formComponent.validationIcon === "" || formComponent.validationIcon === true)
      ) {
        formComponent.validationIcon = false;
      }

      if (
        "validationMessage" in formComponent &&
        formComponent.validationMessage === hiddenInputMessage
      ) {
        formComponent.validationMessage = "";
      }

      if ("validity" in formComponent) {
        formComponent.validity = hiddenInput?.validity;
      }
    },
    { once: true },
  );
}

/**
 * Helper to submit a form.
 *
 * @param component
 * @returns true if its associated form was submitted, false otherwise.
 */
export function submitForm(component: FormOwner): boolean {
  const { formEl } = component;

  if (!formEl) {
    return false;
  }

  formEl.addEventListener("invalid", invalidHandler, true);
  formEl.requestSubmit();
  formEl.removeEventListener("invalid", invalidHandler, true);

  requestAnimationFrame(() => {
    const invalidEls = formEl.querySelectorAll<Input["el"]>("[status=invalid]");

    // focus the first invalid element that has a validation message
    for (const el of invalidEls) {
      if (el?.validationMessage) {
        el?.setFocus();
        break;
      }
    }
  });

  return true;
}

/**
 * Helper to reset a form.
 *
 * @param component
 */
export function resetForm(component: FormOwner): void {
  component.formEl?.reset();
}

/**
 * Helper to set up form interactions on connectedCallback.
 *
 * @param component
 */
export function connectForm<T>(component: FormComponent<T>): void {
  const { el, value } = component;
  const associatedForm = findAssociatedForm(component);

  if (!associatedForm || hasRegisteredFormComponentParent(associatedForm, el)) {
    return;
  }

  component.formEl = associatedForm;
  component.defaultValue = value;

  if (isCheckable(component)) {
    component.defaultChecked = component.checked;
  }

  const boundOnFormReset = onFormReset.bind(component);
  associatedForm.addEventListener("reset", boundOnFormReset);
  onFormResetMap.set(component.el, boundOnFormReset);
  formComponentSet.add(el);
}

/**
 * Utility method to find a form-component's associated form element.
 *
 * @param component
 */
export function findAssociatedForm(component: FormOwner): HTMLFormElement | null {
  const { el, form } = component;

  return form
    ? queryElementRoots<HTMLFormElement>(el, { id: form })
    : closestElementCrossShadowBoundary(el, "form");
}

function onFormReset<T>(this: FormComponent<T>): void {
  if ("status" in this) {
    this.status = "idle";
  }

  if ("validationIcon" in this) {
    this.validationIcon = false;
  }

  if ("validationMessage" in this) {
    this.validationMessage = "";
  }

  if (isCheckable(this)) {
    this.checked = this.defaultChecked;
    return;
  }

  this.value = this.defaultValue;

  this.onFormReset?.();
}

/**
 * Helper to tear down form interactions on disconnectedCallback.
 *
 * @param component
 */
export function disconnectForm<T>(component: FormComponent<T>): void {
  const { el, formEl } = component;

  if (!formEl) {
    return;
  }

  const boundOnFormReset = onFormResetMap.get(el);
  formEl.removeEventListener("reset", boundOnFormReset);
  onFormResetMap.delete(el);
  component.formEl = null;
  formComponentSet.delete(el);
}

/**
 * Helper for setting the default value on initialization after connectedCallback.
 *
 * Note that this is only needed if the default value cannot be determined on connectedCallback.
 *
 * @param component
 * @param value
 */
export function afterConnectDefaultValueSet<T>(component: FormComponent<T>, value: any): void {
  component.defaultValue = value;
}

export const internalHiddenInputInputEvent = "calciteInternalHiddenInputInput";

const hiddenInputInputHandler = (event: Event) => {
  event.target.dispatchEvent(new CustomEvent(internalHiddenInputInputEvent, { bubbles: true }));
};

const removeHiddenInputChangeEventListener = (input: HTMLInputElement) =>
  input.removeEventListener("input", hiddenInputInputHandler);

/**
 * Helper for maintaining a form-associated's hidden input in sync with the component.
 *
 * Based on Ionic's approach: https://github.com/ionic-team/ionic-framework/blob/e4bf052794af9aac07f887013b9250d2a045eba3/core/src/utils/helpers.ts#L198
 *
 * @param component
 */
function syncHiddenFormInput(component: FormComponent): void {
  const { el, formEl, name, value } = component;
  const { ownerDocument } = el;

  if (isServer) {
    return;
  }

  const inputs = el.querySelectorAll<HTMLInputElement>(`input[slot="${hiddenFormInputSlotName}"]`);

  if (!formEl || !name) {
    inputs.forEach((input) => {
      removeHiddenInputChangeEventListener(input);
      input.remove();
    });
    return;
  }

  const values = Array.isArray(value) ? value : [value];
  const extra: any[] = [];
  const seen = new Set<any>();

  inputs.forEach((input) => {
    const valueMatch = values.find(
      (val) =>
        /* intentional non-strict equality check */
        val == input.value,
    );

    if (valueMatch != null) {
      seen.add(valueMatch);
      defaultSyncHiddenFormInput(component, input, valueMatch);
    } else {
      extra.push(input);
    }
  });

  let docFrag: DocumentFragment;

  values.forEach((value) => {
    if (seen.has(value)) {
      return;
    }

    let input = extra.pop();

    if (!input) {
      input = ownerDocument.createElement("input");
      input.ariaHidden = "true";
      input.slot = hiddenFormInputSlotName;
    }

    if (!docFrag) {
      docFrag = ownerDocument.createDocumentFragment();
    }

    docFrag.append(input);

    // emits when hidden input is autofilled
    input.addEventListener("input", hiddenInputInputHandler);

    defaultSyncHiddenFormInput(component, input, value);
  });

  if (docFrag) {
    el.append(docFrag);
  }
  extra.forEach((input) => {
    removeHiddenInputChangeEventListener(input);
    input.remove();
  });
}

function defaultSyncHiddenFormInput(
  component: FormComponent,
  input: HTMLInputElement,
  value: string,
): void {
  const { defaultValue, disabled, form, name, required } = component;

  // keep in sync to prevent losing reset value
  input.defaultValue = defaultValue;
  input.disabled = disabled;
  input.name = name;
  input.required = required;
  input.tabIndex = -1;

  // we set the attr as the prop is read-only
  if (form) {
    input.setAttribute("form", form);
  } else {
    input.removeAttribute("form");
  }

  if (isCheckable(component)) {
    input.checked = component.checked;

    // keep in sync to prevent losing reset value
    input.defaultChecked = component.defaultChecked;
    // heuristic to support default/on mode from https://html.spec.whatwg.org/multipage/input.html#dom-input-value-default-on
    input.value = component.checked ? value || "on" : "";
  } else {
    input.value = value || "";
  }

  component.syncHiddenFormInput?.(input);

  const validationComponent = getValidationComponent(component.el as Input["el"]);

  if (validationComponent && "validity" in validationComponent) {
    // mutate the component's validity object to prevent a rerender
    // https://stenciljs.com/docs/properties#mutable-arrays-and-objects
    for (const key in { ...input?.validity }) {
      validationComponent.validity[key] = input.validity[key];
    }
  }
}

interface HiddenFormInputSlotProps {
  component: FormComponent;
}

/**
 * Helper to render the slot for form-associated component's hidden input.
 *
 * If the component has a default slot, this must be placed at the bottom of the component's root container to ensure it is the last child.
 *
 * render(): VNode {
 *   <Host>
 *     <div class={CSS.container}>
 *     // ...
 *     <HiddenFormInputSlot component={this} />
 *     </div>
 *   </Host>
 * }
 *
 * Note that the hidden-form-input Sass mixin must be added to the component's style to apply specific styles.
 *
 * @param root0
 * @param root0.component
 */
export const HiddenFormInputSlot = ({ component }: HiddenFormInputSlotProps): TemplateResult => {
  syncHiddenFormInput(component);

  return <slot name={hiddenFormInputSlotName} />;
};
