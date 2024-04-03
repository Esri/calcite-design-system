import { ColorModifierOptions } from "../tokenStudio/colorModifier";
import { ExpandOptions } from "../tokenStudio/expandOptions";

export enum TypeCase {
  CAMEL = "camel",
  PASCAL = "pascal",
  SNAKE = "snake",
  KEBAB = "kebab",
  CONSTANT = "constant",
}

export type TypeCaseUnion = `${TypeCase}`;

export interface TransformOptions {
  casing?: TypeCaseUnion;
  alwaysAddFontStyle?: boolean;
  expand?: ExpandOptions | false;
  excludeParentKeys?: boolean;
  ["ts/color/modifiers"]?: ColorModifierOptions;
}
