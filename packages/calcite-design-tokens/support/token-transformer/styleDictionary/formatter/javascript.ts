import styleDictionary, { Core as StyleDictionary } from "style-dictionary";
import { default as JsonToTS } from "json-to-ts/build/src/index.js";
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

export const formatTsPlatform: CalledFormatterFunction = (args) => {
  return (
    styleDictionary.formatHelpers.fileHeader({ file: args.file }) +
    "declare const root: RootObject\n" +
    "export default root\n" +
    JsonToTS(args.dictionary.tokens)
      .map((map) => {
        const data: { name: string; typeMap: Record<string, any> } = typeof map === "string" ? JSON.parse(map) : map;
        return `export type ${data.name} = ${JSON.stringify(data.typeMap, null, 2)}`;
      })
      .join("\n\n")
  );
};

export const registerFormatterTs = (sd: StyleDictionary): void => {
  const formatterConfig: FormatterConfig = {
    name: CalciteTs,
    formatter: formatTsPlatform,
  };

  sd.registerFormat(formatterConfig);
};

export const CalciteJs = "calcite/format/js";
export const CalciteTs = "calcite/format/ts";
