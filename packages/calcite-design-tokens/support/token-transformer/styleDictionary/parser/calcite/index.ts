import { Core as StyleDictionary } from "style-dictionary";
import { ParserOptions } from "style-dictionary/types/Parser.js";

import { addFontStyles } from "../utils/add-font-styles.js";
import { expandComposites } from "../utils/expandComposites.js";
import { expand } from "../../../../types/styleDictionary/expandOptions.js";
import { TransformOptions } from "../../../../types/styleDictionary/transformOptions.js";
import { DeepKeyTokenMap } from "../../../../types/tokenTypes/designTokenTypes.js";
import { excludeParentKeys } from "../utils/excludeParentKeys.js";

export function parse(options: ParserOptions): DeepKeyTokenMap<false> {
  const obj = JSON.parse(options.contents);
  const parseOptions: TransformOptions = {
    expand: expand || false,
    excludeParentKeys: false,
  };
  const excluded = excludeParentKeys(obj, parseOptions);
  const withFontStyles = addFontStyles(excluded, parseOptions);
  const expanded = expandComposites(withFontStyles, options.filePath, parseOptions);
  return expanded;
}

export function registerCustomJSONParser(sd: StyleDictionary): void {
  sd.registerParser({
    pattern: /\.json$/,
    parse,
  });
}
