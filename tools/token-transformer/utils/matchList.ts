/**
 * @param str the string to find in the list
 * @param list the list of strings to match with the provided string
 * @param regexExclude a regular expression defining strings that should always be excluded
 * @returns boolean
 */
export const matchList = (str: string, list: string[], regexExclude: RegExp) => {
  return list.some((value) => str.includes(value) && !regexExclude.test(str));
};
