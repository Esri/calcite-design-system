import { pascalCase, sentenceCase } from "change-case";
import sd, { Dictionary, File, Platform, Options, TransformedToken } from "style-dictionary";

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
  const coreTokens: TransformedToken[] = dictionary.allTokens.reduce((acc, token) => {
    if (token.filePath.includes("core")) {
      const path = token.path.filter((p) => !/(core|default|font$)/.test(p));
      token.name = token.type === "color" ? path.slice(-1).join("-") : path.join("-");
      token.value = token.value.includes(" ") ? `"${token.value}"` : token.value === "Demi" ? 600 : token.value;

      acc.push(token);
    }
    return acc;
  }, []);
  return formatHelpers.fileHeader({ file }) + file.destination.includes("headless")
    ? formatHelpers.formattedVariables({
        format: "sass",
        dictionary: { ...dictionary, allTokens: coreTokens },
        outputReferences
      }) + "\n"
    : "" +
        `@mixin calcite-theme-${themeName}() {\n` +
        formatHelpers.formattedVariables({ format: "css", dictionary, outputReferences }) +
        `\n}\n`;
}
