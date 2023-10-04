import sd, { Dictionary, File, Platform, Options } from "style-dictionary";

const { formatHelpers } = sd;

/**
 * Exports SCSS style formats
 *
 * @param {object} fileInfo the file object
 * @param {Dictionary} fileInfo.dictionary the Style Dictionary object
 * @param {File} fileInfo.file information about the file to be generated
 * @param {Platform} [fileInfo.platform] the platform to generate the asset for
 * @param {Options} fileInfo.options the Style Dictionary format options passed from the config
 * @returns {string} a string that is passed to fs.writeFileSync
 */
export function formatCSS(fileInfo: {
  dictionary: Dictionary;
  file: File;
  platform?: Platform;
  options: Options & { themeable?: boolean };
}): string {
  const { dictionary, file, options } = fileInfo;
  const { outputReferences } = options;
  return (
    formatHelpers.fileHeader({ file }) +
    `:root {\n` +
    formatHelpers
      .formattedVariables({ format: "css", dictionary, outputReferences })
      .split("\n")
      .filter((variable) => !variable.includes("[object Object]"))
      .join("\n") +
    `\n}\n`
  );
}
