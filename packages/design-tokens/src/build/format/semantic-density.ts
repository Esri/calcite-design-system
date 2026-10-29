import type { FormatFn } from "style-dictionary/types";
import { fileHeader, formattedVariables } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types.ts";
import { isFontScaled, isSize, isSpacing } from "../utils/token-types.ts";
import { densityFactorVar, densityIncludeSizeVar } from "../transforms/value/spacing-density.ts";
import { fontScaleIncludeIconsVar, fontScaleVar, iconScaleVar } from "../transforms/value/font-scale.ts";

const densityPresets = {
  "50%": 0.5,
  "75%": 0.75,
  "100%": 1,
  "125%": 1.25,
  "150%": 1.5,
  "175%": 1.75,
} as const;

// each step moves the 14px base text size by 2px
const fontScalePresets = {
  small: "calc(12 / 14)",
  default: 1,
  large: "calc(16 / 14)",
  "x-large": "calc(18 / 14)",
} as const;

export const registerFormatSemanticDensity: RegisterFn = () => {
  StyleDictionary.registerFormat({
    name: FormatSemanticDensity,
    format: formatSemanticDensity,
  });
};

export const formatSemanticDensity: FormatFn = async ({ dictionary, options, file }) => {
  const { outputReferences, outputReferenceFallbacks, usesDtcg, formatting, sort } = options;
  const header = await fileHeader({ file, options });
  const createVariables = (filter: typeof isSpacing) =>
    formattedVariables({
      format: "css",
      dictionary: { ...dictionary, allTokens: dictionary.allTokens.filter(filter) },
      outputReferences,
      outputReferenceFallbacks,
      formatting,
      usesDtcg,
      sort,
    });

  const createPresets = (attribute: string, variable: string, presets: Record<string, string | number>) =>
    Object.entries(presets).map(([preset, factor]) => `[${attribute}="${preset}"] {\n  ${variable}: ${factor};\n}`);

  const isDensityScaled: typeof isSpacing = (token) => isSpacing(token) || isSize(token);
  // icons only follow the font scale when the 0/1 include-icons switch is on
  const iconScale = `${iconScaleVar}: calc(1 + (var(${fontScaleVar}, 1) - 1) * var(${fontScaleIncludeIconsVar}, 0));`;
  const blocks = [
    `${header}:root {\n${createVariables((token) => !isDensityScaled(token) && !isFontScaled(token))}\n}`,
    // re-declared on each scope so the factor var re-resolves there
    `:root,\n[data-calcite-density] {\n${createVariables(isDensityScaled)}\n}`,
    `:root,\n[data-calcite-font-scale] {\n${createVariables(isFontScaled)}\n  ${iconScale}\n}`,
    `:root {\n  ${densityFactorVar}: 1;\n  ${densityIncludeSizeVar}: 0;\n  ${fontScaleVar}: 1;\n  ${fontScaleIncludeIconsVar}: 0;\n}`,
    ...createPresets("data-calcite-density", densityFactorVar, densityPresets),
    ...createPresets("data-calcite-font-scale", fontScaleVar, fontScalePresets),
  ];

  return `${blocks.join("\n\n")}\n`;
};

export const FormatSemanticDensity = "calcite/format/semantic-density";
