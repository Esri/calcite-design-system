import {
  CoreBreakpointWidthLg,
  CoreBreakpointWidthMd,
  CoreBreakpointWidthSm,
  CoreBreakpointWidthXs,
  CoreBreakpointWidthXxs,
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
    large: cssLengthToNumber(CoreBreakpointWidthLg),
    medium: cssLengthToNumber(CoreBreakpointWidthMd),
    small: cssLengthToNumber(CoreBreakpointWidthSm),
    xsmall: cssLengthToNumber(CoreBreakpointWidthXs),
    xxsmall: cssLengthToNumber(CoreBreakpointWidthXxs),
  },
};

function cssLengthToNumber(length: string): number {
  return parseInt(length);
}
