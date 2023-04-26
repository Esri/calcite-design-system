import { readFileSync } from "fs";
import { Options } from "style-dictionary";
import { parseName } from "./utils/parseName.js";

export interface ThemeFileInterface {
  id: string;
  name: string;
  selectedTokenSets: Record<string, 'enabled' | 'disabled' | 'source'>;
  $figmaStyleReferences?: Record<string, string>;
}

export type Theme = {
  name: string;
  fileName: string;
  enabled: string[];
  disabled: string[];
  source: string[];
  id?: string;
  options?: Options
}

export async function getThemes( themeFile: string ): Promise<Theme[]> {
  const rawData = await readFileSync(themeFile, {encoding: 'utf-8'});
  const data: ThemeFileInterface[] = JSON.parse(rawData);
  return data.map((themeConfig) => {
    const themeTypes = {enabled: [], disabled: [], source: []};
    const { name, id, selectedTokenSets} = themeConfig;
    const { enabled, disabled, source } = Object.entries(selectedTokenSets).reduce((acc, [key, value]) => {
      acc[value].push(key);
      return acc;
    }, themeTypes);

    return {
      name,
      fileName: parseName(name),
      id,
      enabled,
      disabled,
      source,
    };
  })
}
