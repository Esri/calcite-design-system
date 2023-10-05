/**
 * Find the string in a list
 * @param {string} str the string to find in the list
 * @param {string[]} list the list of strings to match with the provided string
 * @param {RegExp} regexExclude a regular expression defining strings that should always be excluded
 * @returns {boolean} does the string match the items in the list
 */
export const matchList = (str: string, list: string[], regexExclude: RegExp): boolean => {
  return list.some((value) => str.includes(value) && !regexExclude.test(str));
};
