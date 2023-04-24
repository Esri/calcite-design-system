import { InputData, jsonInputForTargetLanguage, quicktype } from "quicktype-core";
import { format } from "prettier";
import globby from "globby";

(async () => {
  const {
    promises: { readFile, writeFile }
  } = await import("fs");

  const rootBundleFile = "messages.json";
  const rootBundlePattern = `src/components/**/t9n/${rootBundleFile}`;

  const rootBundles = await globby([rootBundlePattern]);

  console.log("starting generation of t9n string typings...", rootBundlePattern);

  const paths = await Promise.all(
    rootBundles.map(async (bundle) => {
      const typeName = `${bundle.split("/").pop().replace(rootBundleFile, "")}-messages`;
      const jsonContents = await readFile(bundle, { encoding: "utf-8" });

      const jsonInput = jsonInputForTargetLanguage("typescript");
      await jsonInput.addSource({ name: typeName, samples: [jsonContents] });

      const inputData = new InputData();
      inputData.addInput(jsonInput);

      const typingsContent = (
        await quicktype({
          inputData,
          lang: "typescript",
          inferMaps: false,
          rendererOptions: {
            "just-types": "true"
          }
        })
      ).lines
        .join("\n")
        // export types to avoid issues when typing the string bundles
        // see https://github.com/microsoft/TypeScript/issues/15300
        .replace(/interface (.+) \{/g, "type $1 = {");

      /* Note: using `.d.ts` file extension will exclude it from the output build */
      const declarationFile = bundle.replace(rootBundleFile, "index.d.ts");

      await writeFile(
        declarationFile,
        format(typingsContent, {
          filepath: declarationFile
        })
      );
      const t9nPath = `${bundle.split("/t9n")[0]}/t9n`;
      return t9nPath.replace(/\//g, "\\");
    })
  );

  console.log("finished generating t9n string typings");
  const manifestFileContents = paths.sort().join("\n");
  await writeFile("t9nmanifest.txt", manifestFileContents);
  console.log("finished writing manifest");
})();
