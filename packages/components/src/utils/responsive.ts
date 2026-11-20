import {
  calciteContainerSizeWidthLg,
  calciteContainerSizeWidthMd,
  calciteContainerSizeWidthSm,
  calciteContainerSizeWidthXs,
  calciteContainerSizeWidth2xs,
} from "@esri/calcite-design-tokens/dist/es6/breakpoints.js";

export interface Breakpoints {
  width: {
    large: number;
    medium: number;
    small: number;
    xsmall: number;
    xxsmall: number;
  };
}

/** A breakpoints lookup object. */
export const breakpoints: Breakpoints = {
  width: {
    large: cssLengthToNumber(calciteContainerSizeWidthLg.max),
    medium: cssLengthToNumber(calciteContainerSizeWidthMd.max),
    small: cssLengthToNumber(calciteContainerSizeWidthSm.max),
    xsmall: cssLengthToNumber(calciteContainerSizeWidthXs.max),
    xxsmall: cssLengthToNumber(calciteContainerSizeWidth2xs.max),
  },
};

function cssLengthToNumber(length: string): number {
  return parseInt(length, 10);
}
