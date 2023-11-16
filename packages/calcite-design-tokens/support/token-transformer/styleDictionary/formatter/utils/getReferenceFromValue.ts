import { Dictionary } from "style-dictionary/types/Dictionary.js";
import { PlatformOptions } from "../../../../types/styleDictionary/platform.js";
import { createTokenReference } from "../../../utils/createTokenReference.js";

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
          value = `${value}`.replace(ref.value, () => createTokenReference(ref, args));
        }
      }
    });
  }

  return `${value}`;
}
