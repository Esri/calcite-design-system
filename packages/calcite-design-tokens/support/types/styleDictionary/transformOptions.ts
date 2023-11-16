import { TypeCaseUnion } from "../tokenTypes/case";
import { ColorModifierOptions } from "../tokenTypes/colorModifier";
import { ExpandOptions } from "./expandOptions";

export interface TransformOptions {
  casing?: TypeCaseUnion;
  alwaysAddFontStyle?: boolean;
  expand?: ExpandOptions | false;
  excludeParentKeys?: boolean;
  ["ts/color/modifiers"]?: ColorModifierOptions;
}
