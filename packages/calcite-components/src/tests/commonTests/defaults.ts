/* eslint-disable jest/no-export -- Util functions are now imported to be used as `it` blocks within `describe` instead of assertions within `it` blocks. */
import { toHaveNoViolations } from "jest-axe";
import { ComponentTestSetup, getTagAndPage } from "./utils";

expect.extend(toHaveNoViolations);

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
