import { Options } from "style-dictionary";

export interface ThemeFileInterface {
  id: string;
  name: string;
  selectedTokenSets: Record<string, "enabled" | "disabled" | "source">;
  $figmaStyleReferences?: Record<string, string>;
}

export type Theme = {
  name: string;
  enabled: string[];
  disabled: string[];
  source: string[];
  id?: string;
  options?: Options;
};

/**
 *
 * @param {ThemeFileInterface} themes an array of Figma Token Studio theme definition objects
 * @returns {Array} an array of Style Dictionary theme definition objects
 */
export async function getThemes(themes: ThemeFileInterface[]): Promise<Theme[]> {
  return themes.map((themeConfig) => {
    const themeTypes = { enabled: [], disabled: [], source: [] };
    const { name, id, selectedTokenSets } = themeConfig;
    const { enabled, disabled, source } = Object.entries(selectedTokenSets).reduce((acc, [key, value]) => {
      acc[value].push(key);
      return acc;
    }, themeTypes);

    return {
      name,
      id,
      enabled,
      disabled,
      source,
    };
  });
}
