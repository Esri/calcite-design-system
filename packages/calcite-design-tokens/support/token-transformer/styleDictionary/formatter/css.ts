// @ts-strict-ignore
import { EOL } from "os";
import sd, { Core as StyleDictionary } from "style-dictionary";
import prettierSync from "@prettier/sync";
import { CalledFormatterFunction, FormatterConfig } from "../../../types/styleDictionary/formatterArguments.js";
import { formatTokens } from "./utils/formatTokens.js";
import { formatExtraOutput } from "./utils/formatExtraOutput.js";

export const formatCssPlatform: CalledFormatterFunction = (args) => {
  const { file, dictionary } = args;
  const { default: tokens, ...extraOutput } = formatTokens(dictionary, args);
  const header = sd.formatHelpers.fileHeader({ file });

  if (Object.keys(extraOutput).length > 0) {
    formatExtraOutput(extraOutput, { ...args.options, header, buildPath: args.platform.buildPath });
  }
  return prettierSync.format(header + (tokens ? `:root {${tokens.join(EOL)}}` : ""), { parser: "css" });
};

export const registerFormatterCss = (sd: StyleDictionary): void => {
  const formatterConfig: FormatterConfig = {
    name: CalciteCss,
    formatter: formatCssPlatform,
  };

  sd.registerFormat(formatterConfig);
};

export const CalciteCss = "calcite/format/css";
