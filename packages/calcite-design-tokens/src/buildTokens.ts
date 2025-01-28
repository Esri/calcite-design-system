import StyleDictionary from "style-dictionary";
import { register as registerTokenStudioTransformers } from "@tokens-studio/sd-transforms";

import { registerCalciteTransformers } from "./transforms/registerTransforms.js";
import { registerCalciteDefaultFileHeader } from "./header/calcite-default.js";
import { registerCalciteFilters } from "./filter/registerFilters.js";
import { registerCalciteFormats } from "./format/registerFormats.js";
import config from "../src/config/semantic.js";
import calciteLightConfig from "../src/config/calcite/light.js";
import calciteDarkConfig from "../src/config/calcite/dark.js";
import survey123LightConfig from "../src/config/survey123/light.js";
import survey123DarkConfig from "../src/config/survey123/dark.js";
import devSummitLightConfig from "../src/config/dev-summit/light.js";
import { registerCalciteDeprecateFileHeader } from "./header/calcite-deprecate.js";

await registerTokenStudioTransformers(StyleDictionary);
await registerCalciteFormats(StyleDictionary);
await registerCalciteFilters(StyleDictionary);
await registerCalciteDefaultFileHeader(StyleDictionary);
await registerCalciteDeprecateFileHeader(StyleDictionary);
await registerCalciteTransformers(StyleDictionary);

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();

const calciteLight = new StyleDictionary(calciteLightConfig);
await calciteLight.buildAllPlatforms();

const calciteDark = new StyleDictionary(calciteDarkConfig);
await calciteDark.buildAllPlatforms();

const survey123Light = new StyleDictionary(survey123LightConfig);
await survey123Light.buildAllPlatforms();

const survey123Dark = new StyleDictionary(survey123DarkConfig);
await survey123Dark.buildAllPlatforms();

const devSummitLight = new StyleDictionary(devSummitLightConfig);
await devSummitLight.buildAllPlatforms();
