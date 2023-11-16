import { ColorModifierOptions } from "./colorModifier";

export enum TokenStudioExtensions {
  // eslint-disable-next-line @cspell/spellchecker
  STUDIOTOKENS = "studio.tokens",
}

export type TokenStudioExtensionsUnion = `${TokenStudioExtensions}`;

export type TokenStudioTokenArguments = {
  modify?: ColorModifierOptions;
};

export type TokenStudioExtensionsMap = Partial<Record<TokenStudioExtensionsUnion, TokenStudioTokenArguments>>;

export const tokenStudioTokensArguments: TokenStudioExtensionsMap = {};

export const tokenStudioExtensions = tokenStudioTokensArguments;
