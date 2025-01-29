import prettierSync from "@prettier/sync";
import StyleDictionary from "style-dictionary";
import { Dictionary } from "style-dictionary/types";

export const formatJsPlatform = ({ dictionary }: { dictionary: Dictionary }): string => {
  return prettierSync.format("export default " + JSON.stringify(dictionary.tokens, null, 2) + ";", {
    parser: "babel",
  });
};

export const registerFormatJs = async (sd: typeof StyleDictionary): Promise<void> => {
  sd.registerFormat({
    name: FormatCalciteJs,
    format: formatJsPlatform,
  });
};

export const FormatCalciteJs = "calcite/format/js";
