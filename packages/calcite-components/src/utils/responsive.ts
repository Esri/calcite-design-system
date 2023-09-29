export interface Breakpoints {
  width: {
    large: number;
    medium: number;
    small: number;
    xsmall: number;
  };
}

let getBreakpointsPromise: Promise<Breakpoints>;

function breakpointTokenToNumericalValue(style: CSSStyleDeclaration, tokenName: string): number {
  return parseInt(style.getPropertyValue(tokenName));
}

/**
 * This util will return a breakpoints lookup object.
 *
 * Note that the breakpoints will be evaluated at the root and cached for reuse.
 *
 * @returns {Promise<Breakpoints>} The Breakpoints object.
 */
export async function getBreakpoints(): Promise<Breakpoints> {
  if (getBreakpointsPromise) {
    return getBreakpointsPromise;
  }

  getBreakpointsPromise = new Promise<Breakpoints>((resolve) => {
    requestAnimationFrame(() => {
      const rootStyles = getComputedStyle(document.body);

      resolve({
        width: {
          large: breakpointTokenToNumericalValue(rootStyles, "--calcite-breakpoint-width-lg"),
          medium: breakpointTokenToNumericalValue(rootStyles, "--calcite-breakpoint-width-md"),
          small: breakpointTokenToNumericalValue(rootStyles, "--calcite-breakpoint-width-sm"),
          xsmall: breakpointTokenToNumericalValue(rootStyles, "--calcite-breakpoint-width-xs"),
        },
      });
    });
  });

  return getBreakpointsPromise;
}
