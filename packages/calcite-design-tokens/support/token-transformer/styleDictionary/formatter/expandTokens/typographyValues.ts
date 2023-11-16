import { paramCase } from "change-case";
import { TransformedToken } from "style-dictionary/types/TransformedToken";
import { appendFileSync } from "fs";

import { Platform } from "../../../../types/platform.js";
import { getTypographyReferences } from "./typography/utils.js";
import { MappedFormatterArguments } from "../utils.js";
import { addSCSSImportByRef } from "./typography/scss.js";

export function handleTypographyToken(token: TransformedToken, args: MappedFormatterArguments): void {
  const typeFile = args.options.expandFiles[args.options.platform].typography;
  const strObj = Object.keys(token.value).reduce((acc, typeKey) => {
    const propName = paramCase(typeKey);
    const value = typeof token.value === "string" ? token.value : token.value[typeKey];
    const originalValue =
      typeof token.original.value === "string" ? token.original.value : token.original.value[typeKey];
    const newValue = getTypographyReferences(propName, value, originalValue, args);
    // Quick way to ensure unique token references
    acc[newValue] = true;
    return acc;
  }, {});

  switch (args.options.platform) {
    case Platform.CSS:
      appendFileSync(typeFile, `.${token.name} {\n\t${Object.keys(strObj).join("\n\t")}\n}\n\n`, {
        flag: "a",
      });
      break;
    case Platform.SCSS:
    case Platform.SASS:
      const tokenSchemeExtensionExtendToken = (token.original.extensions &&
        token.original.extensions["calcite.extends"]) as string | undefined;
      const extraIncludes =
        tokenSchemeExtensionExtendToken && args.dictionary.usesReference(tokenSchemeExtensionExtendToken)
          ? addSCSSImportByRef(tokenSchemeExtensionExtendToken, args, [])
          : undefined;
      const mixinLines = [].concat(extraIncludes || [], Object.keys(strObj));

      appendFileSync(typeFile, `@mixin ${token.name} {\n\t${mixinLines.join("\n\t")}\n}\n\n`, {
        flag: "a",
      });

      break;
    default:
      break;
  }
}
