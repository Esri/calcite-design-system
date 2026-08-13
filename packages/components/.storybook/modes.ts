const maxAxisSizeInPx = 2560; // see https://www.chromatic.com/docs/modes/viewports/#frequently-asked-questions

export const allModes = {
  landscapeLarge: {
    viewport: {
      height: maxAxisSizeInPx / 2,
      width: maxAxisSizeInPx,
    },
  },
  portraitLarge: {
    viewport: {
      height: maxAxisSizeInPx,
      width: maxAxisSizeInPx / 2,
    },
  },
  square: {
    viewport: {
      height: maxAxisSizeInPx / 2,
      width: maxAxisSizeInPx / 2
    },
  },
  squareSmall: {
    viewport: {
      height: maxAxisSizeInPx / 8,
      width: maxAxisSizeInPx / 8,
    },
  },
  squareLarge: {
    viewport: {
      height: maxAxisSizeInPx,
      width: maxAxisSizeInPx,
    },
  },

  // axis-based viewports

  widthLarge: {
    viewport: {
      width: maxAxisSizeInPx,
    },
  },
  widthSmall: {
    viewport: {
      width: maxAxisSizeInPx / 8,
    },
  },
  heightLarge: {
    viewport: {
      height: maxAxisSizeInPx,
    },
  },
  heightSmall: {
    viewport: {
      height: maxAxisSizeInPx / 8,
    },
  },
} as const;
