import { readFileSync } from "fs";
import { resolve } from "path";
import { FormatFn, FormatFnArguments } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export async function getFileContents(theme: string, args: FormatFnArguments, count?: number): Promise<string> {
  try {
    const content = readFileSync(
      resolve(process.cwd(), args.platform.buildPath, `${theme}${args.options.fileExtension}`),
      "utf8",
    );
    const regex = /((--|\$)[\w-\d]+:\s?[\w\d#-_() ]+)/g;
    const variables = Array.from(content.matchAll(regex)).map((v) => v[0]);
    return variables.join("\n\t");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error: any) {
    if (count > 3) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      await getFileContents(theme, args, count ? count + 1 : 1);
    } else {
      console.error(`Error reading file ${theme}${args.options.fileExtension}`);
    }
  }
}

export const formatIndexFile: FormatFn = async (args) => {
  const {
    options: { fileExtension },
  } = args;
  const themes = ["light", "dark"];
  const themedVars = await Promise.all(themes.map((theme) => getFileContents(theme, args))).then((res) => ({
    light: res[0],
    dark: res[1],
  }));
  const platformClass = args.options.fileExtension === ".scss" ? "@mixin " : ".";

  const importUrl = (fileName, fileExtension) =>
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
  const imports = args.options.imports.map((imp) => importUrl(imp, fileExtension)).join("\n") + "\n";

  return [imports, root, atMedia, includePlatformClasses].filter((i) => i && i !== "").join("\n\n");
};

export const registerFormatIndex: RegisterFn = async (sd) => {
  await sd.registerFormat({
    name: FormatIndex,
    format: formatIndexFile,
  });
};
export const FormatIndex = "calcite/format/index";
