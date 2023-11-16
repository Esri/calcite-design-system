/* eslint @cspell/spellchecker: 0 */
import { ExpandableTokenTypes } from "./designTokenTypes";
import { SingleGenericToken } from "./genericToken";

export enum TokenColorScheme {
  LIGHT = "light",
  DARK = "dark",
  GREYSCALE = "greyscale",
}

export type TokenColorSchemeUnion = `${TokenColorScheme}`;
export type TokenColorSchemes = TokenColorSchemeUnion[];

export type TokenColorSchemeValue = {
  light?: string;
  dark?: string;
  greyscale?: string;
};

export type SingleColorSchemeToken<Named extends boolean = true, P = unknown> = SingleGenericToken<
  ExpandableTokenTypes.COLORSCHEME,
  TokenColorSchemeValue | string,
  Named,
  P
>;

export type ColorSchemeObject = { [Key in TokenColorScheme]: string };
