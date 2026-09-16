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
  light: TransformedToken;
}

interface ThemedDictionaries {
  dark: Dictionary;
  light: Dictionary;
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

async function getLightDarkDictionaries(platform: Platform): Promise<ThemedDictionaries> {
  const [darkDictionary, lightDictionary] = await Promise.all([
    dark.getPlatformTokens(platform, { cache: true }),
    light.getPlatformTokens(platform, { cache: true }),
  ]);

  return {
    light: lightDictionary,
    dark: darkDictionary,
  };
}

export async function getLightDarkDeclarations(args: Parameters<FormatFn>[0], format: Stylesheet): Promise<string[]> {
  const dictionaries = await getLightDarkDictionaries(args.options.platform);
  const tokens = getLightDarkTokenPairs(dictionaries);

  return tokens.map((tokenPair) => {
    const { dark, light } = tokenPair;
    const prefix = format === "css" ? "--" : "$";
    const description = light.$description;
    const comment = description ? (format === "css" ? ` /** ${description} */` : ` // ${description} */`) : "";
    const reference = getSharedReference(args, tokenPair, dictionaries);
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
  { dark, light }: ThemedTokenPair,
  { dark: darkDictionary, light: lightDictionary }: ThemedDictionaries,
): TransformedToken | undefined {
  const darkReference = getSingleReference(dark, darkDictionary);
  const lightReference = getSingleReference(light, lightDictionary);

  if (
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

function getSingleReference(token: TransformedToken, dictionary: Dictionary): TransformedToken | undefined {
  const references = getReferences(token.original.$value, dictionary.unfilteredTokens ?? dictionary.tokens, {
    usesDtcg: true,
    warnImmediately: false,
  });

  return references.length === 1 ? references[0] : undefined;
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

function getLightDarkTokenPairs(dictionaries: ThemedDictionaries): ThemedTokenPair[] {
  const darkTokens = dictionaries.dark.allTokens.filter((token) => isThemed(token, { theme: "dark" }));
  const darkTokensByPath = new Map(darkTokens.map((token) => [token.path.join("."), token]));

  return dictionaries.light.allTokens
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
