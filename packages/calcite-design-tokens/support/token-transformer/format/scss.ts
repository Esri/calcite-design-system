import * as changeCase from "change-case";
import { default as styleDictionary } from "style-dictionary";
import { Dictionary } from "style-dictionary/types/Dictionary";
import { File } from "style-dictionary/types/File";
import { Formatter } from "style-dictionary/types/Format";
import { Options } from "style-dictionary/types/Options";
import { Platform } from "style-dictionary/types/Platform";
// , { Dictionary, File, Platform, Options }
// import * as styleDictionary, { Dictionary, File, Platform, Options } from "style-dictionary";
const { pascalCase, sentenceCase } = changeCase;

const regexThemeGroup = /calcite|brand/gi;
const regexFileNameWithoutExtension = /\w+(?=\.\w+$)/gi;
const { formatHelpers } = styleDictionary;
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
export const formatSCSS: Formatter = (fileInfo: {
  dictionary: Dictionary;
  file: File;
  platform?: Platform;
  // eslint-disable-next-line @cspell/spellchecker
  options: Options & { themeable?: boolean };
}) => {
  const { dictionary, file, options } = fileInfo;
  const { outputReferences } = options;
  const fileRegexMatch = file.destination.match(regexFileNameWithoutExtension);

  if (fileRegexMatch) {
    const themeName = pascalCase(
      sentenceCase(fileRegexMatch ? fileRegexMatch[0] : "")
        .split(" ")
        .filter((n) => !regexThemeGroup.test(n))
        .join(" ")
    ).toLowerCase();

    return (
      formatHelpers.fileHeader({ file }) +
      formatHelpers
        .formattedVariables({ format: "sass", dictionary, outputReferences })
        .split("\n")
        .filter((customProp) => !customProp.includes("ui-component"))
        .join("\n") +
      "\n" +
      `@mixin calcite-theme-${themeName}() {\n` +
      formatHelpers
        .formattedVariables({ format: "css", dictionary, outputReferences })
        .split("\n")
        .filter((customProp) => !customProp.includes("ui-component"))
        .join("\n") +
      `\n}\n`
    );
  }

  return "";
};
