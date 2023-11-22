import { Platform } from "../../../../types/platform.js";
import { PlatformOptions } from "../../../../types/styleDictionary/platform.js";
import { TransformedToken } from "../../../../types/styleDictionary/transformedToken.js";
import { createTokenReference } from "../../formatter/utils/createTokenReference.js";
import { transformNamesCamelCase } from "../name/nameCamelCase.js";
import { transformNamesJoinPath } from "../name/nameJoinPath.js";
import { transformNamesKebabCase } from "../name/nameKebabCase.js";

export function setTokenNameByPlatform(token: TransformedToken, args: PlatformOptions): string {
  const { format } = args.files[0];
  const kebabCaseName = transformNamesKebabCase(token, args);
  const camelCaseName = transformNamesCamelCase(token, args);
  const t = {
    ...token,
    name: ["css", "scss", "sass"].includes(format) ? kebabCaseName : camelCaseName,
  };
  return format === Platform.JS ? transformNamesJoinPath(token, args) : createTokenReference(t, args);
}
