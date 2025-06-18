// @ts-strict-ignore
import { KeyInput } from "puppeteer";
import { newE2EPage, E2EPage, E2EElement, EventSpy } from "@arcgis/lumina-compiler/puppeteerTesting";
import { expect, it } from "vitest";
import { html } from "../../../support/formatting";
import {
  getClearValidationEventName,
  hiddenFormInputSlotName,
  componentsWithInputEvent,
  ValidationProps,
  MutableValidityState,
} from "../../utils/form";
import { closestElementCrossShadowBoundary } from "../../utils/dom";
import { GlobalTestProps } from "../utils/puppeteer";
import { isHTML, getTag, getTagOrHTMLWithBeforeContent } from "./utils";
import { TagOrHTMLWithBeforeContent, TagOrHTML } from "./interfaces";

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
   * The value is passed to `page.keyboard.type()`. For example, input-time-picker requires
   * appending AM or PM before the value commits and calciteInputTimePickerChange emits.
   *
   * This option is only relevant when the `validation` option is enabled.
   */
  validUserInputTestValue?: string;

  /*
   * Set this if emitting an input/change event requires key presses. Each array item will be passed
   * to `page.keyboard.press()`. For example, the combobox value can be changed by pressing "Space"
   * to open the component and "Enter" to select a value.
   *
   * This option is only relevant when the `validation` option is enabled.
   */
  changeValueKeys?: KeyInput[];

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
 *
 * @param {string} componentTagOrHtml - the component tag or HTML markup to test against
 * @param {FormAssociatedOptions} options - form associated options
 */
export function formAssociated(
  componentTagOrHtml: TagOrHTML | TagOrHTMLWithBeforeContent,
  options: FormAssociatedOptions,
): void {
  const inputTypeContext = options?.inputType ? ` (input type="${options.inputType}")` : "";

  it(`supports association via ancestry${inputTypeContext}`, () => testAncestorFormAssociated());
  it(`supports association via form ID${inputTypeContext}`, () => testIdFormAssociated());

  if (options?.validation && !["color", "month", "time"].includes(options?.inputType)) {
    it(`supports required property validation${inputTypeContext}`, () => testRequiredPropertyValidation());
  }

  async function testAncestorFormAssociated(): Promise<void> {
    const { beforeContent, tagOrHTML } = getTagOrHTMLWithBeforeContent(componentTagOrHtml);
    const tag = getTag(tagOrHTML);
    const componentHtml = ensureName(isHTML(tagOrHTML) ? tagOrHTML : `<${tag}></${tag}>`, tag);

    const page = await newE2EPage();
    await beforeContent?.(page);

    const content = html` <form>
      ${componentHtml}
      <!--
        keeping things simple by using submit-type input
        this should cover button and calcite-button submit cases
      -->
      <input id="submitter" type="submit" />
    </form>`;
    await page.setContent(content);
    await page.waitForChanges();
    const component = await page.find(tag);

    await assertHiddenFormInputProps(page, component);
    await assertValueSubmissionType(page, component, options);
    await assertValueResetOnFormReset(page, component, options);
    await assertValueSubmittedOnFormSubmit(page, component, options);

    if (options.submitsOnEnter) {
      await assertFormSubmitOnEnter(page, component, options);
    }
  }

  async function testIdFormAssociated(): Promise<void> {
    const { beforeContent, tagOrHTML } = getTagOrHTMLWithBeforeContent(componentTagOrHtml);
    const tag = getTag(tagOrHTML);
    const componentHtml = ensureForm(ensureName(isHTML(tagOrHTML) ? tagOrHTML : `<${tag}></${tag}>`, tag), tag);

    const page = await newE2EPage();
    await beforeContent?.(page);
    await page.setContent(
      html` <form id="test-form"></form>
        ${componentHtml}
        <!--
        keeping things simple by using submit-type input
        this should cover button and calcite-button submit cases
        -->
        <input id="submitter" form="test-form" type="submit" />`,
    );
    await page.waitForChanges();
    const component = await page.find(tag);

    await assertHiddenFormInputProps(page, component);
    await assertValueSubmissionType(page, component, options);
    await assertValueResetOnFormReset(page, component, options);
    await assertValueSubmittedOnFormSubmit(page, component, options);

    if (options.submitsOnEnter) {
      await assertFormSubmitOnEnter(page, component, options);
    }
  }

  async function testRequiredPropertyValidation(): Promise<void> {
    const { beforeContent, tagOrHTML } = getTagOrHTMLWithBeforeContent(componentTagOrHtml);
    const tag = getTag(tagOrHTML);
    const componentHtml = ensureUnchecked(
      ensureRequired(ensureName(isHTML(tagOrHTML) ? tagOrHTML : `<${tag}></${tag}>`, tag), tag),
    );

    const page = await newE2EPage();
    await beforeContent?.(page);

    const content = html`
      <form>
        ${componentHtml}
        <calcite-button id="submitButton" type="submit">Submit</calcite-button>
      </form>
    `;

    await page.setContent(content);
    await page.waitForChanges();
    const component = await page.find(tag);

    const submitButton = await page.find("#submitButton");
    const spyEvent = await page.spyOnEvent(getClearValidationEventName(tag));
    const spyInvalidEvent = await page.spyOnEvent("calciteInvalid");

    const requiredValidationMessage =
      options?.inputType === "radio" ? "Please select one of these options." : "Please fill out this field.";

    await assertPreventsFormSubmission(page, component, submitButton, requiredValidationMessage);
    expect(spyInvalidEvent).toHaveReceivedEventTimes(1);
    expect(await serializeValidityProperty(page, tag)).toHaveProperty("valueMissing", true);

    await assertClearsValidationOnValueChange(page, component, options, spyEvent, tag);
    expect(spyInvalidEvent).toHaveReceivedEventTimes(1);
    expect(await serializeValidityProperty(page, tag)).toHaveProperty("valueMissing", false);

    await assertUserMessageNotOverridden(page, component, submitButton);
    expect(spyInvalidEvent).toHaveReceivedEventTimes(2);
    expect(await serializeValidityProperty(page, tag)).toHaveProperty("valueMissing", true);
  }

  // puppeteer wasn't properly serializing the validity object, so we have to do it manually
  async function serializeValidityProperty(page: E2EPage, tag: string): Promise<MutableValidityState> {
    return await page.$eval(tag, (component: HTMLElement) => {
      const validity = {};

      for (const key in (component as HTMLInputElement).validity) {
        validity[key] = (component as HTMLInputElement).validity[key];
      }

      return validity as MutableValidityState;
    });
  }

  function ensureName(html: string, componentTag: string): string {
    return html.includes("name=") ? html : html.replace(componentTag, `${componentTag} name="testName" `);
  }

  function ensureRequired(html: string, componentTag: string): string {
    return html.includes("required") ? html : html.replace(componentTag, `${componentTag} required `);
  }

  function ensureUnchecked(html: string): string {
    return html.replace(/(checked|selected)/, "");
  }

  function ensureForm(html: string, componentTag: string): string {
    return html.includes("form=") ? html : html.replace(componentTag, `${componentTag} form="test-form" `);
  }

  async function isCheckable(page: E2EPage, component: E2EElement, options: FormAssociatedOptions): Promise<boolean> {
    return (
      typeof options.testValue === "boolean" &&
      (await page.$eval(component.tagName.toLowerCase(), (component) => "checked" in component))
    );
  }

  function stringifyTestValue(value: any): string | string[] {
    return Array.isArray(value) ? value.map((value) => value.toString()) : value.toString();
  }

  async function assertValueSubmissionType(
    page: E2EPage,
    component: E2EElement,
    options: FormAssociatedOptions,
  ): Promise<void> {
    const name = await component.getProperty("name");
    const inputType = options.inputType ?? "text";

    const hiddenFormInputType = await page.evaluate(
      async (inputName: string, hiddenFormInputSlotName: string): Promise<string> => {
        const hiddenFormInput = document.querySelector<HTMLInputElement>(
          `[name="${inputName}"] input[slot=${hiddenFormInputSlotName}]`,
        );

        return hiddenFormInput.type;
      },
      name,
      hiddenFormInputSlotName,
    );

    if (await isCheckable(page, component, options)) {
      expect(hiddenFormInputType).toMatch(/radio|checkbox/);
    } else {
      expect(hiddenFormInputType).toMatch(inputType);
    }
  }

  async function assertHiddenFormInputProps(page: E2EPage, component: E2EElement): Promise<void> {
    const name = await component.getProperty("name");
    const { ariaHidden } = await page.evaluate(
      async (inputName: string, hiddenFormInputSlotName: string): Promise<{ ariaHidden: string }> => {
        const hiddenFormInput = document.querySelector<HTMLInputElement>(
          `[name="${inputName}"] input[slot=${hiddenFormInputSlotName}]`,
        );

        return { ariaHidden: hiddenFormInput.ariaHidden };
      },
      name,
      hiddenFormInputSlotName,
    );

    expect(ariaHidden).toMatch("true");
  }

  async function assertValueResetOnFormReset(
    page: E2EPage,
    component: E2EElement,
    options: FormAssociatedOptions,
  ): Promise<void> {
    const resettablePropName = (await isCheckable(page, component, options)) ? "checked" : "value";
    const initialValue = await component.getProperty(resettablePropName);
    component.setProperty(resettablePropName, options.testValue);
    await page.waitForChanges();

    await page.$eval("form", (form: HTMLFormElement) => form.reset());
    await page.waitForChanges();

    expect(await component.getProperty(resettablePropName)).toBe(initialValue);
  }

  async function assertValueSubmittedOnFormSubmit(
    page: E2EPage,
    component: E2EElement,
    options: FormAssociatedOptions,
  ): Promise<void> {
    const stringifiedTestValue = stringifyTestValue(options.testValue);
    const name = await component.getProperty("name");

    if (await isCheckable(page, component, options)) {
      component.setProperty("checked", true);
      await page.waitForChanges();
      expect(await submitAndGetValue()).toEqual("on");

      component.setProperty("value", options.testValue);
      await page.waitForChanges();
      expect(await submitAndGetValue()).toEqual(stringifiedTestValue);

      component.setProperty("disabled", true);
      await page.waitForChanges();
      expect(await submitAndGetValue()).toBe(null);

      component.setProperty("checked", true);
      component.setProperty("disabled", false);
      await page.waitForChanges();
      expect(await submitAndGetValue()).toEqual(stringifiedTestValue);

      component.setProperty("checked", false);
      await page.waitForChanges();
      expect(await submitAndGetValue()).toBe(null);
    } else {
      if (options.clearable) {
        component.setProperty("required", true);
        component.setProperty("value", null);
        await page.waitForChanges();
        expect(await submitAndGetValue()).toBe(
          options.inputType === "color"
            ? // `input[type="color"]` will set its value to #000000 when set to an invalid value
              // see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#value
              "#000"
            : undefined,
        );

        component.setProperty("required", false);
        component.setProperty("value", options.testValue);
        await page.waitForChanges();
        expect(await submitAndGetValue()).toEqual(options?.expectedSubmitValue || stringifiedTestValue);
      }

      component.setProperty("disabled", true);
      await page.waitForChanges();
      expect(await submitAndGetValue()).toBe(null);

      component.setProperty("disabled", false);
      component.setProperty("value", options.testValue);
      await page.waitForChanges();
      expect(await submitAndGetValue()).toEqual(options?.expectedSubmitValue || stringifiedTestValue);

      component.setProperty("value", options.testValue);
      await page.waitForChanges();
      expect(await submitAndGetValue()).toEqual(options?.expectedSubmitValue || stringifiedTestValue);
    }

    type SubmitValueResult = ReturnType<FormData["get"]> | ReturnType<FormData["getAll"] | undefined>;

    /**
     * This method will submit the form and return the submitted value:
     *
     * For single-value components, it will return a string or null if the value was not submitted
     * For multi-value components, it will return an array of strings
     *
     * If the input cannot be submitted because it is invalid, undefined will be returned
     */
    async function submitAndGetValue(): Promise<SubmitValueResult> {
      return page.$eval(
        "form",
        async (
          form: HTMLFormElement,
          inputName: string,
          hiddenFormInputSlotName: string,
        ): Promise<SubmitValueResult> => {
          const hiddenFormInput = document.querySelector(
            `[name="${inputName}"] input[slot=${hiddenFormInputSlotName}]`,
          );

          let resolve: (value: SubmitValueResult) => void;
          const submitPromise = new Promise<SubmitValueResult>((yes) => (resolve = yes));

          function handleFormSubmit(event: Event): void {
            event.preventDefault();
            const formData = new FormData(form);
            const values = formData.getAll(inputName);

            if (values.length > 1) {
              resolve(values as string[]);
              return;
            }

            resolve(formData.get(inputName));
            hiddenFormInput.removeEventListener("invalid", handleInvalidInput);
          }

          function handleInvalidInput(): void {
            resolve(undefined);
            form.removeEventListener("submit", handleFormSubmit);
          }

          form.addEventListener("submit", handleFormSubmit, { once: true });
          hiddenFormInput.addEventListener("invalid", handleInvalidInput, { once: true });

          document.querySelector<HTMLInputElement>("#submitter").click();

          return submitPromise;
        },
        name,
        hiddenFormInputSlotName,
      );
    }
  }

  async function assertFormSubmitOnEnter(
    page: E2EPage,
    component: E2EElement,
    options: FormAssociatedOptions,
  ): Promise<void> {
    type TestWindow = GlobalTestProps<{
      called: boolean;
    }>;

    await page.$eval("form", (form: HTMLFormElement) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        (window as TestWindow).called = true;
      });
    });

    const stringifiedTestValue = stringifyTestValue(options.testValue);

    component.setProperty("value", stringifiedTestValue);
    await component.callMethod("setFocus");
    await page.keyboard.press("Enter");
    const called = await page.evaluate(() => (window as TestWindow).called);

    expect(called).toBe(true);
  }

  async function assertPreventsFormSubmission(
    page: E2EPage,
    component: E2EElement,
    submitButton: E2EElement,
    message: string,
  ) {
    await submitButton.click();
    await page.waitForChanges();

    await expectValidationProps(page, component, { message, icon: true, status: "invalid" });
  }

  async function assertClearsValidationOnValueChange(
    page: E2EPage,
    component: E2EElement,
    options: FormAssociatedOptions,
    event: EventSpy,
    tag: string,
  ) {
    if (options?.changeValueKeys) {
      for (const key of options.changeValueKeys) {
        await page.keyboard.press(key);
      }
    } else {
      await page.keyboard.type(options?.validUserInputTestValue ?? options.testValue);
      await page.keyboard.press("Tab");
    }

    await page.waitForChanges();

    // components with an Input event will emit multiple times depending on the length of testValue
    if (componentsWithInputEvent.includes(tag)) {
      expect(event.length).toBeGreaterThanOrEqual(1);
    } else {
      expect(event).toHaveReceivedEventTimes(1);
    }

    await expectValidationProps(page, component);
  }

  async function assertUserMessageNotOverridden(page: E2EPage, component: E2EElement, submitButton: E2EElement) {
    const customValidationMessage = "This is a custom message.";
    const customValidationIcon = "banana";

    // don't override custom validation message and icon
    component.setProperty("validationMessage", customValidationMessage);
    component.setProperty("validationIcon", customValidationIcon);
    component.setProperty("value", undefined);
    await page.waitForChanges();

    await submitButton.click();
    await page.waitForChanges();

    await expectValidationProps(page, component, {
      message: customValidationMessage,
      icon: customValidationIcon,
      status: "invalid",
    });
  }

  async function expectValidationProps(page: E2EPage, element: E2EElement, validationProps?: ValidationProps) {
    let testProps = validationProps;

    // radio-button is formAssociated, but the validation props are on the parent group
    if (element.nodeName === "CALCITE-RADIO-BUTTON") {
      element.setProperty("id", "radio-button");
      await page.waitForChanges();
      testProps = await page.evaluate(() => {
        const groupEl = closestElementCrossShadowBoundary(
          document.querySelector("#radio-button"),
          "calcite-radio-button-group",
        );

        return {
          message: groupEl.validationMessage,
          icon: groupEl.validationIcon,
          status: groupEl.status,
        };
      });
    }

    expect(await element.getProperty("status")).toBe(testProps?.status ?? "idle");
    expect(await element.getProperty("validationMessage")).toBe(testProps?.message ?? "");
    expect(await element.getProperty("validationIcon")).toBe(testProps?.icon ?? false);
  }
}
