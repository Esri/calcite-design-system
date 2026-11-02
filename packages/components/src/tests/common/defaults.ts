import { expect, it } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";

type DefaultProps<E extends HTMLElement> = Array<{
  propertyName: Extract<keyof E, string>;
  defaultValue: E[Extract<keyof E, string>];
}>;

type ShorthandDefaultProps<E extends HTMLElement> = {
  [K in Extract<keyof E, string>]?: E[K];
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
>(setUp: () => RenderResult, propsToTest: DefaultProps<ElementProps> | ShorthandDefaultProps<ElementProps>): void {
  const propValuePairs = Array.isArray(propsToTest)
    ? propsToTest
    : (Object.keys(propsToTest) as Extract<keyof ElementProps, string>[]).map((propertyName) => ({
        propertyName,
        defaultValue: propsToTest[propertyName],
      }));

  it.each(propValuePairs.map(({ propertyName, defaultValue }) => [propertyName, defaultValue] as const))(
    "%s",
    async (propertyName, defaultValue) => {
      const el = (await setUp()).el as ElementProps;
      const propValue = el[propertyName];

      if (propertyName === "validity") {
        expectValidityEqual(propValue as ValidityState, defaultValue as ValidityState);
        return;
      }

      expect(propValue).toEqual(defaultValue);
    },
  );
}

function expectValidityEqual(actual: ValidityState, expected: ValidityState) {
  const validityKeys = Object.keys(ValidityState.prototype) as (keyof ValidityState)[];
  const validitySnapshot = Object.fromEntries(validityKeys.map((key) => [key, actual[key]]));

  expect(validitySnapshot).toEqual(expected);
}

export const defaultValidity: ValidityState = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valid: true,
  valueMissing: false,
};
