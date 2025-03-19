import StyleDictionary from "style-dictionary";
import { registerCalciteTransformers } from "../transforms/index.js";
import { registerCalciteFileHeaders } from "../header/index.js";
import { registerCalciteFormats } from "../format/index.js";
import { registerCalciteFilters } from "../filter/index.js";
import { registerCalcitePreprocessors } from "../preprocessors/index.js";

export async function registerCalciteTokenTransformers(sd: typeof StyleDictionary): Promise<void> {
  await Promise.all([
    registerCalcitePreprocessors(sd),
    registerCalciteFileHeaders(sd),
    registerCalciteFilters(sd),
    registerCalciteFormats(sd),
    registerCalciteTransformers(sd),
  ]);
}

export * as headers from "../header/index.js";
export * as filters from "../filter/index.js";
export * as formats from "../format/index.js";
export * as transformers from "../transforms/index.js";
export * as preprocessors from "../preprocessors/index.js";
