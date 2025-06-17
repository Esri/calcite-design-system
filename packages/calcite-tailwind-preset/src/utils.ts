/**
 * This helper inverts a value based on a boolean CSS prop flag
 *
 * When the flag is 0, it will not be inverted. When 1, it will invert it (multiplied by -1)
 *
 * @param {string} value - the CSS value to invert
 * @param {string} flagPropName - the boolean CSS prop (value must be 0 or 1)
 */
export function invert(value: string, flagPropName: string): string {
  return `calc(
            ${value} *
            calc(
              1 -
              2 * clamp(
                0,
                var(${flagPropName}),
                1
              )
            )
          )`;
}
