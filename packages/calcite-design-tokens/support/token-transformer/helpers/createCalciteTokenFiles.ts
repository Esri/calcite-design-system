import { CalciteTokenFile, CalciteTokenFileArguments } from "../../types/config.js";
import { getFiles } from "./getFiles.js";

export async function createCalciteTokenFiles(args: CalciteTokenFileArguments): Promise<CalciteTokenFile> {
  const sourceFiles = await getFiles(args.path);
  const sourcePaths = Object.values(sourceFiles);

  const tokenFile = {
    name: args.name,
    source: args.source ? [...sourcePaths, ...args.source] : sourcePaths,
    references: args.references,
    options: args.options,
  };

  return tokenFile;
}
