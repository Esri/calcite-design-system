import { Core as StyleDictionary } from "style-dictionary";
import * as prettier from "prettier";

import { CalledFormatterFunction, FormatterConfig } from "../../../types/styleDictionary/formatterArguments";
import { dirname, relative, resolve } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const formatDocsPlatform: CalledFormatterFunction = (args) => {
  const output = {
    timestamp: Date.now(),
    tokens: args.dictionary.allTokens.map((token) => {
      token.value = typeof token.value !== "string" ? JSON.stringify(token.value) : token.value;
      token.filePath = relative(resolve(__dirname, "../../../../"), token.filePath);
      return token;
    }),
  };

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
