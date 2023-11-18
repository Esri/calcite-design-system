import { PlatformUnion, Platforms } from "./platform.js";
import { ExpandableTokenTypes, ExpandableTokenTypesUnion } from "./tokenStudio/designTokenTypes.js";
import { TokenColorScheme } from "./tokenTypes/colorScheme.js";

export type CalciteExpansionFileObject = {
  [ExpandableTokenTypes.COLORSCHEME]?: { [ColorScheme in TokenColorScheme]?: string };
} & {
  [R in Exclude<ExpandableTokenTypesUnion, "colorScheme">]?: string;
} & {
  index: {
    name: string;
    import?: (string | string[])[];
    export?: (string | string[])[];
    forward?: (string | string[])[];
    class?: (string | string[])[];
    mixin?: (string | string[])[];
  };
};

export type CalciteExpansionFiles = {
  [K in PlatformUnion]?: CalciteExpansionFileObject;
};

export type ConfigOptions = {
  prefix?: string;
  outputReferences?: boolean;
};

export type CalciteConfigOutput = {
  dir: string;
  platforms: Platforms;
  expandFiles?: false | CalciteExpansionFiles;
};

export type CalciteTokenTransformConfig = {
  files: CalciteTokenFile[];
  options: ConfigOptions;
  output: CalciteConfigOutput;
};

export type CalciteTokenFile = {
  name: string;
  source: string[];
  references?: string[];
  options?: ConfigOptions;
};

export type CalciteTokenFileArguments = {
  name: string;
  path: string;
  source?: string[];
  references?: string[];
  options?: ConfigOptions;
};

export type CalciteConfigStyleDictionaryRunner = {
  name: string;
  source: string[];
  include: string[];
  options: ConfigOptions;
  output: CalciteConfigOutput;
};
