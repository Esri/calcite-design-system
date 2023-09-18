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
          large: breakpointTokenToNumericalValue(rootStyles, "--calcite-app-breakpoint-width-lg"),
          medium: breakpointTokenToNumericalValue(rootStyles, "--calcite-app-breakpoint-width-md"),
          small: breakpointTokenToNumericalValue(rootStyles, "--calcite-app-breakpoint-width-sm"),
          xsmall: breakpointTokenToNumericalValue(rootStyles, "--calcite-app-breakpoint-width-xs"),
        },
      });
    });
  });

  return getBreakpointsPromise;
}
