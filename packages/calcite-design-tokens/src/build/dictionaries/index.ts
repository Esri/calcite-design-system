import StyleDictionary from "style-dictionary";
import { register as registerTokenStudioTransformers } from "@tokens-studio/sd-transforms";
import calciteLightConfig from "../../config/calcite/light.js";
import calciteDarkConfig from "../../config/calcite/dark.js";
import semanticConfig from "../../config/semantic.js";
import { registerCalciteTokenTransformers } from "../registry/index.js";
import { overrideBuiltInTransforms } from "../transforms/overrides/index.js";

await registerTokenStudioTransformers(StyleDictionary, {
  "ts/color/modifiers": {
    format: "hex",
  },
});
await registerCalciteTokenTransformers(StyleDictionary);
overrideBuiltInTransforms(StyleDictionary);

const semantic = new StyleDictionary(semanticConfig);
const light = new StyleDictionary(calciteLightConfig);
const dark = new StyleDictionary(calciteDarkConfig);

export { semantic, light, dark };
