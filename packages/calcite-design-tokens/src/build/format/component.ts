import prettierSync from "@prettier/sync";
import type { FormatFn, TransformedToken } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import { Config, PlatformConfig } from "../../types/extensions.js";
import { RegisterFn, Stylesheet } from "../../types/interfaces.js";
import { fromTokens } from "../utils/dictionary.js";
import { light } from "../dictionaries/index.js";
import { Platform } from "../utils/enums.js";
import { createVarList } from "./utils/index.js";

export const FormatComponent = "calcite/format/component";

export const registerFormatComponent: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatComponent,
    format: formatComponentFile,
  });
};

export const formatComponentFile: FormatFn = async (args) => {
  const { file, options, platform } = args;
  const platformConfig = platform as PlatformConfig;

  if (platformConfig.options.platform !== Platform.css) {
    throw new Error("Only css platform is supported.");
  }

  const header = await fileHeader({ file });
  const stylesheetFormat: Stylesheet = platformConfig.options.platform;

  const lightDictionary = await light.getPlatformTokens(options.platform, { cache: true });
  const filteredTokens: TransformedToken[] = [];
  const componentTokens = lightDictionary.allTokens.filter((token) => {
    const isComponent = token.attributes?.scope === "component";
    if (!isComponent) {
      filteredTokens.push(token);
    }
    return isComponent;
  });

  const componentTokenDictionary = fromTokens(componentTokens, filteredTokens);
  const componentVarDeclarations = createVarList(stylesheetFormat, componentTokenDictionary, {
    ...args,
    options: {
      ...args.options,
      // assumes all component tokens need to use a reference (custom CSS prop) as the value
      outputReferences: true,
    },
  })
    .split(";")
    .filter(Boolean)
    .map((varDeclaration) => varDeclaration.split(":").map((part) => part.trim()));

  const prefix = (options as Config).platforms[platformConfig.options.platform].prefix!;
  const componentScopedVars = componentVarDeclarations.map(([name, value]) => {
    // we define internal variables to allow overrides at a global or component level
    const internalVarName = name.replace(prefix, `${prefix}-internal`);

    return `${internalVarName}: var(${name}, var(${getLegacyVarName(name, prefix)}, ${value.trim()}))`;
  });

  const content = `:host {${componentScopedVars.join(";\n")}}`;

  return prettierSync.format(`${header}${content}`, {
    parser: stylesheetFormat,
  });
};

/**
 * This is based on the focus color variable, but we could use additional token attributes to get the proper legacy var name
 *
 * @param name - The name of the token.
 * @param prefix - The prefix used in the token name.
 */
function getLegacyVarName(name: string, prefix: string): string {
  const legacyPrefix = `${prefix}-ui`;
  const suffix = name
    .slice(name.indexOf(prefix) + prefix.length)
    .split("-")
    .filter(Boolean)
    .reverse()
    .join("-");
  return `--${legacyPrefix}-${suffix}`;
}
