import { readFileSync } from "fs";
import { resolve } from "path";
import StyleDictionary from "style-dictionary";
import { fileHeader } from "style-dictionary/utils";
import { FormatFn } from "style-dictionary/types";
import { getFormattingCloneWithoutPrefix } from "../utils/formattingWithoutPrefix.js";

const formatJSONMerge: FormatFn = async (args) => {
  const { dictionary, platform, file, options } = args;
  const { formatting } = options;
  const header = await fileHeader({
    file,
    formatting: getFormattingCloneWithoutPrefix(formatting),
    options,
  });
  let currentFile = "";

  try {
    const fileContents = readFileSync(resolve(process.cwd(), platform.buildPath, file.destination), "utf8");
    const contentsAsJSON = JSON.parse(fileContents);
    dictionary.allTokens.forEach((token) => {
      const obj = token.path.reduce((acc, p) => {
        if (acc[p]) {
          return acc[p];
        }

        return {};
      }, contentsAsJSON);

      if (Object.keys(obj).length === 0) {
        throw new Error(`Token ${token.name} not found in JSON file.`);
      }
    });
  } catch {
    const variables = dictionary.allTokens.map((token) => {
      const value = JSON.stringify(
        options.suffix
          ? { [options.suffix.toLowerCase()]: options.usesDtcg ? token.$value : token.value }
          : options.usesDtcg
            ? token.$value
            : token.value,
      );
      const comment = options.usesDtcg ? token.$description : token.comment;
      return `export const ${token.name} = ${value};${comment ? ` // ${comment}` : ""}`;
    });
    currentFile = await formatJS(`${header}\n${variables.join("\n")}`);
  }

  return formatJS(currentFile);
};

export async function registerFormatJSONMerge(sd: typeof StyleDictionary): Promise<void> {
  await sd.registerFormat({
    name: FormatJSONMerge,
    format: formatJSONMerge,
  });
}

export const FormatJSONMerge = "format/calcite/es6-merge";
