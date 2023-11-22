import { MappedFormatterArguments } from "../../../../types/styleDictionary/formatterArguments.js";
import { createTokenReference } from "../utils/createTokenReference.js";

export function addSCSSImportByRef(refs: any, args: MappedFormatterArguments, refStrings: string[]): string[] {
  if (args.dictionary.usesReference(refs)) {
    args.dictionary.getReferences(refs).forEach((ref) => {
      const tokenReference = createTokenReference(ref, args.platform);
      refStrings.push(`@include ${tokenReference};`);
    });
  }

  return refStrings;
}
