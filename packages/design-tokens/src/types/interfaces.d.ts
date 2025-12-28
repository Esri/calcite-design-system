type InternalPlatform = "docs";

export type Platform = "css" | "scss" | "es6" | InternalPlatform;
export type Stylesheet = Extract<Platform, "css" | "scss">;
export type RegisterFn = () => void;
