import {
  CoreBreakpointWidthDefaultLg,
  CoreBreakpointWidthDefaultMd,
  CoreBreakpointWidthDefaultSm,
  CoreBreakpointWidthDefaultXs,
  CoreBreakpointWidthDefaultXxs,
} from "@esri/calcite-design-tokens/dist/es6/calcite-headless";

export interface Breakpoints {
  width: {
    large: number;
    medium: number;
    small: number;
    xsmall: number;
    xxsmall: number;
  };
}

/**
 * A breakpoints lookup object.
 */
export const breakpoints: Breakpoints = {
  width: {
    large: cssLengthToNumber(CoreBreakpointWidthDefaultLg),
    medium: cssLengthToNumber(CoreBreakpointWidthDefaultMd),
    small: cssLengthToNumber(CoreBreakpointWidthDefaultSm),
    xsmall: cssLengthToNumber(CoreBreakpointWidthDefaultXs),
    xxsmall: cssLengthToNumber(CoreBreakpointWidthDefaultXxs),
  },
};

function cssLengthToNumber(length: string): number {
  return parseInt(length);
}
