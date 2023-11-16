// Match custom variable indicator created by Designers in Token Studio.
// Using the ${token.name} format in Token Studio makes it much easier for Designers to search for token references while doing their work.
export const tokenStudioCustomVariableIndicator = new RegExp(/\$[.\w-]+/, "g");

// Match files and tokens which include "backup", "[", "]", or file extensions
export const matchExclusions = /(backup|\[|\])(?=\.\w+$)/;
