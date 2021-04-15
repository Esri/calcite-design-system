import { JsonDocs } from "@stencil/core/internal";
import { promises as fs } from "fs";
import { config as componentsConfig } from "../../../stencil.config";

(async () => {
  console.log("generating component bundles");

  let componentsUsageReport: JsonDocs;

  try {
    console.log("reading doc");

    componentsUsageReport = JSON.parse(
      await fs.readFile(`${__dirname}/../../../dist/extras/docs-json.json`, {
        encoding: "utf8"
      })
    );
  } catch (e) {
    console.log("an error occurred during setup", e);
  }

  if (!componentsUsageReport) {
    console.log("could not generate bundles");
    process.exit(-1);
  }

  const bundleDir = `${__dirname}/bundles`;

  try {
    await fs.mkdir(bundleDir);
  } catch (e) {
    console.log("bundle dir already exists");
  }

  for (const { components } of componentsConfig.bundles) {
    const componentNamespacePrefix = /^calcite/;
    const bundleName = components[0].replace(componentNamespacePrefix, "").replace("-", "");
    const componentDeps = new Set<string>();

    components.forEach((comp) => {
      componentDeps.add(comp);
      addDeps(comp, componentDeps);
    });

    const allComponents = Array.from(componentDeps);

    const source = `import { ${allComponents.map((component) => toCamelCase(component)).join(", ")} } from "../index";
import { register } from "../utils";
register({
  ${allComponents.map((component) => `"${component}": ${toCamelCase(component)}`).join(",")}
});
`;

    const sourceFile = `${bundleDir}/${bundleName}.ts`;
    await fs.writeFile(sourceFile, source);
  }

  console.log("component bundles generated");

  function toCamelCase(kebabCased: string): string {
    return kebabCased
      .split("-")
      .map(([firstLetter, ...rest]) => `${firstLetter.toUpperCase()}${rest.join("")}`)
      .join("");
  }

  function addDeps(tag: string, candidates: Set<string>): void {
    const found = componentsUsageReport.components.find((comp: { tag }) => comp.tag === tag);

    if (!found) {
      return;
    }

    const { dependencies, dependencyGraph } = found;
    const depsToCheck = [tag, ...dependencies];

    depsToCheck.forEach((dep: string) => dependencyGraph[dep]?.forEach((d: string) => candidates.add(d)));
  }
})();
