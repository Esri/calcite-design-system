import StyleDictionary from "style-dictionary";
import { registerTransformers } from "../transforms/index.js";
import { registerFileHeaders } from "../header/index.js";
import { registerFormats } from "../format/index.js";
import { registerFilters } from "../filter/index.js";
import { registerPreprocessors } from "../preprocessors/index.js";

export async function register(sd: typeof StyleDictionary): Promise<void> {
  await Promise.all([
    registerPreprocessors(sd),
    registerFileHeaders(sd),
    registerFilters(sd),
    registerFormats(sd),
    registerTransformers(sd),
  ]);
}

export * as headers from "../header/index.js";
export * as filters from "../filter/index.js";
export * as formats from "../format/index.js";
export * as transformers from "../transforms/index.js";
export * as preprocessors from "../preprocessors/index.js";
