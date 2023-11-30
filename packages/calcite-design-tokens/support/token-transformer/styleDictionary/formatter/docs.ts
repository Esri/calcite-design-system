import { Core as StyleDictionary } from "style-dictionary";
import { CalledFormatterFunction, FormatterConfig } from "../../../types/styleDictionary/formatterArguments";

export const formatDocsPlatform: CalledFormatterFunction = (args) => {
  return JSON.stringify(args.dictionary.allTokens, null, 2);
};

export const registerFormatterDocs = (sd: StyleDictionary): void => {
  const formatterConfig: FormatterConfig = {
    name: CalciteDocs,
    formatter: formatDocsPlatform,
  };

  sd.registerFormat(formatterConfig);
};

export const CalciteDocs = "calcite/format/docs";
