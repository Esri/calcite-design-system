import prettierSync from "@prettier/sync";
import { Dictionary, FormatFn, FormatFnArguments, TransformedTokens } from "style-dictionary/types";
import { fileHeader, formattedVariables } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import { RegisterFn, Stylesheet } from "../types/interfaces.js";
import { fromTokens } from "../utils/dictionary.js";

export const registerFormatIndex: RegisterFn = async () => {
  StyleDictionary.registerFormat({
    name: FormatIndex,
    format: formatIndexFile,
  });
};

export const formatIndexFile: FormatFn = async (args) => {
  const { dictionary, file, options } = args;

  if (options.fileExtension !== ".css" && options.fileExtension !== ".scss") {
    throw new Error("Only .css and .scss file extensions are supported.");
  }

  const header = await fileHeader({ file });
  const themes = ["light", "dark"] as const;
  const format = options.fileExtension.replace(".", "") as Stylesheet;

  const themedTokens = dictionary.allTokens.reduce(
    (acc: { light: TransformedTokens; dark: TransformedTokens }, token) => {
      if (token.path.includes("light")) {
        acc.light[token.name] = token;
      } else if (token.path.includes("dark")) {
        acc.dark[token.name] = token;
      }
      return acc;
    },
    { light: {}, dark: {} },
  );

  const commonVarFormat = "css";
  const varLists = {
    light: createVarList(commonVarFormat, fromTokens(themedTokens.light), args),
    dark: createVarList(commonVarFormat, fromTokens(themedTokens.dark), args),
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
