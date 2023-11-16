import { Platform } from "style-dictionary/types/Platform";
import { File } from "./file";
import { Options } from "./options";

export interface PlatformOptions extends Platform {
  buildPath?: string;
  files?: File[];
  file?: File;
  options?: Options;
}
