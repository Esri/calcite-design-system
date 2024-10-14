import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { createCalciteTokenFiles } from "../support/token-transformer/helpers/createCalciteTokenFiles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const coreTokens = await createCalciteTokenFiles({
  name: "core",
  path: resolve(__dirname, "core"),
});

export const semanticTokens = await createCalciteTokenFiles({
  name: "semantic",
  path: resolve(__dirname, "semantic"),
  references: coreTokens.source,
});

export const globalTokens = await createCalciteTokenFiles({
  name: "global",
  path: resolve(__dirname, "global"),
  references: [...coreTokens.source, ...semanticTokens.source],
});

export { config } from "./$config.js";
