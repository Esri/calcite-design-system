import { Dictionary, File, Options, Platform, TransformedToken, TransformedTokens } from "style-dictionary";
import { reverse } from "./reverse";

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

export function getSortedTokens(dictionary: Dictionary, options: Options, includedTokenSets: TransformedTokens[] = []): TransformedTokens[] {
  return dictionary.allTokens.reduce((acc, token, idx) => {
    if(!!options.sourceReferencesOnly && token.isSource) {
      acc = includeReferenceTokens(token, dictionary, acc, 0)
    } else if (!options.sourceReferencesOnly) {
      acc = includeReferenceTokens(token, dictionary, acc, 0)
    }
    
    return idx === dictionary.allTokens.length - 1 ? reverse(acc) : acc;
  }, includedTokenSets).reduce((acc, tokenSet) => {
    Object.values(tokenSet).forEach((token) => {
      acc.push(token)
    })
  return [...acc];
}, []);;
}
