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

// The removed imports are replaced with utils that check the environment
// to make sure the components are only defined on the browser.
const browserCheckUtils = `
// CodeSandbox exposes 'process', which makes it look like NodeJS. The only way to determine it should be
// be treated as the browser is the non-standard value they use for 'process.platform'.
// https://nodejs.org/api/process.html#processplatform
type CodeSandboxWorkaround = NodeJS.Platform | "browser";

// https://github.com/flexdinesh/browser-or-node/blob/master/src/index.js
const isBrowser = typeof window !== "undefined" && typeof window.document !== "undefined";
const isNode =
  typeof process !== "undefined" &&
  process.versions != null &&
  process.versions.node != null &&
  (process?.platform as CodeSandboxWorkaround) !== "browser";
`;

// Matches createReactComponent exports to replace defineCustomElement with
// a function that dynamic imports the components when in the browser.
// The regex creates capture groups for the component name and other parts of
// the line that shouldn't be replaced/removed.
const reactWrapperExports = /createReactComponent<(.*)>.*\('([\w|-]*)'(.*)(defineCalcite\w*)\)/g;

// The patched version of the createReactComponent export using capture groups
// to fill in the blanks.
const patchedReactWrapperExports =
  "createReactComponent<$1>('$2'$3(): (() => Promise<void> | undefined) => isBrowser && !isNode ? async () => (await import('@esri/calcite-components/dist/components/$2.js')).defineCustomElement() : undefined)";

// The isBrowser and isNode utils are placed below this line
const reactLibImport = "import { createReactComponent } from './react-component-lib';";

(async () => {
  try {
    const filePath = resolve(`${__dirname}/../src/components.ts`);
    const contents = await readFile(filePath, { encoding: "utf8" });

    if (contents.includes("isBrowser")) {
      console.log("SSR patch: skipping, components.ts is already patched");
      return;
    }

    const patchedContents = contents
      .replace(reactLibImport, `$&\n${browserCheckUtils}`)
      .replace(defineCustomElementImports, "")
      .replace(reactWrapperExports, patchedReactWrapperExports);

    await writeFile(filePath, patchedContents);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
