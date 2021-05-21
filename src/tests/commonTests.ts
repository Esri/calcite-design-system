import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { JSX } from "../components";
import { toHaveNoViolations } from "jest-axe";
import axe from "axe-core";
import { config } from "../../stencil.config";

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
    html: isHTML(componentTagOrHTML) ? componentTagOrHTML : `<${componentTag}><${componentTag}/>`,
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

export async function renders(componentTagOrHTML: TagOrHTML, visible = true): Promise<void> {
  const page = await simplePageSetup(componentTagOrHTML);
  const element = await page.find(getTag(componentTagOrHTML));

  expect(element).toHaveAttribute(HYDRATED_ATTR);
  expect(await element.isVisible()).toBe(visible);
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
