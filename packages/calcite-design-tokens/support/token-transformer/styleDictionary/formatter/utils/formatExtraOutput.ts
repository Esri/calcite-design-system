import { writeFileSync } from "fs";
import { resolve } from "path";
import { Platform } from "../../../../types/platform.js";
import { Options } from "../../../../types/styleDictionary/options.js";
import { DeepKeyTokenMap } from "../../../../types/tokenStudio/designTokenTypes.js";

export function formatExtraOutput(
  outputObject: Record<string, (string | Record<string, string>)[]> | DeepKeyTokenMap,
  args: Options & { header: string; buildPath: string }
): void {
  if (Object.keys(outputObject).length > 0) {
    const { index } = args.expandFiles[args.platform];
    const outputFiles: Record<string, string[]> = {};
    const ensureIfArray = (x: any) => (Array.isArray(x) ? (x as any[]) : x);

    if (index) {
      switch (args.platform) {
        case "css":
        case "scss":
        case "sass":
          const imports = index.import
            ? index.import.map((imp) =>
                typeof imp === "string"
                  ? `@import ${imp.includes(".css") ? `url("${imp}")` : `"${imp}"`};`
                  : `@import ${imp[0].includes(".css") ? `url("${imp[0]}")` : `"${imp[0]}"`} ${imp.slice(1).join(" ")};`
              )
            : [];
          const forwards = index.forward ? index.forward.map((fwd) => `@forwards "${fwd}";`) : [];
          const classes = index.class
            ? index.class.map((cls) => {
                const c = ensureIfArray(outputObject[`${cls[1]}.${args.platform}`]);
                return cls && Array.isArray(c) ? `.${cls[0]} {\n\t${c.join("\n\t")}\n}` : "";
              })
            : [];
          const mixins = index.mixin
            ? index.mixin.map(([mixinName, output]) => {
                const m = ensureIfArray(outputObject[`${output}.${args.platform}`]);
                return Array.isArray(m)
                  ? `@mixin ${mixinName} {\n\t${m.map((o) => `${o}`.replace("$", "--")).join("\n\t")}\n}`
                  : "";
              })
            : [];
          const medias = index.media
            ? index.media.map(([mediaSchemed, output]) => {
                const m = ensureIfArray(outputObject[`${output}.${args.platform}`]);
                const cssProps = m.map((o) => `${o}`.replace("$", "--"));
                return Array.isArray(m)
                  ? `${
                      output === "light" ? `:root {\n\t${cssProps.join("\n\t")}\n}\n` : ""
                    }@media (${mediaSchemed}) {\n\t.calcite-mode-auto {\n\t\t${cssProps.join("\n\t\t")}\n\t}\n}`
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
            typeof exp === "string" ? `export * from "${exp}";` : `export * as ${exp[1]} from "${exp[0]}";`
          );
          outputFiles[index.name] = [...exports].filter((t) => t);
          break;
        default:
          break;
      }

      writeFileSync(resolve(args.buildPath, index.name), `${args.header}${outputFiles[index.name].join("\n\n")}\n`);
    }

    Object.entries(outputObject).forEach(([fileName, outputList]) => {
      const absoluteFilePath = resolve(args.buildPath, `${fileName}`);
      switch (args.platform) {
        case Platform.CSS:
          if (typeof outputList[0] === "string" && outputList[0].slice(0, 2) === "--") {
            writeFileSync(absoluteFilePath, `${args.header}:root{\n\t${outputList.join("\n\t")}\n}\n`);
          } else {
            writeFileSync(absoluteFilePath, `${args.header}${outputList.join("\n\n")}\n`);
          }
          break;
        case Platform.SCSS:
        case Platform.SASS:
          if (typeof outputList[0] === "string" && outputList[0][0] === "$") {
            writeFileSync(absoluteFilePath, `${args.header}${outputList.join("\n")}\n`);
          } else {
            writeFileSync(absoluteFilePath, `${args.header}${outputList.join("\n\n")}\n`);
          }
          break;
        case Platform.JS:
          writeFileSync(absoluteFilePath, args.header + "export default " + outputList[0] + "\n");
          break;
        case Platform.DOCS:
          writeFileSync(absoluteFilePath, outputList[0]);
          break;
        default:
          break;
      }
    });
  }
}
