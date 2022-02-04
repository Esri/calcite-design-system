import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { JSX } from "../components";
import { toHaveNoViolations } from "jest-axe";
import axe from "axe-core";
import { config } from "../../stencil.config";
import { GlobalTestProps, html } from "./utils";
import { hiddenFormInputSlotName } from "../utils/form";

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

export async function hidden(componentTagOrHTML: TagOrHTML): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const element = await page.find(getTag(componentTagOrHTML));

  element.setAttribute("hidden", "");
  await page.waitForChanges();

  expect(await element.isVisible()).toBe(false);
}

interface FocusableOptions {
  /** use this to pass an ID to setFocus() **/
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
        (element: HTMLElement, selector: string) => element.shadowRoot.activeElement.matches(selector),
        options?.shadowFocusTargetSelector
      )
    ).toBe(true);
  }

  expect(await page.evaluate((selector) => document.activeElement.matches(selector), focusTargetSelector)).toBe(true);
}

/**
 * Helper for asserting slots.
 *
 * @param componentTagOrHTML - the component tag or HTML markup to test against
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
  html,
  componentTag,
  propertyToToggle,
  focusTargetSelector = componentTag,
  shadowFocusTargetSelector
}: {
  html: string;
  componentTag: string;
  propertyToToggle?: string;
  focusTargetSelector?: string;
  shadowFocusTargetSelector?: string;
}): Promise<void> {
  const page: E2EPage = await newE2EPage({ html });
  await page.waitForChanges();
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
   * If clicking on a label toggles the labeleable component, use this prop to specify the name of the toggled prop.
   */
  propertyToToggle?: string;
}

/**
 * Helper for asserting label clicking functionality works.
 *
 * @param componentTagOrHtml - The component tag or HTML used to test label support.
 * @param propertyToToggle - The component's property that should be toggled when it's calcite-label is clicked.
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

  const wrappedHtml = html`<calcite-label> ${labelTitle} ${componentHtml} </calcite-label>`;

  await assertLabelable({
    html: wrappedHtml,
    componentTag,
    propertyToToggle,
    focusTargetSelector,
    shadowFocusTargetSelector
  });

  const siblingHtml = html`
    <calcite-label for="${id}">${labelTitle}</calcite-label>
    ${componentHtml}
  `;

  await assertLabelable({
    html: siblingHtml,
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
}

/**
 * This helper tests form-associated components. Specifically,
 *
 * 1. form submitting
 * 2. form resetting
 */
export async function formAssociated(componentTagOrHtml: TagOrHTML, options: FormAssociatedOptions): Promise<void> {
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

  await assertReset();
  await assertSubmitViaButton();

  async function assertReset(): Promise<void> {
    component.setProperty(resettablePropName, options.testValue);
    await page.waitForChanges();

    await page.$eval("form", (form: HTMLFormElement) => form.reset());
    await page.waitForChanges();

    expect(await component.getProperty(resettablePropName)).toBe(initialValue);
  }

  async function assertSubmitViaButton(): Promise<void> {
    const inputName = await component.getProperty("name");
    const stringifiedTestValue = Array.isArray(options.testValue)
      ? options.testValue.map((value) => value.toString())
      : options.testValue.toString();

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
      expect(await submitAndGetValue()).toBeUndefined();

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
        inputName,
        hiddenFormInputSlotName
      );
    }
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
 * @param componentTagOrHTML - the component tag or HTML markup to test against
 */
export async function disabled(
  componentSetup: TagOrHTML | TagAndPage,
  options: DisabledOptions = { focusTarget: "host" }
): Promise<void> {
  const { page, tag } = await getTagAndPage(componentSetup);

  const component = await page.find(tag);
  const enabledComponentClickSpy = await component.spyOnEvent("click");

  await page.$eval(tag, (el) => {
    el.addEventListener(
      "click",
      (event) => {
        const path = event.composedPath() as HTMLElement[];

        if (path.find((el) => el?.tagName === "A")) {
          // we prevent the default behavior to avoid a page redirect
          el.addEventListener("click", (event) => event.preventDefault(), { once: true });
        }
      },
      true
    );
  });

  async function expectToBeFocused(tag: string): Promise<void> {
    const focusedTag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
    expect(focusedTag).toBe(tag);
  }

  expect(component.getAttribute("aria-disabled")).toBeNull();

  if (options.focusTarget === "none") {
    await page.click(tag);
    await page.waitForChanges();

    await expectToBeFocused("body");
    expect(enabledComponentClickSpy).toHaveReceivedEventTimes(1);

    component.setProperty("disabled", true);
    await page.waitForChanges();
    const disabledComponentClickSpy = await component.spyOnEvent("click");

    expect(component.getAttribute("aria-disabled")).toBe("true");

    await page.click(tag);
    await page.waitForChanges();
    await expectToBeFocused("body");

    expect(disabledComponentClickSpy).toHaveReceivedEventTimes(0);

    return;
  }

  async function getFocusTarget(focusTarget: FocusTarget): Promise<string> {
    return focusTarget === "host" ? tag : await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
  }

  await page.keyboard.press("Tab");
  await page.waitForChanges();

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

  async function resetFocus(): Promise<void> {
    await page.mouse.click(0, 0);
    await page.waitForChanges();
  }

  await resetFocus();
  await expectToBeFocused("body");

  await page.mouse.click(shadowFocusableCenterX, shadowFocusableCenterY);
  await page.waitForChanges();
  await expectToBeFocused(clickFocusTarget);

  // some components emit more than one click event,
  // so we check if at least one event is received
  expect(enabledComponentClickSpy.length).toBeGreaterThanOrEqual(1);

  component.setProperty("disabled", true);
  await page.waitForChanges();
  const disabledComponentClickSpy = await component.spyOnEvent("click");

  expect(component.getAttribute("aria-disabled")).toBe("true");

  await resetFocus();
  await page.keyboard.press("Tab");
  await page.waitForChanges();
  await expectToBeFocused("body");

  await page.mouse.click(shadowFocusableCenterX, shadowFocusableCenterY);
  await page.waitForChanges();
  await expectToBeFocused("body");

  expect(disabledComponentClickSpy).toHaveReceivedEventTimes(0);
}
