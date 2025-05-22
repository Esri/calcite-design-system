import { globby } from "globby";

(async () => {
  const {
    promises: { writeFile },
  } = await import("fs");

  const rootBundleFile = "messages.json";
  const rootBundlePattern = `src/components/**/assets/t9n/${rootBundleFile}`;
  const rootManifestFilePath = "packages/calcite-components/";

  const rootBundles = await globby([rootBundlePattern]);
  const manifestFilePathSeparator = "\\";

  const paths = await Promise.all(
    rootBundles.map(async (bundle) => {
      const t9nPath = `${bundle.split("/t9n")[0]}/t9n`;
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
  await writeFile("../../t9nmanifest.txt", manifestFileContents);
  console.log("finished writing manifest");
})();
