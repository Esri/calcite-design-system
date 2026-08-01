const maxSizeInPx = 2560; // see https://www.chromatic.com/docs/modes/viewports/#frequently-asked-questions

export const allModes = {
  small: {
    viewport: {
      height: 300,
      width: 300,
    },
  },
  large: {
    viewport: {
      height: maxSizeInPx,
      width: maxSizeInPx,
    },
  },
  wide: {
    viewport: {
      width: 1728,
    },
  },
  extraWide: {
    viewport: {
      height: 800,
      width: 2500,
    },
  },
  short: {
    viewport: {
      height: 400,
      width: 1200,
    },
  },
  standard: {
    viewport: {
      height: 700,
      width: 1200,
    },
  },
  square: {
    viewport: {
      height: 1200,
      width: 1200,
    },
  },
  tall: {
    viewport: {
      height: 6112,
      width: 1200,
    },
  },
} as const;
