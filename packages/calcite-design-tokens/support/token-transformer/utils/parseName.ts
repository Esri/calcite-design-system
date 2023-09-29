import { paramCase } from "change-case";

/**
 * Used to set the file name for the generated theme file.
 *
 * @param {string} name the file name passed from the themes object
 * @returns {string} a kebab-case file name from the passed name, optionally starting with a prefix
 */
export function parseName(name: string): string {
  const regex = /\.\w+$/;
  const indexOfFileExtension = name.search(regex);
  const normalizedName =
    indexOfFileExtension === -1
      ? name
      : name
          .slice(0, indexOfFileExtension)
          .split("/")
          .map((n) => paramCase(n))
          .join("/");

  return normalizedName;
}
