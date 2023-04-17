import { join } from 'path';
import { readFileSync } from 'fs';

import { ThemeConfig } from "./parseThemeConfig";
import { ThemeObject } from "./run";

export const createWorkingObject = (returnObj: ThemeObject[], themeConfig: ThemeConfig) => {
  const { original, ...settings } = themeConfig;
  let workingObject: ThemeObject = { global: {} };

  workingObject['$settings'] = settings;

  Object.entries(original.selectedTokenSets).forEach((tokenSet: [setFile: string, selected: 'enabled' | 'disabled' | 'source']) => {
    const [ setFile, selected ] = tokenSet;
    const filepath = join(settings.dir || '', `${setFile}.json`);
    const dataString = readFileSync(filepath, 'utf-8');
    const data = JSON.parse(dataString);
    
    switch(selected){
      case 'disabled':
        break;
      case 'enabled':
        workingObject = { ...workingObject, ...data };
        break;
      case 'source':
        workingObject['global'] = { ...workingObject['global'], ...data };
        break;
      default:
        console.error(`Unknown token set selection. Found '${selected}'. Expected 'enabled', 'disabled', or 'source'`);
        break;
    }
  });

  returnObj.push(workingObject);
  
  return returnObj;
}
