import { dark, light, semantic } from "./build/dictionaries/index.js";

await light.buildAllPlatforms();
await dark.buildAllPlatforms();
await semantic.buildAllPlatforms();
