// patch needed due to Stencil tree-shaking bug
// https://github.com/ionic-team/stencil/issues/3470
(async function () {
  const {
    promises: { readFile, writeFile },
  } = await import("fs");
  const { dirname, normalize } = await import("path");
  const { quote } = await import("shell-quote");
  const { fileURLToPath } = await import("url");

  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const calciteComponentExports = new RegExp("^.*export { Calcite.*$(\r\n|\r|\n)", "gm");
    const filePath = quote([normalize(`${__dirname}/../dist/components/index.js`)]);
    const contents = await readFile(filePath, { encoding: "utf8" });
    await writeFile(filePath, contents.replace(calciteComponentExports, ""));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
