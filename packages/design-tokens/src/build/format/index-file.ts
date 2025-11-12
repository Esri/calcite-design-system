import prettierSync from "@prettier/sync";
import type { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import type { PlatformConfig } from "../../types/extensions.d.ts";
import type { Platform, RegisterFn, Stylesheet } from "../../types/interfaces.d.ts";
import { fromTokens } from "../utils/dictionary.ts";
import { isThemed } from "../utils/token-types.ts";
import { dark, light } from "../dictionaries/index.ts";
import { createVarList } from "./utils/index.ts";

export const registerFormatIndex: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatIndex,
    format: formatIndexFile,
  });
};

export const formatIndexFile: FormatFn = async (args) => {
  const { file, options } = args;
  const platform = args.platform as PlatformConfig;

  if (platform.options.platform !== "css" && platform.options.platform !== "scss") {
    throw new Error("Only css and scss platforms are supported.");
  }

  const header = await fileHeader({ file });
  const themes = ["light", "dark"] as const;
  const format: Stylesheet = platform.options.platform;

  const [darkDictionary, lightDictionary] = await Promise.all([
    dark.getPlatformTokens(options.platform, { cache: true }),
    light.getPlatformTokens(options.platform, { cache: true }),
  ]);

  const commonVarFormat: Extract<Platform, "css"> = "css";
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

  const classGroupStrategy = format === "css" ? "." : "@mixin ";
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

  return fileExtension === ".css" ? `@import url("./${fileBaseName}");` : `@use "./${fileBaseName}";`;
}

export const FormatIndex = "calcite/format/index";
