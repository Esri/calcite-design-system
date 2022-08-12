(async function () {
  const {
    promises: { readFile, writeFile }
  } = await import("fs");
  const { dirname, normalize } = await import("path");
  const { fileURLToPath } = await import("url");

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);

  // patch needed due to switching package.json's type to "module"
  // https://github.com/Esri/calcite-components/issues/5141
  try {
    const filePath = normalize(`${__dirname}/../dist/components/index.js`);
    const importedModule = "@stencil/core/internal/client";
    const contents = await readFile(filePath, { encoding: "utf8" });
    await writeFile(filePath, contents.replace(importedModule, importedModule + ".js"));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
