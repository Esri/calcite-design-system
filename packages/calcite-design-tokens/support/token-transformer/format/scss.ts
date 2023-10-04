import { pascalCase, sentenceCase } from "change-case";
import sd, { Dictionary, File, Platform, Options } from "style-dictionary";

const { formatHelpers } = sd;

const regexThemeGroup = /calcite|brand/gi;
const regexFileNameWithoutExtension = /\w+(?=\.\w+$)/gi;

/**
 * Exports SCSS style formats
 * @param {object} fileInfo the file object
 * @param {Dictionary} fileInfo.dictionary the Style Dictionary object
 * @param {File} fileInfo.file information about the file to be generated
 * @param {Platform} [fileInfo.platform] the platform to generate the asset for
 * @param {Options} fileInfo.options the Style Dictionary format options passed from the config
 * @returns {string} a string that is passed to fs.writeFileSync
 */
export function formatSCSS(fileInfo: {
  dictionary: Dictionary;
  file: File;
  platform?: Platform;
  options: Options & { themeable?: boolean };
}): string {
  const { dictionary, file, options } = fileInfo;
  const { outputReferences } = options;
  const themeName = pascalCase(
    sentenceCase(file.destination.match(regexFileNameWithoutExtension)[0])
      .split(" ")
      .filter((n) => !regexThemeGroup.test(n))
      .join(" ")
    ).toLowerCase();
  return (
    formatHelpers.fileHeader({ file }) +
    formatHelpers.formattedVariables({ format: "sass", dictionary, outputReferences }).split('\n').filter((variable) => !variable.includes('[object Object]')).join('\n') + '\n' + '\n' +
    `@mixin calcite-theme-${themeName}() {\n` +
      formatHelpers.formattedVariables({ format: "css", dictionary, outputReferences }).split('\n').filter((variable) => !variable.includes('[object Object]')).join('\n') +
    `\n}\n`
  );
}
