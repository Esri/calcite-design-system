import { run as styleDictionaryRunner } from "./token-transformer/sd-run.js";
// TODO; make CLI to load config
import { config } from "../src/$config.js";
import { CalciteTokenTransformConfig } from "./types/config.js";

const runConfig: CalciteTokenTransformConfig = config;
/**
 * Get all themes defined int the src/$themes.json and generate a Style Dictionary output for each theme
 */
// const rawData = readFileSync(join(tokensDir, "$themes.json"), { encoding: "utf-8" });
// const data = JSON.parse(rawData);
// const files = await getThemes(data);
Promise.all(
  runConfig.files.map(({ name, source, references, options }) =>
    styleDictionaryRunner({
      name: name,
      source: source,
      include: references,
      options: { ...runConfig.options, ...options },
      output: config.output,
    })
  )
);
