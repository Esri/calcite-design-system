// generates a JSON file containing the per component t9n translation values
(async () => {
  const { resolve } = await import("path");
  const {
    existsSync,
    promises: { readFile, readdir, writeFile },
  } = await import("fs");
  try {
    const outFile = resolve(import.meta.dirname, "..", "dist", "docs", "translations.json");
    const assetsPaths = resolve(import.meta.dirname, "..", "dist", "cdn", "assets");
    const components = await readdir(assetsPaths);

    const data = {};

    for (const component of components) {
      const t9nPath = resolve(assetsPaths, component, "t9n");

      if (existsSync(t9nPath)) {
        data[component] = {};
        const messagesFileMain = JSON.parse(await readFile(resolve(t9nPath, "messages.json"), { encoding: "utf-8" }));
        Object.keys(messagesFileMain).forEach((key) => (data[component][key] = {}));

        const messagesFilenames = (await readdir(t9nPath, { withFileTypes: true })).map((dirent) => dirent.name);
        const messagesFilenameRegex = new RegExp(`messages\\.(.*)\\.json`);

        for (const messagesFilename of messagesFilenames) {
          const messagesFilenameMatch = messagesFilename.match(messagesFilenameRegex);

          if (messagesFilenameMatch && messagesFilenameMatch.length > 1) {
            const lang = messagesFilenameMatch[1];
            const messagesFile = JSON.parse(await readFile(resolve(t9nPath, messagesFilename), { encoding: "utf-8" }));

            for (const [key, value] of Object.entries(messagesFile)) {
              const translationEntries = data[component][key];

              // translation bundles might still have references to strings removed in the `main` and `en` bundle
              if (translationEntries) {
                translationEntries[lang] = value;
              }
            }
          }
        }
      }
    }
    await writeFile(outFile, JSON.stringify(data), "utf-8");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
