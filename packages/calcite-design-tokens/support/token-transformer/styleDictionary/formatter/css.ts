import sd, { Core as StyleDictionary } from "style-dictionary";

import { formatTokens } from "./utils/formatTokens.js";
import { CalledFormatterFunction, FormatterConfig } from "./utils.js";
import { formatExtraOutput } from "./utils/formatExtraOutput.js";

export const formatCssPlatform: CalledFormatterFunction = (args) => {
  const { file, dictionary } = args;
  const { default: tokens, ...extraOutput } = formatTokens(dictionary, args);
  const header = sd.formatHelpers.fileHeader({ file });

  if (Object.keys(extraOutput).length > 0) {
    formatExtraOutput(extraOutput, { ...args.options, header, buildPath: args.platform.buildPath });
  }
  return header + `:root {\n\t${tokens.join("\n\t")}\n}\n`;
};

export const registerFormatterCss = (sd: StyleDictionary): void => {
  const formatterConfig: FormatterConfig = {
    name: CalciteCss,
    formatter: formatCssPlatform,
  };

  sd.registerFormat(formatterConfig);
};

export const CalciteCss = "calcite/format/css";
