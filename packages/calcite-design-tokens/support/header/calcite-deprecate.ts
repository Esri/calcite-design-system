import { RegisterFn } from "../types/interfaces.js";

export const headerCalciteDefault = (passedMessage = [""]): Promise<string[]> | string[] => {
  return ["Calcite Design System", "file to be deprecated in next major release", ...passedMessage];
};

export const registerCalciteDeprecateFileHeader: RegisterFn = async (sd) => {
  sd.registerFileHeader({
    name: HeaderCalciteDeprecate,
    fileHeader: headerCalciteDefault,
  });
};

export const HeaderCalciteDeprecate = "calcite/header/deprecate";
