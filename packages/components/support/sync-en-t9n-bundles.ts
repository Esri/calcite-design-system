import { copyFile, readFile } from "node:fs/promises";
import { join, resolve, sep, win32 } from "node:path";

(async function () {
  const args = process.argv.slice(2);
  let entries: string[];

  if (args.length > 0) {
    entries = args
      .filter((file) => file.endsWith("messages.json"))
      .map((file) => {
        const repoRelativePath = file.split(win32.sep).join(sep);
        return repoRelativePath.replace(/\/?messages\.json$/, "");
      });
  } else {
    const t9nManifestPath = "../../t9nmanifest.txt";
    const contents = await readFile(t9nManifestPath, { encoding: "utf-8" });
    entries = contents.split("\n").filter(Boolean);
  }

  const synchronized: string[] = [];
  console.log(`synchronizing t9n messages.json files`);

  for (const entry of entries) {
    const path = entry.split(win32.sep).join(sep);
    const componentName = path.split(sep).at(-3)!;
    const monorepoRoot = join(import.meta.dirname, "../../..");

    const source = resolve(monorepoRoot, `${path}/messages.json`);
    const destination = resolve(monorepoRoot, `${path}/messages.en.json`);

    await copyFile(source, destination);
    synchronized.push(componentName);
  }

  console.log(
    `created messages.en.json file for the following components: \n${synchronized
      .map((synchronized) => `* ${synchronized}`)
      .join("\n")}`,
  );
})();
