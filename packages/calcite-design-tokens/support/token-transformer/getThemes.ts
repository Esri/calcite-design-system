import { Options } from "style-dictionary";
import { parseName } from "./utils/parseName.js";

export interface ThemeOutputFile {
  name: string;
  selectedTokenSets: Record<string, string>;
}

export interface ThemeFileInterface {
  theme: string;
  output?: boolean;
  outputFiles: ThemeOutputFile[];
  include?: string[];
}

export type Theme = {
  name?: string;
  enabled?: string[];
  disabled?: string[];
  source?: string[];
  id?: string;
  options?: Options;
};

/**
 *
 * @param {ThemeFileInterface} themes an array of Figma Token Studio theme definition objects
 * @param {string} tokensDir the directory in which to look for files
 * @returns {Array} an array of Style Dictionary theme definition objects
 */
export async function getThemes(themes: ThemeFileInterface[]): Promise<Theme[]> {
  return themes.reduce((acc, theme) => {
    if (theme.output === false) {
      return acc;
    }

    theme.outputFiles.forEach((file) => {
      acc.push({
        name: parseName(theme.theme === "calcite" ? file.name : `${theme.theme}/${file.name}`),
        enabled: Object.keys(file.selectedTokenSets).filter(
          (tokenFileName) => file.selectedTokenSets[tokenFileName] === "enabled"
        ),
        source: Object.keys(file.selectedTokenSets).filter(
          (tokenFileName) => file.selectedTokenSets[tokenFileName] === "source"
        ),
      });
    });

    return acc;
  }, [] as Theme[]);
}
