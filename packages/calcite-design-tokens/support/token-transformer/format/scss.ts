import { paramCase } from "change-case";
import styleDictionary, { Dictionary, File, Platform, Options, Core as SD } from "style-dictionary";
import { importedReferenceList } from "./utils/importedReferenceList.js";
import { addToIndex } from "./update/indexFile.js";
import { addToMixins } from "./update/mixinsFile.js";
import { relative, resolve } from "path";

/**
 * Exports SCSS style formats
 *
 * @param {object} fileInfo the file object
 * @param {Dictionary} fileInfo.dictionary the Style Dictionary object
 * @param {File} fileInfo.file information about the file to be generated
 * @param {Platform} [fileInfo.platform] the platform to generate the asset for
 * @param {Options} fileInfo.options the Style Dictionary format options passed from the config
 * @returns {string} a string that is passed to fs.writeFileSync
 */
export function formatSCSSFunction(fileInfo: {
  dictionary: Dictionary;
  file: File;
  platform?: Platform;
  options: Options & { themeable?: boolean; reference?: string[] };
}): string {
  const { dictionary, file, options } = fileInfo;
  const { outputReferences } = options;
  const fileHeader = styleDictionary.formatHelpers.fileHeader({ file });
  const outputFileDir = options.output.filePath.slice(0, options.output.filePath.lastIndexOf("/"));
  const regexNamePartial = new RegExp(`(${fileInfo.platform.prefix}|semantic|app)-`, "g");
  const mode = options.output.filePath.slice(
    options.output.filePath.lastIndexOf("/") + 1,
    options.output.filePath.lastIndexOf(".")
  );
  const name = `calcite-${paramCase(
    relative(resolve(options.output.dir, options.output.platform), options.output.filePath).replaceAll(
      /(.scss)|(base)/g,
      ""
    )
  )}`;
  const referenceList = importedReferenceList(options.reference, outputFileDir);

  // Index File Updates
  addToIndex(name, file.options.prefix, mode, outputFileDir, options.output.filePath, fileHeader);

  // Mixin File Updates
  addToMixins(name, outputFileDir, dictionary, outputReferences, fileHeader);

  return (
    fileHeader +
    (referenceList.length > 0 ? referenceList.join("\n") + "\n\n" : "") +
    styleDictionary.formatHelpers
      .formattedVariables({ format: "sass", dictionary, outputReferences })
      .replaceAll(regexNamePartial, "")
      .split("\n")
      .filter((variable) => !variable.includes("[object Object]"))
      .join("\n") +
    "\n"
  );
}

export function registerSCSSFormat(sd: SD): void {
  sd.registerFormat({
    name: formatSCSS,
    formatter: formatSCSSFunction,
  });
}

export const formatSCSS = "calcite/scss";
