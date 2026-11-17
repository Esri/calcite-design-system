import { rm } from "node:fs/promises";
import { dark, light, semantic } from "./build/dictionaries/index.ts";

await rm("dist", { recursive: true, force: true });

await dark.buildAllPlatforms();
await light.buildAllPlatforms();
await semantic.buildAllPlatforms();
