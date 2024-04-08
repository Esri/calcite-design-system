// patch needed due to Stencil's React output target using an outdated path for the JSX type import

const {
  promises: { readFile, writeFile },
} = require("fs");
const { resolve } = require("path");

const incorrectJsxTypeImport = "import type { JSX } from '@esri/calcite-components/dist/components';";
const correctJsxTypeImport = "import type { JSX } from '@esri/calcite-components/dist/types/components';";

(async () => {
  try {
    const filePath = resolve(`${__dirname}/../src/components.ts`);
    const contents = await readFile(filePath, { encoding: "utf8" });

    await writeFile(filePath, contents.replace(incorrectJsxTypeImport, correctJsxTypeImport));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
