import { TransformedToken } from "style-dictionary/types/TransformedToken";
import { Dictionary } from "style-dictionary/types/Dictionary.js";
import { FormattingRules, MappedFormatterArguments } from "../utils.js";
import { getReferencesFromValue } from "./getReferenceFromValue.js";

export function handleStringValueTokens(
  token: TransformedToken,
  dictionary: Dictionary,
  args: MappedFormatterArguments,
  value?: string
): string | undefined {
  const stringValue = value || token.value;
  const formatting = FormattingRules[args.options.platform] || FormattingRules.default;
  const formattedName = `${formatting.indentation}${formatting.prefix}${token.name}${formatting.separator}`;
  const formattedValue = getReferencesFromValue(token.original.value, stringValue, dictionary, args.platform);
  // the key comes from Token Studio, which is why we have to keep the misspelling
  // eslint-disable-next-line @cspell/spellchecker
  const themeAble = ["sass", "scss"].includes(args.options.platform) && !!token["themeable"] ? "!default" : false;
  const comment = !token.comment
    ? undefined
    : formatting.commentStyle === "short"
    ? `// ${token.comment}`
    : `/* ${token.comment} */`;
  const stringifiedProp = [formattedName, formattedValue, themeAble, formatting.suffix, comment]
    .filter((s) => s)
    .join(" ")
    .replace(" ;", ";")
    .trim();

  if (typeof formattedValue === "string") {
    return stringifiedProp;
  }

  return undefined;
}
