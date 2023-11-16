/**
 * Replaces the word "color" with "ui" when it is the first value in the path and removes the word "default" from the final token names.
 * This puts generated tokens in alignment with the theme variable names in Calcite-Colors
 *
 * @param {string[]} path the path to each token value in the Style Dictionary token object
 * @returns {string[]} an updated token path
 */
export const parseTokenPath = (path: string[]): [string[], string[]] =>
  path.reduce(
    (acc, p) => {
      const tokenPath = acc[0];
      const negativeNumberReference = acc[1];

      switch (p) {
        case "core":
        case "default":
        case "semantic":
          return acc;
        default:
          const priorPathSection = tokenPath.pop();
          if (p.includes(priorPathSection)) {
            tokenPath.push(p);
          } else {
            tokenPath.push(priorPathSection);
            tokenPath.push(p);
          }

          if (p[0] === "-") {
            negativeNumberReference.push(p);
          }

          break;
      }

      return [tokenPath, negativeNumberReference];
    },
    [[], []] as [string[], string[]]
  );
