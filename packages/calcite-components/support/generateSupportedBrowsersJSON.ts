(async () => {
  const { resolve } = await import("path");
  const {
    promises: { writeFile },
  } = await import("fs");
  const { default: browserslist } = await import("browserslist");

  try {
    const outFile = resolve(import.meta.dirname, "..", "dist", "docs", "supported-browsers.json");
    const supportedBrowsers = browserslist();
    await writeFile(outFile, JSON.stringify(supportedBrowsers), "utf-8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
