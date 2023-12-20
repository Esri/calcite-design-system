// patch needed due to switching package.json's type to "module"
// https://github.com/Esri/calcite-design-system/issues/5141

const importedModule = "@stencil/core/internal/client";

(async function () {
  const {
    promises: { readFile, readdir, writeFile },
  } = await import("fs");
  const { dirname, resolve } = await import("path");
  const { fileURLToPath } = await import("url");

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const componentsOutput = resolve(__dirname, "..", "dist", "components");
    const files = await readdir(componentsOutput);
    for (const file of files) {
      const filePath = resolve(componentsOutput, file);
      const contents = await readFile(filePath, { encoding: "utf8" });
      await writeFile(filePath, contents.replace(importedModule, importedModule + "/index.js"));
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
