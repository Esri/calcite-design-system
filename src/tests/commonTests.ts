import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { JSX } from "../components";
import { toHaveNoViolations } from "jest-axe";
import axe from "axe-core";
import { config } from "../../stencil.config";
import { GlobalTestProps, html } from "./utils";
import { hiddenFormInputSlotName } from "../utils/form";

expect.extend(toHaveNoViolations);

type CalciteComponentTag = keyof JSX.IntrinsicElements;
type AxeOwningWindow = GlobalTestProps<{ axe: typeof axe }>;
type ComponentHTML = string;
type TagOrHTML = CalciteComponentTag | ComponentHTML;

export const HYDRATED_ATTR = config.hydratedFlag.name;

function isHTML(tagOrHTML: string): boolean {
  return tagOrHTML.trim().startsWith("<");
}

function getTag(tagOrHTML: string): CalciteComponentTag {
  if (isHTML(tagOrHTML)) {
    const regex = /[>\s]/;
    const trimmedTag = tagOrHTML.trim();
    return trimmedTag.substring(1, trimmedTag.search(regex)) as CalciteComponentTag;
  }

  return tagOrHTML as CalciteComponentTag;
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
      async (componentTag: CalciteComponentTag) => (window as AxeOwningWindow).axe.run(componentTag),
      getTag(componentTagOrHTML)
    )
  ).toHaveNoViolations();
}

export async function renders(
  componentTagOrHTML: TagOrHTML,
  options?: {
    visible?: boolean;
    display?: string;
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

  await element.callMethod("setFocus", options?.focusId); // assumes element is CalciteFocusableElement

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
 * Helper for asserting named slots.
 *
 * @param componentTagOrHTML - the component tag or HTML markup to test against
 * @param slots - a component's SLOTS resource object or an array of slot names
 */
export async function slots(componentTagOrHTML: TagOrHTML, slots: Record<string, string> | string[]): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const tag = getTag(componentTagOrHTML);
  const slotNames = Array.isArray(slots) ? slots : Object.values(slots);

  const allSlotsAssigned = await page.$eval(
    tag,
    async (component, slotNames: string[]) => {
      slotNames.forEach((slot) => {
        const el = document.createElement("div");
        el.classList.add("slotted");
        el.slot = slot;

        component.appendChild(el);
      });

      // we do this for conditionally-rendered slots since slotting after initialization does not trigger a render phase

      const html = component.outerHTML.replace(/\"/g, `'`);
      component.remove();

      const parent = document.createElement("div");
      document.body.append(parent);
      parent.innerHTML = html;

      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

      const allSlotsAssigned = Array.from(parent.getElementsByClassName("slotted"))
        .map((slotted) => slotted.assignedSlot)
        .every((assignedSlot) => !!assignedSlot);

      parent.remove();

      return allSlotsAssigned;
    },
    slotNames
  );

  expect(allSlotsAssigned).toBe(true);
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
