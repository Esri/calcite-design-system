import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { camelToKebab as propToAttr } from "@arcgis/toolkit/string";

type ReflectProps<E extends HTMLElement> = Array<{
  propertyName: Extract<keyof E, string>;
  value: E[Extract<keyof E, string>];
  /** Whether property updates should also update the host attribute. */
  reflect?: boolean;
}>;

type ShorthandReflectProps<E extends HTMLElement> = {
  [K in Extract<keyof E, string>]?: E[K];
};

/**
 * Helper for asserting whether component properties reflect to host attributes.
 *
 * Note that this helper should be used within a describe block.
 *
 * @example
 * describe("reflects", () => {
 *   reflects(() => mount("calcite-action-bar"), [
 *     {
 *       propertyName: "expandToggleDisabled",
 *       value: true,
 *       reflect: false
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
 *   reflects(() => mount("calcite-action-bar"), {
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
        reflect: true,
      }));
  const cases = propValuePairs.map(
    ({ propertyName, value, reflect = true }) => [propertyName, value, reflect] as const,
  );

  it.each(cases.filter(([, , reflect]) => !reflect))("%s does not reflect", async (propertyName, value) => {
    const { el, reRender } = await setUp();
    Object.assign(el, { [propertyName]: value });
    await reRender();
    await expect.element(el).not.toHaveAttribute(propToAttr(propertyName));
  });

  it.each(cases.filter(([, , reflect]) => reflect))("%s", async (propertyName, value) => {
    const { el: setupEl, reRender } = await setUp();
    const el = setupEl as ElementProps;
    const attrName = propToAttr(propertyName);

    Object.assign(el, { [propertyName]: value });
    await reRender();
    await expect.element(el).toHaveAttribute(attrName);
  });

  it.each(cases.filter(([, value, reflect]) => reflect && typeof value === "boolean"))(
    "%s reflects boolean changes",
    async (propertyName) => {
      const { el, reRender } = await setUp();
      const attrName = propToAttr(propertyName);

      Object.assign(el, { [propertyName]: true });
      await reRender();
      await expect.element(el).toHaveAttribute(attrName, "");

      Object.assign(el, { [propertyName]: false });
      await reRender();
      await expect.element(el).not.toHaveAttribute(attrName);

      Object.assign(el, { [propertyName]: true });
      await reRender();
      await expect.element(el).toHaveAttribute(attrName, "");
    },
  );
}
