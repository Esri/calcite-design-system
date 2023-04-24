import { run } from "./sd-run";
import { getThemes } from './getThemes';

export const transformTokens = async () => {
  const themes = await getThemes('tokens/$themes.json');
  return Promise.all(themes.map((theme) => run('tokens', 'build', theme)));
}
