import { resolve } from "path";
import { createCalciteTokenFiles } from "../support/token-transformer/helpers/createCalciteTokenFiles.js";
import { __dirname } from "../support/utils/node.js";

export const coreTokens = await createCalciteTokenFiles({
  name: "core",
  path: resolve(__dirname, "core"),
});

export const globalTokens = await createCalciteTokenFiles({
  name: "global",
  path: resolve(__dirname, "semantic"),
  references: coreTokens.source,
});

export { config } from "./$config.js";
