/**
 * Replaces the word "color" with "ui" when it is the first value in the path and removes the word "default" from the final token names.
 * This puts generated tokens in alignment with the theme variable names in Calcite-Colors
 *
 * @param {string[]} path the path to each token value in the Style Dictionary token object
 * @returns {string[]} an updated token path
 */
export const parseTokenPath = (path: string[]): string[] => {
  const parsedPath = [];

  for (let i = 0; i < path.length; i++) {
    const p = path[i];

    switch (p) {
      case "core":
      case "default":
      case "semantic":
        continue;
      default:
        const priorPathSection = parsedPath.pop();

        if (p.length > 0) {
          if (p.includes(priorPathSection)) {
            if (p[0] === "-") {
              parsedPath.push("minus");
            }
            parsedPath.push(p);
          } else {
            parsedPath.push(priorPathSection);
            if (p[0] === "-") {
              parsedPath.push("minus");
            }
            parsedPath.push(p);
          }
        }

        if (p[p.length - 1] === "+") {
          parsedPath.push("plus");
        }

        break;
    }
  }
  return parsedPath;
};
