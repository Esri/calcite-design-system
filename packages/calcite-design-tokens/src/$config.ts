import { readdirSync } from "fs";
import { readdir } from "fs/promises";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { Config, File } from "../support/run";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const modesDirectory = resolve(__dirname, "calcite");
const componentsDirectory = resolve(__dirname, "component");
const globalSourceReference = [resolve(__dirname, "core.json"), resolve(__dirname, "semantic.json")];

const { components, componentRefs } = await readdir(componentsDirectory, { withFileTypes: true }).then((components) =>
  components.reduce(
    (acc, c) => {
      if (c.isDirectory()) {
        const component = readdirSync(resolve(componentsDirectory, c.name));
        component.forEach((mode) => {
          acc.components.push({
            name: `${c.name}/${mode.includes("base") ? "base" : `${mode.match(/[\w\d-]+(?=.json)/)[0]}`}`,
            source: [resolve(componentsDirectory, c.name, `${mode}`)],
            references: [
              ...globalSourceReference,
              ...(mode.includes("base") ? [] : [`${resolve(componentsDirectory, c.name, "base.json")}`]),
            ],
          });
        });
      } else {
        acc.componentRefs.push(`${resolve(componentsDirectory, c.name)}`);
      }

      return acc;
    },
    { components: [], componentRefs: [] } as { components: File[]; componentRefs: string[] }
  )
);

const global: File = {
  name: "global",
  source: globalSourceReference,
  references: componentRefs,
};

const modes = await readdir(modesDirectory).then((modes) =>
  modes.map((mode) => ({
    name: `mode/${mode.match(/[\w\d-]+(?=.json)/)[0]}`,
    source: [resolve(modesDirectory, `${mode}`)],
    references: [...globalSourceReference, ...componentRefs],
  }))
);

export const config: Config = {
  files: [global, ...modes, ...components],
  options: {
    prefix: "calcite",
    outputReferences: true,
  },
  output: {
    dir: resolve(__dirname, "../dist"),
    platforms: ["css", "scss"],
  },
};

export default config;
