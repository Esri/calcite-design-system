import { join } from 'path';
import { readFileSync, createWriteStream } from 'fs';

export type Theme = {
  id: string,
  name: string,
  selectedTokenSets: TokenSet,
  $figmaStyleReferences: Record<string, string>
}

export type Config = {
  input: string,
  output: string,
}

export type Tokens = Record<string, any>

export function createFileName(str: string) {
  return '';
}

export type TokenSet = Record<string, "enabled" | "source" | "disabled">;
export function getTokenSet(selectedTokenSets: Theme['selectedTokenSets']) {
  const dict: Record<'enabled'|'source', string[]>= { enabled: [], source: [] };
  return Object.entries(selectedTokenSets).reduce((acc, [tokenFileName, status]) => {
    switch(status) {
      case 'enabled':
        acc.enabled.push(tokenFileName)
        break;
      case 'source':
        acc.source.push(tokenFileName)
        break;
      default:
        break;
    }
    return acc;
  }, dict);
}

export const regexMatchVariable = /^\$/;
export function findVariable(obj, key, value) {
  if (typeof obj[key] === 'string') {
    if ( regexMatchVariable.test(obj[key]) ) {

    }
  }
}

export function jsonParseMatcher (matchingGroup: RegExp, updateMatch: (_: any, key: string, val: string) => any) {
  return (_: any, key: string, val: string) => {
    debugger;
    if (typeof val === 'string') {
      const match = Array.from(val.matchAll(matchingGroup));
      if (match.length > 0) {
        // handle Figma Token Variable matching
        _ = updateMatch(_, key, val);
      }
    }

    return _;
  };
}

// handle Figma Token Variable matching - replace with style-dictionary var structure
export function handleFigmaTokenUpdate(isSource = false) { return (_: any, key: string, val: string) => {
  const matchingGroup = new RegExp(/\$[.\w-]+/g);
  const newValue = val;

  if (typeof newValue === 'string') {
    const matches = [...newValue.matchAll(matchingGroup)];
    if (matches.length > 0) {
      matches.forEach((match) => {
        const figmaVariable  = match[0];
        if(isSource) {
          if() {

          }
        } else {
          newValue.replace(figmaVariable, `{${figmaVariable.slice(1)}}`);
        }
      });
    }
  }

  return newValue;
}}

export type TokenObjectValue = string | number | Record<string, any> | (string | number | Record<string, any>)[];

// export const handleTheme = (theme: Theme, config: Config) => {
//   const globalTokens = new Set();
//     globalTokens.add({ name: 'global' });
//   const workingTokens = new Set();
//     workingTokens.add({ name: theme.name, path: config.output});
//   const { enabled, source } = getTokenSet(theme.selectedTokenSets);

//   source.forEach((filePath) => {
//     const rawDataStr = readFileSync(join(config.input, `${globalTokens[0].name}.json`), 'utf-8');
//     // @ts-expect-error - TS is in conflict with itself. It wants the first param to be "this" but then the other error "An arrow function cannot have a 'this' parameter." will appear. In my opinion using "this" is the more incorrect pattern here.
//     const data: Record<string, any> = JSON.parse(rawDataStr, handleFigmaTokenUpdate(true));
//     globalTokens.add(data);
//   });

//   enabled.forEach((filePath) => {
//     const rawDataStr = readFileSync(join(config.input, `${workingTokens[0].name}.json`), 'utf-8');
//     // @ts-expect-error - TS is in conflict with itself. It wants the first param to be "this" but then the other error "An arrow function cannot have a 'this' parameter." will appear. In my opinion using "this" is the more incorrect pattern here.
//     const data: Record<string, any> = JSON.parse(rawDataStr, handleFigmaTokenUpdate(false));
//     workingTokens.add(data);
//   });
// }

/**
 * 
 * @param themesFilePath - the file relative to the current working directory which should be used to create files
 * @param tokensDir - the directory for source tokens. If not provided the file root will be assumed to be where tokens are
 */





