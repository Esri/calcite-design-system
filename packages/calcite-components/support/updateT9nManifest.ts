import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { globby } from "globby";

(async () => {
  const bundleFile = "messages.json";
  const bundlePattern = `src/components/**/assets/t9n/${bundleFile}`;
  const rootManifestFilePath = "packages/calcite-components/";

  const bundlePath = resolve(rootManifestFilePath, bundlePattern);
  const bundles = await globby([bundlePath]);
  const manifestFilePathSeparator = "\\";

  console.log(`found ${bundles.length} t9n bundles`);
  console.log("starting generation of file paths for t9n files");

  const paths = await Promise.all(
    bundles.map(async (bundle) => {
      const bundlePath = bundle.split(rootManifestFilePath)[1];
      const t9nPath = `${bundlePath.split(`/t9n`)[0]}/t9n`;
      const relativeT9nPath = `${rootManifestFilePath}${t9nPath}`;
      return relativeT9nPath.replace(/\//g, manifestFilePathSeparator);
    }),
  );

  const manifestFileContents = paths
    .sort((pathA, pathB) => {
      // ensure paths are sorted per component-name as `globby` does not guarantee order (see https://github.com/sindresorhus/globby/issues/131)
      const componentAName = pathA.split(manifestFilePathSeparator).at(-3);
      const componentBName = pathB.split(manifestFilePathSeparator).at(-3);
      return componentAName && componentBName ? componentAName?.localeCompare(componentBName) : 0;
    })
    .join("\n");

  try {
    await writeFile(resolve("t9nmanifest.txt"), manifestFileContents);
    console.log("finished writing manifest");
  } catch (error) {
    console.error("Error writing t9n manifest file:", error);
    return;
  }
})();
