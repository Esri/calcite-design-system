import { Core as StyleDictionary } from "style-dictionary";
import { CalledFormatterFunction, FormatterConfig } from "../../../types/styleDictionary/formatterArguments";

export const formatDocsPlatform: CalledFormatterFunction = (args) => {
  const output = {
    timestamp: Date.now(),
    tokens: {},
  };
  for (let i = 0; i < args.dictionary.allTokens.length; i++) {
    const token = args.dictionary.allTokens[i];

    if (!output.tokens[token.type]) {
      output.tokens[token.type] = [];
    }
    output.tokens[token.type].push(token);
  }

  return JSON.stringify(output, null, 2);
};

export const registerFormatterDocs = (sd: StyleDictionary): void => {
  const formatterConfig: FormatterConfig = {
    name: CalciteDocs,
    formatter: formatDocsPlatform,
  };

  sd.registerFormat(formatterConfig);
};

export const CalciteDocs = "calcite/format/docs";
