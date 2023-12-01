/**
 * Replaces the word "color" with "ui" when it is the first value in the path and removes the word "default" from the final token names.
 * This puts generated tokens in alignment with the theme variable names in Calcite-Colors
 *
 * @param {string[]} path the path to each token value in the Style Dictionary token object
 * @returns {string[]} an updated token path
 */
export const parseTokenPath = (path: string[]): string[] =>
  path.reduce((acc, p) => {
    const tokenPath = acc;

    switch (p) {
      case "core":
      case "default":
      case "semantic":
        return acc;
      default:
        const priorPathSection = tokenPath.pop();
        let str = "";

        for (let i = 0; i < p.length; i++) {
          const s = p[i];
          if (s === "-" || s === "+") {
            if (str.includes(priorPathSection)) {
              tokenPath.push(str);
            } else {
              tokenPath.push(priorPathSection);
              tokenPath.push(str);
            }

            str = "";

            if (s === "-") {
              tokenPath.push("minus");
            }

            if (s === "+") {
              tokenPath.push("plus");
            }
          } else {
            str += s;
          }
        }

        if (str.length > 0) {
          if (str.includes(priorPathSection)) {
            tokenPath.push(str);
          } else {
            tokenPath.push(priorPathSection);
            tokenPath.push(str);
          }

          str = "";
        }

        break;
    }

    return tokenPath;
  }, [] as string[]);
