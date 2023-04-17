import { readFileSync } from 'fs';
import { join } from 'path';

export const readFilToJSON = (filePath: string, dir?: string) => {
  const file = readFileSync(join(dir || '', filePath), 'utf-8');
  return JSON.parse(file);
}
