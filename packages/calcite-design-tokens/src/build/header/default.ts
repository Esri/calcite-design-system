import { FileHeader } from "style-dictionary/types";
import { RegisterFn } from "../types/interfaces.js";

export const headerDefault: FileHeader = (defaultMessage = [""]) => {
  return ["Calcite Design System", ...defaultMessage];
};

export const registerDefaultFileHeader: RegisterFn = async (sd) => {
  sd.registerFileHeader({
    name: HeaderDefault,
    fileHeader: headerDefault,
  });
};

export const HeaderDefault = "calcite/header/default";
