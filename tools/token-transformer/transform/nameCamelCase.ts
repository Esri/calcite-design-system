import { camelCase } from 'change-case';
import { parseTokenPath } from '../utils/parseTokenPath';

export function nameCamelCase(token, options) {
  return camelCase( [options.prefix].concat(parseTokenPath(token.path)).join(' ') );
}
