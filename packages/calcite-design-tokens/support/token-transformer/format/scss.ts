import { pascalCase, sentenceCase } from "change-case";
import StyleDictionary, { Dictionary, File, Platform, Options } from "style-dictionary";
import { sortAllTokens } from "../utils/sortAllTokens.js";

const regexThemeGroup = /calcite|brand/gi;
const regexFileNameWithoutExtension = /\w+(?=\.\w+$)/gi;

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
  const sassProps = StyleDictionary.formatHelpers.createPropertyFormatter({
    outputReferences,
    dictionary,
    format: "sass",
  });
  const cssProps = StyleDictionary.formatHelpers.createPropertyFormatter({
    outputReferences,
    dictionary,
    format: "css",
    formatting: {
      prefix: fileInfo.platform.prefix,
    },
  });
  const regexNamePartial = new RegExp(`(${fileInfo.platform.prefix}|semantic|app)-`, "g");
  const sortedTokens = sortAllTokens(dictionary, outputReferences);
  const coreTokens = [...sortedTokens].reduce(
    (acc, token) => {
      if (typeof token.value === "string") {
        token.value = token.value.includes(" ") ? `"${token.value}"` : token.value === "Demi" ? 600 : token.value;
        acc[1].push(cssProps(token));
        acc[0].push(sassProps(token).replaceAll(regexNamePartial, ""));
      }

      return acc;
    },
    [[], []]
  );

  return `${StyleDictionary.formatHelpers.fileHeader({ file })}
${coreTokens[0].join("\n")}

@mixin calcite-theme-${themeName}() {
${coreTokens[1].join("\n")}
}`;
}
