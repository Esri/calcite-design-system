/**
 * Custom integer matcher to use with object matchers.
 *
 * @see [Custom Asymmetric Equality Testers](https://jasmine.github.io/tutorials/custom_asymmetric_equality_testers).
 */
export function toBeInteger(): any {
  return {
    asymmetricMatch(abc: string): boolean {
      return Number.isInteger(abc);
    },

    jasmineToString(): string {
      return `Expected value to be an integer.`;
    },
  };
}

/**
 * Custom number matcher to use with object matchers.
 *
 * @see [Custom Asymmetric Equality Testers](https://jasmine.github.io/tutorials/custom_asymmetric_equality_testers).
 */
export function toBeNumber(): any {
  return {
    asymmetricMatch(expected: string): boolean {
      return !isNaN(parseFloat(expected)) && isFinite(Number(expected));
    },

    jasmineToString(): string {
      return `Expected value to be an number.`;
    },
  };
}
