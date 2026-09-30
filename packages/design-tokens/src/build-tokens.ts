import { dark, light, semantic } from "./build/dictionaries/index.ts";

await dark.buildAllPlatforms();
await light.buildAllPlatforms();
await semantic.buildAllPlatforms();
