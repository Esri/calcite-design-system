import StyleDictionary, { Dictionary, File } from "style-dictionary";
import { default as JsonToTS } from "json-to-ts";

type FormatOptions = { dictionary: Dictionary; file: File };

export function jsModule({ dictionary, file }: FormatOptions): string {
  return (
    StyleDictionary.formatHelpers.fileHeader({ file }) +
    "export default" +
    JSON.stringify(dictionary.tokens, null, 2) +
    ";\n"
  );
}

export function tsModule({ dictionary, file }: FormatOptions): string {
  return (
    StyleDictionary.formatHelpers.fileHeader({ file }) +
    "declare const root: RootObject\n" +
    "export default root\n" +
    JsonToTS(dictionary.properties).join("\n")
  );
}
