import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

interface StorybookData {
  id: string;
  name: string;
  reasons: Array<{ moduleName: string }>;
}

interface StorybookContent {
  modules: StorybookData[];
}

interface LuminaData {
  referencedBy: string[];
  referencedTagNames: string[];
  referencedDeferredTagNames: string[];
}

interface LuminaContent {
  [key: string]: LuminaData;
}

(async function () {
  if (!process.env.STORYBOOK_SCREENSHOT_TEST_BUILD) {
    return;
  }

  const luminaPath = resolve(import.meta.dirname, "../build/plugins/custom-element-dependencies.json");
  const storybookPath = resolve(import.meta.dirname, "../docs/preview-stats.json");

  const luminaContents: LuminaContent = JSON.parse(await readFile(luminaPath, { encoding: "utf-8" }));
  const storybookContents: StorybookContent = JSON.parse(await readFile(storybookPath, { encoding: "utf-8" }));

  for (const [absolutePath, dependencies] of Object.entries(luminaContents)) {
    const relativePath = `.${absolutePath.substring(absolutePath.indexOf("/src/"), absolutePath.length)}`;

    // other modules that import the file
    const importReferences: string[] = dependencies.referencedBy.map(
      (referencePath: string) => `.${referencePath.substring(referencePath.indexOf("/src/"), referencePath.length)}`,
    );

    // component tags used in the file's code
    const tagReferences: string[] = [
      ...dependencies.referencedTagNames.map((tag: string) => {
        const componentName = tag.replace("calcite-", "");
        return `./src/components/${componentName}/${componentName}.tsx`;
      }),
      ...dependencies.referencedDeferredTagNames.map((tag: string) => {
        const componentName = tag.replace("calcite-", "");
        return `./src/components/${componentName}/${componentName}.tsx`;
      }),
    ];

    // the file needs to be added to the "reasons" for the tags that are referenced in its code
    tagReferences.forEach((reference: string) => {
      const storybookItemIndex = storybookContents.modules.map((item) => item.id).indexOf(reference);
      if (storybookItemIndex !== -1) {
        storybookContents.modules[storybookItemIndex].reasons.push({ moduleName: relativePath });
      }
    });

    // the modules that import the file need to be added to its "reasons"
    const storybookItemIndex = storybookContents.modules.map((item) => item.id).indexOf(relativePath);
    if (storybookItemIndex !== -1) {
      importReferences.forEach((reference: string) => {
        storybookContents.modules[storybookItemIndex].reasons.push({ moduleName: reference });
      });
    }
  }

  await writeFile(storybookPath, JSON.stringify(storybookContents, null, 2));
})();
