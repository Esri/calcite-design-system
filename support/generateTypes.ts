import { InputData, jsonInputForTargetLanguage, quicktype } from "quicktype-core";
import { format } from "prettier";
import globby from "globby";
import pify from "pify";
import { readFile, writeFile } from "fs";

(async () => {
  const rootBundleExtension = "en.json";
  const rootBundlePattern = `src/components/**/${rootBundleExtension}`;

  const rootBundles = await globby([rootBundlePattern]);

  console.log("starting generation of i18n string typings...", rootBundlePattern);

  const paths = await Promise.all(
    rootBundles.map(async (bundle) => {
      const typeName = `${bundle.split("/").pop().replace(rootBundleExtension, "")}-strings`;
      let jsonContents = await pify(readFile)(bundle, { encoding: "utf-8" });

      // workaround for https://github.com/quicktype/quicktype/issues/1479
      const temp = JSON.parse(jsonContents);
      const stopgapKey = "__stopgap__";
      temp[stopgapKey] = 0;
      jsonContents = JSON.stringify(temp);

      const jsonInput = jsonInputForTargetLanguage("typescript");
      await jsonInput.addSource({ name: typeName, samples: [jsonContents] });

      const inputData = new InputData();
      inputData.addInput(jsonInput);

      const typingsContent = (
        await quicktype({
          inputData,
          lang: "typescript",
          rendererOptions: {
            "just-types": "true"
          }
        })
      ).lines
        .filter((line) => !line.includes(stopgapKey))
        .join("\n")
        // export types to avoid issues when typing the string bundles
        // see https://github.com/microsoft/TypeScript/issues/15300
        .replace(/interface (.+) \{/g, "type $1 = {");

      /* Note: using `.d.ts` file extension will exclude it from the output build */
      const declarationFile = bundle.replace(rootBundleExtension, "index.d.ts");

      await pify(writeFile)(
        declarationFile,
        format(typingsContent, {
          filepath: declarationFile
        })
      );
      const i18nPath = `${bundle.split("/t9n")[0]}/t9n`;
      return i18nPath.replace(/\//g, "\\");
    })
  );

  console.log("finished generating i18n string typings");
  const manifestFileContents = paths.sort().join("\n");
  await pify(writeFile)("manifest.txt", manifestFileContents);
  console.log("finished writing manifest");
})();
