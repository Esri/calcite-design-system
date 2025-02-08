// @ts-strict-ignore
import sd, { Core as StyleDictionary } from "style-dictionary";

import { formatTokens } from "./utils/formatTokens.js";
import { formatExtraOutput } from "./utils/formatExtraOutput.js";
import prettierSync from "@prettier/sync";

import { CalledFormatterFunction, FormatterConfig } from "../../../types/styleDictionary/formatterArguments.js";
import { EOL } from "os";

export const formatScssPlatform: CalledFormatterFunction = (args) => {
  const { file, dictionary } = args;
  const { default: tokens, ...extraOutput } = formatTokens(dictionary, args);
  const header = sd.formatHelpers.fileHeader({ file });

  if (Object.keys(extraOutput).length > 0) {
    formatExtraOutput(extraOutput, { ...args.options, header, buildPath: args.platform.buildPath });
  }

  return prettierSync.format(header + (tokens ? tokens.join(EOL) : ""), { parser: "scss" });
};

export const registerFormatterScss = (sd: StyleDictionary): void => {
  const formatterConfig: FormatterConfig = {
    name: CalciteScss,
    formatter: formatScssPlatform,
  };

  sd.registerFormat(formatterConfig);
};

export const CalciteScss = "calcite/format/scss";
