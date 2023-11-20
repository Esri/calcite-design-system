import { Dictionary } from "style-dictionary/types/Dictionary.js";
import { PlatformOptions } from "../../../../types/styleDictionary/platform.js";
import { createTokenReference } from "../../../utils/createTokenReference.js";

function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function getReferencesFromValue(
  originalValue: string,
  value: string,
  dictionary: Dictionary,
  args: PlatformOptions
): string {
  if (dictionary.usesReference(originalValue)) {
    const refs = dictionary.getReferences(originalValue);
    refs.forEach((ref) => {
      if (ref.isSource || args.options.outputReferences) {
        if (ref.value && ref.name) {
          const tokenRef = createTokenReference(ref, {
            ...args,
            options: {
              ...args.options,
              platform: ["css", "sass", "scss"].includes(args.options.platform) ? "css" : args.options.platform,
            },
          });

          if (ref.type === "color" && !value.includes(ref.value) && value.includes("rgb")) {
            // We prefer HEX but sometimes we need to check for rgba
            const rgbRef = hexToRgb(ref.value);
            const rgba = value.search(/rgba?\(/);
            value =
              rgbRef && rgba
                ? `${value}`.replace(`${rgba}${Object.values(rgbRef).join(", ")}`, `${rgba}${tokenRef}`)
                : `${value}`.replace(ref.value, tokenRef);
          } else {
            const rgba = value.search(/rgba?\((\d,\s*)+/);

            value =
              ref.type === "opacity" && rgba
                ? `${value}`.replace(rgba + ref.value, rgba + tokenRef)
                : `${value}`.replace(ref.value, tokenRef);
          }
        }
      }
    });
  }

  return `${value}`;
}
