import type { Config as SDConfig, PlatformConfig as SDPlatformConfig, TransformedToken } from "style-dictionary/types/index.js";
import type { SetRequired } from "type-fest";
import type { Platform } from "../types/interfaces.d.ts";

// convenience type per https://styledictionary.com/reference/utils/tokens/#converttokendata
export type FlattenedTransformedToken = SetRequired<TransformedToken, "key">;

export interface Config extends SDConfig {
  platforms: Record<Platform, PlatformConfig>;
}

export interface PlatformConfig extends SDPlatformConfig {
  options: SDPlatformConfig["options"] & { platform: Platform };
}
