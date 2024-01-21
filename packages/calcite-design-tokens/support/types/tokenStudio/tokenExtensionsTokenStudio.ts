import { ColorModifierOptions } from "./colorModifier.js";

export type TokenStudioExtensionsUnion = "studio.tokens";

export type TokenStudioTokenArguments = {
  modify?: ColorModifierOptions;
};

export type TokenStudioExtensionsMap = Partial<Record<TokenStudioExtensionsUnion, TokenStudioTokenArguments>>;

export const tokenStudioTokensArguments: TokenStudioExtensionsMap = {};

export const tokenStudioExtensions = tokenStudioTokensArguments;
