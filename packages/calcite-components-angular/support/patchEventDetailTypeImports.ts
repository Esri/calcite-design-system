// patched needed because the auto-generated code from Stencil has incorrect import paths for some event detail types
const { readFile, writeFile } = require("fs/promises");
const { resolve } = require("path");

const typeImportStrings = [
  {
    oldValue: "import type { HandleChange as ICalciteHandleHandleChange } from '@esri/calcite-components'",
    newValue:
      "import type { HandleChange as ICalciteHandleHandleChange } from '@esri/calcite-components/dist/types/components/handle/interfaces'",
  },
  {
    oldValue: "import type { HandleNudge as ICalciteHandleHandleNudge } from '@esri/calcite-components'",
    newValue:
      "import type { HandleNudge as ICalciteHandleHandleNudge } from '@esri/calcite-components/dist/types/components/handle/interfaces'",
  },
  {
    oldValue: "import type { DragDetail as ICalciteListDragDetail } from '@esri/calcite-components'",
    newValue:
      "import type { DragDetail as ICalciteListDragDetail } from '@esri/calcite-components/dist/types/utils/sortableComponent'",
  },
];

(async () => {
  try {
    const filePath = resolve(
      __dirname,
      "..",
      "projects",
      "component-library",
      "src",
      "lib",
      "stencil-generated",
      "components.ts"
    );

    let contents = await readFile(filePath, { encoding: "utf8" });

    typeImportStrings.forEach(({ oldValue, newValue }) => (contents = contents.replace(oldValue, newValue)));

    await writeFile(filePath, contents);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
