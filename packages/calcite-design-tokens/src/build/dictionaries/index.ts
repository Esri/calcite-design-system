import StyleDictionary from "style-dictionary";
import { register as registerTokenStudioTransformers } from "@tokens-studio/sd-transforms";
import calciteLightConfig from "../../config/calcite/light.js";
import calciteDarkConfig from "../../config/calcite/dark.js";
import semanticConfig from "../../config/semantic.js";
import { register as registerCalciteHooks } from "../registry/index.js";
import { applyBuiltInOverrides, applyOverrides } from "../overrides/index.js";

await registerTokenStudioTransformers(StyleDictionary, {
  "ts/color/modifiers": {
    format: "hex",
  },
});
await registerCalciteHooks(StyleDictionary);
applyOverrides(StyleDictionary);

const semantic = new StyleDictionary(semanticConfig);
const light = new StyleDictionary(calciteLightConfig);
const dark = new StyleDictionary(calciteDarkConfig);

applyBuiltInOverrides([semantic, light, dark]);

export { semantic, light, dark };
