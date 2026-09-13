import type {
  Config as SDConfig,
  PlatformConfig as SDPlatformConfig,
  TransformedToken,
} from "style-dictionary/types/index.js";
import type { SetRequired } from "type-fest";

type InternalPlatform = "docs";

export type Platform = "css" | "scss" | "es6" | InternalPlatform;
export type Stylesheet = Extract<Platform, "css" | "scss">;
export type RegisterFn = () => void;

// convenience type per https://styledictionary.com/reference/utils/tokens/#converttokendata
export type FlattenedTransformedToken = SetRequired<TransformedToken, "key">;

export interface Config extends SDConfig {
  platforms: Record<Platform, PlatformConfig>;
}

export interface PlatformConfig extends SDPlatformConfig {
  options: SDPlatformConfig["options"] & { platform: Platform };
}
