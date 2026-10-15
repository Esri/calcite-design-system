import type { FormatFn } from "style-dictionary/types";
import { fileHeader, formattedVariables } from "style-dictionary/utils";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types.ts";
import { isSpacing } from "../utils/token-types.ts";
import { densityFactorVar } from "../transforms/value/spacing-density.ts";

const densityPresets = {
  "50%": 0.5,
  "75%": 0.75,
  "100%": 1,
  "125%": 1.25,
  "150%": 1.5,
  "175%": 1.75,
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

  const presets = Object.entries(densityPresets).map(
    ([preset, factor]) => `[data-calcite-density="${preset}"] {\n  ${densityFactorVar}: ${factor};\n}`,
  );

  const blocks = [
    `${header}:root {\n${createVariables((token) => !isSpacing(token))}\n}`,
    // spacing is re-declared on each density scope so var(--calcite-density-factor) re-resolves there
    `:root,\n[data-calcite-density] {\n${createVariables(isSpacing)}\n}`,
    `:root {\n  ${densityFactorVar}: 1;\n}`,
    ...presets,
  ];

  return `${blocks.join("\n\n")}\n`;
};

export const FormatSemanticDensity = "calcite/format/semantic-density";
