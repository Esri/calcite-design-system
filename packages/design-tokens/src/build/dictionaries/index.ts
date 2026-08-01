import StyleDictionary from "style-dictionary";
import { register as registerTokenStudioTransformers } from "@tokens-studio/sd-transforms";
import lightConfig from "../../config/color/light.ts";
import darkConfig from "../../config/color/dark.ts";
import config from "../../config/index.ts";
import { register as registerCalciteHooks } from "../registry/index.ts";
import { applyBuiltInOverrides, applyOverrides } from "../overrides/index.ts";

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
