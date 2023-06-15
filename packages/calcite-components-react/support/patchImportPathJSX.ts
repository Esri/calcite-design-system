// patch needed due to Stencil creating the wrong import path to the JSX type
(async function () {
  const {
    promises: { readFile, writeFile }
  } = await import("fs");
  const { resolve } = await import("path");

  try {
    const filePath = resolve(__dirname, "..", "src", "components.ts");
    const contents = await readFile(filePath, { encoding: "utf8" });
    await writeFile(
      filePath,
      contents.replace(
        'import type { JSX } from "@esri/calcite-components/dist/components"',
        'import type { JSX } from "@esri/calcite-components"'
      )
    );
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
