import { join } from 'path';
import { parseName } from './utils/parseName';

export const parseThemeConfigBeta = (theme: Theme, config: Config) => {
  const globalTokens = new Set();
    globalTokens.add({ name: 'global' });
  const workingTokens = new Set();
    workingTokens.add({ name: theme.name, path: config.output});
  const { enabled, source } = getTokenSet(theme.selectedTokenSets);

  source.forEach((filePath) => {
    const rawDataStr = readFileSync(join(config.input, `${globalTokens[0].name}.json`), 'utf-8');
    // @ts-expect-error - TS is in conflict with itself. It wants the first param to be "this" but then the other error "An arrow function cannot have a 'this' parameter." will appear. In my opinion using "this" is the more incorrect pattern here.
    const data: Record<string, any> = JSON.parse(rawDataStr, handleFigmaTokenUpdate(true));
    globalTokens.add(data);
  });

  enabled.forEach((filePath) => {
    const rawDataStr = readFileSync(join(config.input, `${workingTokens[0].name}.json`), 'utf-8');
    // @ts-expect-error - TS is in conflict with itself. It wants the first param to be "this" but then the other error "An arrow function cannot have a 'this' parameter." will appear. In my opinion using "this" is the more incorrect pattern here.
    const data: Record<string, any> = JSON.parse(rawDataStr, handleFigmaTokenUpdate(false));
    workingTokens.add(data);
  });
}

export type FigmaThemeConfig = {
  "id": string;
  "name": string;
  "selectedTokenSets": Record<string, 'enabled' | 'disabled' | 'source'>;
  "$figmaStyleReferences": Record<string, string>;
}

export type ThemeConfig = { name: string; original: FigmaThemeConfig; dir: string }

export const parseThemeConfig = (returnObj: ThemeConfig, themeConfig: FigmaThemeConfig) => {
  const { name } = themeConfig;

  // Object.entries(selectedTokenSets).forEach(([key, value]) => {
  //   const filepath = join(returnObj.dir || '', `${key}.json`);
  //   if ( !returnObj[value] ) {
  //     returnObj[value] = [];
  //   }
  //   returnObj[value]?.push(filepath);
  // });

  returnObj['original'] = themeConfig;
  returnObj['name'] = parseName(name);
  return returnObj;
}
