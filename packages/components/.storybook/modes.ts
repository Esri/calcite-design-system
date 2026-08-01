const maxSizeInPx = 2560; // see https://www.chromatic.com/docs/modes/viewports/#frequently-asked-questions

export const MODES = {
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
  tall: {
    viewport: {
      height: maxSizeInPx,
    },
  },
  wide: {
    viewport: {
      width: maxSizeInPx,
    },
  },
};
