import { closestElementCrossShadowBoundary } from "./dom";

/**
 * Defines interface for components that can submit or reset a form.
 *
 * Along with the interface, use the matching form utils to help set up the component behavior.
 */
export interface FormButtonComponent {
  /**
   * The host element.
   */
  readonly el: HTMLElement;

  /**
   * The form this component is associated with.
   */
  formEl: HTMLFormElement;
}

/**
 * Helper to set up form interactions on connectedCallback.
 *
 * @param el - the host element
 */
export function connectForm(formButtonComponent: FormButtonComponent): void {
  const { el } = formButtonComponent;

  formButtonComponent.formEl = closestElementCrossShadowBoundary<HTMLFormElement>(el, "form");
}

export function disconnectForm(formButtonComponent: FormButtonComponent): void {
  formButtonComponent.formEl = null;
}

/**
 * Helper to submit a form.
 *
 * @param el - the host element
 */
export function submitForm(formButtonComponent: FormButtonComponent): void {
  const { formEl } = formButtonComponent;

  formEl?.dispatchEvent(new Event("submit"));
}

/**
 * Helper to reset a form.
 *
 * @param el - the host element
 */
export function resetForm(formButtonComponent: FormButtonComponent): void {
  const { formEl } = formButtonComponent;

  formEl?.dispatchEvent(new Event("reset"));
}
