import { FileHeader } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const headerDeprecate: FileHeader = (defaultMessage = [""]) => {
  return ["Calcite Design System", "File to be deprecated in next major release", ...defaultMessage];
};

export const registerDeprecateFileHeader: RegisterFn = async (sd) => {
  sd.registerFileHeader({
    name: HeaderDeprecate,
    fileHeader: headerDeprecate,
  });
};

export const HeaderDeprecate = "calcite/header/deprecate";
