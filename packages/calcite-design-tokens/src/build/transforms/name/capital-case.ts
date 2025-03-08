import { NameTransform } from "style-dictionary/types";
import { capitalCase } from "change-case";
import { RegisterFn } from "../../types/interfaces.js";

export const transformNameCapitalCase: NameTransform["transform"] = (token) => {
  return capitalCase(token.name);
};

export const registerNameCapitalCase: RegisterFn = async (sd) => {
  sd.registerTransform({
    name: TransformNameCapitalCase,
    transform: transformNameCapitalCase,
    type: "name",
  });
};

export const TransformNameCapitalCase = "calcite/transform/name/capital-case";
