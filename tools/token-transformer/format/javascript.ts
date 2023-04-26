import sd, { Dictionary, File, Platform, Options } from "style-dictionary";
import { getSortedTokens } from "../utils/getSortedTokens.js";

const { formatHelpers } = sd;

export function formatJS(fileInfo: { dictionary: Dictionary, file: File, platform: Platform, options: Options}) {
  const { dictionary, options, file } = fileInfo;
  const sortedTokens = getSortedTokens(dictionary, options)
  const formattedTokenSet = sortedTokens.map((token) => {
    return `export const ${token.name} = ${token.value};`;
  });

  return formatHelpers.fileHeader({file}) + '\n' + [...new Set(formattedTokenSet)].join('\n');
}
