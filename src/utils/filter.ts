import { escapeRegExp, forIn } from "lodash-es";

export const filter = (data: Array<object>, value: string): Array<any> => {
  const escapedValue = escapeRegExp(value);
  const regex = new RegExp(escapedValue, "i");

  if (data.length === 0) {
    console.warn(`No data was passed to the filter function.
    The data argument should be an array of objects`);
  }

  const find = (input: object, RE: RegExp) => {
    if ((input as any)?.constant || (input as any)?.filterDisabled) {
      return true;
    }
    let found = false;

    forIn(input, (val) => {
      if (typeof val === "function" || val == null /* intentional == to catch undefined */) {
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

  const result = data.filter((item) => {
    return find(item, regex);
  });

  return result;
};
