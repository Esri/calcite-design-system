import { Core as StyleDictionary } from "style-dictionary";
import { registerNameCamelCase } from "./transform/nameCamelCase.js";
import { registerNameKebabCase } from "./transform/nameKebabCase.js";
import { registerValueStringWrapper } from "./transform/valueStringWrapper.js";
import { registerSCSSFormat } from "./format/scss.js";
import { registerCSSFormat } from "./format/css.js";
import { registerTransforms } from "@tokens-studio/sd-transforms";
import { registerFilterSource } from "./filter/filterSource.js";

export async function registerCalciteTransformers(sd: StyleDictionary): Promise<void> {
  // Here we are registering the Transforms provided by Token Studio however,
  // we need to pass "expand: false" so that we can use our own custom JSON file parser.
  // any references to "ts/..." below are references to these Token Studio transformers
  // https://github.com/tokens-studio/sd-transforms
  // @ts-expect-error - @token-studio does not keep their types up to date.
  await registerTransforms(sd, {
    expand: {
      composition: true,
      typography: false,
      border: false,
      shadow: false,
    },
  });

  registerNameCamelCase(sd);
  registerNameKebabCase(sd);
  registerValueStringWrapper(sd);
  registerSCSSFormat(sd);
  registerCSSFormat(sd);
  registerFilterSource(sd);
}
