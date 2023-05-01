import { readFileSync } from "fs";
import { run } from "./sd-run.js";
import { getThemes, ThemeFileInterface } from './getThemes.js';

// asynchronously loops over all themes defined in tokens/$themes.json and generates token files
// in the /build directory in the asset formats defined in the Style Dictionary configuration
export const transformTokens = async () => {
  const rawData = await readFileSync('tokens/$themes.json', {encoding: 'utf-8'});
  const data: ThemeFileInterface[] = JSON.parse(rawData);
  const themes = await getThemes(data);
  return Promise.all(themes.map((theme) => run('tokens', 'build', theme)));
}

if (process.env.NODE_ENV !== 'test') {
  // Make this file self invoking unless the process is in test mode
  transformTokens();
}
