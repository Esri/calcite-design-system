import { camelCase } from 'change-case';

export function nameCamelCase(token, options) {
    return camelCase( [options.prefix].concat(token.path).join(' ') );
}
