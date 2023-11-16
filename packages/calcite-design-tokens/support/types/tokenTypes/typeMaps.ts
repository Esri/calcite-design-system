// A customized type map based off Token Studio.

import { BaseTokenTypes } from "./designTokenTypes.js";

// This determines the applied "type" associated with each Style Dictionary token value
export const typeMap = {
  boxShadow: {
    x: BaseTokenTypes.DIMENSION,
    y: BaseTokenTypes.DIMENSION,
    blur: BaseTokenTypes.DIMENSION,
    spread: BaseTokenTypes.DIMENSION,
    color: BaseTokenTypes.COLOR,
  },
  border: {
    radius: BaseTokenTypes.BORDERRADIUS,
    width: BaseTokenTypes.BORDERWIDTH,
    style: BaseTokenTypes.BORDERSTYLE,
  },
  composition: {},
  typography: {
    fontFamily: BaseTokenTypes.FONTFAMILY,
    fontSize: BaseTokenTypes.FONTSIZE,
    fontStyle: BaseTokenTypes.FONTSTYLE,
    fontWeight: BaseTokenTypes.FONTWEIGHT,
    letterSpacing: BaseTokenTypes.LETTERSPACING,
    lineHeight: BaseTokenTypes.LINEHEIGHT,
    paragraphSpacing: BaseTokenTypes.PARAGRAPHSPACING,
    textCase: BaseTokenTypes.TEXTCASE,
    textDecoration: BaseTokenTypes.TEXTDECORATION,
  },
  colorScheme: {
    light: BaseTokenTypes.COLOR,
    dark: BaseTokenTypes.COLOR,
  },
};
