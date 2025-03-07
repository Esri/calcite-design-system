import StyleDictionary from "style-dictionary";
import { register as registerTokenStudioTransformers } from "@tokens-studio/sd-transforms";
import { registerCalciteTokenTransformers } from "../support/index.js";
import calciteLightConfig from "../src/config/calcite/light.js";
import calciteDarkConfig from "../src/config/calcite/dark.js";
import semanticConfig from "./config/semantic.js";

await registerTokenStudioTransformers(StyleDictionary, {
  "ts/color/modifiers": {
    format: "hex",
  },
});
await registerCalciteTokenTransformers(StyleDictionary);

const semantic = new StyleDictionary(semanticConfig);
const light = new StyleDictionary(calciteLightConfig);
const dark = new StyleDictionary(calciteDarkConfig);

export { semantic, light, dark };
