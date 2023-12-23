import styleDictionary, { Core as StyleDictionary } from "style-dictionary";
import prettierSync from "@prettier/sync";

import { CalledFormatterFunction, FormatterConfig } from "../../../types/styleDictionary/formatterArguments";

export const formatJsPlatform: CalledFormatterFunction = (args) => {
  return prettierSync.format(
    styleDictionary.formatHelpers.fileHeader({ file: args.file }) +
      "export default " +
      JSON.stringify(args.dictionary.properties, null, 2) +
      ";",
    { parser: "babel" },
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
