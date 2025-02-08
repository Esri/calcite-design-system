import Color from "color";

export const CSS = {
  channel: "channel",
  channels: "channels",
  colorField: "color-field",
  colorFieldScope: "scope--color-field",
  colorMode: "color-mode",
  colorModeContainer: "color-mode-container",
  container: "container",
  control: "control",
  controlAndScope: "control-and-scope",
  controlSection: "control-section",
  deleteColor: "delete-color",
  header: "header",
  hexAndChannelsGroup: "hex-and-channels-group",
  hexOptions: "color-hex-options",
  hueScope: "scope--hue",
  hueSlider: "hue-slider",
  opacityScope: "scope--opacity",
  opacitySlider: "opacity-slider",
  preview: "preview",
  previewAndSliders: "preview-and-sliders",
  saveColor: "save-color",
  savedColor: "saved-color",
  savedColors: "saved-colors",
  savedColorsButtons: "saved-colors-buttons",
  savedColorsSection: "saved-colors-section",
  scope: "scope",
  section: "section",
  slider: "slider",
  sliders: "sliders",
  splitSection: "section--split",
};

export const DEFAULT_COLOR = Color("#007AC2");
export const DEFAULT_STORAGE_KEY_PREFIX = "calcite-color-";

export const RGB_LIMITS = {
  r: 255,
  g: 255,
  b: 255,
};

export const HSV_LIMITS = {
  h: 360,
  s: 100,
  v: 100,
};

// 0 and 360 represent the same value, so we limit the hue to 359
export const HUE_LIMIT_CONSTRAINED = HSV_LIMITS.h - 1;

export const OPACITY_LIMITS = {
  min: 0,
  max: 100,
};

export const DIMENSIONS = {
  s: {
    slider: {
      height: 12,
      width: 142,
    },
    colorField: {
      height: 110,
      width: 198,
    },
    thumb: {
      radius: 7,
    },
    preview: {
      size: 20,
    },
  },
  m: {
    slider: {
      height: 12,
      width: 170,
    },
    colorField: {
      height: 132,
      width: 238,
    },
    thumb: {
      radius: 7,
    },
    preview: {
      size: 24,
    },
  },
  l: {
    slider: {
      height: 12,
      width: 222,
    },
    colorField: {
      height: 168,
      width: 302,
    },
    thumb: {
      radius: 7,
    },
    preview: {
      size: 32,
    },
  },
};

export const SCOPE_SIZE = 1;
