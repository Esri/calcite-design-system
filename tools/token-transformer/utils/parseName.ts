import { paramCase } from "change-case";

/**
 * Used to set the file name for the generated theme file.
 * @param {string} name the file name passed from the themes object
 * @param {string} prefix an optional prefix for each file name
 * @returns {string} a kebab-case file name from the passed name, optionally starting with a prefix
 */
export function parseName(name: string): string {
  const regexWord = /^\w+$/;
  const themeName = `${name}`
    .split(" ")
    .filter((word) => regexWord.test(word))
    .join(" ");

  return paramCase(themeName);
}
