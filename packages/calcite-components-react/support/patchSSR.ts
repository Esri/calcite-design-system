// patch needed due to Stencil executing client side code on the server
// when using the includeImportCustomElements option
// https://stenciljs.com/docs/react#includeimportcustomelements
// https://github.com/Esri/calcite-design-system/issues/7486
(async function () {
  const {
    promises: { readFile, writeFile },
  } = await import("fs");
  const { dirname, resolve } = await import("path");
  const { fileURLToPath } = await import("url");

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = resolve(`${__dirname}/../src/components.ts`);
    const contents = await readFile(filePath, { encoding: "utf8" });

    const defineCustomElementImports = /import { defineCustomElement as defineCalcite.*(\r\n|\r|\n)/gm;
    const reactWrapperExports = /createReactComponent<(.*)>.*\((['|\w|-]*)(.*)(defineCalcite\w*)\)/g;

    const patchedContents = contents
      .replace(
        "import { createReactComponent } from './react-component-lib';",
        "$&\nimport { autoDefine } from './auto-define';"
      )
      .replace(defineCustomElementImports, "")
      .replace(reactWrapperExports, "createReactComponent<$1>($2$3autoDefine($2))");

    await writeFile(filePath, patchedContents);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
