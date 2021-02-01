const { promises: fs } = require("fs");

(async () => {
  console.log("generating component wrappers");

  let componentsManifest: any;
  let componentsUsageReport: any;

  try {
    console.log("reading doc");
    componentsUsageReport = JSON.parse(
      await fs.readFile(`${__dirname}/../../../dist/extras/docs-json.json`, {
        encoding: "utf8"
      })
    );

    componentsManifest = JSON.parse(
      await fs.readFile(`${__dirname}/../../../dist/collection/collection-manifest.json`, {
        encoding: "utf8"
      })
    );
  } catch (e) {
    console.log("an error occurred during setup", e);
  }

  if (!componentsManifest || !componentsUsageReport) {
    console.log("could not generate wrappers");
    process.exit(-1);
  }

  const wrapperDir = `${__dirname}/wrappers`;

  try {
    await fs.mkdir(wrapperDir);
  } catch (e) {
    console.log("wrapper dir already exists");
  }

  componentsManifest.bundles.forEach(async (bundle: { components: string[] }) => {
    const { components } = bundle;

    const componentNamespacePrefix = /^calcite/;
    const wrapperName = components[0].replace(componentNamespacePrefix, "").replace("-", "");

    const componentDeps = new Set<string>();

    components.forEach((comp) => {
      componentDeps.add(comp);
      addDeps(comp, componentDeps);
    });

    const allComps = Array.from(componentDeps);

    const source = `import { ${allComps.map((comp) => toCamelCase(comp)).join(", ")} } from "../index";
import { register } from "../utils";
register({
  ${allComps.map((comp) => `"${comp}": ${toCamelCase(comp)}`).join(",")}
});
`;

    const sourceFile = `${wrapperDir}/${wrapperName}.ts`;

    await fs.writeFile(sourceFile, source);
  });

  console.log("component wrappers generated");

  function toCamelCase(kebabCased: string): string {
    return kebabCased
      .split("-")
      .map(([firstLetter, ...rest]) => `${firstLetter.toUpperCase()}${rest.join("")}`)
      .join("");
  }

  function addDeps(tag: string, candidates: Set<string>): void {
    const found = componentsUsageReport.components.find((comp: { tag: string }) => comp.tag === tag);

    if (!found) {
      return;
    }

    const { dependencies, dependencyGraph } = found;

    const depsToCheck = [tag, ...dependencies];

    depsToCheck.forEach((dep: string) => dependencyGraph[dep]?.forEach((d: string) => candidates.add(d)));
  }
})();
