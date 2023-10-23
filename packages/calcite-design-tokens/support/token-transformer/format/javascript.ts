import StyleDictionary, { Dictionary, File } from "style-dictionary";

type FormatOptions = { dictionary: Dictionary; file: File };

export function jsModule({ dictionary, file }: FormatOptions): string {
  return (
    StyleDictionary.formatHelpers.fileHeader({ file }) +
    "export default" +
    JSON.stringify(dictionary.tokens, null, 2) +
    ";\n"
  );
}
