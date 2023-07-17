(async function () {
  const {
    promises: { readFile, copyFile },
  } = await import("fs");
  const { resolve, sep, win32 } = await import("path");

  const t9nManifestPath = "../../t9nmanifest.txt";
  const contents = await readFile(t9nManifestPath, { encoding: "utf-8" });
  const entries = contents.split("\n");
  const synchronized: string[] = [];

  console.log(`synchronizing t9n messages.json files`);

  for (const entry of entries) {
    const path = entry.split(win32.sep).join(sep);
    const component = path.split(sep)[2];

    const source = resolve(`${path}/messages.json`);
    const destination = resolve(`${path}/messages_en.json`);

    await copyFile(source, destination);
    synchronized.push(component);
  }

  console.log(
    `created messages_en.json file for the following components: \n${synchronized
      .map((synchronized) => `* ${synchronized}`)
      .join("\n")} `
  );
})();
