import prettierSync from "@prettier/sync";
import type { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import type { PlatformConfig, RegisterFn, Stylesheet } from "../../types.ts";
import { getLightDarkDeclarations } from "./light-dark.ts";

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
  const declarations = await getLightDarkDeclarations(args, "css-custom-property");
  const imports = (args.options.imports || []).map((imp: string) => importUrl(imp, options.fileExtension)).join("");

  const content =
    format === "css"
      ? [
          imports,
          createBlock(":root", ["color-scheme: light dark;", ...declarations]),
          ...Object.entries(themeColorSchemes).map(([theme, colorScheme]) =>
            createBlock(`.calcite-mode-${theme}`, [`color-scheme: ${colorScheme};`]),
          ),
        ]
          .filter(Boolean)
          .join("")
      : [
          imports,
          createBlock("@mixin calcite-light-dark-tokens", declarations),
          ...Object.entries(themeColorSchemes).map(([theme, colorScheme]) =>
            createBlock(`@mixin calcite-mode-${theme}`, [
              `color-scheme: ${colorScheme};`,
              "@include calcite-light-dark-tokens;",
            ]),
          ),
        ]
          .filter(Boolean)
          .join("");

  return prettierSync.format(`${header}${content}`, {
    parser: format,
  });
};

function createBlock(selector: string, lines: string[]): string {
  return `${selector} {\n${indent(lines.join("\n"))}\n}`;
}

function getStylesheetFormat(platform: PlatformConfig): Stylesheet {
  if (platform.options.platform !== "css" && platform.options.platform !== "scss") {
    throw new Error("Only css and scss platforms are supported.");
  }

  return platform.options.platform;
}

function importUrl(fileName: string, fileExtension: string) {
  const fileBaseName = `${fileName}${fileExtension}`;

  return fileExtension === ".css" ? `@import url("./${fileBaseName}");` : `@use "./${fileBaseName}";`;
}

function indent(content: string): string {
  return content
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
}

export const FormatIndex = "calcite/format/index";
