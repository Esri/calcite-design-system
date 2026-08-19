import type { ColorPicker } from "./color-picker";

import Color from "color";
import {
  calciteSpacingFixedSm,
  calciteSpacingFixedMd,
  calciteSpacingFixedXl,
} from "@esri/calcite-design-tokens/dist/es6/global.js";
import { IconName } from "../icon/types";

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
  savedColorsButtons: "saved-colors-buttons",
  savedColorsSection: "saved-colors-section",
  scope: "scope",
  section: "section",
  slider: "slider",
  sliders: "sliders",
  splitSection: "section--split",
  swatchGroup: "swatch-group",
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

export const STATIC_DIMENSIONS = {
  s: {
    gap: parseInt(calciteSpacingFixedSm, 10),
    slider: {
      height: 12,
    },
    thumb: {
      radius: 7,
    },
    preview: {
      size: 20,
    },
    minWidth: 200,
  },
  m: {
    gap: parseInt(calciteSpacingFixedMd, 10),
    slider: {
      height: 12,
    },
    thumb: {
      radius: 7,
    },
    preview: {
      size: 24,
    },
    minWidth: 240,
  },
  l: {
    gap: parseInt(calciteSpacingFixedXl, 10),
    slider: {
      height: 12,
    },
    thumb: {
      radius: 7,
    },
    preview: {
      size: 32,
    },
    minWidth: 304,
  },
};

export const SCOPE_SIZE = 1;

export const ICONS: Record<string, IconName> = {
  minus: "minus",
  plus: "plus",
};

/**
 * Use this type guard to narrow an element or event target to this component's element type.
 */
export function isColorPicker(el: Element | null | EventTarget): el is ColorPicker["el"] {
  return (el as Element | null)?.tagName === "CALCITE-COLOR-PICKER";
}
