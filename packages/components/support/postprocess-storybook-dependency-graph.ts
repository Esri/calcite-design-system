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
  const luminaPath = resolve(import.meta.dirname, "../build/custom-element-dependencies.json");
  const storybookPath = resolve(import.meta.dirname, "../docs/preview-stats.json");

  const luminaContents: LuminaContent = JSON.parse(await readFile(luminaPath, { encoding: "utf-8" }));
  const storybookContents: StorybookContent = JSON.parse(await readFile(storybookPath, { encoding: "utf-8" }));

  for (const [absolutePath, dependencies] of Object.entries(luminaContents)) {
    const relativePath = `.${absolutePath.substring(absolutePath.indexOf("/src/"), absolutePath.length)}`;

    const references: string[] = dependencies.referencedBy.map(
      (referencePath: string) => `.${referencePath.substring(referencePath.indexOf("/src/"), referencePath.length)}`,
    );

    references.push(
      ...dependencies.referencedTagNames.map((tag: string) => {
        const componentName = tag.replace("calcite-", "");
        return `./src/components/${componentName}/${componentName}.tsx`;
      }),
    );
    references.push(
      ...dependencies.referencedDeferredTagNames.map((tag: string) => {
        const componentName = tag.replace("calcite-", "");
        return `./src/components/${componentName}/${componentName}.tsx`;
      }),
    );

    const storybookItemIndex = storybookContents.modules.map((item) => item.id).indexOf(relativePath);

    if (storybookItemIndex !== -1) {
      references.forEach((reference: string) => {
        storybookContents.modules[storybookItemIndex].reasons.push({ moduleName: reference });
      });
    }
  }

  await writeFile(storybookPath, JSON.stringify(storybookContents, null, 2));
})();
