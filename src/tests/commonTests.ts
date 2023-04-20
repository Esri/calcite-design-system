import { E2EElement, E2EPage, EventSpy, newE2EPage } from "@stencil/core/testing";
import axe from "axe-core";
import { toHaveNoViolations } from "jest-axe";
import { config } from "../../stencil.config";
import { html } from "../../support/formatting";
import { JSX } from "../components";
import { hiddenFormInputSlotName } from "../utils/form";
import { MessageBundle } from "../utils/t9n";
import { GlobalTestProps, skipAnimations } from "./utils";

expect.extend(toHaveNoViolations);

type ComponentTag = keyof JSX.IntrinsicElements;
type AxeOwningWindow = GlobalTestProps<{ axe: typeof axe }>;
type ComponentHTML = string;
type TagOrHTML = ComponentTag | ComponentHTML;
type TagAndPage = {
  tag: ComponentTag;
  page: E2EPage;
};

export const HYDRATED_ATTR = config.hydratedFlag.name;

function isHTML(tagOrHTML: string): boolean {
  return tagOrHTML.trim().startsWith("<");
}

function getTag(tagOrHTML: string): ComponentTag {
  if (isHTML(tagOrHTML)) {
    const regex = /[>\s]/;
    const trimmedTag = tagOrHTML.trim();
    return trimmedTag.substring(1, trimmedTag.search(regex)) as ComponentTag;
  }

  return tagOrHTML as ComponentTag;
}

async function simplePageSetup(componentTagOrHTML: TagOrHTML): Promise<E2EPage> {
  const componentTag = getTag(componentTagOrHTML);
  const page = await newE2EPage({
    html: isHTML(componentTagOrHTML) ? componentTagOrHTML : `<${componentTag}></${componentTag}>`,
    failOnConsoleError: true
  });
  await page.waitForChanges();

  return page;
}

/**
 * Helper for asserting that a component is accessible.
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 * @param {E2EPage} [page] - an e2e page
 */
export async function accessible(componentTagOrHTML: TagOrHTML, page?: E2EPage): Promise<void> {
  if (!page) {
    page = await simplePageSetup(componentTagOrHTML);
  }

  await page.addScriptTag({ path: require.resolve("axe-core") });
  await page.waitForFunction(() => (window as AxeOwningWindow).axe);

  expect(
    await page.evaluate(
      async (componentTag: ComponentTag) => (window as AxeOwningWindow).axe.run(componentTag),
      getTag(componentTagOrHTML)
    )
  ).toHaveNoViolations();
}

/**
 * Helper for asserting that a component renders and is hydrated
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 * @param {object} options - additional options to assert
 * @param {string} employee.visible - is the component visible
 * @param {string} employee.display - is the component's display "inline"
 * @param options.visible
 * @param options.display
 */
export async function renders(
  componentTagOrHTML: TagOrHTML,
  options?: {
    visible?: boolean;
    display: string;
  }
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const element = await page.find(getTag(componentTagOrHTML));

  expect(element).toHaveAttribute(HYDRATED_ATTR);
  expect(await element.isVisible()).toBe(options?.visible ?? true);
  expect((await element.getComputedStyle()).display).toBe(options?.display ?? "inline");
}

/**
 * Helper for asserting that a component reflects
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 * @param {object[]} propsToTest - the properties to test
 * @param {string} propsToTest.propertyName - the property name
 * @param {any} propsToTest.value - the property value
 */
export async function reflects(
  componentTagOrHTML: TagOrHTML,
  propsToTest: {
    propertyName: string;
    value: any;
  }[]
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const componentTag = getTag(componentTagOrHTML);
  const element = await page.find(componentTag);

  for (const propAndValue of propsToTest) {
    const { propertyName, value } = propAndValue;
    const attrName = propToAttr(propertyName);
    const componentAttributeSelector = `${componentTag}[${attrName}]`;

    element.setProperty(propertyName, value);
    await page.waitForChanges();

    expect(await page.find(componentAttributeSelector)).toBeTruthy();

    if (typeof value === "boolean") {
      const getExpectedValue = (propValue: boolean): string | null => (propValue ? "" : null);
      const negated = !value;

      element.setProperty(propertyName, negated);
      await page.waitForChanges();

      expect(element.getAttribute(attrName)).toBe(getExpectedValue(negated));

      element.setProperty(propertyName, value);
      await page.waitForChanges();

      expect(element.getAttribute(attrName)).toBe(getExpectedValue(value));
    }
  }
}

function propToAttr(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Helper for asserting that a property's value is its default
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 * @param {object[]} propsToTest - the properties to test
 * @param {string} propsToTest.propertyName - the property name
 * @param {any} propsToTest.value - the property value
 */
export async function defaults(
  componentTagOrHTML: TagOrHTML,
  propsToTest: {
    propertyName: string;
    defaultValue: any;
  }[]
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const element = await page.find(getTag(componentTagOrHTML));

  for (const propAndValue of propsToTest) {
    const { propertyName, defaultValue } = propAndValue;
    const prop = await element.getProperty(propertyName);
    expect(prop).toEqual(defaultValue);
  }
}

/**
 * Helper for asserting that a component is not visible when hidden
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 */
export async function hidden(componentTagOrHTML: TagOrHTML): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const element = await page.find(getTag(componentTagOrHTML));

  element.setAttribute("hidden", "");
  await page.waitForChanges();

  expect(await element.isVisible()).toBe(false);
}

interface FocusableOptions {
  /**
   * use this to pass an ID to setFocus()
   *
   * @deprecated components should no longer use a focusId parameter for setFocus()
   */
  focusId?: string;

  /**
   * selector used to assert the focused DOM element
   */
  focusTargetSelector?: string;

  /**
   * selector used to assert the focused shadow DOM element
   */
  shadowFocusTargetSelector?: string;
}

/**
 * Helper for asserting that a component is focusable
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 * @param {FocusableOptions} [options] - additional options for asserting focus
 */
export async function focusable(componentTagOrHTML: TagOrHTML, options?: FocusableOptions): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const tag = getTag(componentTagOrHTML);
  const element = await page.find(tag);
  const focusTargetSelector = options?.focusTargetSelector || tag;
  await element.callMethod("setFocus", options?.focusId); // assumes element is FocusableElement

  if (options?.shadowFocusTargetSelector) {
    expect(
      await page.$eval(
        tag,
        (element: HTMLElement, selector: string) => element.shadowRoot.activeElement?.matches(selector),
        options?.shadowFocusTargetSelector
      )
    ).toBe(true);
  }

  // wait for next frame before checking focus
  await page.waitForTimeout(0);

  expect(await page.evaluate((selector) => document.activeElement?.matches(selector), focusTargetSelector)).toBe(true);
}

/**
 * Helper for asserting slots.
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 * @param slots - a component's SLOTS resource object or an array of slot names
 * @param includeDefaultSlot - when true, it will run assertions on the default slot
 */
export async function slots(
  componentTagOrHTML: TagOrHTML,
  slots: Record<string, string> | string[],
  includeDefaultSlot = false
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const tag = getTag(componentTagOrHTML);
  const slotNames = Array.isArray(slots) ? slots : Object.values(slots);

  await page.$eval(
    tag,
    async (component, slotNames: string[], includeDefaultSlot?: boolean) => {
      async function slotTestElement(testClass: string, slotName?: string): Promise<void> {
        const el = document.createElement("div"); // slotting a <div> will suffice for our purposes
        el.classList.add(testClass);

        if (slotName) {
          el.slot = slotName;
        }

        component.append(el);
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
      }

      for (let i = 0; i < slotNames.length; i++) {
        await slotTestElement("slotted-into-named-slot", slotNames[i]);
      }

      if (includeDefaultSlot) {
        await slotTestElement("slotted-into-default-slot");
      }
    },
    slotNames,
    includeDefaultSlot
  );

  await page.waitForChanges();

  const slotted = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".slotted-into-named-slot"))
      .filter((slotted) => slotted.assignedSlot)
      .map((slotted) => slotted.slot)
  );

  expect(slotNames).toEqual(slotted);

  if (includeDefaultSlot) {
    const hasDefaultSlotted = await page.evaluate(() => {
      const defaultSlotted = document.querySelector(".slotted-into-default-slot");
      return defaultSlotted.assignedSlot?.name === "" && defaultSlotted.slot === "";
    });

    expect(hasDefaultSlotted).toBe(true);
  }
}

async function assertLabelable({
  page,
  componentTag,
  propertyToToggle,
  focusTargetSelector = componentTag,
  shadowFocusTargetSelector
}: {
  page: E2EPage;
  componentTag: string;
  propertyToToggle?: string;
  focusTargetSelector?: string;
  shadowFocusTargetSelector?: string;
}): Promise<void> {
  let component: E2EElement;
  let initialPropertyValue: boolean;
  if (propertyToToggle) {
    component = await page.find(componentTag);
    initialPropertyValue = await component.getProperty(propertyToToggle);
  }

  const label = await page.find("calcite-label");
  await label.callMethod("click"); // we call the method to avoid clicking the child element
  await page.waitForChanges();

  expect(
    await page.evaluate(
      (focusTargetSelector: string): boolean => !!document.activeElement?.closest(focusTargetSelector),
      focusTargetSelector
    )
  ).toBe(true);

  if (shadowFocusTargetSelector) {
    expect(
      await page.$eval(
        componentTag,
        (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
        shadowFocusTargetSelector
      )
    ).toBe(true);
  }

  if (propertyToToggle) {
    const toggledPropertyValue = !initialPropertyValue;
    expect(await component.getProperty(propertyToToggle)).toBe(toggledPropertyValue);

    // assert that direct clicks on component toggle property correctly
    await component.setProperty(propertyToToggle, initialPropertyValue); // we reset as not all components toggle when clicked
    await page.waitForChanges();
    await component.click();
    await page.waitForChanges();
    expect(await component.getProperty(propertyToToggle)).toBe(toggledPropertyValue);
  }
}

interface LabelableOptions extends Pick<FocusableOptions, "focusTargetSelector" | "shadowFocusTargetSelector"> {
  /**
   * If clicking on a label toggles the labelable component, use this prop to specify the name of the toggled prop.
   */
  propertyToToggle?: string;
}

/**
 * Helper for asserting label clicking functionality works.
 *
 * @param {string} componentTagOrHtml - the component tag or HTML used to test label support
 * @param {LabelableOptions} [options] - labelable options
 */
export async function labelable(componentTagOrHtml: TagOrHTML, options?: LabelableOptions): Promise<void> {
  const id = "labelable-id";
  const labelTitle = "My Component";
  const propertyToToggle = options?.propertyToToggle;
  const focusTargetSelector = options?.focusTargetSelector || `#${id}`;
  const shadowFocusTargetSelector = options?.shadowFocusTargetSelector;
  const componentTag = getTag(componentTagOrHtml);
  const componentHtml = isHTML(componentTagOrHtml)
    ? ensureId(componentTagOrHtml)
    : `<${componentTag} id="${id}"></${componentTag}>`;

  function ensureId(html: string): string {
    return html.includes("id=") ? html : html.replace(componentTag, `${componentTag} id="${id}" `);
  }

  const wrappedHtml = html`<calcite-label> ${labelTitle} ${componentHtml}</calcite-label>`;
  const wrappedPage: E2EPage = await newE2EPage({ html: wrappedHtml });
  await wrappedPage.waitForChanges();

  await assertLabelable({
    page: wrappedPage,
    componentTag,
    propertyToToggle,
    focusTargetSelector,
    shadowFocusTargetSelector
  });

  const siblingHtml = html`
    <calcite-label for="${id}">${labelTitle}</calcite-label>
    ${componentHtml}
  `;
  const siblingPage: E2EPage = await newE2EPage({ html: siblingHtml });
  await siblingPage.waitForChanges();

  await assertLabelable({
    page: siblingPage,
    componentTag,
    propertyToToggle,
    focusTargetSelector,
    shadowFocusTargetSelector
  });

  const labelFirstSiblingPage: E2EPage = await newE2EPage();
  await labelFirstSiblingPage.setContent(`<calcite-label for="${id}"></calcite-label>`);
  await labelFirstSiblingPage.waitForChanges();
  await labelFirstSiblingPage.evaluate((componentHtml: string) => {
    const template = document.createElement("template");
    template.innerHTML = `${componentHtml}`.trim();
    const componentNode = template.content.firstChild;
    document.body.append(componentNode);
  }, componentHtml);
  await labelFirstSiblingPage.waitForChanges();

  await assertLabelable({
    page: labelFirstSiblingPage,
    componentTag,
    propertyToToggle,
    focusTargetSelector,
    shadowFocusTargetSelector
  });

  const labelFirstWrappedPage: E2EPage = await newE2EPage();
  await labelFirstWrappedPage.setContent(`<calcite-label for="${id}"></calcite-label>`);
  await labelFirstWrappedPage.waitForChanges();
  await labelFirstWrappedPage.evaluate((componentHtml: string) => {
    const template = document.createElement("template");
    template.innerHTML = `${componentHtml}`.trim();
    const componentNode = template.content.firstChild;
    const labelEl = document.querySelector("calcite-label");
    labelEl.append(componentNode);
  }, componentHtml);
  await labelFirstWrappedPage.waitForChanges();

  await assertLabelable({
    page: labelFirstWrappedPage,
    componentTag,
    propertyToToggle,
    focusTargetSelector,
    shadowFocusTargetSelector
  });

  const componentFirstSiblingPage: E2EPage = await newE2EPage({ html: componentHtml });
  await componentFirstSiblingPage.waitForChanges();
  await componentFirstSiblingPage.evaluate((id: string) => {
    const label = document.createElement("calcite-label");
    label.setAttribute("for", `${id}`);
    document.body.append(label);
  }, id);
  await componentFirstSiblingPage.waitForChanges();

  await assertLabelable({
    page: componentFirstSiblingPage,
    componentTag,
    propertyToToggle,
    focusTargetSelector,
    shadowFocusTargetSelector
  });

  const componentFirstWrappedPage: E2EPage = await newE2EPage();
  await componentFirstWrappedPage.setContent(`${componentHtml}`);
  await componentFirstWrappedPage.waitForChanges();
  await componentFirstWrappedPage.evaluate((id: string) => {
    const componentEl = document.querySelector(`[id='${id}']`);
    const labelEl = document.createElement("calcite-label");
    labelEl.setAttribute("for", `${id}`);
    document.body.append(labelEl);
    labelEl.append(componentEl);
  }, id);
  await componentFirstWrappedPage.waitForChanges();

  await assertLabelable({
    page: componentFirstWrappedPage,
    componentTag,
    propertyToToggle,
    focusTargetSelector,
    shadowFocusTargetSelector
  });
}

interface FormAssociatedOptions {
  /**
   * This value will be set on the component and submitted by the form.
   */
  testValue: any;

  /**
   * Set this if the expected submit value **is different** from stringifying `testValue`. For example, a component may transform an object to a serializable string.
   */
  expectedSubmitValue?: any;

  /**
   * Specifies the input type that will be used to capture the value.
   */
  inputType?: HTMLInputElement["type"];

  /**
   * Specifies if the component supports submitting the form on Enter key press
   */
  submitsOnEnter?: boolean;
}

/**
 * Helper for testing form-associated components; specifically form submitting and resetting.
 *
 * @param {string} componentTagOrHtml - the component tag or HTML markup to test against
 * @param {FormAssociatedOptions} options - form associated options
 */
export async function formAssociated(componentTagOrHtml: TagOrHTML, options: FormAssociatedOptions): Promise<void> {
  async function testAncestorFormAssociated(): Promise<void> {
    const componentTag = getTag(componentTagOrHtml);
    const componentHtml = ensureName(
      isHTML(componentTagOrHtml) ? componentTagOrHtml : `<${componentTag}></${componentTag}>`
    );

    function ensureName(html: string): string {
      return html.includes("name=") ? html : html.replace(componentTag, `${componentTag} name="testName" `);
    }

    const page = await newE2EPage({
      html: html`<form>
        ${componentHtml}
        <!--
          keeping things simple by using submit-type input
          this should cover button and calcite-button submit cases
          -->
        <input id="submitter" type="submit" />
      </form>`
    });

    await page.waitForChanges();

    const component = await page.find(componentTag);
    const checkable =
      typeof options.testValue === "boolean" && (await page.$eval(componentTag, (component) => "checked" in component));
    const resettablePropName = checkable ? "checked" : "value";
    const initialValue = await component.getProperty(resettablePropName);
    const name = await component.getProperty("name");

    await assertValueSubmissionType();
    await assertValueResetOnFormReset();
    await assertValueSubmittedOnFormSubmit();

    if (options.submitsOnEnter) {
      await assertFormSubmitOnEnter();
    }

    async function assertValueSubmissionType(): Promise<void> {
      const inputType = options.inputType ?? "text";

      const hiddenFormInputType = await page.evaluate(
        async (inputName: string, hiddenFormInputSlotName: string): Promise<string> => {
          const hiddenFormInput = document.querySelector<HTMLInputElement>(
            `[name="${inputName}"] input[slot=${hiddenFormInputSlotName}]`
          );

          return hiddenFormInput.type;
        },
        name,
        hiddenFormInputSlotName
      );

      if (checkable) {
        expect(hiddenFormInputType).toMatch(/radio|checkbox/);
      } else {
        expect(hiddenFormInputType).toMatch(inputType);
      }
    }

    async function assertValueResetOnFormReset(): Promise<void> {
      component.setProperty(resettablePropName, options.testValue);
      await page.waitForChanges();

      await page.$eval("form", (form: HTMLFormElement) => form.reset());
      await page.waitForChanges();

      expect(await component.getProperty(resettablePropName)).toBe(initialValue);
    }

    async function assertValueSubmittedOnFormSubmit(): Promise<void> {
      const stringifiedTestValue = stringifyTestValue(options.testValue);

      if (checkable) {
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
        component.setProperty("required", true);
        component.setProperty("value", null);
        await page.waitForChanges();
        expect(await submitAndGetValue()).toBe(
          options.inputType === "color"
            ? // `input[type="color"]` will set its value to #000000 when set to an invalid value
              // see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#value
              "#000000"
            : undefined
        );

        component.setProperty("required", false);
        component.setProperty("value", options.testValue);
        await page.waitForChanges();
        expect(await submitAndGetValue()).toEqual(options?.expectedSubmitValue || stringifiedTestValue);

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
            hiddenFormInputSlotName: string
          ): Promise<SubmitValueResult> => {
            const hiddenFormInput = document.querySelector(
              `[name="${inputName}"] input[slot=${hiddenFormInputSlotName}]`
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
          hiddenFormInputSlotName
        );
      }
    }

    async function assertFormSubmitOnEnter(): Promise<void> {
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

      await component.setProperty("value", stringifiedTestValue);
      await component.callMethod("setFocus");
      await page.keyboard.press("Enter");
      const called = await page.evaluate(() => (window as TestWindow).called);

      expect(called).toBe(true);
    }

    function stringifyTestValue(value: any): string | string[] {
      return Array.isArray(value) ? value.map((value) => value.toString()) : value.toString();
    }
  }

  async function testIdFormAssociated(): Promise<void> {
    const componentTag = getTag(componentTagOrHtml);
    const componentHtml = ensureForm(
      ensureName(isHTML(componentTagOrHtml) ? componentTagOrHtml : `<${componentTag}></${componentTag}>`)
    );

    function ensureName(html: string): string {
      return html.includes("name=") ? html : html.replace(componentTag, `${componentTag} name="testName" `);
    }

    function ensureForm(html: string): string {
      return html.includes("form=") ? html : html.replace(componentTag, `${componentTag} form="test-form" `);
    }

    const page = await newE2EPage({
      html: html`<form id="test-form"></form>
        ${componentHtml}
        <!--
        keeping things simple by using submit-type input
        this should cover button and calcite-button submit cases
        -->
        <input id="submitter" form="test-form" type="submit" />`
    });

    await page.waitForChanges();

    const component = await page.find(componentTag);
    const checkable =
      typeof options.testValue === "boolean" && (await page.$eval(componentTag, (component) => "checked" in component));
    const resettablePropName = checkable ? "checked" : "value";
    const initialValue = await component.getProperty(resettablePropName);
    const name = await component.getProperty("name");

    await assertValueSubmissionType();
    await assertValueResetOnFormReset();
    await assertValueSubmittedOnFormSubmit();

    if (options.submitsOnEnter) {
      await assertFormSubmitOnEnter();
    }

    async function assertValueSubmissionType(): Promise<void> {
      const inputType = options.inputType ?? "text";

      const hiddenFormInputType = await page.evaluate(
        async (inputName: string, hiddenFormInputSlotName: string): Promise<string> => {
          const hiddenFormInput = document.querySelector<HTMLInputElement>(
            `[name="${inputName}"] input[slot=${hiddenFormInputSlotName}]`
          );

          return hiddenFormInput.type;
        },
        name,
        hiddenFormInputSlotName
      );

      if (checkable) {
        expect(hiddenFormInputType).toMatch(/radio|checkbox/);
      } else {
        expect(hiddenFormInputType).toMatch(inputType);
      }
    }

    async function assertValueResetOnFormReset(): Promise<void> {
      component.setProperty(resettablePropName, options.testValue);
      await page.waitForChanges();

      await page.$eval("form", (form: HTMLFormElement) => form.reset());
      await page.waitForChanges();

      expect(await component.getProperty(resettablePropName)).toBe(initialValue);
    }

    async function assertValueSubmittedOnFormSubmit(): Promise<void> {
      const stringifiedTestValue = stringifyTestValue(options.testValue);

      if (checkable) {
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
        component.setProperty("required", true);
        component.setProperty("value", null);
        await page.waitForChanges();
        expect(await submitAndGetValue()).toBe(
          options.inputType === "color"
            ? // `input[type="color"]` will set its value to #000000 when set to an invalid value
              // see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/color#value
              "#000000"
            : undefined
        );

        component.setProperty("required", false);
        component.setProperty("value", options.testValue);
        await page.waitForChanges();
        expect(await submitAndGetValue()).toEqual(options?.expectedSubmitValue || stringifiedTestValue);

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
            hiddenFormInputSlotName: string
          ): Promise<SubmitValueResult> => {
            const hiddenFormInput = document.querySelector(
              `[name="${inputName}"] input[slot=${hiddenFormInputSlotName}]`
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
          hiddenFormInputSlotName
        );
      }
    }

    async function assertFormSubmitOnEnter(): Promise<void> {
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

      await component.setProperty("value", stringifiedTestValue);
      await component.callMethod("setFocus");
      await page.keyboard.press("Enter");
      const called = await page.evaluate(() => (window as TestWindow).called);

      expect(called).toBe(true);
    }

    function stringifyTestValue(value: any): string | string[] {
      return Array.isArray(value) ? value.map((value) => value.toString()) : value.toString();
    }
  }

  await testAncestorFormAssociated();
  await testIdFormAssociated();
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
  focusTarget: FocusTarget | TabAndClickTargets;
}

async function getTagAndPage(componentSetup: TagOrHTML | TagAndPage): Promise<TagAndPage> {
  if (typeof componentSetup === "string") {
    const page = await simplePageSetup(componentSetup);
    const tag = getTag(componentSetup);

    return { page, tag };
  }

  return componentSetup;
}

/**
 * Helper to test the disabled prop disabling user interaction.
 *
 * @param {TagOrHTML|TagAndPage} componentSetup - A component tag, html, or an e2e page for setting up a test
 * @param {DisabledOptions} [options={ focusTarget: "host" }] - disabled options
 */
export async function disabled(
  componentSetup: TagOrHTML | TagAndPage,
  options: DisabledOptions = { focusTarget: "host" }
): Promise<void> {
  const { page, tag } = await getTagAndPage(componentSetup);

  const component = await page.find(tag);
  await skipAnimations(page);
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
      true
    );
  });

  // only testing events from https://github.com/web-platform-tests/wpt/blob/master/html/semantics/disabled-elements/event-propagate-disabled.tentative.html#L66
  const eventsExpectedToBubble = ["pointermove", "pointerdown", "pointerup"];
  const eventsExpectedToNotBubble = ["mousemove", "mousedown", "mouseup", "click"];
  const allExpectedEvents = [...eventsExpectedToBubble, ...eventsExpectedToNotBubble];

  const eventSpies: EventSpy[] = [];

  for (const event of allExpectedEvents) {
    eventSpies.push(await component.spyOnEvent(event));
  }

  async function expectToBeFocused(tag: string): Promise<void> {
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(focusedTag).toBe(tag);
  }

  function assertOnMouseAndPointerEvents(spies: EventSpy[], expectCallback: (spy: EventSpy) => void): void {
    for (const spy of eventSpies) {
      expectCallback(spy);
    }
  }

  expect(component.getAttribute("aria-disabled")).toBeNull();

  if (options.focusTarget === "none") {
    await page.click(tag);
    await expectToBeFocused("body");

    assertOnMouseAndPointerEvents(eventSpies, (spy) => expect(spy).toHaveReceivedEventTimes(1));

    component.setProperty("disabled", true);
    await page.waitForChanges();

    expect(component.getAttribute("aria-disabled")).toBe("true");

    await page.click(tag);
    await expectToBeFocused("body");

    await component.callMethod("click");
    await expectToBeFocused("body");

    assertOnMouseAndPointerEvents(eventSpies, (spy) =>
      expect(spy).toHaveReceivedEventTimes(eventsExpectedToBubble.includes(spy.eventName) ? 2 : 1)
    );

    return;
  }

  async function getFocusTarget(focusTarget: FocusTarget): Promise<string> {
    return focusTarget === "host" ? tag : await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
  }

  await page.keyboard.press("Tab");

  let tabFocusTarget: string;
  let clickFocusTarget: string;

  if (typeof options.focusTarget === "object") {
    tabFocusTarget = options.focusTarget.tab;
    clickFocusTarget = options.focusTarget.click;
  } else {
    tabFocusTarget = clickFocusTarget = await getFocusTarget(options.focusTarget);
  }

  expect(tabFocusTarget).not.toBe("body");
  await expectToBeFocused(tabFocusTarget);

  const [shadowFocusableCenterX, shadowFocusableCenterY] = await page.$eval(tabFocusTarget, (element: HTMLElement) => {
    const focusTarget = element.shadowRoot.activeElement || element;
    const rect = focusTarget.getBoundingClientRect();

    return [rect.x + rect.width / 2, rect.y + rect.height / 2];
  });

  async function resetFocusOrder(): Promise<void> {
    // test page has default margin, so clicking on 0,0 will not hit the test element
    await page.mouse.click(0, 0);
  }

  await resetFocusOrder();
  await expectToBeFocused("body");

  await page.mouse.click(shadowFocusableCenterX, shadowFocusableCenterY);
  await expectToBeFocused(clickFocusTarget);

  await component.callMethod("click");
  await expectToBeFocused(clickFocusTarget);

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

  expect(component.getAttribute("aria-disabled")).toBe("true");

  await resetFocusOrder();
  await page.keyboard.press("Tab");
  await expectToBeFocused("body");

  await page.mouse.click(shadowFocusableCenterX, shadowFocusableCenterY);
  await expectToBeFocused("body");

  assertOnMouseAndPointerEvents(eventSpies, (spy) =>
    expect(spy).toHaveReceivedEventTimes(eventsExpectedToBubble.includes(spy.eventName) ? 1 : 0)
  );
}

/**
 * This helper will test if a floating-ui-owning component has configured the floating-ui correctly.
 * At the moment, this only tests if the scroll event listeners are only active when the floating-ui is displayed.
 *
 * @param componentTagOrHTML - the component tag or HTML markup to test against
 * @param togglePropName - the component property that toggles the floating-ui
 * @param options - the floating-ui owner test configuration
 * @param options.shadowSelector
 */
export async function floatingUIOwner(
  componentTagOrHTML: TagOrHTML,
  togglePropName: string,
  options?: {
    /**
     * Use this to specify the selector in the shadow DOM for the floating-ui element.
     */
    shadowSelector?: string;
  }
): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);

  const scrollablePageSizeInPx = 2400;
  await page.addStyleTag({
    content: `body {
      height: ${scrollablePageSizeInPx}px;
      width: ${scrollablePageSizeInPx}px;
    }`
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
      options?.shadowSelector
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
}

/**
 * Helper to test t9n component setup
 *
 * @param {TagOrHTML|TagAndPage} componentSetup - A component tag, html, or an object with e2e page and tag for setting up a test
 */
export async function t9n(componentSetup: TagOrHTML | TagAndPage): Promise<void> {
  const { page, tag } = await getTagAndPage(componentSetup);
  const component = await page.find(tag);

  await assertDefaultMessages();

  await assertOverrides();
  await assertLangSwitch();

  async function getCurrentMessages(): Promise<MessageBundle> {
    return page.$eval(tag, (component: HTMLElement & { messages: MessageBundle }) => component.messages);
  }

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
      ...messageOverride
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

              [fakeBundleIdentifier]: true // we inject a fake identifier for assertion-purposes
            };
            window.fetch = orig;
            return new Response(new Blob([JSON.stringify(fakeEsMessages, null, 2)], { type: "application/json" }));
          }

          return orig.call(input, init);
        };
      },
      enMessages,
      fakeBundleIdentifier
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
