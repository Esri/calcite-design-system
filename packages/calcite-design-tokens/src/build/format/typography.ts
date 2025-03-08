import { FormatFn, FormatFnArguments } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import { kebabCase } from "lodash-es";
import { getFormattingCloneWithoutPrefix } from "../utils/formatting-without-prefix.js";
import { RegisterFn } from "../types/interfaces.js";

function referenceTokenByPlatform(value: string, fileExtension: string, tokenValue?: string): string {
  switch (fileExtension) {
    case ".scss":
    case ".css":
      return tokenValue ? `var(--${value}, ${tokenValue})` : `var(--${value})`;

    default:
      return `${value}`;
  }
}

function lookupTokenValue(reference: string[], args: FormatFnArguments): [string, string] {
  const { unfilteredTokens } = args.dictionary;
  const refValue = reference.reduce((acc, key, idx) => {
    if (idx === reference.length - 1) {
      if (acc[key].isSource) {
        // Final returned value
        return [acc[key].name, acc[key].value];
      }

      // Recursive lookup for token references
      return parseTokenValueForReferences(acc[key].original.value, args);
    }

    // Continue to traverse the token object
    return acc[key];
  }, unfilteredTokens) as [string, string];

  return refValue;
}

function parseTokenValueForReferences(tokenOriginalValue: any, args: FormatFnArguments): string {
  if (typeof tokenOriginalValue === "string") {
    const regex = /({[\w\d.]+})+/g; // global and case-insensitive
    let match;
    let oldMatch;
    let value = "";

    while ((match = regex.exec(tokenOriginalValue)) !== null) {
      const val = match[0];
      const index = match.index;
      const referencePath = tokenOriginalValue
        .substring(index, index + val.length)
        .replace(/[{}]/g, "")
        .split(".");
      const [tokenName, tokenValue] = lookupTokenValue(referencePath, args);

      if (index > 0) {
        value += tokenOriginalValue.substring(oldMatch.index + oldMatch[0].length || 0, index) || "";
      }

      value += referenceTokenByPlatform(tokenName, args.options.fileExtension, tokenValue);
      oldMatch = match;
    }

    return value;
  }
}

function formatTokensGroupByFiletype(fileExtension: string, token: any, value: string[], comment: string): string {
  const filteredValue = value.filter((v) => v !== "");
  switch (fileExtension) {
    case ".css":
      return `${comment ? ` /* ${comment} */\n` : ""}.${token.name} {\n\t${filteredValue.join(";\n\t")}\n}`;
    case ".scss":
      return `${comment ? ` /* ${comment} */\n` : ""}@mixin ${token.name} {\n\t${filteredValue.join(";\n\t")}\n}`;

    default:
      return `${comment ? ` /* ${comment} */\n` : ""}const ${token.name} {\n\t${filteredValue.join(";\n\t")}\n}`;
  }
}

function formatTokensByFiletype(fileExtension: string, args: FormatFnArguments): string {
  const formattedTokens = args.dictionary.allTokens.map((token) => {
    const value = Object.entries(token.original.value).map(([prop, lookup]) => {
      const v = parseTokenValueForReferences(lookup, args);
      return v ? `${kebabCase(prop)}: ${parseTokenValueForReferences(lookup, args)}` : "";
    });
    const comment = token.comment;

    return formatTokensGroupByFiletype(fileExtension, token, value, comment);
  });

  return formattedTokens.join("\n\n");
}

export const formatTypography: FormatFn = async (args) => {
  const { file, options } = args;
  const { formatting, fileExtension } = options;
  const header = await fileHeader({
    file,
    formatting: getFormattingCloneWithoutPrefix(formatting),
    options,
  });
  const currentFile = `${header}${formatTokensByFiletype(fileExtension, args)}`;
  return currentFile;
};

export const registerFormatTypography: RegisterFn = async (sd) => {
  sd.registerFormat({
    name: FormatTypography,
    format: formatTypography,
  });
};

export const FormatTypography = "calcite/format/typography";
