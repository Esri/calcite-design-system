import { Core as StyleDictionary } from "style-dictionary";
import * as prettier from "prettier";

import { CalledFormatterFunction, FormatterConfig } from "../../../types/styleDictionary/formatterArguments";
import { relative, resolve } from "path";

export const formatDocsPlatform: CalledFormatterFunction = (args) => {
  const output = {
    timestamp: Date.now(),
    tokens: {},
  };
  for (let i = 0; i < args.dictionary.allTokens.length; i++) {
    const token = args.dictionary.allTokens[i];

    token.value = typeof token.value !== "string" ? JSON.stringify(token.value) : token.value;
    token.filePath = relative(resolve(__dirname, "../../../../"), token.filePath);

    if (!output.tokens[token.type]) {
      output.tokens[token.type] = [];
    }
    output.tokens[token.type].push(token);
  }

  return prettier.format(JSON.stringify(output, null, 2), { parser: "json" });
};

export const registerFormatterDocs = (sd: StyleDictionary): void => {
  const formatterConfig: FormatterConfig = {
    name: CalciteDocs,
    formatter: formatDocsPlatform,
  };

  sd.registerFormat(formatterConfig);
};

export const CalciteDocs = "calcite/format/docs";
