import prettierSync from "@prettier/sync";
import type { FormatFn, TransformedToken } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";

type TokenObject = Record<string, unknown>;

function isTokenLeaf(value: unknown): value is TokenObject {
  return !!(value && typeof value === "object" && "value" in value && "type" in value);
}

function isDeprecatedToken(token: TokenObject): boolean {
  const attributes = token.attributes as { docs?: string } | undefined;
  const hasDeprecatedAttributes = attributes?.docs === "deprecated";
  const extensions = token.extensions as { calcite?: { deprecated?: boolean } } | undefined;
  const hasDeprecatedExtensions = extensions?.calcite?.deprecated === true;

  return hasDeprecatedAttributes || hasDeprecatedExtensions;
}

function getSourceTokenShape(token: TransformedToken): TokenObject {
  const source = { ...((token.original ?? token) as TokenObject) };

  delete source.key;

  if ("$extensions" in source && !source.extensions) {
    source.extensions = source.$extensions;
    delete source.$extensions;
  }

  return source;
}

function mapTokensToSourceShape(value: unknown): unknown {
  if (!value || typeof value !== "object") {
    return value;
  }

  if (isTokenLeaf(value)) {
    return getSourceTokenShape(value as unknown as TransformedToken);
  }

  return Object.fromEntries(
    Object.entries(value as TokenObject).map(([key, nestedValue]) => [key, mapTokensToSourceShape(nestedValue)]),
  );
}

function flattenRedundantFileKeys(value: unknown, destination: string): unknown {
  const keyCandidates = destination
    .replace(/\.json$/i, "")
    .split("/")
    .filter((segment) => segment && segment !== "figma");

  let current = value;

  keyCandidates.forEach((segment) => {
    if (
      current &&
      typeof current === "object" &&
      !Array.isArray(current) &&
      Object.keys(current as TokenObject).length === 1 &&
      (current as TokenObject)[segment]
    ) {
      current = (current as TokenObject)[segment];
    }
  });

  return current;
}

function pruneDeprecatedTokens(value: unknown): unknown {
  if (Array.isArray(value)) {
    const prunedValues = value.map((item) => pruneDeprecatedTokens(item)).filter((item) => item !== undefined);

    return prunedValues.length ? prunedValues : undefined;
  }

  if (!value || typeof value !== "object") {
    return value;
  }

  if (isTokenLeaf(value)) {
    return isDeprecatedToken(value) ? undefined : value;
  }

  const prunedEntries = Object.entries(value as TokenObject)
    .map(([key, nestedValue]) => [key, pruneDeprecatedTokens(nestedValue)] as const)
    .filter(([, nestedValue]) => nestedValue !== undefined);

  if (!prunedEntries.length) {
    return undefined;
  }

  return Object.fromEntries(prunedEntries);
}

export const formatFigmaPlatform: FormatFn = async ({ dictionary, file }) => {
  const sourceLikeObject = mapTokensToSourceShape(dictionary.tokens) as TokenObject;
  const flattenedObject = flattenRedundantFileKeys(sourceLikeObject, file.destination);
  const output = pruneDeprecatedTokens(flattenedObject) ?? {};

  return prettierSync.format(JSON.stringify(output, null, 2), { parser: "json" });
};

export const registerFormatFigma: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatCalciteFigma,
    format: formatFigmaPlatform,
  });
};

export const FormatCalciteFigma = "calcite/format/figma";
