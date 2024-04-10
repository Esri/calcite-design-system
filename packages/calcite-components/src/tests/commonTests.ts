/* eslint-disable jest/no-conditional-expect -- Using conditional logic in a confined test helper to handle specific scenarios, reducing duplication, balancing test readability and maintainability. **/
/* eslint-disable jest/no-export -- Util functions are now imported to be used as `it` blocks within `describe` instead of assertions within `it` blocks. */
import { E2EElement, E2EPage, EventSpy, newE2EPage } from "@stencil/core/testing";
import { toHaveNoViolations } from "jest-axe";
import { KeyInput } from "puppeteer";
import { html } from "../../support/formatting";
import type { JSX } from "../components";
import { getClearValidationEventName, hiddenFormInputSlotName, componentsWithInputEvent } from "../utils/form";
import { MessageBundle } from "../utils/t9n";
import { GlobalTestProps, IntrinsicElementsWithProp, newProgrammaticE2EPage, skipAnimations } from "./utils";
import {
  TagOrHTMLWithBeforeContent,
  isHTML,
  getTag,
  simplePageSetup,
  getTagAndPage,
  ComponentTestSetup,
  getTagOrHTMLWithBeforeContent,
} from "./commonTestUtils/setupForTests";

expect.extend(toHaveNoViolations);

type ComponentTag = keyof JSX.IntrinsicElements;
type ComponentHTML = string;
type TagOrHTML = ComponentTag | ComponentHTML;

interface FormAssociatedOptions {
  /**
   * This value will be set on the component and submitted by the form.
   */
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

  /**
   * Specifies the input type that will be used to capture the value.
   */
  inputType?: HTMLInputElement["type"];

  /**
   * Specifies if the component supports submitting the form on Enter key press.
   */
  submitsOnEnter?: boolean;

  /**
   * Specifies if the component supports clearing its value (i.e., setting to null).
   */
  clearable?: boolean;

  /**
   * Specifies if the component supports preventing submission and displaying validation messages.
   */
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

    await assertValueSubmissionType(page, component, options);
    await assertValueResetOnFormReset(page, component, options);
    await assertValueSubmittedOnFormSubmit(page, component, options);

    if (options.submitsOnEnter) {
      await assertFormSubmitOnEnter(page, component, options);
    }
  }

  async function testRequiredPropertyValidation(): Promise<void> {
    const requiredValidationMessage = "Please fill out this field.";
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

    await assertPreventsFormSubmission(page, component, submitButton, requiredValidationMessage);
    await assertClearsValidationOnValueChange(page, component, options, spyEvent, tag);
    await assertUserMessageNotOverridden(page, component, submitButton);
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

    await expectValidationInvalid(component, message);
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

    await expectValidationIdle(component);
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

    await expectValidationInvalid(component, customValidationMessage, customValidationIcon);
  }

  async function expectValidationIdle(element: E2EElement) {
    expect(await element.getProperty("status")).toBe("idle");
    expect(await element.getProperty("validationMessage")).toBe("");
    expect(await element.getProperty("validationIcon")).toBe(false);
  }

  async function expectValidationInvalid(element: E2EElement, message: string, icon: string = "") {
    expect(await element.getProperty("status")).toBe("invalid");
    expect(await element.getProperty("validationMessage")).toBe(message);
    expect(element.getAttribute("validation-icon")).toBe(icon);
  }
}

interface TabAndClickTargets {
  tab: string;
  click: string;
}

type FocusTarget = "host" | "child" | "none";

interface DisabledOptions {
  /**
   *  Use this to specify whether the test should cover focusing.
   */
  focusTarget?: FocusTarget | TabAndClickTargets;

  /**
   *  Use this to specify the main wrapped component in shadow DOM that handles disabling interaction.
   *
   *  Note: this should only be used for components that wrap a single component that implements disabled behavior.
   */
  shadowAriaAttributeTargetSelector?: string;
}

/**
 * Helper to test the disabled prop disabling user interaction.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("disabled", () => {
 *    disabled("calcite-input")
 * });
 *
 * @param {ComponentTestSetup} componentTestSetup - A component tag, html, or the tag and e2e page for setting up a test.
 * @param {DisabledOptions} [options] - Disabled options.
 */
export function disabled(componentTestSetup: ComponentTestSetup, options?: DisabledOptions): void {
  options = { focusTarget: "host", ...options };

  const addRedirectPrevention = async (page: E2EPage, tag: string): Promise<void> => {
    await page.$eval(tag, (el) => {
      el.addEventListener(
        "click",
        (event) => {
          const path = event.composedPath() as HTMLElement[];
          const anchor = path.find((el) => el?.tagName === "A");

          if (anchor) {
            // we prevent the default behavior to avoid a page redirect
            anchor.addEventListener("click", (event) => event.preventDefault(), { once: true });
          }
        },
        true,
      );
    });
  };

  async function expectToBeFocused(page: E2EPage, tag: string): Promise<void> {
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(focusedTag).toBe(tag);
  }

  function assertOnMouseAndPointerEvents(spies: EventSpy[], expectCallback: (spy: EventSpy) => void): void {
    for (const spy of spies) {
      expectCallback(spy);
    }
  }

  // only testing events from https://github.com/web-platform-tests/wpt/blob/master/html/semantics/disabled-elements/event-propagate-disabled.tentative.html#L66
  const eventsExpectedToBubble = ["mousemove", "pointermove", "pointerdown", "pointerup"];
  const eventsExpectedToNotBubble = ["mousedown", "mouseup", "click"];
  const allExpectedEvents = [...eventsExpectedToBubble, ...eventsExpectedToNotBubble];

  const createEventSpiesForExpectedEvents = async (component: E2EElement): Promise<EventSpy[]> => {
    const eventSpies: EventSpy[] = [];

    for (const event of allExpectedEvents) {
      eventSpies.push(await component.spyOnEvent(event));
    }

    return eventSpies;
  };

  async function getFocusTarget(page: E2EPage, tag: string, focusTarget: FocusTarget): Promise<string> {
    return focusTarget === "host" ? tag : await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
  }

  const getTabAndClickFocusTarget = async (
    page: E2EPage,
    tag: string,
    focusTarget: DisabledOptions["focusTarget"],
  ): Promise<string[]> => {
    if (typeof focusTarget === "object") {
      return [focusTarget.tab, focusTarget.click];
    }

    const sameClickAndTabFocusTarget = await getFocusTarget(page, tag, focusTarget);

    return [sameClickAndTabFocusTarget, sameClickAndTabFocusTarget];
  };

  const getShadowFocusableCenterCoordinates = async (page: E2EPage, tabFocusTarget: string): Promise<number[]> => {
    return await page.$eval(tabFocusTarget, (element: HTMLElement) => {
      const focusTarget = element.shadowRoot.activeElement || element;
      const rect = focusTarget.getBoundingClientRect();

      return [rect.x + rect.width / 2, rect.y + rect.height / 2];
    });
  };

  it("prevents focusing via keyboard and mouse", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);

    const component = await page.find(tag);
    const ariaAttributeTargetElement = options.shadowAriaAttributeTargetSelector
      ? await page.find(`${tag} >>> ${options.shadowAriaAttributeTargetSelector}`)
      : component;
    await skipAnimations(page);
    await addRedirectPrevention(page, tag);

    const eventSpies = await createEventSpiesForExpectedEvents(component);

    expect(ariaAttributeTargetElement.getAttribute("aria-disabled")).toBeNull();

    if (options.focusTarget === "none") {
      await page.click(tag);
      await page.waitForChanges();
      await expectToBeFocused(page, "body");

      assertOnMouseAndPointerEvents(eventSpies, (spy) => expect(spy).toHaveReceivedEventTimes(1));

      component.setProperty("disabled", true);
      await page.waitForChanges();

      expect(ariaAttributeTargetElement.getAttribute("aria-disabled")).toBe("true");

      await page.click(tag);
      await page.waitForChanges();
      await expectToBeFocused(page, "body");

      await component.callMethod("click");
      await page.waitForChanges();
      await expectToBeFocused(page, "body");

      assertOnMouseAndPointerEvents(eventSpies, (spy) => {
        expect(spy).toHaveReceivedEventTimes(eventsExpectedToBubble.includes(spy.eventName) ? 2 : 1);
      });

      return;
    }

    await page.keyboard.press("Tab");

    const [tabFocusTarget, clickFocusTarget] = await getTabAndClickFocusTarget(page, tag, options.focusTarget);

    expect(tabFocusTarget).not.toBe("body");
    await expectToBeFocused(page, tabFocusTarget);

    const [shadowFocusableCenterX, shadowFocusableCenterY] = await getShadowFocusableCenterCoordinates(
      page,
      tabFocusTarget,
    );

    async function resetFocusOrder(): Promise<void> {
      // test page has default margin, so clicking on 0,0 will not hit the test element
      await page.mouse.click(0, 0);
    }

    await resetFocusOrder();
    await expectToBeFocused(page, "body");

    await page.mouse.click(shadowFocusableCenterX, shadowFocusableCenterY);
    await page.waitForChanges();
    await expectToBeFocused(page, clickFocusTarget);

    await component.callMethod("click");
    await page.waitForChanges();
    await expectToBeFocused(page, clickFocusTarget);

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      if (spy.eventName === "click") {
        // some components emit more than one click event (e.g., from calling `click()`),
        // so we check if at least one event is received
        expect(spy.length).toBeGreaterThanOrEqual(2);
      } else {
        expect(spy).toHaveReceivedEventTimes(1);
      }
    });

    component.setProperty("disabled", true);
    await page.waitForChanges();

    expect(ariaAttributeTargetElement.getAttribute("aria-disabled")).toBe("true");

    await resetFocusOrder();
    await page.keyboard.press("Tab");
    await expectToBeFocused(page, "body");

    await page.mouse.click(shadowFocusableCenterX, shadowFocusableCenterY);
    await expectToBeFocused(page, "body");

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      if (spy.eventName === "click") {
        // some components emit more than one click event (e.g., from calling `click()`),
        // so we check if at least one event is received
        expect(spy.length).toBeGreaterThanOrEqual(2);
      } else {
        expect(spy).toHaveReceivedEventTimes(eventsExpectedToBubble.includes(spy.eventName) ? 2 : 1);
      }
    });
  });

  it("events are no longer blocked right after enabling", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);

    const component = await page.find(tag);
    const ariaAttributeTargetElement = options.shadowAriaAttributeTargetSelector
      ? await page.find(`${tag} >>> ${options.shadowAriaAttributeTargetSelector}`)
      : component;

    await skipAnimations(page);
    await addRedirectPrevention(page, tag);

    const eventSpies = await createEventSpiesForExpectedEvents(component);

    component.setProperty("disabled", true);
    await page.waitForChanges();

    expect(ariaAttributeTargetElement.getAttribute("aria-disabled")).toBe("true");

    await page.click(tag);
    await page.waitForChanges();

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      expect(spy).toHaveReceivedEventTimes(eventsExpectedToBubble.includes(spy.eventName) ? 1 : 0);
    });

    type InteractiveCalciteComponents = IntrinsicElementsWithProp<"disabled"> & HTMLElement;

    // this needs to run in the browser context to ensure disabling and events fire immediately after being set
    await page.$eval(
      tag,
      (component: InteractiveCalciteComponents, allExpectedEvents: string[]) => {
        component.disabled = false;
        allExpectedEvents.forEach((event) => component.dispatchEvent(new MouseEvent(event)));

        component.disabled = true;
        allExpectedEvents.forEach((event) => component.dispatchEvent(new MouseEvent(event)));
      },
      allExpectedEvents,
    );

    assertOnMouseAndPointerEvents(eventSpies, (spy) => {
      if (spy.eventName === "click") {
        // some components emit more than one click event (e.g., from calling `click()`),
        // so we check if at least one event is received
        expect(spy.length).toBeGreaterThanOrEqual(1);
      } else {
        expect(spy).toHaveReceivedEventTimes(eventsExpectedToBubble.includes(spy.eventName) ? 3 : 1);
      }
    });
  });
}

/**
 * This helper will test if a floating-ui-owning component has configured the floating-ui correctly.
 * At the moment, this only tests if the scroll event listeners are only active when the floating-ui is displayed.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("owns a floating-ui", () => {
 *  floatingUIOwner(
 *    `<calcite-input-date-picker></calcite-input-date-picker>`,
 *      "open",
 *      { shadowSelector: ".menu-container" }
 *  )
 * });
 *
 * @param {TagOrHTML} componentTagOrHTML - The component tag or HTML markup to test against.
 * @param {string} togglePropName - The component property that toggles the floating-ui.
 * @param [options] - additional options for asserting focus
 * @param {string} [options.shadowSelector] - The selector in the shadow DOM for the floating-ui element.
 */
export function floatingUIOwner(
  componentTagOrHTML: TagOrHTML,
  togglePropName: string,
  options?: {
    /**
     * Use this to specify the selector in the shadow DOM for the floating-ui element.
     */
    shadowSelector?: string;
  },
): void {
  it("owns a floating-ui", async () => {
    const page = await simplePageSetup(componentTagOrHTML);

    const scrollablePageSizeInPx = 2400;
    await page.addStyleTag({
      content: `body {
      height: ${scrollablePageSizeInPx}px;
      width: ${scrollablePageSizeInPx}px;
    }`,
    });
    await page.waitForChanges();

    const tag = getTag(componentTagOrHTML);
    const component = await page.find(tag);

    async function getTransform(): Promise<string> {
      // need to get the style attribute from the browser context since the E2E element returns null
      return page.$eval(
        tag,
        (component: HTMLElement, shadowSelector: string): string => {
          const floatingUIEl = shadowSelector
            ? component.shadowRoot.querySelector<HTMLElement>(shadowSelector)
            : component;

          return floatingUIEl.getAttribute("style");
        },
        options?.shadowSelector,
      );
    }

    async function scrollTo(x: number, y: number): Promise<void> {
      await page.evaluate((x: number, y: number) => document.firstElementChild.scrollTo(x, y), x, y);
    }

    component.setProperty(togglePropName, false);
    await page.waitForChanges();

    const initialClosedTransform = await getTransform();

    await scrollTo(scrollablePageSizeInPx, scrollablePageSizeInPx);
    await page.waitForChanges();

    expect(await getTransform()).toBe(initialClosedTransform);

    await scrollTo(0, 0);
    await page.waitForChanges();

    expect(await getTransform()).toBe(initialClosedTransform);

    component.setProperty(togglePropName, true);
    await page.waitForChanges();

    const initialOpenTransform = await getTransform();

    await scrollTo(scrollablePageSizeInPx, scrollablePageSizeInPx);
    await page.waitForChanges();

    expect(await getTransform()).not.toBe(initialOpenTransform);

    await scrollTo(0, 0);
    await page.waitForChanges();

    expect(await getTransform()).toBe(initialOpenTransform);
  });
}

/**
 * Helper to test if a component has a floating-UI-owning component wired up.
 *
 * Note: this performs a shallow test and assumes the underlying component has floating-ui properly configured.
 *
 * @example
 * describe("delegates to floating-ui-owner component", () => {
 *   delegatesToFloatingUiOwningComponent("calcite-pad", "calcite-action-group");
 * });
 *
 * @param componentTagOrHTML
 * @param floatingUiOwnerComponentTag
 */
export async function delegatesToFloatingUiOwningComponent(
  componentTagOrHTML: TagOrHTML,
  floatingUiOwnerComponentTag: ComponentTag,
): Promise<void> {
  it("delegates to floating-ui owning component", async () => {
    const page = await simplePageSetup(componentTagOrHTML);
    const tag = getTag(componentTagOrHTML);

    // we assume if `overlay-positioning` is used by an internal component that it is a floating-ui component

    const floatingUiOwningComponent = await page.find(`${tag} >>> ${floatingUiOwnerComponentTag}`);
    expect(await floatingUiOwningComponent.getProperty("overlayPositioning")).toBe("absolute");

    const component = await page.find(tag);
    await component.setProperty("overlayPositioning", "fixed");
    await page.waitForChanges();

    expect(await floatingUiOwningComponent.getProperty("overlayPositioning")).toBe("fixed");
  });
}

/**
 * Helper to test t9n component setup.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("translation support", () => {
 *   t9n("calcite-action");
 * });
 *
 * @param {ComponentTestSetup} componentTestSetup - A component tag, html, or the tag and e2e page for setting up a test.
 */

export async function t9n(componentTestSetup: ComponentTestSetup): Promise<void> {
  let component: E2EElement;
  let page: E2EPage;
  let getCurrentMessages: () => Promise<MessageBundle>;

  beforeEach(async () => {
    const { page: e2ePage, tag } = await getTagAndPage(componentTestSetup);
    page = e2ePage;

    type CalciteComponentsWithMessages = IntrinsicElementsWithProp<"messages"> & HTMLElement;

    component = await page.find(tag);
    getCurrentMessages = async (): Promise<MessageBundle> => {
      return page.$eval(tag, (component: CalciteComponentsWithMessages) => component.messages);
    };
  });

  it("has defined default messages", async () => await assertDefaultMessages());
  it("overrides messages", async () => await assertOverrides());
  it("switches messages", async () => await assertLangSwitch());

  async function assertDefaultMessages(): Promise<void> {
    expect(await getCurrentMessages()).toBeDefined();
  }

  async function assertOverrides(): Promise<void> {
    const messages = await getCurrentMessages();
    const firstMessageProp = Object.keys(messages)[0];
    const messageOverride = { [firstMessageProp]: "override test" };

    component.setProperty("messageOverrides", messageOverride);
    await page.waitForChanges();

    expect(await getCurrentMessages()).toEqual({
      ...messages,
      ...messageOverride,
    });

    // reset test changes
    component.setProperty("messageOverrides", undefined);
    await page.waitForChanges();
  }

  async function assertLangSwitch(): Promise<void> {
    const enMessages = await getCurrentMessages();
    const fakeBundleIdentifier = "__fake__";
    await page.evaluate(
      (enMessages, fakeBundleIdentifier) => {
        const orig = window.fetch;
        window.fetch = async function (input, init) {
          if (typeof input === "string" && input.endsWith("messages_es.json")) {
            const fakeEsMessages = {
              ...enMessages, // reuse real message bundle in case component rendering depends on strings

              [fakeBundleIdentifier]: true, // we inject a fake identifier for assertion-purposes
            };
            window.fetch = orig;
            return new Response(new Blob([JSON.stringify(fakeEsMessages, null, 2)], { type: "application/json" }));
          }

          return orig.call(input, init);
        };
      },
      enMessages,
      fakeBundleIdentifier,
    );

    component.setAttribute("lang", "es");
    await page.waitForChanges();
    await page.waitForTimeout(3000);
    const esMessages = await getCurrentMessages();

    expect(esMessages).toHaveProperty(fakeBundleIdentifier);

    // reset test changes
    component.removeAttribute("lang");
    await page.waitForChanges();
  }
}

interface BeforeToggle {
  /**
   * Function argument to simulate user input (mouse or keyboard), to open the component.
   */
  open: (page: E2EPage) => Promise<void>;

  /**
   * Function argument to simulate user input (mouse or keyboard), to close the component.
   */
  close: (page: E2EPage) => Promise<void>;
}

interface OpenCloseOptions {
  /**
   * Toggle property to test. Currently, either "open" or "expanded".
   */
  openPropName?: string;

  /**
   * Indicates the initial value of the toggle property.
   */
  initialToggleValue?: boolean;

  /**
   * Optional argument with functions to simulate user input (mouse or keyboard), to open or close the component.
   */
  beforeToggle?: BeforeToggle;
}

/**
 * Helper to test openClose component setup.
 *
 * Note that this helper should be used within a `describe` block.
 *
 * @example
 *
 * describe("openClose", () => {
 *   openClose("calcite-combobox opened with a tab", {
 *     beforeToggle: {
 *        open: async (page) => {
 *            await page.keyboard.press("Tab");
 *            await page.waitForChanges();
 *        },
 *        close: async (page) => {
 *            await page.keyboard.press("Tab");
 *            await page.waitForChanges();
 *        },
 *      }
 *   });
 *
 *  openClose("open calcite-combobox closed with a tab", {
 *        initialToggleValue: true,
 *        beforeToggle: {
 *          close: async (page) => {
 *            await page.keyboard.press("Tab");
 *            await page.waitForChanges();
 *        },
 *      }
 *    }
 * })
 *
 * @param componentTagOrHTML - The component tag or HTML markup to test against.
 * @param {object} [options] - Additional options to assert.
 */

export function openClose(componentTagOrHTML: TagOrHTML, options?: OpenCloseOptions): void {
  const defaultOptions: OpenCloseOptions = {
    initialToggleValue: false,
    openPropName: "open",
  };
  const customizedOptions = { ...defaultOptions, ...options };

  type EventOrderWindow = GlobalTestProps<{ events: string[] }>;
  const eventSequence = setUpEventSequence(componentTagOrHTML);

  function setUpEventSequence(componentTagOrHTML: TagOrHTML): string[] {
    const tag = getTag(componentTagOrHTML);

    const camelCaseTag = tag.replace(/-([a-z])/g, (lettersAfterHyphen) => lettersAfterHyphen[1].toUpperCase());
    const eventSuffixes = [`BeforeOpen`, `Open`, `BeforeClose`, `Close`];

    return eventSuffixes.map((suffix) => `${camelCaseTag}${suffix}`);
  }

  async function setUpPage(componentTagOrHTML: TagOrHTML, page: E2EPage): Promise<void> {
    await page.evaluate(
      (eventSequence: string[], initialToggleValue: boolean, openPropName: string, componentTagOrHTML: string) => {
        const receivedEvents: string[] = [];

        (window as EventOrderWindow).events = receivedEvents;

        eventSequence.forEach((eventType) => {
          document.addEventListener(eventType, (event) => receivedEvents.push(event.type));
        });

        if (!initialToggleValue) {
          return;
        }

        const component = document.createElement(componentTagOrHTML);
        component[openPropName] = true;

        document.body.append(component);
      },
      eventSequence,
      customizedOptions.initialToggleValue,
      customizedOptions.openPropName,
      componentTagOrHTML,
    );
  }

  async function testOpenCloseEvents(componentTagOrHTML: TagOrHTML, page: E2EPage): Promise<void> {
    const tag = getTag(componentTagOrHTML);
    const element = await page.find(tag);

    const [beforeOpenEvent, openEvent, beforeCloseEvent, closeEvent] = eventSequence.map((event) =>
      page.waitForEvent(event),
    );

    const [beforeOpenSpy, openSpy, beforeCloseSpy, closeSpy] = await Promise.all(
      eventSequence.map(async (event) => await element.spyOnEvent(event)),
    );

    await page.waitForChanges();

    if (customizedOptions.beforeToggle) {
      await customizedOptions.beforeToggle.open(page);
    } else {
      element.setProperty(customizedOptions.openPropName, true);
    }

    await page.waitForChanges();

    await beforeOpenEvent;
    await openEvent;

    expect(beforeOpenSpy).toHaveReceivedEventTimes(1);
    expect(openSpy).toHaveReceivedEventTimes(1);
    expect(beforeCloseSpy).toHaveReceivedEventTimes(0);
    expect(closeSpy).toHaveReceivedEventTimes(0);

    if (customizedOptions.beforeToggle) {
      await customizedOptions.beforeToggle.close(page);
    } else {
      element.setProperty(customizedOptions.openPropName, false);
    }

    await page.waitForChanges();

    await beforeCloseEvent;
    await closeEvent;

    expect(beforeCloseSpy).toHaveReceivedEventTimes(1);
    expect(closeSpy).toHaveReceivedEventTimes(1);
    expect(beforeOpenSpy).toHaveReceivedEventTimes(1);
    expect(openSpy).toHaveReceivedEventTimes(1);

    expect(await page.evaluate(() => (window as EventOrderWindow).events)).toEqual(eventSequence);
  }

  /**
   * `skipAnimations` utility sets the animation duration to 0.01. This is a workaround for an issue with the animation utility.
   * Because this still leaves a very small duration, we can still test the animation events, but faster.
   */

  if (customizedOptions.initialToggleValue === true) {
    it("emits on initialization with animations enabled", async () => {
      const page = await newProgrammaticE2EPage();
      await skipAnimations(page);
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page);
    });

    it("emits on initialization with animations disabled", async () => {
      const page = await newProgrammaticE2EPage();
      await page.addStyleTag({
        content: `:root { --calcite-duration-factor: 0; }`,
      });
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page);
    });
  } else {
    it(`emits with animations enabled`, async () => {
      const page = await simplePageSetup(componentTagOrHTML);
      await skipAnimations(page);
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page);
    });

    it(`emits with animations disabled`, async () => {
      const page = await simplePageSetup(componentTagOrHTML);
      await page.addStyleTag({
        content: `:root { --calcite-duration-factor: 0; }`,
      });
      await setUpPage(componentTagOrHTML, page);
      await testOpenCloseEvents(componentTagOrHTML, page);
    });
  }
}
