// patch needed due to Stencil executing client side code on the server
// when using the includeImportCustomElements option
// https://stenciljs.com/docs/react#includeimportcustomelements
// https://github.com/Esri/calcite-design-system/issues/7486

const {
  promises: { readFile, writeFile },
} = require("fs");
const { resolve } = require("path");

// Matches imports of defineCustomElement from calcite-component's custom-elements output target.
// Importing defineCustomElement on the server throws errors due to ESM/CJS conflicts and
// attempting to use browser APIs, which don't exist on the server.
const defineCustomElementImports = /import { defineCustomElement as defineCalcite.*(\r\n|\r|\n)/gm;

// The removed imports are replaced with autoDefine, which is a wrapper around defineCustomElement
// to make sure it's only called on the client.
const autoDefineImport = "import { autoDefine } from './auto-define';";

// Matches createReactComponent exports to add autoDefine instead of defineCustomElement.
// The regex creates capture groups for the component name and other parts of the line
// that shouldn't be replaced/removed.
const reactWrapperExports = /createReactComponent<(.*)>.*\((['|\w|-]*)(.*)(defineCalcite\w*)\)/g;

// The patched version of the createReactComponent export using the capture groups to fill in the blanks
const patchedReactWrapperExports = "createReactComponent<$1>($2$3autoDefine($2))";

// The autoDefine import is placed below this line
const reactLibImport = "import { createReactComponent } from './react-component-lib';";

(async () => {
  try {
    const filePath = resolve(`${__dirname}/../src/components.ts`);
    const contents = await readFile(filePath, { encoding: "utf8" });

    if (contents.includes(autoDefineImport)) {
      console.log("SSR patch: skipping, components.ts is already patched");
      return;
    }

    const patchedContents = contents
      .replace(reactLibImport, `$&\n${autoDefineImport}`)
      .replace(defineCustomElementImports, "")
      .replace(reactWrapperExports, patchedReactWrapperExports);

    await writeFile(filePath, patchedContents);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
