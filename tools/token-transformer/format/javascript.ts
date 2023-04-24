import { Dictionary, File, Options, Platform, TransformedToken, TransformedTokens } from "style-dictionary";
import { reverse } from "../utils/reverse";

function includeReferenceTokens(token: TransformedToken, dictionary: Dictionary, tokenSets: TransformedTokens[], pointer: number) {
  let value = JSON.stringify(token.value);

  if (!Array.isArray(tokenSets[pointer])) {
    while (tokenSets.length  <= pointer) {
      tokenSets.push({})
    }
  }

  const refs = dictionary.getReferences(token.original.value);
  refs.forEach(ref => {
    value = value.replace(ref.value, () => {
      return `${ref.name}`;
    });
    tokenSets = includeReferenceTokens(ref, dictionary, tokenSets, pointer + 1);
  });

  const updatedToken = { ...token, value: JSON.parse(value) }
  tokenSets[pointer][token.name] = updatedToken;

  return tokenSets;
}

export function getSortedTokens(dictionary: Dictionary, includedTokenSets: TransformedTokens[] = []): TransformedTokens[] {
  return dictionary.allTokens.reduce((acc, token, idx) => {
    acc = includeReferenceTokens(token, dictionary, acc, 0)
    return idx === dictionary.allTokens.length - 1 ? reverse(acc) : acc;
  }, includedTokenSets);
}

export function formatJS(fileInfo: { dictionary: Dictionary, file: File, platform: Platform, options: Options}) {
  const { dictionary } = fileInfo;
  const sortedTokens = getSortedTokens(dictionary)
  const formattedTokenSet = sortedTokens.reduce((acc, tokenSet) => {
      Object.values(tokenSet).forEach((token) => {
        acc.push(`export const ${token.name} = ${token.value};`)
      })
    return acc;
  }, []);

  return [...new Set(formattedTokenSet)].join('\n');
}
