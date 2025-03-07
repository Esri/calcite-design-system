import { dark, light, semantic } from "./dictionaries.js";

await light.buildAllPlatforms();
await dark.buildAllPlatforms();
await semantic.buildAllPlatforms();
