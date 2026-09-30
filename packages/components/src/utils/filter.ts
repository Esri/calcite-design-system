import { escapeRegExp, forIn } from "es-toolkit/compat";

export const filter = (data: Array<object>, value: string, filterProps?: string[]): Array<any> => {
  const escapedValue = escapeRegExp(value);
  const regex = new RegExp(escapedValue, "i");
  const matchAll = value === "";

  if (matchAll || data.length === 0) {
    return data;
  }

  const find = (input: object, RE: RegExp, fields?: string[]) => {
    if ((input as any)?.filterDisabled) {
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
