import { closestElementCrossShadowBoundary } from "./dom";
import { FunctionalComponent, h } from "@stencil/core";

/**
 * Exported for testing purposes.
 */
export const hiddenFormInputSlotName = "hidden-form-input";

/**
 * Defines interface for form owning components.
 *
 * Allows calling submit/reset methods on the form.
 */
export interface FormOwner {
  /**
   * The form this component is associated with.
   */
  formEl: HTMLFormElement;
}

/**
 * Defines interface for form-associated components.
 *
 * Along with the interface, use the matching form utils to help set up the component behavior.
 */
export interface FormComponent<T = any> extends FormOwner {
  /**
   * When true, this component's value will not be submitted in the form.
   */
  disabled: boolean;

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
   * The name used to submit the value to the associated form.
   *
   * Note that this prop should use the @Prop decorator.
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
   * Hook for components to sync _extra_ props on the hidden input form element used for form-submitting.
   *
   * Note: The following props are set by default: disabled, hidden, name, required, value.
   */
  syncHiddenFormInput?(input: HTMLInputElement): void;
}

/**
 * Defines interface for checkable form-associated components.
 *
 * Along with the interface, use the matching form utils to help set up the component behavior.
 */
export interface CheckableFormComponent<T = any> extends FormComponent<T> {
  /**
   * For boolean-valued components, this property defines whether the associated value is submitted to the form or not.
   */
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

function hasRegisteredFormComponentParent(
  form: HTMLFormElement,
  formComponentEl: HTMLElement
): boolean {
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
    { once: true }
  );

  formComponentEl.dispatchEvent(
    new CustomEvent(formComponentRegisterEventName, {
      bubbles: true,
      composed: true
    })
  );

  return hasRegisteredFormComponentParent;
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

  "requestSubmit" in formEl ? formEl.requestSubmit() : (formEl as HTMLFormElement).submit();

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

  const form = closestElementCrossShadowBoundary<HTMLFormElement>(el, "form");

  if (!form || hasRegisteredFormComponentParent(form, el)) {
    return;
  }

  component.formEl = form;
  component.defaultValue = value;

  if (isCheckable(component)) {
    component.defaultChecked = component.checked;
  }

  const boundOnFormReset = (component.onFormReset || onFormReset).bind(component);
  form.addEventListener("reset", boundOnFormReset);
  onFormResetMap.set(component.el, boundOnFormReset);
  formComponentSet.add(el);
}

function onFormReset<T>(this: FormComponent<T>): void {
  if (isCheckable(this)) {
    this.checked = this.defaultChecked;
    return;
  }

  this.value = this.defaultValue;
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

const hiddenInputChangeHandler = (event: Event) => {
  event.target.dispatchEvent(
    new CustomEvent("calciteInternalHiddenInputChange", { bubbles: true })
  );
};

const removeHiddenInputChangeEventListener = (input: HTMLInputElement) =>
  input.removeEventListener("change", hiddenInputChangeHandler);

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
        val == input.value
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
      input = ownerDocument!.createElement("input");
      input.slot = hiddenFormInputSlotName;
    }

    if (!docFrag) {
      docFrag = ownerDocument!.createDocumentFragment();
    }

    docFrag.append(input);

    // emits when hidden input is autofilled
    input.addEventListener("change", hiddenInputChangeHandler);

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
  value: string
): void {
  const { defaultValue, disabled, name, required } = component;

  // keep in sync to prevent losing reset value
  input.defaultValue = defaultValue;
  input.disabled = disabled;
  input.name = name;
  input.required = required;
  input.tabIndex = -1;

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
export const HiddenFormInputSlot: FunctionalComponent<HiddenFormInputSlotProps> = ({
  component
}) => {
  syncHiddenFormInput(component);

  return <slot name={hiddenFormInputSlotName} />;
};
