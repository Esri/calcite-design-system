/**
 * Replaces the word "color" with "ui" when it is the first value in the path and removes the word "default" from the final token names.
 * This puts generated tokens in alignment with the theme variable names in Calcite-Colors
 *
 * @param {string[]} path the path to each token value in the Style Dictionary token object
 * @returns {string[]} an updated token path
 */
export const parseTokenPath = (path: string[]): string[] => {
  return path.reduce((acc, p, idx) => {
    if (["core", "semantic"].includes(p)) {
      return acc;
    }

    if (idx === 0 && p === "color") {
      acc.push("ui");
    } else if (p === "default") {
      return acc;
    } else if (acc[acc.length - 1] && p.includes(acc[acc.length - 1])) {
      acc[acc.length - 1] = p;
    } else {
      acc.push(p);
    }

    return acc;
  }, []);
};
