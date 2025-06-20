import prettierSync from "@prettier/sync";
import type { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import { PlatformConfig } from "../../types/extensions.js";
import { RegisterFn, Stylesheet } from "../../types/interfaces.js";
import { fromTokens } from "../utils/dictionary.js";
import { isThemed } from "../utils/token-types.js";
import { dark, light } from "../dictionaries/index.js";
import { Platform } from "../utils/enums.js";
import { createVarList } from "./utils/index.js";

export const registerFormatIndex: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatIndex,
    format: formatIndexFile,
  });
};

export const formatIndexFile: FormatFn = async (args) => {
  const { file, options } = args;
  const platform = args.platform as PlatformConfig;

  if (platform.options.platform !== Platform.css && platform.options.platform !== Platform.scss) {
    throw new Error("Only css and scss platforms are supported.");
  }

  const header = await fileHeader({ file });
  const themes = ["light", "dark"] as const;
  const format: Stylesheet = platform.options.platform;

  const [darkDictionary, lightDictionary] = await Promise.all([
    dark.getPlatformTokens(options.platform, { cache: true }),
    light.getPlatformTokens(options.platform, { cache: true }),
  ]);

  const commonVarFormat = Platform.css;
  const varLists = {
    light: createVarList(
      commonVarFormat,
      fromTokens(
        lightDictionary.allTokens.filter((token) => isThemed(token) && token.attributes?.scope !== "component"),
      ),
      args,
    ),
    dark: createVarList(
      commonVarFormat,
      fromTokens(
        darkDictionary.allTokens.filter((token) => isThemed(token) && token.attributes?.scope !== "component"),
      ),
      args,
    ),
  } as const;

  const classGroupStrategy = format === Platform.css ? "." : "@mixin ";
  const imports = args.options.imports.map((imp: string) => importUrl(imp, options.fileExtension)).join("");
  const root = format === Platform.css ? `:root {${varLists.light}}` : "";
  const atMedia =
    format === Platform.css
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

export const FormatIndex = "calcite/format/index";
