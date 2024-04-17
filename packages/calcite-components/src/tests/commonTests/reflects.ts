/* eslint-disable jest/no-conditional-expect -- Using conditional logic in a confined test helper to handle specific scenarios, reducing duplication, balancing test readability and maintainability. **/
/* eslint-disable jest/no-export -- Util functions are now imported to be used as `it` blocks within `describe` instead of assertions within `it` blocks. */
import { toHaveNoViolations } from "jest-axe";
import { skipAnimations } from "./../utils";
import { ComponentTestSetup, getTagAndPage, propToAttr } from "./setupForTests";

expect.extend(toHaveNoViolations);

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
