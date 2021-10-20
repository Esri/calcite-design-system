import { closestElementCrossShadowBoundary } from "./dom";

// todo: remove this!
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
  formEl: HTMLFormElement;

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
  defaultValue: T;

  /**
   * Hook for components to provide custom form reset behavior.
   */
  onFormReset?(): void;
}

const onFormResetMap = new WeakMap<HTMLElement, FormAssociated["onFormReset"]>();

/**
 * Helper to set up form interactions on connectedCallback.
 *
 * @param el - the host element
 */
export function connectForm<T>(formAssociated: FormAssociated<T>): void {
  const { el, value } = formAssociated;

  const form = closestElementCrossShadowBoundary<HTMLFormElement>(el, "form");

  if (!form) {
    return;
  }

  formAssociated.formEl = form;
  formAssociated.defaultValue = "checked" in formAssociated ? formAssociated["checked"] : value;

  const boundOnFormReset = (formAssociated.onFormReset || onFormReset).bind(formAssociated);
  form.addEventListener("reset", boundOnFormReset);
}

function onFormReset<T>(this: FormAssociated<T>): void {
  const valueProp = "checked" in this ? "checked" : "value";
  this[valueProp] = this.defaultValue;
}

/**
 * Helper to tear down form interactions on disconnectedCallback.
 *
 * @param el - the host element
 */
export function disconnectForm<T>(formAssociated: FormAssociated<T>): void {
  const { el, formEl } = formAssociated;

  if (!formEl) {
    return;
  }

  const boundOnFormReset = onFormResetMap.get(el);
  formEl.removeEventListener("reset", boundOnFormReset);
  onFormResetMap.delete(el);
}
