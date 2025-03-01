import { FileHeader } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const headerCalciteDefault: FileHeader = (defaultMessage = [""]) => {
  return ["Calcite Design System", ...defaultMessage];
};

export const registerCalciteDefaultFileHeader: RegisterFn = async (sd) => {
  sd.registerFileHeader({
    name: HeaderCalciteDefault,
    fileHeader: headerCalciteDefault,
  });
};

export const HeaderCalciteDefault = "calcite/header/default";
