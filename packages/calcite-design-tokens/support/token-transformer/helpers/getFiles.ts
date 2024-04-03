import { readdir, stat } from "fs/promises";
import { resolve } from "path";

export async function getFiles(path: string): Promise<Record<string, string>> {
  const tokenFiles: Record<string, string> = {};
  const pathStats = await stat(path);

  if (pathStats.isDirectory()) {
    const directory = await readdir(path);
    directory.forEach((fileName) => {
      const name = fileName.slice(0, fileName.lastIndexOf("."));
      tokenFiles[name] = resolve(path, fileName);
    });
  } else if (pathStats.isFile()) {
    const name = path.slice(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
    tokenFiles[name] = path;
  }

  return tokenFiles;
}
