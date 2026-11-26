import { expect, it } from "vitest";
import type { LitElement, ToElement } from "@arcgis/lumina";
import { camelToKebab as propToAttr } from "@arcgis/toolkit/string";

type ReflectProps<E extends HTMLElement> = Extract<keyof E, string>[] | { [K in Extract<keyof E, string>]?: boolean };

/**
 * Asserts property reflection declarations without mounting the component.
 *
 * Pass property names to expect reflection, or a map of expected reflection flags.
 * Converter behavior and component-specific attribute updates need browser tests.
 * Use this helper within a describe block.
 *
 * @example
 * describe("reflects", () => {
 *   reflects(Action, ["active"]);
 * });
 *
 * @example <caption>including non-reflecting properties</caption>
 * describe("reflects", () => {
 *   reflects(Action, {
 *     active: true,
 *     text: false
 *   });
 * });
 */
export function reflects<Component extends typeof LitElement>(
  component: Component,
  propsToTest: ReflectProps<ToElement<InstanceType<Component>>>,
): void {
  const cases: [string, boolean][] = Array.isArray(propsToTest)
    ? propsToTest.map((propertyName) => [propertyName, true])
    : Object.entries(propsToTest);

  it.each(cases)("%s", (propertyName, reflect) => {
    // Reading observedAttributes finalizes inherited declarations without constructing an element.
    void component.observedAttributes;
    expect(component.elementProperties.get(propertyName)).toMatchObject({
      reflect,
      ...(reflect ? { attribute: propToAttr(propertyName) } : {}),
    });
  });
}
