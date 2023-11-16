import { Platform } from "../../types/platform.js";
import { PlatformOptions } from "../../types/styleDictionary/platform.js";
import { TransformedToken } from "../../types/styleDictionary/transformedToken.js";
import { createTokenReference } from "./createTokenReference.js";
import { getCamelCaseFromArray } from "./getCamelCaseFromArray.js";
import { getJoinedNameFromArray } from "./getJoinedNameFromArray.js";
import { getKebabCaseFromArray } from "./getKebabCaseFromArray.js";

export function setTokenNameByPlatform(token: TransformedToken, args: PlatformOptions): string {
  const { format } = args.files[0];
  const kebabCaseName = getKebabCaseFromArray(token.path, args.options.prefix);
  const camelCaseName = getCamelCaseFromArray(token.path, args.options.prefix);
  const t = {
    ...token,
    name: ["css", "scss", "sass"].includes(format) ? kebabCaseName : camelCaseName,
  };
  return format === Platform.JS ? getJoinedNameFromArray(token.path) : createTokenReference(t, args);
}
