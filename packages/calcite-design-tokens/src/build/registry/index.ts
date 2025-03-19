import { registerTransformers } from "../transforms/index.js";
import { registerFileHeaders } from "../header/index.js";
import { registerFormats } from "../format/index.js";
import { registerFilters } from "../filter/index.js";
import { registerPreprocessors } from "../preprocessors/index.js";

export function register(): void {
  registerPreprocessors();
  registerFileHeaders();
  registerFilters();
  registerFormats();
  registerTransformers();
}

export * as headers from "../header/index.js";
export * as filters from "../filter/index.js";
export * as formats from "../format/index.js";
export * as transformers from "../transforms/index.js";
export * as preprocessors from "../preprocessors/index.js";
