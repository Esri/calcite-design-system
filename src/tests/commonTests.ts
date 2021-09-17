import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { JSX } from "../components";
import { toHaveNoViolations } from "jest-axe";
import axe from "axe-core";
import { config } from "../../stencil.config";
import { html } from "./utils";

expect.extend(toHaveNoViolations);

type CalciteComponentTag = keyof JSX.IntrinsicElements;
type AxeOwningWindow = Window & { axe: typeof axe } & typeof globalThis;
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

const componentIsLabelable = async ({
  page,
  componentTag,
  options,
  clickSelector = "calcite-label"
}: {
  page: E2EPage;
  componentTag: string;
  clickSelector?: string;
  options?: LabelableOptions;
}): Promise<void> => {
  await page.waitForChanges();
  let component: E2EElement;
  let initialPropertyValue: boolean;
  const propertyToToggle = options?.propertyToToggle;
  const focusTargetSelector = options?.focusTargetSelector || componentTag;

  if (propertyToToggle) {
    component = await page.find(componentTag);
    initialPropertyValue = await component.getProperty(propertyToToggle);
  }

  const clickElement = await page.find(clickSelector);
  await clickElement.click();

  expect(await page.evaluate((selector) => document.activeElement.matches(selector), focusTargetSelector)).toBe(true);

  if (propertyToToggle) {
    expect(await component.getProperty(propertyToToggle)).toBe(!initialPropertyValue);
  }
};

interface LabelableOptions {
  /**
   * Selector used to assert the focused DOM element.
   */
  focusTargetSelector?: string;

  /**
   * The component's property that should be toggled when it's calcite-label is clicked.
   */
  propertyToToggle?: string;
}

/**
 * Helper for asserting label clicking functionality works.
 */
export async function labelable(componentTagOrHTML: TagOrHTML, options?: LabelableOptions): Promise<void> {
  const labelTitle = "My Component";
  const labelTag = "calcite-label";
  const idMatch = componentTagOrHTML.match(/id="(.*?)"/g);
  const id = (idMatch && idMatch[1]) || "labelable-component";
  const componentTag = getTag(componentTagOrHTML);
  const componentHTML = isHTML(componentTagOrHTML)
    ? componentTagOrHTML
    : `<${componentTag} id="${id}"></${componentTag}>`;

  const wrappedHTML = html`
  <${labelTag}>
    ${labelTitle}
    ${componentHTML}
  </${labelTag}>
  `;

  const wrappedHTMLWithSpan = html`
  <${labelTag}>
    <span>${labelTitle}</span>
    ${componentHTML}
  </${labelTag}>
  `;

  const siblingHTML = html`
  <${labelTag} for="${id}">${labelTitle}</${labelTag}>
  ${componentHTML}
  `;

  const page = await newE2EPage({
    html: wrappedHTML,
    failOnConsoleError: true
  });

  await componentIsLabelable({ page, componentTag, options });

  await page.setContent(wrappedHTMLWithSpan);
  await componentIsLabelable({ page, componentTag, clickSelector: "span", options });

  await page.setContent(siblingHTML);
  await componentIsLabelable({ page, componentTag, options });
}
