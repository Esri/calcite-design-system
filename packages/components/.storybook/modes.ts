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
      width: maxSizeInPx,
    },
  },
  short: {
    viewport: {
      height: 400,
      width: maxSizeInPx / 2,
    },
  },
  standard: {
    viewport: {
      height: 700,
      width: maxSizeInPx / 2
    },
  },
  square: {
    viewport: {
      height: maxSizeInPx / 2,
      width: maxSizeInPx / 2
    },
  },
  tall: {
    viewport: {
      height: maxSizeInPx,
    },
  },
} as const;
