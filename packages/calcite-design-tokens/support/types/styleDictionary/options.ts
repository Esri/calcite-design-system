import { Options as SdOptions } from "style-dictionary/types/Options";

import { PlatformUnion, Platforms } from "../platform";
import { CalciteExpansionFiles } from "../config";

// This is the list of passed options
export type Options = SdOptions & {
  expandFiles?: CalciteExpansionFiles;
  platform?: PlatformUnion;
  platforms?: Platforms;
  prefix?: string;
};
