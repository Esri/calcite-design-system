import { escapeRegExp, forIn } from "lodash-es";
import { logger } from "./logger";

export const filter = (data: Array<object>, value: string, filterProps?: string[]): Array<any> => {
  const escapedValue = escapeRegExp(value);
  const regex = new RegExp(escapedValue, "i");

  if (data.length === 0) {
    logger.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);
  }

  const find = (input: object, RE: RegExp, fields?: string[]) => {
    if ((input as any)?.constant || (input as any)?.filterDisabled) {
      return true;
    }

    let found = false;

    forIn(input, (val, key) => {
      if (typeof val === "function" || val == null /* intentional == to catch undefined */) {
        return;
      }

      if (fields && !fields.includes(key)) {
        return;
      }

      if (Array.isArray(val) || (typeof val === "object" && val !== null)) {
        if (find(val, RE)) {
          found = true;
        }
      } else if (RE.test(val)) {
        found = true;
      }
    });

    return found;
  };

  return data.filter((item) => find(item, regex, filterProps));
};
