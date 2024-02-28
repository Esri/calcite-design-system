import { Platform } from "../../../../types/platform.js";
import { MappedFormatterArguments } from "../../../../types/styleDictionary/formatterArguments.js";
import { FormattingRules } from "../utils.js";
import { createTokenReference } from "../utils/createTokenReference.js";

export function getTypographyReferences(
  propName: string,
  value: string | Record<string, string>,
  originalValue: string | Record<string, string>,
  args: MappedFormatterArguments,
): string {
  if (args.dictionary.usesReference(originalValue)) {
    const refs = args.dictionary.getReferences(originalValue);
    const typeReferences = {};
    const typeArgs = {
      ...args.platform,
      options: { ...args.options, platform: Platform.CSS },
      formatting: FormattingRules[Platform.CSS],
    };
    let typeValue = `${value}`;

    refs.forEach((ref) => {
      if (ref.isSource || args.options.outputReferences) {
        if (ref.value && ref.name) {
          if (typeof ref.value === "string" || typeof ref.value === "number") {
            typeValue = `${typeValue}`.replace(`${ref.value}`, () => createTokenReference(ref, typeArgs));
          } else {
            switch (args.options.platform) {
              case "scss":
              case "sass":
                typeReferences[ref.name] = `@include ${ref.name};`;
                break;
              default:
                typeValue = `${typeValue}`.replace(ref.value, () => createTokenReference(ref, typeArgs));
                break;
            }
          }
        }
      }
    });

    const typeRefs = Object.values(typeReferences);

    return typeRefs.length > 0 ? typeRefs.join("\n") : `${propName}: ${typeValue};`;
  }

  return `${value}`;
}
