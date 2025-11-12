import { registerTransformers } from "../transforms/index.ts";
import { registerFileHeaders } from "../header/index.ts";
import { registerFormats } from "../format/index.ts";
import { registerFilters } from "../filter/index.ts";
import { registerPreprocessors } from "../preprocessors/index.ts";

export function register(): void {
  registerPreprocessors();
  registerFileHeaders();
  registerFilters();
  registerFormats();
  registerTransformers();
}

export * as headers from "../header/index.ts";
export * as filters from "../filter/index.ts";
export * as formats from "../format/index.ts";
export * as transformers from "../transforms/index.ts";
export * as preprocessors from "../preprocessors/index.ts";
