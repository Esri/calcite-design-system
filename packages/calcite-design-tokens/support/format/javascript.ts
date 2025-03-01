import prettierSync from "@prettier/sync";
import StyleDictionary from "style-dictionary";
import { FormatFn } from "style-dictionary/types";
import { fileHeader } from "style-dictionary/utils";

export const formatJsPlatform: FormatFn = async ({ dictionary, file }) => {
  const header = await fileHeader({ file });
  return prettierSync.format(`${header}export default ${JSON.stringify(dictionary.tokens, null, 2)};`, {
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
