export const enum Platform {
  CSS = "css",
  SCSS = "scss",
  SASS = "sass",
  DOCS = "docs",
  JS = "js",
  ES6 = "es6",
}

export const enum TypescriptPlatform {
  TS = "ts",
  ES6TS = "es6Ts",
}

export type PlatformUnion = `${Platform}`;
export type TypescriptPlatformUnion = `${TypescriptPlatform}`;

export type Platforms = PlatformUnion[];
export type TypescriptPlatforms = TypescriptPlatformUnion[];

export type PlatformFormats = PlatformUnion | TypescriptPlatformUnion;

export type PlatformObject<T> = Partial<Record<PlatformFormats, T>>;
