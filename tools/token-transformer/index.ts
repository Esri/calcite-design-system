import { run } from "./sd-run.js";
import { getThemes } from './getThemes.js';

export const transformTokens = async () => {
  const themes = await getThemes('tokens/$themes.json');
  return Promise.all(themes.map((theme) => run('tokens', 'build', theme)));
}

if (process.env.NODE_ENV !== 'test') {
  transformTokens();
}
