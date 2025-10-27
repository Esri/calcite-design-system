import { expect, it } from "vitest";
import { skipAnimations } from "../utils/puppeteer";
import { getTagAndPage, propToAttr } from "./utils";
import { ComponentTestSetup } from "./interfaces";

/**
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

  it.each(cases)("%s", async (propertyName, value) => {
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
