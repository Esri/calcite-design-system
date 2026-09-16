import prettierSync from "@prettier/sync";
import type { Dictionary, FormatFn, TransformedToken } from "style-dictionary/types";
import { fileHeader, getReferences } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import type { Platform, PlatformConfig, RegisterFn, Stylesheet } from "../../types.ts";
import { dark, light } from "../dictionaries/index.ts";
import { isThemed } from "../utils/token-types.ts";
import { createBlock, getStylesheetFormat } from "./utils/index.ts";

interface ThemedTokenPair {
  dark: TransformedToken;
  darkDictionary: Dictionary;
  light: TransformedToken;
  lightDictionary: Dictionary;
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

  return tokens.map(({ dark, darkDictionary, light, lightDictionary }) => {
    const prefix = format === "css" ? "--" : "$";
    const description = light.$description;
    const comment = description ? (format === "css" ? ` /** ${description} */` : ` // ${description} */`) : "";
    const reference = getSharedReference(args, dark, darkDictionary, light, lightDictionary);
    const value = reference
      ? format === "css"
        ? `var(--${reference.name})`
        : `$${reference.name}`
      : `light-dark(${light.$value}, ${dark.$value})`;

    return `${prefix}${light.name}: ${value};${comment}`;
  });
}

function getSharedReference(
  args: Parameters<FormatFn>[0],
  dark: TransformedToken,
  darkDictionary: Dictionary,
  light: TransformedToken,
  lightDictionary: Dictionary,
): TransformedToken | undefined {
  const darkReferences = getReferences(dark.original.$value, darkDictionary.unfilteredTokens ?? darkDictionary.tokens, {
    usesDtcg: true,
    warnImmediately: false,
  });
  const lightReferences = getReferences(
    light.original.$value,
    lightDictionary.unfilteredTokens ?? lightDictionary.tokens,
    { usesDtcg: true, warnImmediately: false },
  );
  const [darkReference] = darkReferences;
  const [lightReference] = lightReferences;

  if (
    darkReferences.length !== 1 ||
    lightReferences.length !== 1 ||
    !darkReference ||
    !lightReference ||
    darkReference.path.join(".") !== lightReference.path.join(".") ||
    !shouldOutputReference(args, dark, darkDictionary) ||
    !shouldOutputReference(args, light, lightDictionary)
  ) {
    return undefined;
  }

  return lightReference;
}

function shouldOutputReference(
  args: Parameters<FormatFn>[0],
  token: TransformedToken,
  dictionary: Dictionary,
): boolean {
  const { outputReferences } = args.options;

  return typeof outputReferences === "function"
    ? outputReferences(token, { dictionary, usesDtcg: true })
    : !!outputReferences;
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
        darkDictionary,
        light: lightToken,
        lightDictionary,
      };
    });
}

export const FormatLightDark = "calcite/format/light-dark";
