import { Dictionary } from "style-dictionary/types/Dictionary.js";
import { PlatformOptions } from "../../../../types/styleDictionary/platform.js";
import { createTokenReference } from "./createTokenReference.js";
import { hexToRgb } from "../../transformer/utils/hexToRGBA.js";

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
              platform: args.options.platform.match(/(css|sass|scss)/) ? "css" : args.options.platform,
            },
          });

          if (ref.type === "color" && !value.includes(ref.value) && value.includes("rgb")) {
            // We prefer HEX but sometimes we need to check for rgba
            const rgbRef = hexToRgb(ref.value);
            const rgba = value.match(/rgba?\(/);
            value =
              rgbRef && rgba
                ? value.replace(`${rgba[0]}${Object.values(rgbRef).join(", ")}`, `${rgba[0]}${tokenRef}`)
                : value.replace(ref.value, tokenRef);
          } else {
            const rgba = value.search(/rgba?\((\d,\s*)+/);

            value =
              ref.type === "opacity" && rgba
                ? value.replace(rgba + ref.value, rgba + tokenRef)
                : value.replace(ref.value, tokenRef);
          }
        }
      }
    });
  }

  return value;
}
