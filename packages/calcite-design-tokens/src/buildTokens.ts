import StyleDictionary from "style-dictionary";
import { register as registerTokenStudioTransformers } from "@tokens-studio/sd-transforms";
import { registerCalciteTokenTransformers } from "../support/index.js";
import calciteLightConfig from "../src/config/calcite/light.js";
import calciteDarkConfig from "../src/config/calcite/dark.js";
import config from "./config/index.js";

await registerTokenStudioTransformers(StyleDictionary);
await registerCalciteTokenTransformers(StyleDictionary);

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

const calciteLight = new StyleDictionary(calciteLightConfig);
await calciteLight.buildAllPlatforms();

const calciteDark = new StyleDictionary(calciteDarkConfig);
await calciteDark.buildAllPlatforms();
