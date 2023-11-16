import { File as SdFile } from "style-dictionary/types/File";
import { PlatformUnion } from "../platform.js";
import { Options } from "./options.js";

export type File = SdFile & {
  format?: PlatformUnion;
  options?: Options;
};
