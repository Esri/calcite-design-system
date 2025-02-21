import { readFileSync } from "fs";
import { resolve } from "path";
import StyleDictionary from "style-dictionary";

import * as prettier from "prettier/standalone";
import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettierPluginTypescript from "prettier/plugins/typescript";
import { fileHeader } from "style-dictionary/utils";
import { getFormattingCloneWithoutPrefix } from "../utils/formattingWithoutPrefix.js";

/**
 * Prettier format JS contents
 *
 * @param {string} content
 * @param {boolean} [ts] whether or not to use typescript
 */
async function formatJS(content, ts = false) {
  return prettier.format(content, {
    parser: ts ? `typescript` : `babel`,
    plugins: [prettierPluginBabel, prettierPluginEstree, prettierPluginTypescript],
  });
}

async function formatES6Merge(args): Promise<string> {
  const { dictionary, platform, file, options } = args;
  const { formatting } = options;
  const header = await fileHeader({
    file,
    formatting: getFormattingCloneWithoutPrefix(formatting),
    options,
  });
  let currentFile = "";

  try {
    currentFile = readFileSync(resolve(process.cwd(), platform.buildPath, file.destination), "utf8");
    dictionary.allTokens.map((token) => {
      const regexPatternMatchObject = new RegExp(
        `export const (${token.name})\\s?=\\s?(?<value>{(["\\w]+\\s?:\\s?["#\\w(\\s\\/.)]+,?)+});`,
        "gm",
      );
      const foundExport = regexPatternMatchObject.exec(currentFile);

      if (foundExport) {
        const oldValue = JSON.parse(foundExport.groups.value);
        const value = JSON.stringify(
          options.suffix
            ? { ...oldValue, [options.suffix.toLowerCase()]: options.usesDtcg ? token.$value : token.value }
            : options.usesDtcg
              ? token.$value
              : token.value,
        );
        const comment = options.usesDtcg ? token.$description : token.comment;
        const newExport = `export const ${token.name} = ${value};${comment ? ` // ${comment}` : ""}`;
        currentFile = currentFile.replace(foundExport[0], newExport);
      } else {
        const value = JSON.stringify({ [options.suffix.toLowerCase()]: options.usesDtcg ? token.$value : token.value });
        const comment = options.usesDtcg ? token.$description : token.comment;
        const newExport = `export const ${token.name} = ${value};${comment ? ` // ${comment}` : ""}`;

        currentFile = currentFile.trim() + "\n" + newExport + "\n";
      }
    });
  } catch (error: Error) {
    console.debug("Error reading file", error);
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
}

export async function registerFormatESS6Merge(sd: typeof StyleDictionary): Promise<void> {
  await sd.registerFormat({
    name: FormatESS6Merge,
    format: formatES6Merge,
  });
}

export const FormatESS6Merge = "format/calcite/es6-merge";
