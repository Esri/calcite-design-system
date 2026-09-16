import prettierSync from "@prettier/sync";
import type { FormatFn, TransformedToken } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import type { Platform, PlatformConfig, RegisterFn, Stylesheet } from "../../types.ts";
import { dark, light } from "../dictionaries/index.ts";
import { isThemed } from "../utils/token-types.ts";
import { createBlock, getStylesheetFormat } from "./utils/index.ts";

interface ThemedTokenPair {
  dark: TransformedToken;
  light: TransformedToken;
}

export const registerFormatLightDark: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatLightDark,
    format: formatLightDarkFile,
  });
};

export const formatLightDarkFile: FormatFn = async (args) => {
  const format = getStylesheetFormat(args.platform as PlatformConfig);
  const header = await fileHeader({ file: args.file });
  const declarations = await getLightDarkDeclarations(args, format);
  const content =
    format === "css" ? createBlock(":root", ["color-scheme: light dark;", ...declarations]) : declarations.join("\n");

  return prettierSync.format(`${header}${content}`, {
    parser: format,
  });
};

export async function getLightDarkDeclarations(args: Parameters<FormatFn>[0], format: Stylesheet): Promise<string[]> {
  const tokens = await getLightDarkTokenPairs(args.options.platform);

  return tokens.map(({ dark, light }) => {
    const prefix = format === "css" ? "--" : "$";
    const description = light.$description;
    const comment = description ? (format === "css" ? ` /** ${description} */` : ` // ${description} */`) : "";

    return `${prefix}${light.name}: light-dark(${light.$value}, ${dark.$value});${comment}`;
  });
}

async function getLightDarkTokenPairs(platform: Platform): Promise<ThemedTokenPair[]> {
  const [darkDictionary, lightDictionary] = await Promise.all([
    dark.getPlatformTokens(platform, { cache: true }),
    light.getPlatformTokens(platform, { cache: true }),
  ]);
  const darkTokens = darkDictionary.allTokens.filter((token) => isThemed(token, { theme: "dark" }));
  const darkTokensByPath = new Map(darkTokens.map((token) => [token.path.join("."), token]));

  return lightDictionary.allTokens
    .filter((token) => isThemed(token, { theme: "light" }))
    .map((lightToken) => {
      const tokenPath = lightToken.path.join(".");
      const darkToken = darkTokensByPath.get(tokenPath);

      if (!darkToken) {
        throw new Error(`Missing dark theme token for "${tokenPath}".`);
      }

      return {
        dark: darkToken,
        light: lightToken,
      };
    });
}

export const FormatLightDark = "calcite/format/light-dark";
