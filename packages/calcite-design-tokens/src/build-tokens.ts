import { dark, light, semantic } from "./build/dictionaries/index.js";

await dark.buildAllPlatforms();
await light.buildAllPlatforms();
await semantic.buildAllPlatforms();
