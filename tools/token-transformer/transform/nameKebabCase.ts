import { paramCase } from 'change-case';
import { parseTokenPath } from '../utils/parseTokenPath';

export function nameKebabCase(token, options) {
  return paramCase( [options.prefix].concat(parseTokenPath(token.path)).join(' ') );
}
