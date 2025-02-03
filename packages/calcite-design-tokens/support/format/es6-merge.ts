import { readFileSync } from "fs";
import { resolve } from "path";
import StyleDictionary from "style-dictionary";

import * as prettier from "prettier/standalone";
import * as prettierPluginBabel from "prettier/plugins/babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import * as prettierPluginTypescript from "prettier/plugins/typescript";
import { fileHeader } from "style-dictionary/utils";

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

/**
 * Remove prefix because the prefix option for createPropertyFormatter
 * is not the same as the prefix inside header comment
 *
 * @param {FormattingOverrides} [formatting]
 */
function getFormattingCloneWithoutPrefix(formatting) {
  const formattingWithoutPrefix = structuredClone(formatting) ?? {};
  delete formattingWithoutPrefix.prefix;
  return formattingWithoutPrefix;
}

async function formatES6Merge(args): Promise<string> {
  const { dictionary, platform, file, options } = args;
  const { formatting } = options;
  const header = await fileHeader({
    file,
    formatting: getFormattingCloneWithoutPrefix(formatting),
    options,
  });

  let content = [
    dictionary.allTokens.map((token) => {
      const value = JSON.stringify(options.usesDtcg ? token.$value : token.value);
      const comment = options.usesDtcg ? token.$description : token.comment;
      const to_ret = `export const ${token.name + (options.suffix ? options.suffix[0].toUpperCase() + options.suffix.slice(1) : "")} = ${value};`;

      return comment ? to_ret.concat(`// ${comment}`) : to_ret;
    }),
  ]
    .flat()
    .join("\n");

  try {
    // const newRegex = new RegExp('', "gm");
    const regexPattern = new RegExp(
      /(export const (calcite[A-z0-9]+\s?=\s?["0-9A-z%-.#\s]+);( \/\/[ \w\(\)."]+)*)/,
      "gm",
    );
    const currentFile = readFileSync(resolve(process.cwd(), platform.buildPath, file.destination), "utf8");

    if (currentFile.includes(options.suffix)) {
      let counter = 0;
      let z = null;
      const info = [];

      while (null != (z = regexPattern.exec(currentFile))) {
        if (!z[0].includes(options.suffix)) {
          info[counter] = z[0];
          counter++;
        }
      }
    }

    content = currentFile + "\n" + content;
  } catch (error) {
    console.error(error);
    content = header + "\n" + content;
  }

  return formatJS(content);
}

export async function registerFormatESS6Merge(sd: typeof StyleDictionary): Promise<void> {
  await sd.registerFormat({
    name: FormatESS6Merge,
    format: formatES6Merge,
  });
}

export const FormatESS6Merge = "format/calcite/es6-merge";
