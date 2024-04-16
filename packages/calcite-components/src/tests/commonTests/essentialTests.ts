/* eslint-disable jest/no-conditional-expect -- Using conditional logic in a confined test helper to handle specific scenarios, reducing duplication, balancing test readability and maintainability. **/
/* eslint-disable jest/no-export -- Util functions are now imported to be used as `it` blocks within `describe` instead of assertions within `it` blocks. */
import axe from "axe-core";
import { toHaveNoViolations } from "jest-axe";
import type { JSX } from "../../components";
import { GlobalTestProps, skipAnimations } from "./../utils";
import { ComponentTestSetup, getTagAndPage, HYDRATED_ATTR } from "./setupForTests";

expect.extend(toHaveNoViolations);

type ComponentTag = keyof JSX.IntrinsicElements;
type AxeOwningWindow = GlobalTestProps<{ axe: typeof axe }>;

/**
 * Helper for asserting that a component is accessible.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("accessible"), () => {
 *    accessible(`<calcite-tree></calcite-tree>`);
 * });
 *
 * @param {ComponentTestSetup} componentTestSetup - A component tag, html, or the tag and e2e page for setting up a test
 */
export function accessible(componentTestSetup: ComponentTestSetup): void {
  it("is accessible", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);

    await page.addScriptTag({ path: require.resolve("axe-core") });
    await page.waitForFunction(() => (window as AxeOwningWindow).axe);

    expect(
      await page.evaluate(async (componentTag: ComponentTag) => (window as AxeOwningWindow).axe.run(componentTag), tag),
    ).toHaveNoViolations();
  });
}

/**
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("renders", () => {
 *    renders(`<calcite-tree></calcite-tree>`);
 * });
 * @param componentTestSetup
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 * @param {object} options - additional options to assert
 * @param {string} options.visible - is the component visible
 * @param {string} options.display - is the component's display "inline"
 */
export async function renders(
  componentTestSetup: ComponentTestSetup,
  options?: {
    visible?: boolean;
    display: string;
  },
): Promise<void> {
  it(`renders`, async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    const element = await page.find(tag);

    expect(element).toHaveAttribute(HYDRATED_ATTR);
    expect(await element.isVisible()).toBe(options?.visible ?? true);
    expect((await element.getComputedStyle()).display).toBe(options?.display ?? "inline");
  });
}

/**
 *
 * Helper for asserting that a component reflects
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("reflects", () => {
 *    reflects("calcite-action-bar", [
 *      {
 *        propertyName: "expandDisabled",
 *        value: true
 *      },
 *      {
 *        propertyName: "expanded",
 *        value: true
 *      }
 *    ])
 * })
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 * @param componentTestSetup
 * @param {object[]} propsToTest - the properties to test
 * @param {string} propsToTest.propertyName - the property name
 * @param {any} propsToTest.value - the property value (if boolean, needs to be `true` to ensure reflection)
 */
export function reflects(
  componentTestSetup: ComponentTestSetup,
  propsToTest: {
    propertyName: string;
    value: any;
  }[],
): void {
  const cases = propsToTest.map(({ propertyName, value }) => [propertyName, value]);

  it.each(cases)("%p", async (propertyName, value) => {
    const { page, tag: componentTag } = await getTagAndPage(componentTestSetup);
    await skipAnimations(page);
    const element = await page.find(componentTag);

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
  });
}

function propToAttr(name: string): string {
  return name.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
}

/**
 * Helper for asserting that a property's value is its default
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("defaults", () => {
 *    defaults("calcite-action", [
 *      {
 *        propertyName: "active",
 *        defaultValue: false
 *      },
 *      {
 *        propertyName: "appearance",
 *        defaultValue: "solid"
 *      }
 *    ])
 * })
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 * @param componentTestSetup
 * @param {object[]} propsToTest - the properties to test
 * @param {string} propsToTest.propertyName - the property name
 * @param {any} propsToTest.value - the property value
 */
export function defaults(
  componentTestSetup: ComponentTestSetup,
  propsToTest: {
    propertyName: string;
    defaultValue: any;
  }[],
): void {
  it.each(propsToTest.map(({ propertyName, defaultValue }) => [propertyName, defaultValue]))(
    "%p",
    async (propertyName, defaultValue) => {
      const { page, tag } = await getTagAndPage(componentTestSetup);
      const element = await page.find(tag);
      const prop = await element.getProperty(propertyName);
      expect(prop).toEqual(defaultValue);
    },
  );
}

/**
 * Helper for asserting that a component is not visible when hidden
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * @param componentTestSetup
 * describe("honors hidden attribute", () => {
 *    hidden("calcite-accordion")
 * });
 *
 * @param {string} componentTagOrHTML - the component tag or HTML markup to test against
 */
export async function hidden(componentTestSetup: ComponentTestSetup): Promise<void> {
  it("is hidden", async () => {
    const { page, tag } = await getTagAndPage(componentTestSetup);
    const element = await page.find(tag);

    element.setAttribute("hidden", "");
    await page.waitForChanges();

    expect(await element.isVisible()).toBe(false);
  });
}
