import { ColorModifierOptions } from "../tokenStudio/colorModifier.js";

export enum CalciteExtensions {
  EXAMPLE = "calcite.example",
  DEPRECATED = "calcite.deprecated",
  EXTENDS = "calcite.extends",
}

export type CalciteExtensionsUnion = `${CalciteExtensions}`;

export type CalciteTokenArguments = {
  modify?: ColorModifierOptions;
};

export type CalciteExtensionsMap = Partial<Record<CalciteExtensionsUnion, CalciteTokenArguments>>;

export const calciteTokensArguments: CalciteExtensionsMap = {};

export const calciteExtensions = calciteTokensArguments;
