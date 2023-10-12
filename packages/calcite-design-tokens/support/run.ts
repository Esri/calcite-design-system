import { styleDictionaryRunner } from "./token-transformer/styleDictionaryRunner.js";
// TODO; make CLI to load config
import { config } from "../src/$config.js";

export type File = {
  name: string;
  source: string[];
  references: string[];
};
export type Config = {
  files: File[];
  options: Record<string, string | number | boolean>;
  output: {
    dir: string;
    platforms: string[];
  };
};

const runConfig: Config = config;
/**
 * Get all themes defined int the src/$themes.json and generate a Style Dictionary output for each theme
 */
// const rawData = readFileSync(join(tokensDir, "$themes.json"), { encoding: "utf-8" });
// const data = JSON.parse(rawData);
// const files = await getThemes(data);
Promise.all(
  runConfig.files.map((fileConfig) =>
    styleDictionaryRunner({
      name: fileConfig.name,
      source: fileConfig.source,
      include: fileConfig.references,
      options: config.options,
      output: config.output,
    })
  )
);
