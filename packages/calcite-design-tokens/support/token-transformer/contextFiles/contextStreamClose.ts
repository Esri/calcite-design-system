import { join } from "path";
import { readFile, writeFile } from "fs/promises";
import { default as StyleDictionary } from "style-dictionary";
import { Platform, PlatformUnion } from "../../types/platform.js";
import { CalciteConfigOutput } from "../../types/config.js";
import { TokenColorSchemeUnion, TokenColorScheme } from "../../types/tokenTypes/colorScheme.js";

export async function contextStreamClose(
  format: PlatformUnion,
  context: string,
  output: CalciteConfigOutput
): Promise<void> {
  const buildPath = `${output.dir}/${format}/`;
  const colorContextPaths: Partial<Record<TokenColorSchemeUnion, string>> = {
    light: join(output.dir, "css", `light.css`),
    dark: join(output.dir, "css", `dark.css`),
  };

  switch (format) {
    case Platform.CSS:
      if (context === "classes") {
        const colorContextFiles: Partial<Record<TokenColorSchemeUnion, string>> = {
          light: await readFile(colorContextPaths[TokenColorScheme.LIGHT], "utf-8"),
          dark: await readFile(colorContextPaths[TokenColorScheme.DARK], "utf-8"),
        };
        const contextClass = Object.entries(colorContextFiles).map(([contextKey, str]) => {
          const newStr = str
            .slice(str.indexOf("--"))
            .replaceAll(/(:root)|\{|\}/g, "")
            .trim();
          const colorContextCustomProps = newStr.split("\n").filter((d) => d && d.length > 0);
          return `.calcite-mode-${contextKey} {\n\t` + colorContextCustomProps.join("\n\t") + `\n}`;
        });

        const clsFilePath = join(buildPath, "classes.css");
        const rawClsFileDataBuffer = await readFile(clsFilePath);

        const bufferClassContent = Buffer.concat([
          Buffer.from(StyleDictionary.formatHelpers.fileHeader({ file: { destination: clsFilePath } })),
          rawClsFileDataBuffer,
          Buffer.from(contextClass.join("\n") + "\n"),
        ]);

        await writeFile(clsFilePath, bufferClassContent);
      } else {
        const colorContextPath = join(buildPath, `${context}.css`);
        const rawData = await readFile(colorContextPath, "utf-8");
        const str = rawData
          .slice(rawData.indexOf("--"))
          .replaceAll(/(:root)|\{|\}/g, "")
          .trim();
        const strArray = str.split("\n");
        const newStr =
          StyleDictionary.formatHelpers.fileHeader({ file: { destination: colorContextPath } }) +
          `:root {\n\t` +
          strArray.join("\n\t") +
          `\n}\n`;
        await writeFile(colorContextPath, newStr);
      }
      break;
    case Platform.SCSS:
    case Platform.SASS:
      if (context === "mixins") {
        const colorContextFiles: Partial<Record<TokenColorSchemeUnion, string>> = {
          light: await readFile(colorContextPaths[TokenColorScheme.LIGHT], "utf-8"),
          dark: await readFile(colorContextPaths[TokenColorScheme.DARK], "utf-8"),
        };
        const contextMixin = Object.entries(colorContextFiles).map(([contextKey, str]) => {
          const newStr = str
            .slice(str.indexOf("--"))
            .replaceAll(/(:root)|\{|\}/g, "")
            .trim();
          const colorContextCustomProps = newStr
            .split("\n")
            .filter((d) => d && d.length > 0)
            .map((p) => p.trim());
          return `@mixin calcite-mode-${contextKey} {\n\t` + colorContextCustomProps.join("\n\t") + `\n}`;
        });

        const mixinFilePath = join(buildPath, `mixins.${format}`);
        const rawClsFileDataBuffer = await readFile(mixinFilePath);

        const bufferClassContent = Buffer.concat([
          Buffer.from(StyleDictionary.formatHelpers.fileHeader({ file: { destination: mixinFilePath } })),
          rawClsFileDataBuffer,
          Buffer.from(contextMixin.join("\n") + "\n"),
        ]);

        await writeFile(mixinFilePath, bufferClassContent);
      }
      break;
    default:
      break;
  }
}
