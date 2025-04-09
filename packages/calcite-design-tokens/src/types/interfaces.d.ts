export type Stylesheet = Extract<Platform, "css" | "scss">;
export type RegisterFn = () => void;
export enum Platform {
  css = "css",
  scss = "scss",
  es6 = "es6",

  // internal
  js = "js",
  docs = "docs",
}
