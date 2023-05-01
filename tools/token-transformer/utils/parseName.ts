import { paramCase } from "change-case";

/**
 *
 * @param name the file name passed from the themes object
 * @param prefix an optional prefix for each file name
 * @returns a kebab-case file name from the passed name, optionally starting with a prefix
 */
export function parseName(name: string, prefix?: string) {
  const regexWord = /^\w+$/;
  const themeName = `${prefix || ''} ${name}`.split(" ").filter((word) => regexWord.test(word)).join(' ');

  return paramCase(themeName);
}
