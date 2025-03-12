import prettierSync from "@prettier/sync";
import { Dictionary, FormatFn, FormatFnArguments, TransformedToken } from "style-dictionary/types";
import { convertTokenData, fileHeader, getReferences } from "style-dictionary/utils";
import { kebabCase } from "change-case";
import get from "lodash-es/get.js";
import { RegisterFn } from "../types/interfaces.js";
import { state } from "../shared/state.js";
import { FlattenedTransformedToken } from "../types/extensions.js";

type Stylesheet = "css" | "scss";

function getValue(value: string, dictionary: Dictionary, outputRef = true): string {
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
  const extendedTokens = convertTokenData(
    dictionary.allTokens.filter((token) => {
      const hasExtensions = !!token.extensions;
      if (hasExtensions) {
        const extensionTokenKey = token.original.extensions["calcite.extends"];
        const extensionToken = dictionary.tokenMap.get(extensionTokenKey);

        if (!extensionToken) {
          throw new Error(`Extension token ${extensionTokenKey} not found`);
        }

        extendedTokenReferences.set(extensionTokenKey, extensionToken);
      }
      return hasExtensions;
    }),
    { output: "map" },
  );

  dictionary.allTokens.forEach((token: FlattenedTransformedToken) => {
    const preprocessedToken = get(state.originalMergedDictionary, token.path.join("."));

    if (typeof preprocessedToken.value === "string" && preprocessedToken.value.startsWith("{semantic.typography")) {
      const referencedExtensionToken = dictionary.tokenMap.get(preprocessedToken.value);
      if (referencedExtensionToken) {
        extendedTokenReferences.set(token.key, referencedExtensionToken);
      }
    }
  });

  const groupToDeclarations = new Map<string, string[]>();

  dictionary.allTokens.forEach((token: FlattenedTransformedToken) => {
    const originalValue = token.original.value;
    const extendedToken = extendedTokens.get(token.key) || extendedTokenReferences.get(token.key);
    const include = format === "scss" && extendedToken ? `@include ${extendedToken.name}` : "";
    const outputRefs = format === "scss" || !!extendedToken;
    const classGroupStrategy = format === "scss" ? "@mixin " : ".";

    const declarations =
      typeof originalValue === "string"
        ? [`${kebabCase(token.path.at(-1))}: ${getValue(originalValue, dictionary, outputRefs)}`]
        : Object.entries(originalValue).map(([key, value]) => {
            const outputValue = getValue(value as string, dictionary, outputRefs);
            return `${kebabCase(key)}: ${outputValue}; ${outputComment(token.comment, format)}`;
          });

    groupToDeclarations.set(`${classGroupStrategy}${token.name}`, [include, ...declarations]);
  });

  let content = "";

  for (const [key, value] of groupToDeclarations) {
    content += `${key} {
      ${value.join(";")}
    }`;
  }

  return content;
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

export const registerFormatTypography: RegisterFn = async (sd) => {
  sd.registerFormat({
    name: FormatTypography,
    format: formatTypography,
  });
};

export const FormatTypography = "calcite/format/typography";
