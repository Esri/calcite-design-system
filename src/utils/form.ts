import { closestElementCrossShadowBoundary } from "./dom";

export const hiddenInputStyle = `
  bottom: 0 !important;
  left: 0 !important;
  margin: 0 !important;
  opacity: 0 !important;
  outline: none !important;
  padding: 0 !important;
  position: absolute !important;
  right: 0 !important;
  top: 0 !important;
  transform: none !important;
  -webkit-appearance: none !important;
  z-index: -1 !important;
`;

interface FormDataEvent extends Event {
  formData: FormData;
}

/**
 * Defines interface for components that are form-compatible.
 *
 * Along with the interface, use the matching form utils to help set up the component behavior.
 */
export interface FormAssociated<T = any> {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  /**
   * The form this component is associated with.
   */
  formEl: HTMLElement;

  /**
   * The name used to submit the value to the associated form.
   *
   * Note that this prop should use the @Prop decorator.
   *
   * @default ""
   */
  name: string;

  /**
   * This form component's value.
   *
   * Note that this prop should use the @Prop decorator.
   */
  value: T;

  /**
   * The initial value for this form component.
   *
   * When the form is reset, the value will be set to this property.
   */
  initialValue: T;

  /**
   * Hook for components to provide custom form reset behavior.
   */
  onFormReset?(): void;
}

const onFormDataMap = new WeakMap<HTMLElement, typeof onFormData>();
const onFormResetMap = new WeakMap<HTMLElement, FormAssociated["onFormReset"]>();
const hiddenInputMap = new WeakMap<HTMLElement, HTMLInputElement>();

// Safari does not support `formdata` event
const supportsFormDataEvent = "FormDataEvent" in window;

/**
 * Helper to set up form interactions on connectedCallback.
 *
 * @param el - the host element
 */
export function connectForm<T>(formAssociated: FormAssociated<T>): void {
  const form = closestElementCrossShadowBoundary<HTMLFormElement>(formAssociated.el, "form");

  if (!form) {
    return;
  }

  formAssociated.formEl = form;
  formAssociated.initialValue = formAssociated.value;

  if (formAssociated.name) {
    const boundOnFormData = onFormData.bind(formAssociated);
    onFormDataMap.set(formAssociated.el, boundOnFormData);

    if (supportsFormDataEvent) {
      form.addEventListener("formdata", boundOnFormData);
    } else {
      // FIXME: this is not ideal for password fields as the value will be visible in the DOM
      const hiddenInput = form.ownerDocument.createElement("input");
      hiddenInput.type = "hidden";
      hiddenInput.name = formAssociated.name;
      hiddenInputMap.set(formAssociated.el, hiddenInput);
      // value assigned on submit

      formAssociated.el.append(hiddenInput);

      form.addEventListener("submit", boundOnFormData);
    }
  }

  const boundOnFormReset = (formAssociated.onFormReset || onFormReset).bind(formAssociated);
  onFormDataMap.set(formAssociated.el, boundOnFormReset);
  form.addEventListener("reset", boundOnFormReset);
}

function onFormData<T>(this: FormAssociated<T>, { formData }: FormDataEvent): void {
  const { el, name, value } = this;

  if (!name) {
    return;
  }

  // heuristic to support default/on mode from https://html.spec.whatwg.org/multipage/input.html#dom-input-value-default-on
  // we could introduce a mode in the interface to specify this behavior as an alternative
  const useDefaultOnMode = "checked" in this;

  const formValue = value != null ? value.toString() : useDefaultOnMode ? "on" : "";

  if (supportsFormDataEvent) {
    formData.append(name, formValue);
  } else {
    hiddenInputMap.get(el).value = formValue;
  }
}

function onFormReset<T>(this: FormAssociated<T>): void {
  this.value = this.initialValue;
}

/**
 * Helper to tear down form interactions on disconnectedCallback.
 *
 * @param el - the host element
 */
export function disconnectForm<T>(formAssociated: FormAssociated<T>): void {
  const form = formAssociated.formEl;

  if (!form) {
    return;
  }

  if (!supportsFormDataEvent) {
    hiddenInputMap.delete(formAssociated.el);
  }

  const boundOnFormData = onFormDataMap.get(formAssociated.el);
  form.removeEventListener(supportsFormDataEvent ? "formdata" : "submit", boundOnFormData);
  onFormDataMap.delete(formAssociated.el);

  const boundOnFormReset = onFormResetMap.get(formAssociated.el);
  form.removeEventListener("reset", boundOnFormReset);
  onFormResetMap.delete(formAssociated.el);
}
