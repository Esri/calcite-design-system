import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { FormatFn, FormatFnArguments } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export async function getFileContents(theme: string, args: FormatFnArguments, count: number = -1): Promise<string> {
  try {
    const content = readFileSync(
      resolve(process.cwd(), args.platform.buildPath ?? "", `${theme}${args.options.fileExtension}`),
      "utf8",
    );
    const regex = /((--|\$)[#$%&'()*+,-./0-9:;<=>?@A-Z[\\]^_]+)/g;
    const variables = Array.from(content.matchAll(regex)).map((v) => v[0]);
    return variables.join("\n\t");
  } catch {
    if (count > 3) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      return await getFileContents(theme, args, count ? count + 1 : 1);
    } else {
      throw new Error(`Error reading file ${theme}${args.options.fileExtension}`);
    }
  }
}

export const formatIndexFile: FormatFn = async (args) => {
  const {
    options: { fileExtension },
  } = args;
  const themes = ["light", "dark"] as const;
  const themedVars = await Promise.all(themes.map((theme) => getFileContents(theme, args))).then((res) => ({
    light: res[0],
    dark: res[1],
  }));
  const platformClass = args.options.fileExtension === ".scss" ? "@mixin " : ".";

  const importUrl = (fileName: string, fileExtension: string) =>
    fileExtension === ".css"
      ? `@import url("./${fileName}${fileExtension}");`
      : `@import "./${fileName}${fileExtension}";`;
  const includePlatformClasses = themes
    .map((theme) => `${platformClass}calcite-mode-${theme} {\n\t${themedVars[theme]}\n}`)
    .join("\n\n");
  const atMedia =
    args.options.fileExtension === ".css"
      ? themes
          .map((theme) => `@media (prefers-color-scheme: ${theme}) {\n.calcite-mode-auto {\n\t${themedVars[theme]}\n}}`)
          .join("\n\n")
      : "";
  const root = args.options.fileExtension === ".css" ? `:root {\n\t${themedVars.light}\n}` : "";
  const imports = args.options.imports.map((imp: string) => importUrl(imp, fileExtension)).join("\n") + "\n";

  return [imports, root, atMedia, includePlatformClasses].filter((i) => i && i !== "").join("\n\n");
};

export const registerFormatIndex: RegisterFn = async (sd) => {
  await sd.registerFormat({
    name: FormatIndex,
    format: formatIndexFile,
  });
};
export const FormatIndex = "calcite/format/index";
