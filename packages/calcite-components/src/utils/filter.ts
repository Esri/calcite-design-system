import { escapeRegExp, forIn } from "lodash-es";

export type FilterItem = {
  constant?: boolean;
  [key: string]: any;
};

export const filter = (data: FilterItem[], value: string, filterProps?: string[]): FilterItem[] => {
  const escapedValue = escapeRegExp(value);
  const regex = new RegExp(escapedValue, "i");

  if (data.length === 0) {
    console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);
  }

  const find = (input: FilterItem, RE: RegExp, fields?: string[]) => {
    if (input?.constant) {
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
