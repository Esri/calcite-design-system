import { run as styleDictionaryRunner } from "./token-transformer/sd-run.js";
import { config } from "../src/$config.js";
import { CalciteTokenTransformConfig } from "./types/config.js";

const runConfig: CalciteTokenTransformConfig = config;

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
