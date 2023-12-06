import styleDictionary, { Core as StyleDictionary } from "style-dictionary";
import { CalledFormatterFunction, FormatterConfig } from "../../../types/styleDictionary/formatterArguments";

export const formatJsPlatform: CalledFormatterFunction = (args) => {
  return (
    styleDictionary.formatHelpers.fileHeader({ file: args.file }) +
    "export default " +
    JSON.stringify(args.dictionary.properties, null, 2) +
    ";\n"
  );
};

export const registerFormatterJs = (sd: StyleDictionary): void => {
  const formatterConfig: FormatterConfig = {
    name: CalciteJs,
    formatter: formatJsPlatform,
  };

  sd.registerFormat(formatterConfig);
};

export const CalciteJs = "calcite/format/js";
