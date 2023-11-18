import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { createCalciteTokenFiles } from "../support/token-transformer/utils/createCalciteTokenFiles.js";
import { getFiles } from "../support/token-transformer/utils/getFiles.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const coreTokens = await createCalciteTokenFiles({
  name: "core",
  path: resolve(__dirname, "core.json"),
});

export const globalTokens = await createCalciteTokenFiles({
  name: "global",
  path: resolve(__dirname, "semantic"),
  references: coreTokens.source,
});

export const componentTokens = await getFiles(resolve(__dirname, "component")).then((components) =>
  Promise.all(
    Object.entries(components).map(([name, path]) =>
      createCalciteTokenFiles({
        name,
        path,
        references: globalTokens.source,
        options: {
          outputReferences: true,
        },
      })
    )
  )
);

export { config } from "./$config.js";
