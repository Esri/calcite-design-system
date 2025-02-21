import StyleDictionary from "style-dictionary";
import { FormatFnArguments } from "style-dictionary/types";

export async function getFileContents(theme: string, args: FormatFnArguments): Promise<string> {
  console.log(theme, args);
  return "";
}

export function formatImports(imports: string[], fileExtension: string): string {
  const importString = imports.map((i) => `@import "${i}${fileExtension}";`).join("\n");
  return importString;
}

export async function formatIndexFile(args: FormatFnArguments): string {
  const {
    options: { fileExtension },
  } = args;
  const imports = ["semantic"];

  if (fileExtension === ".scss") {
    imports.push("mixins");
  }

  if (fileExtension === ".css") {
    imports.push("classes");
  }

  const [lightVars, darkVars] = await Promise.all([getFileContents("light", args), getFileContents("dark", args)]);

  return `${formatImports(imports, fileExtension)}\n\n :root {\n${lightVars}\n}\n\n @media (prefers-color-scheme: light) {\n${lightVars}\n\n @media (prefers-color-scheme: dark) {\n${darkVars}} .calcite-mode-light {\n${lightVars}\n}\n\n .calcite-mode-dark {\n${darkVars}\n}\n`;
}

export async function registerFormatIndex(sd: typeof StyleDictionary): Promise<void> {
  await sd.registerFormat({
    name: FormatIndex,
    format: formatIndexFile,
  });
}
export const FormatIndex = "calcite/format/index";
