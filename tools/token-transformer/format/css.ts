import sd, { Dictionary, File, Platform, Options } from "style-dictionary";
import { getSortedTokens } from "../utils/getSortedTokens.js";

const { formatHelpers } = sd;

const defaultFormatting = {
  lineSeparator: '\n',
}

export function customFormattedVariables(varInfo) {
  const { format, dictionary, outputReferences = false, formatting, options} = varInfo
  let {lineSeparator} = Object.assign({}, defaultFormatting, formatting);
  const tokens = getSortedTokens(dictionary, options);
  return tokens
    .map(formatHelpers.createPropertyFormatter({
      outputReferences: true,
      dictionary,
      format,
      formatting,
    }))
    .map((token) => token.replace(/\"/g, ''))
    .filter((strVal) => { return !!strVal })
    .join(lineSeparator);
}

export function formatCSS (fileInfo: { dictionary: Dictionary, file: File, platform: Platform, options: Options & { themeable?: boolean }}) {
  const { dictionary, file, options} = fileInfo
  const { outputReferences } = options;
  return formatHelpers.fileHeader({file}) +
  ':root {' + '\n' +
  customFormattedVariables({format: 'css', dictionary, outputReferences, options }) + '\n'+
  '}' + '\n';
}
