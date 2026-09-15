import prettierSync from "@prettier/sync";
import type { FormatFn, TransformedToken } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import type { Platform, PlatformConfig, RegisterFn, Stylesheet } from "../../types.ts";
import { dark, light } from "../dictionaries/index.ts";
import { isThemed } from "../utils/token-types.ts";

interface ThemedTokenPair {
  dark: TransformedToken;
  light: TransformedToken;
}

type VariableStyle = "css-custom-property" | "scss-variable";

export const registerFormatLightDark: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatLightDark,
    format: formatLightDarkFile,
  });
};

export const formatLightDarkFile: FormatFn = async (args) => {
  const format = getStylesheetFormat(args.platform as PlatformConfig);
  const header = await fileHeader({ file: args.file });
  const declarations = await getLightDarkDeclarations(args, format === "css" ? "css-custom-property" : "scss-variable");
  const rootLines = format === "css" ? ["color-scheme: light dark;", ...declarations] : declarations;
  const content = format === "css" ? createBlock(":root", rootLines) : rootLines.join("\n");

  return prettierSync.format(`${header}${content}`, {
    parser: format,
  });
};

export async function getLightDarkDeclarations(
  args: Parameters<FormatFn>[0],
  variableStyle: VariableStyle,
): Promise<string[]> {
  const tokens = await getLightDarkTokenPairs(args.options.platform);

  return tokens.map(({ dark, light }) => {
    const prefix = variableStyle === "css-custom-property" ? "--" : "$";
    const format = variableStyle === "css-custom-property" ? "css" : "scss";
    const comment = light.comment ? (format === "css" ? ` /** ${light.comment} */` : ` // ${light.comment}`) : "";

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

function createBlock(selector: string, lines: string[]): string {
  return `${selector} {\n${indent(lines.join("\n"))}\n}`;
}

function getStylesheetFormat(platform: PlatformConfig): Stylesheet {
  if (platform.options.platform !== "css" && platform.options.platform !== "scss") {
    throw new Error("Only css and scss platforms are supported.");
  }

  return platform.options.platform;
}

function indent(content: string): string {
  return content
    .split("\n")
    .map((line) => `  ${line}`)
    .join("\n");
}

export const FormatLightDark = "calcite/format/light-dark";
