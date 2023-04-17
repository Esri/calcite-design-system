import { writeFileSync, mkdirSync, existsSync, rmdirSync } from 'fs';
import { join } from 'path';

import { readFilToJSON } from "./utils/readFiles";
import { parseThemeConfig, ThemeConfig } from "./parseThemeConfig";
import { createWorkingObject } from "./createWorkingObject";
import { buildStyleDictionary } from "./buildStyleDictionary";

export type ThemeObject = { global: Record<string, any>, [key: string]: Record<string, any>};
const workingThemeObject: ThemeObject[] = [];

/**
 * 
 * @param filePath - the file relative to the current working directory which should be used to create files
 * @param dir - the directory for source tokens. If not provided the file root will be assumed to be where tokens are
 */
export const run = async (filePath: string, input: string, output: string) => {
  const fileData = readFilToJSON(filePath, input);

  if (Array.isArray(fileData) && typeof fileData[0].id === 'string') {
    const tempDir = join(process.cwd(), 'temp');

    if (output && !existsSync(output)){
      mkdirSync(output);
    }
    if (tempDir && !existsSync(tempDir)){
      mkdirSync(tempDir);
    }

    const themes = [...new Set(fileData.reduce(parseThemeConfig, { name: '', original: {}, dir: output })) as Set<ThemeConfig>];
    const workingObjects = themes.reduce(createWorkingObject, workingThemeObject);
    const tokensPromise = workingObjects.map(async (tokenSet) => {
      const {  $settings, global, ...tokens } = tokenSet;
      const { name } = $settings;
      const tempFile = join(tempDir, `${$settings.name}.json`);
      writeFileSync(tempFile, JSON.stringify({ global, ...tokens }, null, 2));
      return buildStyleDictionary(tempFile, name, output);
    });

    await Promise.all(tokensPromise);

    rmdirSync(tempDir);
  } else {
    // Assume we are working with a single file transform
    // parse file directly with Style Dictionary
    const name = filePath.match(/($^)/);
    await buildStyleDictionary(filePath, name, output);
  }
}
