import { format as prettierFormat } from "prettier";
import type { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import type { PlatformConfig, RegisterFn } from "../../types.ts";
import { getLightDarkDeclarations } from "./light-dark.ts";
import { createBlock, getStylesheetFormat } from "./utils/index.ts";

const themeColorSchemes = {
  auto: "light dark",
  dark: "dark",
  light: "light",
} as const;

export const registerFormatIndex: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatIndex,
    format: formatIndexFile,
  });
};

export const formatIndexFile: FormatFn = async (args) => {
  const { file, options } = args;
  const format = getStylesheetFormat(args.platform as PlatformConfig);
  const header = await fileHeader({ file });
  const declarations = await getLightDarkDeclarations(args, "css");
  const imports = (options.imports ?? [])
    .map((fileName: string) => importUrl(fileName, options.fileExtension))
    .join("");
  const isCss = format === "css";
  const lightDarkBlock = createBlock(
    isCss ? ":root" : "@mixin calcite-light-dark-tokens",
    isCss ? ["color-scheme: light dark;", ...declarations] : declarations,
  );
  const modeBlocks = Object.entries(themeColorSchemes).map(([theme, colorScheme]) =>
    createBlock(
      isCss ? `.calcite-mode-${theme}` : `@mixin calcite-mode-${theme}`,
      isCss
        ? [`color-scheme: ${colorScheme};`]
        : [`color-scheme: ${colorScheme};`, "@include calcite-light-dark-tokens;"],
    ),
  );
  const content = [imports, lightDarkBlock, ...modeBlocks].join("");

  return prettierFormat(`${header}${content}`, {
    parser: format,
  });
};

function importUrl(fileName: string, fileExtension: string): string {
  const fileBaseName = `${fileName}${fileExtension}`;

  return fileExtension === ".css" ? `@import url("./${fileBaseName}");` : `@use "./${fileBaseName}";`;
}

export const FormatIndex = "calcite/format/index";
