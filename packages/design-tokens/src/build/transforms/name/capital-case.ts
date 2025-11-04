import type { NameTransform } from "style-dictionary/types";
import { capitalCase } from "change-case";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../../types/interfaces.js";

export const transformNameCapitalCase: NameTransform["transform"] = (token) => {
  return capitalCase(token.name);
};

export const registerNameCapitalCase: RegisterFn = () => {
  StyleDictionary.registerTransform({
    name: TransformNameCapitalCase,
    transform: transformNameCapitalCase,
    type: "name",
  });
};

export const TransformNameCapitalCase = "calcite/transform/name/capital-case";
