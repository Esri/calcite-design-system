import { FileHeader } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const headerCalciteDefault: FileHeader = (defaultMessage = [""]) => {
  return ["Calcite Design System", "file to be deprecated in next major release", ...defaultMessage];
};

export const registerCalciteDeprecateFileHeader: RegisterFn = async (sd) => {
  sd.registerFileHeader({
    name: HeaderCalciteDeprecate,
    fileHeader: headerCalciteDefault,
  });
};

export const HeaderCalciteDeprecate = "calcite/header/deprecate";
