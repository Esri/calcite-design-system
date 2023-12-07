/**
 * This is a copy/extension of sd-transforms/src/parsers/resolveReference.ts but now with better types!
 */
import { TokenBoxshadowValue as TokenBoxShadowValue } from "@tokens-studio/types";
import { default as usesReference } from "style-dictionary/lib/utils/references/usesReference.js";
import { default as getReferences } from "style-dictionary/lib/utils/references/getReferences.js";
import { DeepKeyTokenMap, SingleToken } from "../../../../types/tokenStudio/designTokenTypes.js";

// Type function to determine whether the obj is `tokenValue` or `{ value: tokenValue }`
function isReferenceValue(
  obj: SingleToken<false>["value"] | { value: SingleToken<false>["value"] }
): obj is { value: SingleToken<false>["value"] } {
  return Object.prototype.hasOwnProperty.call(obj, "value");
}

function flattenValues<T extends SingleToken<false>["value"]>(val: T): T {
  return Object.fromEntries(Object.entries(val).map(([k, v]) => [k, v.value])) as T;
}

// first in normal situation, second if it's another nested reference
type boundGetRef = (ref: string) => Array<SingleToken<false>["value"]> | Array<{ value: SingleToken<false>["value"] }>;

export function resolveReference<T extends SingleToken<false>["value"]>(
  tokenValue: T,
  copy: DeepKeyTokenMap<false>
): T {
  const boundGetRef = getReferences.bind({ properties: copy }) as boundGetRef;

  let ref = tokenValue;
  while (ref && typeof ref === "string" && usesReference(ref)) {
    try {
      const getRefResult = boundGetRef(ref)[0];

      // If every key of the result is a number, the ref value is a multi-value, which means TokenBoxShadowValue[]
      if (Object.keys(getRefResult).every((key) => !isNaN(Number(key)))) {
        ref = Object.values(getRefResult).map((refPart: TokenBoxShadowValue) => flattenValues(refPart)) as T;
      } else if (isReferenceValue(getRefResult)) {
        // this means it spit back a reference { value: '{deepRef}' }
        // and we'll continue the while loop
        ref = getRefResult.value as T;
      } else {
        ref = flattenValues(getRefResult) as T;
      }
    } catch (error: unknown) {
      console.warn(`Warning: could not resolve reference ${ref}`);
      return ref;
    }
  }
  return ref;
}
