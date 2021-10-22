import { closestElementCrossShadowBoundary } from "./dom";
import { FunctionalComponent, h } from "@stencil/core";

const hiddenFormInputSlotName = "hidden-form-input";

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
export type FormAssociatedComponent<T = any> = FormAssociated<T> | CheckableFormAssociated<T>;

interface FormAssociated<T = any> {
  /**
   * When true, this component's value will not be submitted in the form.
   */
  disabled: boolean;

  /**
   * When true, this component's value will not be submitted in the form.
   *
   * @todo remove optional in follow-up PR
   */
  hidden?: boolean;

  /**
   * When true, form submit requests will enforce field requirement.
   *
   * @todo remove optional in follow-up PR
   */
  required?: boolean;

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

  /**
   * Hook for components to sync extra props on the hidden input form element used for form-submitting.
   *
   * Note: The following props are set by default: disabled, hidden, name, required, value.
   */
  syncHiddenFormInput?(input: HTMLInputElement): void;
}

interface CheckableFormAssociated<T = any> extends FormAssociated<T> {
  /**
   * For boolean-valued components, this property defines whether the associated value is submitted to the form or not.
   */
  checked: boolean;

  /**
   * The initial value for this form component.
   *
   * When the form is reset, the value will be set to this property.
   */
  defaultChecked?: boolean;
}

function isCheckable(
  formAssociated: FormAssociatedComponent
): formAssociated is CheckableFormAssociated {
  return "checked" in formAssociated;
}

const onFormResetMap = new WeakMap<HTMLElement, FormAssociatedComponent["onFormReset"]>();
const formAssociatedComponentSet = new WeakSet<HTMLElement>();

function alreadyRegistered(form: HTMLFormElement, formAssociatedEl: HTMLElement): boolean {
  // we use events as a way to test for nested form-associated components across shadow bounds
  const calciteInternalFormAssociatedRegisterEventName = "calciteInternalFormAssociatedRegister";

  let nested = false;

  form.addEventListener(
    calciteInternalFormAssociatedRegisterEventName,
    (event) => {
      nested = event
        .composedPath()
        .some((element) => formAssociatedComponentSet.has(element as HTMLElement));
      event.stopPropagation();
    },
    { once: true }
  );

  formAssociatedEl.dispatchEvent(
    new CustomEvent(calciteInternalFormAssociatedRegisterEventName, {
      bubbles: true,
      cancelable: true,
      composed: true
    })
  );

  return nested;
}

/**
 * Helper to set up form interactions on connectedCallback.
 *
 * @param el - the host element
 */
export function connectForm<T>(formAssociated: FormAssociatedComponent<T>): void {
  const { el, value } = formAssociated;

  const form = closestElementCrossShadowBoundary<HTMLFormElement>(el, "form");

  if (!form || alreadyRegistered(form, el)) {
    return;
  }

  formAssociated.formEl = form;
  formAssociated.defaultValue = value;

  if (isCheckable(formAssociated)) {
    formAssociated.defaultChecked = formAssociated.checked;
  }

  const boundOnFormReset = (formAssociated.onFormReset || onFormReset).bind(formAssociated);
  form.addEventListener("reset", boundOnFormReset);
  formAssociatedComponentSet.add(el);
}

function onFormReset<T>(this: FormAssociatedComponent<T>): void {
  if (isCheckable(this)) {
    this.checked = this.defaultChecked;
    return;
  }

  this.value = this.defaultValue;
}

/**
 * Helper to tear down form interactions on disconnectedCallback.
 *
 * @param el - the host element
 */
export function disconnectForm<T>(formAssociated: FormAssociatedComponent<T>): void {
  const { el, formEl } = formAssociated;

  if (!formEl) {
    return;
  }

  const boundOnFormReset = onFormResetMap.get(el);
  formEl.removeEventListener("reset", boundOnFormReset);
  onFormResetMap.delete(el);
  formAssociated.formEl = null;
  formAssociatedComponentSet.delete(el);
}

/**
 * Helper for maintaining a form-associated's hidden input in sync with the component.
 *
 * This should be used in a component's render method along with the hidden-form-input-slot helper:
 *
 * render(): VNode {
 *   renderHiddenFormInput(this);
 *   <Host>
 *     <div class={CSS.container}>
 *     // ...
 *     <HiddenFormInputSlot />
 *     </div>
 *   </Host>
 * }
 *
 * Based on Ionic's approach: https://github.com/ionic-team/ionic-framework/blob/e4bf052794af9aac07f887013b9250d2a045eba3/core/src/utils/helpers.ts#L198
 */
export function renderHiddenFormInput(formAssociated: FormAssociatedComponent): void {
  const { disabled, el, formEl, hidden, name, required, value } = formAssociated;

  let input = el.querySelector(
    `input[slot="${hiddenFormInputSlotName}"]`
  ) as HTMLInputElement | null;

  if (!formEl) {
    input?.remove();
    return;
  }

  if (!input) {
    input = el.ownerDocument!.createElement("input");
    input.slot = hiddenFormInputSlotName;
    el.appendChild(input);
  }

  input.disabled = disabled;
  input.hidden = hidden;
  input.name = name;
  input.required = required;
  input.tabIndex = -1;
  input.value =
    value ||
    // heuristic to support default/on mode from https://html.spec.whatwg.org/multipage/input.html#dom-input-value-default-on
    (isCheckable(formAssociated) && formAssociated.checked ? "on" : "");

  formAssociated.syncHiddenFormInput?.call(formAssociated, input);
}

/**
 * Helper to render the slot for form-associated component's hidden input.
 *
 * If the component has a default slot, this must be placed at the bottom of the component's root container to ensure it is the last child.
 *
 * Note that the hidden-form-input Sass mixin must be added to the component's style to apply specific styles.
 */
export const HiddenFormInputSlot: FunctionalComponent = () => (
  <slot name={hiddenFormInputSlotName} />
);
