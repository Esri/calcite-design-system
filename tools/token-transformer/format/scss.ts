import { pascalCase, sentenceCase } from "change-case";
import sd, { Dictionary, File, Platform, Options } from "style-dictionary";

const { formatHelpers } = sd;

const regexThemeGroup = /calcite|brand/gi;
const regexFileNameWithoutExtension = /\w+(?=\.\w+$)/gi;

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
      .toLocaleLowerCase()
  );
  return (
    formatHelpers.fileHeader({ file }) +
    `@mixin calcite-theme-${themeName}() {\n` +
    formatHelpers.formattedVariables({ format: "css", dictionary, outputReferences }) +
    `\n}\n`
  );
}
