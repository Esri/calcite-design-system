import { afterEach, expect, it, vi } from "vitest";
import { userEvent } from "vitest/browser";
import { Mock } from "@vitest/spy";
import { RenderResult } from "@arcgis/lumina-compiler/testing";
import {
  componentsWithInputEvent,
  FormComponent,
  getClearValidationEventName,
  ValidationProps,
} from "../../../controllers/useForm";
import { TestSetup } from "./interfaces";

interface FormAssociatedOptions {
  /** This value will be set on the component and submitted by the form. */
  testValue: any;

  /**
   * Set this if the expected submit value **is different** from stringifying `testValue`.
   * For example, a component may transform an object to a serializable string.
   */
  expectedSubmitValue?: any;

  /*
   * Set this if the value required to emit an input/change event is different from `testValue`.
   * The value is passed to `userEvent.type()`. For example, input-time-picker requires
   * appending AM or PM before the value commits and calciteInputTimePickerChange emits.
   *
   * This option is only relevant when the `validation` option is enabled.
   *
   * @see https://vitest.dev/api/browser/interactivity.html#userevent-type
   */
  validUserInputTestValue?: string;

  /*
   * Set this if emitting an input/change event requires key presses. Each array item will be passed
   * to `userEvent.keyboard()`. For example, the combobox value can be changed by pressing "Space"
   * to open the component and "Enter" to select a value.
   *
   * This option is only relevant when the `validation` option is enabled.
   *
   * @see https://vitest.dev/api/browser/interactivity.html#userevent-keyboard
   */
  changeValueKeys?: string[];

  /** Specifies the input type that will be used to capture the value. */
  inputType?: HTMLInputElement["type"];

  /** Specifies if the component supports submitting the form on Enter key press. */
  submitsOnEnter?: boolean;

  /** Specifies if the component supports clearing its value (i.e., setting to null). */
  clearable?: boolean;

  /** Specifies if the component supports preventing submission and displaying validation messages. */
  validation?: boolean;
}

/**
 * Helper for testing form-associated components; specifically form submitting and resetting.
 *
 * Note that this helper should be used within a describe block.
 */
export function formAssociated(setup: TestSetup, options: FormAssociatedOptions): void {
  const inputTypeContext = options?.inputType ? ` (input type="${options.inputType}")` : "";

  afterEach(() => {
    document.body.innerHTML = "";
  });

  it(`supports association via ancestry${inputTypeContext}`, () => testAncestorFormAssociated(setup));
  it(`supports association via form ID${inputTypeContext}`, () => testIdFormAssociated(setup));

  if (options?.validation && options?.inputType && !["color", "month", "time"].includes(options.inputType)) {
    it(`supports required property validation${inputTypeContext}`, () => testRequiredPropertyValidation(setup));
  }

  async function testAncestorFormAssociated(setup: TestSetup): Promise<void> {
    const { el, reRender } = (await setup()) as RenderResult<FormComponent>;

    ensureName(el);

    const fragment = document.createDocumentFragment();
    const form = document.createElement("form");

    /* keeping things simple by using submit-type input
      this should cover button and calcite-button submit cases */
    const submitter = document.createElement("input");
    submitter.type = "submit";
    submitter.id = "submitter";

    fragment.append(form);
    form.append(el);
    form.append(submitter);

    document.body.append(fragment);

    await assertValueResetOnFormReset(el, options, reRender);
    await assertValueSubmittedOnFormSubmit(el, options, reRender);

    if (options.submitsOnEnter) {
      await assertFormSubmitOnEnter(el, options);
    }
  }

  async function testIdFormAssociated(setup: TestSetup): Promise<void> {
    const { el, reRender } = (await setup()) as RenderResult<FormComponent>;

    ensureName(el);
    ensureForm(el);

    const fragment = document.createDocumentFragment();
    const form = document.createElement("form");
    form.id = "test-form";

    /* keeping things simple by using submit-type input
      this should cover button and calcite-button submit cases */
    const submitter = document.createElement("input");
    submitter.setAttribute("form", "test-form");
    submitter.type = "submit";
    submitter.id = "submitter";

    fragment.append(form);
    fragment.append(el);
    fragment.append(submitter);

    document.body.append(fragment);

    await assertValueResetOnFormReset(el, options, reRender);
    await assertValueSubmittedOnFormSubmit(el, options, reRender);

    if (options.submitsOnEnter) {
      await assertFormSubmitOnEnter(el, options);
    }
  }

  async function testRequiredPropertyValidation(setup: TestSetup): Promise<void> {
    const { el } = (await setup()) as RenderResult<FormComponent>;

    ensureName(el);
    ensureRequired(el);
    ensureUnchecked(el);

    const form = document.createElement("form");

    /* keeping things simple by using submit-type input
      this should cover button and calcite-button submit cases */
    const submitter = document.createElement("input");
    submitter.type = "submit";
    submitter.id = "submitter";

    form.append(el, submitter);
    document.body.append(form);

    const clearValidationHandler = vi.fn();
    el.addEventListener(getClearValidationEventName(el.tagName.toLowerCase()), clearValidationHandler);

    const calciteInvalidEventHandler = vi.fn();
    el.addEventListener("calciteInvalid", calciteInvalidEventHandler);

    const requiredValidationMessage =
      options?.inputType === "radio" ? "Please select one of these options." : "Please fill out this field.";

    await assertPreventsFormSubmission(el, submitter, requiredValidationMessage);
    expect(calciteInvalidEventHandler).toHaveBeenCalledTimes(1);
    expect(el.validity).toHaveProperty("valueMissing", true);

    await assertClearsValidationOnValueChange(el, options, clearValidationHandler);
    expect(calciteInvalidEventHandler).toHaveBeenCalledTimes(1);
    expect(el.validity).toHaveProperty("valueMissing", false);

    await assertUserMessageNotOverridden(el, submitter);
    expect(calciteInvalidEventHandler).toHaveBeenCalledTimes(2);
    expect(el.validity).toHaveProperty("valueMissing", true);
  }

  function ensureName(el: FormComponent["el"]): void {
    if (!el.hasAttribute("name")) {
      el.setAttribute("name", "testName");
    }
  }

  function ensureRequired(el: FormComponent["el"]): void {
    if (!el.hasAttribute("required")) {
      el.toggleAttribute("required");
    }
  }

  function ensureUnchecked(el: FormComponent["el"]): void {
    el.removeAttribute("checked");
    el.removeAttribute("selected");
  }

  function ensureForm(el: FormComponent["el"]): void {
    if (!el.hasAttribute("form")) {
      el.setAttribute("form", "test-form");
    }
  }

  function isCheckable(el: HTMLElement, options: FormAssociatedOptions): boolean {
    return typeof options.testValue === "boolean" && "checked" in el;
  }

  function stringifyTestValue(value: any): string | string[] {
    return Array.isArray(value) ? value.map((value) => value.toString()) : value.toString();
  }

  async function assertValueResetOnFormReset(
    el: FormComponent["el"],
    options: FormAssociatedOptions,
    reRender: () => Promise<boolean>,
  ): Promise<void> {
    const resettablePropName = isCheckable(el, options) ? "checked" : ("value" as const);
    // TODO: avoid any
    const initialValue = (el as any)[resettablePropName];
    (el as any)[resettablePropName] = options.testValue;
    await reRender();

    const form = document.querySelector("form")!;
    form.reset();
    await reRender();

    expect((el as any)[resettablePropName]).toBe(initialValue);
  }

  async function assertValueSubmittedOnFormSubmit(
    el: any,
    options: FormAssociatedOptions,
    reRender: () => Promise<boolean>,
  ): Promise<void> {
    const stringifiedTestValue = stringifyTestValue(options.testValue);
    const name = el.getAttribute("name")!;

    if (isCheckable(el, options)) {
      el.checked = true;
      await reRender();
      expect(await submitAndGetValue()).toEqual("on");

      el.value = options.testValue;
      await reRender();
      expect(await submitAndGetValue()).toEqual(stringifiedTestValue);

      el.disabled = true;
      await reRender();
      expect(await submitAndGetValue()).toBe(null);

      el.checked = true;
      el.disabled = false;
      await reRender();
      expect(await submitAndGetValue()).toEqual(stringifiedTestValue);

      el.checked = false;
      await reRender();
      expect(await submitAndGetValue()).toBe(null);
    } else {
      if (options.clearable) {
        el.required = true;
        el.value = null;
        await reRender();
        expect(await submitAndGetValue()).toBe(
          options.inputType === "color"
            ? // `input[type="color"]` will set its value to #000000 when set to an invalid value
              // see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#value
              "#000"
            : undefined,
        );

        el.required = false;
        el.value = options.testValue;
        await reRender();
        expect(await submitAndGetValue()).toEqual(options?.expectedSubmitValue || stringifiedTestValue);
      }

      el.disabled = true;
      await reRender();
      expect(await submitAndGetValue()).toBe(null);

      el.disabled = false;
      el.value = options.testValue;
      await reRender();

      expect(await submitAndGetValue()).toEqual(options?.expectedSubmitValue || stringifiedTestValue);

      el.value = options.testValue;
      await reRender();

      expect(await submitAndGetValue()).toEqual(options?.expectedSubmitValue || stringifiedTestValue);
    }

    type SubmitValueResult = ReturnType<FormData["get"]> | ReturnType<FormData["getAll"]> | undefined;

    /**
     * This method will submit the form and return the submitted value:
     *
     * For single-value components, it will return a string or null if the value was not submitted
     * For multi-value components, it will return an array of strings
     *
     * If the input cannot be submitted because it is invalid, undefined will be returned
     */
    async function submitAndGetValue(): Promise<SubmitValueResult> {
      const form = document.querySelector("form")!;
      const inputName = name;
      let resolve: (value: SubmitValueResult) => void;
      const submitPromise = new Promise<SubmitValueResult>((yes) => (resolve = yes));

      const input = document.querySelector(`[name="${inputName}"]`)!;

      function handleFormSubmit(event: Event): void {
        event.preventDefault();
        const formData = new FormData(form);
        const values = formData.getAll(inputName);

        if (values.length > 1) {
          resolve(values as string[]);
          return;
        }

        resolve(formData.get(inputName));
        input.removeEventListener("invalid", handleInvalidInput);
      }

      function handleInvalidInput(): void {
        resolve(undefined);
        form.removeEventListener("submit", handleFormSubmit);
      }

      form.addEventListener("submit", handleFormSubmit, { once: true });
      input.addEventListener("invalid", handleInvalidInput, { once: true });

      document.querySelector<HTMLInputElement>("#submitter")!.click();

      return submitPromise;
    }
  }

  async function assertFormSubmitOnEnter(el: FormComponent["el"], options: FormAssociatedOptions): Promise<void> {
    const submitHandler = vi.fn((event: SubmitEvent) => event.preventDefault());
    const form = document.querySelector("form")!;
    form.addEventListener("submit", submitHandler);

    el.value = stringifyTestValue(options.testValue);
    await el.setFocus();
    await userEvent.keyboard("{Enter}");

    expect(submitHandler).toHaveBeenCalledTimes(1);
  }

  async function assertPreventsFormSubmission(
    el: FormComponent["el"],
    submitter: HTMLInputElement,
    message: string,
  ): Promise<void> {
    await userEvent.click(submitter);
    expectValidationProps(el, { message, icon: true, status: "invalid" });
  }

  async function assertClearsValidationOnValueChange(
    el: FormComponent["el"],
    options: FormAssociatedOptions,
    eventSpy: Mock,
  ): Promise<void> {
    if (options?.changeValueKeys) {
      for (const key of options.changeValueKeys) {
        await userEvent.keyboard(key);
      }
    } else {
      await el.setFocus();
      await userEvent.type(el, options?.validUserInputTestValue ?? options.testValue);
      await userEvent.keyboard("{Tab}");
    }

    // components with an Input event will emit multiple times depending on the length of testValue
    if (componentsWithInputEvent.includes(el.tagName.toLowerCase())) {
      expect(eventSpy.mock.calls.length).toBeGreaterThanOrEqual(1);
    } else {
      expect(eventSpy).toHaveBeenCalledTimes(1);
    }

    expectValidationProps(el);
  }

  async function assertUserMessageNotOverridden(el: FormComponent["el"], submitter: HTMLInputElement): Promise<void> {
    const customValidationMessage = "This is a custom message.";
    const customValidationIcon = "banana";

    // don't override custom validation message and icon
    el.validationMessage = customValidationMessage;
    el.validationIcon = customValidationIcon;
    el.value = undefined;

    await userEvent.click(submitter);

    expectValidationProps(el, {
      message: customValidationMessage,
      icon: customValidationIcon,
      status: "invalid",
    });
  }

  function expectValidationProps(element: HTMLElement, validationProps?: ValidationProps): void {
    let testProps = validationProps;

    // radio-button is form-associated, but the validation props are on the parent group
    if (element.nodeName === "CALCITE-RADIO-BUTTON") {
      element.id = "radio-button";
      const groupEl = element.closest("calcite-radio-button-group")!;

      testProps = {
        message: groupEl.validationMessage,
        icon: groupEl.validationIcon,
        status: groupEl.status,
      };
    }

    expect(element).toHaveProperty("status", testProps?.status ?? "idle");
    expect(element).toHaveProperty("validationMessage", testProps?.message ?? "");
    expect(element).toHaveProperty("validationIcon", testProps?.icon ?? false);
  }
}
