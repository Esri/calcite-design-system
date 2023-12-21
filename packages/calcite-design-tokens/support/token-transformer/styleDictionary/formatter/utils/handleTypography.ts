import { paramCase } from "change-case";

import { TransformedToken } from "../../../../types/styleDictionary/transformedToken.js";
import { getTypographyReferences } from "../typography/utils.js";
import { addSCSSImportByRef } from "../typography/scss.js";
import { Platform } from "../../../../types/platform.js";
import { MappedFormatterArguments } from "../../../../types/styleDictionary/formatterArguments.js";
import { EOL } from "os";

export function handleTypography(token: TransformedToken, args: MappedFormatterArguments): string {
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
      return `.${token.name} {${EOL}\t${Object.keys(strObj).join(`${EOL}\t`)}${EOL}}`;

    case Platform.SCSS:
    case Platform.SASS:
      const tokenSchemeExtensionExtendToken = (token.original.extensions &&
        token.original.extensions["calcite.extends"]) as string | undefined;
      const extraIncludes =
        tokenSchemeExtensionExtendToken && args.dictionary.usesReference(tokenSchemeExtensionExtendToken)
          ? addSCSSImportByRef(tokenSchemeExtensionExtendToken, args, [])
          : undefined;
      const mixinLines = [].concat(extraIncludes || [], Object.keys(strObj));

      return `@mixin ${token.name} {${EOL}\t${mixinLines.join(`${EOL}\t`)}${EOL}}`;
    default:
      return;
  }
}
