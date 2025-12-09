import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { propToAttr } from "../utils";

type ReflectProps<E extends HTMLElement> = Array<{
  propertyName: keyof E;
  value: E[keyof E];
}>;

type ShorthandReflectProps<E extends HTMLElement> = {
  [K in keyof E]?: E[K];
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
>(setup: () => RenderResult, propsToTest: ReflectProps<ElementProps> | ShorthandReflectProps<ElementProps>): void {
  const propValuePairs = Array.isArray(propsToTest)
    ? propsToTest
    : Object.keys(propsToTest).map((propertyName) => ({
        propertyName,
        value: propsToTest[propertyName],
      }));
  const cases = propValuePairs.map(({ propertyName, value }) => [propertyName, value]);

  it.each(cases)("%s", async (propertyName, value) => {
    const { el, reRender } = await setup();
    const attrName = propToAttr(propertyName);

    el[propertyName] = value;
    await reRender();

    const matches = el.matches(`[${attrName}]`);
    expect(matches).toBe(true);

    if (typeof value === "boolean") {
      const getExpectedValue = (propValue: boolean): string | null => (propValue ? "" : null);
      const negated = !value;

      el[propertyName] = negated;
      await reRender();

      expect(el.getAttribute(attrName)).toBe(getExpectedValue(negated));

      el[propertyName] = value;
      await reRender();

      expect(el.getAttribute(attrName)).toBe(getExpectedValue(value));
    }
  });
}
