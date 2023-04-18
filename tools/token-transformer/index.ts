import { run } from "./sd-run";
import { getThemes } from './getThemes'

getThemes('tokens/$themes.json').then((themes) => run(['tokens'], 'build', themes))

