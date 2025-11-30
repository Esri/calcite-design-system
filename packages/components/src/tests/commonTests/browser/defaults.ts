import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";

type DefaultProps<E extends HTMLElement> = Array<{
  propertyName: keyof E;
  defaultValue: E[keyof E];
}>;

type ShorthandDefaultProps<E extends HTMLElement> = {
  [K in keyof E]?: E[K];
};

/**
 * Helper for asserting that a property's value is its default
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("defaults", () => {
 *   defaults("calcite-action", [
 *     {
 *       propertyName: "active",
 *       defaultValue: false
 *     },
 *     {
 *       propertyName: "appearance",
 *       defaultValue: "solid"
 *     }
 *   ]);
 * });
 *
 * @example <caption>using shorthand</caption>
 * describe("defaults", () => {
 *   defaults("calcite-action", {
 *     active: false,
 *     appearance: "solid"
 *   });
 * });
 */
export function defaults<
  RenderResult extends ReturnType<typeof mount>,
  ElementProps extends Awaited<RenderResult>["el"],
>(setup: () => RenderResult, propsToTest: DefaultProps<ElementProps> | ShorthandDefaultProps<ElementProps>): void {
  const propValuePairs = Array.isArray(propsToTest)
    ? propsToTest
    : Object.keys(propsToTest).map((propertyName) => ({
        propertyName,
        defaultValue: propsToTest[propertyName],
      }));

  it.each(propValuePairs.map(({ propertyName, defaultValue }) => [propertyName, defaultValue]))(
    "%s",
    async (propertyName, defaultValue) => {
      const { el } = await setup();
      expect(el[propertyName]).toEqual(defaultValue);
    },
  );
}
