/**
 * Replaces the word "color" with "ui" when it is the first value in the path and removes the word "default" from the final token names.
 * This puts generated tokens in alignment with the theme variable names in Calcite-Colors
 *
 * @param {string[]} path the path to each token value in the Style Dictionary token object
 * @returns {string[]} an updated token path
 */
export const parseTokenPath = (path: string[]): string[] =>
  path.reduce((acc, p, idx) => {
    if (idx === 0 && p === "color") {
      // change "color" to "ui"
      acc.push("ui");
    } else if (p === "core") {
      // change "core" to "app"
      acc.push("app");
    } else if (p === "default") {
      // remove "default" from final name
      return acc;
    } else {
      if (p.includes(acc[acc.length - 1])) {
        // Remove changes tokens like font-font-size to font-size
        acc[acc.length - 1] = p;
      } else {
        acc.push(p);
      }
    }

    return acc;
  }, []);
