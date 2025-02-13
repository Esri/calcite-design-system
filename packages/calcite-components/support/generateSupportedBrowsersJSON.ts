(async () => {
  const { dirname, resolve } = await import("path");
  const { fileURLToPath } = await import("url");
  const {
    promises: { writeFile },
  } = await import("fs");
  const { default: browserslist } = await import("browserslist");

  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const outFile = resolve(__dirname, "..", "dist", "docs", "supported-browsers.json");
    const supportedBrowsers = browserslist();
    await writeFile(outFile, JSON.stringify(supportedBrowsers), "utf-8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
