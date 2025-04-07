import prettierSync from "@prettier/sync";
import { Dictionary, FormatFn, FormatFnArguments } from "style-dictionary/types";
import { fileHeader, formattedVariables } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import { RegisterFn, Stylesheet } from "../types/interfaces.js";
import { fromTokens } from "../utils/dictionary.js";
import { isThemed } from "../utils/token-types.js";
import { dark, light } from "../dictionaries/index.js";

export const registerFormatIndex: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatIndex,
    format: formatIndexFile,
  });
};

export const formatIndexFile: FormatFn = async (args) => {
  const { file, options } = args;

  if (options.fileExtension !== ".css" && options.fileExtension !== ".scss") {
    throw new Error("Only .css and .scss file extensions are supported.");
  }

  const header = await fileHeader({ file });
  const themes = ["light", "dark"] as const;
  const format = options.fileExtension.replace(".", "") as Stylesheet;

  const darkDictionary = await dark.getPlatformTokens(options.platform, { cache: true });
  const lightDictionary = await light.getPlatformTokens(options.platform, { cache: true });

  const commonVarFormat = "css";
  const varLists = {
    light: createVarList(
      commonVarFormat,
      fromTokens(lightDictionary.allTokens.filter((token) => isThemed(token, { theme: "light" }))),
      args,
    ),
    dark: createVarList(
      commonVarFormat,
      fromTokens(darkDictionary.allTokens.filter((token) => isThemed(token, { theme: "dark" }))),
      args,
    ),
  } as const;

  const classGroupStrategy = format === "scss" ? "@mixin " : ".";
  const imports = args.options.imports.map((imp: string) => importUrl(imp, options.fileExtension)).join("");
  const root = format === "css" ? `:root {${varLists.light}}` : "";
  const atMedia =
    format === "css"
      ? themes
          .map((theme) => `@media (prefers-color-scheme: ${theme}) {.calcite-mode-auto {${varLists[theme]}}}`)
          .join("")
      : "";
  const platformClasses = themes
    .map((theme) => `${classGroupStrategy}calcite-mode-${theme} {${varLists[theme]}}`)
    .join("");
  const content = [imports, root, atMedia, platformClasses].filter((item) => !!item).join("");

  return prettierSync.format(`${header}${content}`, {
    parser: format,
  });
};

function importUrl(fileName: string, fileExtension: string) {
  const fileBaseName = `${fileName}${fileExtension}`;

  return `@import ${fileExtension === ".css" ? `url("./${fileBaseName}")` : `"./${fileBaseName}"`};`;
}

function createVarList(format: Stylesheet, dictionary: Dictionary, args: FormatFnArguments) {
  return formattedVariables({
    format,
    dictionary,
    ...args.options,
  });
}

export const FormatIndex = "calcite/format/index";
