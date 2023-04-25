import Color from "color";

export const CSS = {
  channel: "channel",
  channels: "channels",
  colorFieldAndSlider: "color-field-and-slider",
  colorFieldAndSliderInteractive: "color-field-and-slider--interactive",
  colorFieldAndSliderWrap: "color-field-and-slider-wrap",
  colorFieldScope: "scope--color-field",
  colorMode: "color-mode",
  colorModeContainer: "color-mode-container",
  container: "container",
  control: "control",
  controlSection: "control-section",
  deleteColor: "delete-color",
  header: "header",
  headerSpaced: "header--spaced",
  hexAndChannelsGroup: "hex-and-channels-group",
  hexOptions: "color-hex-options",
  hueScope: "scope--hue",
  hueSlider: "hue-slider",
  opacityControlGroup: "opacity-control-group",
  opacityInput: "opacity-input",
  opacityScope: "scope--opacity",
  opacitySlider: "opacity-slider",
  preview: "preview",
  saveColor: "save-color",
  savedColor: "saved-color",
  savedColors: "saved-colors",
  savedColorsButtons: "saved-colors-buttons",
  savedColorsSection: "saved-colors-section",
  scope: "scope",
  section: "section",
  splitSection: "section--split",
  sliders: "sliders",
  previewAndSliders: "preview-and-sliders",
  controlAndScope: "control-and-scope"
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

export const OPACITY_LIMITS = {
  min: 0,
  max: 100
};

export const DIMENSIONS = {
  s: {
    slider: {
      offset: 48,
      height: 12,
      width: 104
    },
    colorField: {
      height: 80,
      width: 160
    },
    thumb: {
      radius: 10
    }
  },
  m: {
    slider: {
      offset: 56,
      height: 12,
      width: 216
    },
    colorField: {
      height: 150,
      width: 272
    },
    thumb: {
      radius: 10
    }
  },
  l: {
    slider: {
      offset: 64,
      height: 12,
      width: 408
    },
    colorField: {
      height: 200,
      width: 464
    },
    thumb: {
      radius: 10
    }
  }
};
