import { Platform } from "style-dictionary/types/Platform.js";
import { File } from "./file.js";
import { Options } from "./options.js";

export interface PlatformOptions extends Platform {
  buildPath?: string;
  files?: File[];
  file?: File;
  options?: Options;
}
