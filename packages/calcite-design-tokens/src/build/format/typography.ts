import prettierSync from "@prettier/sync";
import type { Dictionary, FormatFn, FormatFnArguments, TransformedToken } from "style-dictionary/types";
import { fileHeader, getReferences } from "style-dictionary/utils";
import { kebabCase } from "change-case";
import get from "lodash-es/get.js";
import StyleDictionary from "style-dictionary";
import { RegisterFn, Stylesheet } from "../../types/interfaces.js";
import { state } from "../shared/state.js";
import { FlattenedTransformedToken } from "../../types/extensions.js";

function getValue(value: string, dictionary: Dictionary, outputRef = true): string {
  if (!dictionary.unfilteredTokens) {
    throw new Error(`Unfiltered tokens are required`);
  }

  // heuristic: typography tokens only have a single reference
  const [mappedToken] = getReferences(value, dictionary.unfilteredTokens);
  return outputRef ? `var(--${mappedToken.name});` : mappedToken.value;
}

function outputComment(comment: string, format: Stylesheet): string {
  if (!comment) {
    return "";
  }

  return format === "scss" ? `// ${comment}` : `/* ${comment} */`;
}

function getContent(args: FormatFnArguments, format: Stylesheet): string {
  const { dictionary } = args;

  // we do this to have output match the current test snapshot
  // we can remove this afterward for consistency and to simplify
  const extendedTokenReferences = new Map<string, TransformedToken>();
  dictionary.allTokens.forEach((token: FlattenedTransformedToken) => {
    const hasExtensions = !!token.extensions;
    if (hasExtensions) {
      const extensionTokenKey = token.original.extensions["calcite.extends"];
      const extensionToken = dictionary.tokenMap.get(extensionTokenKey);

      if (!extensionToken) {
        throw new Error(`Extension token ${extensionTokenKey} not found`);
      }

      extendedTokenReferences.set(token.key, extensionToken);
    }
  });

  const selfReferencingTokens = new Map<string, TransformedToken>();
  dictionary.allTokens.forEach((token: FlattenedTransformedToken) => {
    const preprocessedToken = get(state.postMergeDictionary, token.path.join("."));

    if (typeof preprocessedToken.value === "string" && preprocessedToken.value.startsWith("{semantic.typography")) {
      const referencedExtensionToken = dictionary.tokenMap.get(preprocessedToken.value);
      if (referencedExtensionToken) {
        selfReferencingTokens.set(token.key, referencedExtensionToken);
      }
    }
  });

  const groupToDeclarations = new Map<string, string[]>();

  dictionary.allTokens.forEach((token: FlattenedTransformedToken) => {
    const originalValue = token.original.value;
    const extendedToken = selfReferencingTokens.get(token.key) || extendedTokenReferences.get(token.key);
    const include = format === "scss" && extendedToken ? `@include ${extendedToken.name}` : "";
    const outputRefs = format === "scss" ? !!extendedToken : !selfReferencingTokens.has(token.key);
    const classGroupStrategy = format === "scss" ? "@mixin " : ".";

    const declarations = Object.entries(
      (typeof originalValue === "object"
        ? originalValue
        : // we use original token to get unresolved values (resolved below)
          getReferences(originalValue, dictionary.tokens)[0].original.value) as Record<string, string>,
    ).map(([key, value]) => {
      return `${kebabCase(key)}: ${getValue(value, dictionary, outputRefs)} ${outputComment(token.comment, format)}`;
    });

    groupToDeclarations.set(`${classGroupStrategy}${token.name}`, [include, ...declarations]);
  });

  return Array.from(groupToDeclarations)
    .map(
      ([key, value]) => `${key} {
      ${value.join(";")}
    }`,
    )
    .join("");
}

export const formatTypography: FormatFn = async (args) => {
  const { file, options } = args;
  const { formatting, fileExtension } = options;

  if (fileExtension !== ".scss" && fileExtension !== ".css") {
    throw new Error(`Only .scss and .css file extensions are supported`);
  }

  const format = fileExtension.replace(".", "") as Stylesheet;
  const header = await fileHeader({ file, formatting, options });
  return prettierSync.format(`${header}${getContent(args, format)}`, {
    parser: format,
  });
};

export const registerFormatTypography: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatTypography,
    format: formatTypography,
  });
};

export const FormatTypography = "calcite/format/typography";
