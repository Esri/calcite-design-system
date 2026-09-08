import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { camelToKebab as propToAttr } from "@arcgis/toolkit/string";

type ReflectProps<E extends HTMLElement> = Array<{
  propertyName: Extract<keyof E, string>;
  value: E[Extract<keyof E, string>];
}>;

type ShorthandReflectProps<E extends HTMLElement> = {
  [K in Extract<keyof E, string>]?: E[K];
};

/**
 * Helper for asserting that a component reflects
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("reflects", () => {
 *   reflects("calcite-action-bar", [
 *     {
 *       propertyName: "expandDisabled",
 *       value: true
 *     },
 *     {
 *       propertyName: "expanded",
 *       value: true
 *     }
 *   ]);
 * });
 *
 * @example <caption>using shorthand</caption>
 * describe("reflects", () => {
 *   reflects("calcite-action-bar", {
 *     expandDisabled: true,
 *     expanded: true
 *    });
 * });
 */
export function reflects<
  RenderResult extends ReturnType<typeof mount>,
  ElementProps extends Awaited<RenderResult>["el"],
>(setUp: () => RenderResult, propsToTest: ReflectProps<ElementProps> | ShorthandReflectProps<ElementProps>): void {
  const propValuePairs = Array.isArray(propsToTest)
    ? propsToTest
    : (Object.keys(propsToTest) as Extract<keyof ElementProps, string>[]).map((propertyName) => ({
        propertyName,
        value: propsToTest[propertyName],
      }));
  const cases = propValuePairs.map(({ propertyName, value }) => [propertyName, value] as const);

  it.each(cases)("%s", async (propertyName, value) => {
    const { el: setupEl, reRender } = await setUp();
    const el = setupEl as ElementProps;
    const attrName = propToAttr(propertyName);

    Object.assign(el, { [propertyName]: value });
    await reRender();

    const matches = el.matches(`[${attrName}]`);
    expect(matches).toBe(true);

    if (typeof value === "boolean") {
      const getExpectedValue = (propValue: boolean): string | null => (propValue ? "" : null);
      const negated = !value;

      Object.assign(el, { [propertyName]: negated });
      await reRender();

      // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test helper config
      expect(el.getAttribute(attrName)).toBe(getExpectedValue(negated));

      Object.assign(el, { [propertyName]: value });
      await reRender();

      // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test helper config
      expect(el.getAttribute(attrName)).toBe(getExpectedValue(value));
    }
  });
}
