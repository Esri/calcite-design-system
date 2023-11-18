import { createTokenReference } from "../../../utils/createTokenReference.js";
import { MappedFormatterArguments } from "../utils.js";

export function addSCSSImportByRef(refs: any, args: MappedFormatterArguments, refStrings: string[]): string[] {
  if (args.dictionary.usesReference(refs)) {
    args.dictionary.getReferences(refs).forEach((ref) => {
      const tokenReference = createTokenReference(ref, args.platform);
      refStrings.push(`@include ${tokenReference};`);
    });
  }

  return refStrings;
}
