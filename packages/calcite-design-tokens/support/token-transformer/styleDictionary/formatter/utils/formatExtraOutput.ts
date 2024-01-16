import { writeFileSync } from "fs";
import { resolve } from "path";
import prettierSync from "@prettier/sync";

import { Platform } from "../../../../types/platform.js";
import { Options } from "../../../../types/styleDictionary/options.js";
import { DeepKeyTokenMap } from "../../../../types/tokenStudio/designTokenTypes.js";

export function formatExtraOutput(
  outputObject: Record<string, (string | Record<string, string>)[]> | DeepKeyTokenMap,
  args: Options & { header: string; buildPath: string },
): void {
  if (Object.keys(outputObject).length > 0) {
    const { index } = args.expandFiles[args.platform];
    const outputFiles: Record<string, string[]> = {};
    const ensureIfArray = (x: any) => (Array.isArray(x) ? (x as any[]) : x);

    if (index) {
      let parser;
      // Set output
      switch (args.platform) {
        case "css":
        case "scss":
        case "sass":
          const imports = index.import
            ? index.import.map((imp) =>
                typeof imp === "string"
                  ? `@import ${imp.includes(".css") ? `url("${imp}")` : `"${imp}"`};`
                  : `@import ${imp[0].includes(".css") ? `url("${imp[0]}")` : `"${imp[0]}"`} ${imp
                      .slice(1)
                      .join(" ")};`,
              )
            : [];
          const forwards = index.forward ? index.forward.map((fwd) => `@forwards "${fwd}";`) : [];
          const classes = index.class
            ? index.class.map((cls) => {
                const c = ensureIfArray(outputObject[`${cls[1]}.${args.platform}`]);
                return cls && Array.isArray(c) ? `.${cls[0]} {${c.join("")}}` : "";
              })
            : [];
          const mixins = index.mixin
            ? index.mixin.map(([mixinName, output]) => {
                const m = ensureIfArray(outputObject[`${output}.${args.platform}`]);
                return Array.isArray(m)
                  ? `@mixin ${mixinName} {${m.map((o) => `${o}`.replaceAll("$", "--")).join("")}}`
                  : "";
              })
            : [];
          const medias = index.media
            ? index.media.map(([mediaSchemed, output]) => {
                const m = ensureIfArray(outputObject[`${output}.${args.platform}`]);
                const cssProps = m.map((o) => `${o}`.replaceAll("$", "--"));
                return Array.isArray(m)
                  ? `${
                      output === "light" ? `:root {${cssProps.join("")}}` : ""
                    }@media (${mediaSchemed}) {.calcite-mode-auto {${cssProps.join("")}}}`
                  : "";
              })
            : [];

          outputFiles[index.name] = [
            ...(imports || []),
            ...(forwards || []),
            ...(medias || []),
            ...(classes || []),
            ...(mixins || []),
          ].filter((t) => t);
          break;
        case "docs":
        case "js":
        case "es6":
          const exports = index.export?.map((exp) =>
            typeof exp === "string" ? `export * from "${exp}";` : `export * as ${exp[1]} from "${exp[0]}";`,
          );
          outputFiles[index.name] = [...exports].filter((t) => t);
          break;
        default:
          break;
      }

      // Set Parser
      switch (args.platform) {
        case "css":
        case "scss":
          parser = args.platform;
          break;
        case "sass":
          parser = "scss";
        case "es6":
        case "js":
          parser = "babel";
          break;
        case "docs":
          parser = "json";
        default:
          break;
      }

      writeFileSync(
        resolve(args.buildPath, index.name),
        prettierSync.format(`${args.header}${outputFiles[index.name].join(" ")}`, { parser }),
      );
    }

    Object.entries(outputObject).forEach(([fileName, outputList]) => {
      const absoluteFilePath = resolve(args.buildPath, `${fileName}`);
      switch (args.platform) {
        case Platform.CSS:
          if (typeof outputList[0] === "string" && outputList[0].slice(0, 2) === "--") {
            writeFileSync(
              absoluteFilePath,
              prettierSync.format(`${args.header}:root{${outputList.join("")}}`, { parser: "css" }),
            );
          } else {
            writeFileSync(
              absoluteFilePath,
              prettierSync.format(`${args.header}${outputList.join("")}`, { parser: "css" }),
            );
          }
          break;
        case Platform.SCSS:
        case Platform.SASS:
          writeFileSync(
            absoluteFilePath,
            prettierSync.format(`${args.header}${outputList.join("")}`, { parser: "scss" }),
          );
          break;
        case Platform.JS:
          writeFileSync(
            absoluteFilePath,
            prettierSync.format(args.header + "export default " + outputList[0] + "", { parser: "babel" }),
          );
          break;
        case Platform.DOCS:
          writeFileSync(absoluteFilePath, prettierSync.format(outputList[0].join(""), { parser: "json" }));
          break;
        default:
          break;
      }
    });
  }
}
