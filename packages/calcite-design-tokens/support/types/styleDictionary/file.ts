import { File as SdFile } from "style-dictionary/types/File";
import { Options } from "./options.js";

export type File = SdFile & {
  options?: Options;
};
