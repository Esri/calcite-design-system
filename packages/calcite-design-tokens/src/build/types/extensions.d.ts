import type { Config as SDConfig, PlatformConfig as SDPlatformConfig, TransformedToken } from "style-dictionary/types";
import { SetRequired } from "type-fest";

// convenience type per https://styledictionary.com/reference/utils/tokens/#converttokendata
export type FlattenedTransformedToken = SetRequired<TransformedToken, "key">;

export interface Config extends SDConfig {
  platforms?: Record<string, PlatformConfig>;
}

interface PlatformConfig extends SDPlatformConfig {
  options?: SDPlatformConfig["options"] & { platform: string };
}
