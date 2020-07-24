import Color from "color";

export const CSS = {
  controlSection: "control-section",
  hexOptions: "color-hex-options",
  section: "section",
  header: "header",
  control: "control",
  splitSection: "section--split",
  underlinedHeader: "header--underlined",
  colorModeContainer: "color-mode-container",
  colorMode: "color-mode",
  channels: "channels",
  channel: "channel",
  savedColors: "saved-colors",
  savedColorsSection: "saved-colors-section",
  saveColor: "save-color",
  deleteColor: "delete-color",
  savedColorsButtons: "saved-colors-buttons",
  headerHex: "header--hex",
  colorFieldAndSlider: "color-field-and-slider",
  colorFieldAndSliderInteractive: "color-field-and-slider--interactive"
};

export const DEFAULT_COLOR = Color("#007AC2");
export const DEFAULT_STORAGE_KEY_PREFIX = "calcite-color-";

export const RGB_LIMITS = {
  r: 255,
  g: 255,
  b: 255
};

export const HSV_LIMITS = {
  h: 360,
  s: 100,
  v: 100
};

export const DIMENSIONS = {
  s: {
    slider: {
      height: 8,
      width: 170
    },
    colorField: {
      height: 80,
      width: 170
    },
    thumb: {
      radius: 8
    }
  },
  m: {
    slider: {
      height: 10,
      width: 240
    },
    colorField: {
      height: 130,
      width: 240
    },
    thumb: {
      radius: 10
    }
  },
  l: {
    slider: {
      height: 14,
      width: 370
    },
    colorField: {
      height: 200,
      width: 370
    },
    thumb: {
      radius: 12
    }
  }
};
