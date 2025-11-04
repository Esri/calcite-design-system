import StyleDictionary from "style-dictionary";
import { register as registerTokenStudioTransformers } from "@tokens-studio/sd-transforms";
import lightConfig from "../../config/color/light.js";
import darkConfig from "../../config/color/dark.js";
import config from "../../config/index.js";
import { register as registerCalciteHooks } from "../registry/index.js";
import { applyBuiltInOverrides, applyOverrides } from "../overrides/index.js";

await registerTokenStudioTransformers(StyleDictionary, {
  "ts/color/modifiers": {
    format: "hex",
  },
});
await registerCalciteHooks();
applyOverrides();

const light = new StyleDictionary(lightConfig);
const dark = new StyleDictionary(darkConfig);
const semantic = new StyleDictionary(config);

applyBuiltInOverrides([semantic, light, dark]);

export { semantic, light, dark };
