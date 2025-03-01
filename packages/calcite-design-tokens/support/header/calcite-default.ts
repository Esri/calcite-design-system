import { RegisterFn } from "../types/interfaces.js";

export const headerCalciteDefault = (passedMessage = [""]): Promise<string[]> | string[] => {
  return ["Calcite Design System", ...passedMessage];
};

export const registerCalciteDefaultFileHeader: RegisterFn = async (sd) => {
  sd.registerFileHeader({
    name: HeaderCalciteDefault,
    fileHeader: headerCalciteDefault,
  });
};

export const HeaderCalciteDefault = "calcite/header/default";
