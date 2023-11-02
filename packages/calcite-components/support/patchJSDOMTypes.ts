// patch needed due JSDOM type issue when setting up the angular output target:
// https://github.com/DefinitelyTyped/DefinitelyTyped/discussions/57467#discussioncomment-6689759
//
// This may be fixed in Stencil v4 (if it is related to jest):
// https://github.com/jestjs/jest/issues/12098#issuecomment-983669113
// https://github.com/ionic-team/stencil/blob/v4.0.0/package.json#L100
(async function () {
  const {
    promises: { readFile, writeFile },
  } = await import("fs");
  const { dirname, resolve } = await import("path");
  const { fileURLToPath } = await import("url");
  const { EOL } = await import("os");

  try {
    const __dirname = dirname(fileURLToPath(import.meta.url));
    const jsdomTypesPath = resolve(__dirname, "..", "..", "..", "node_modules", "@types", "jsdom", "base.d.ts");

    const contents = await readFile(jsdomTypesPath, { encoding: "utf8" });

    const replacedContents = contents.replace(
      /\s*globalThis: DOMWindow;\s*readonly \["Infinity"]: number;\s*readonly \["NaN"]: number;/g,
      [
        "globalThis: DOMWindow;",
        "// @ts-ignore",
        'readonly ["Infinity"]: number;',
        "// @ts-ignore",
        'readonly ["NaN"]: number;',
      ].join(EOL)
    );

    await writeFile(jsdomTypesPath, replacedContents, { encoding: "utf8" });
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
})();
