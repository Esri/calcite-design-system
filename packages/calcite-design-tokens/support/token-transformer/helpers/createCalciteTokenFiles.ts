import { CalciteTokenFile, CalciteTokenFileArguments } from "../../types/config.js";
import { getFiles } from "./getFiles.js";

export async function createCalciteTokenFiles(args: CalciteTokenFileArguments): Promise<CalciteTokenFile> {
  const sourceFiles = await Promise.all(
    Array.isArray(args.path) ? args.path.map(getFiles) : [getFiles(args.path)],
  ).then((files) => files.reduce((acc, file) => ({ ...acc, ...file }), {}));
  const sourcePaths = Object.values(sourceFiles);

  const tokenFile = {
    name: args.name,
    source: args.source ? [...sourcePaths, ...args.source] : sourcePaths,
    references: args.references,
    options: args.options,
  };

  return tokenFile;
}
