import type { FileHeader } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import { RegisterFn } from "../../types/interfaces.js";

export const headerDeprecate: FileHeader = (defaultMessage = [""]) => {
  return ["Calcite Design System", "File to be deprecated in next major release", ...defaultMessage];
};

export const registerDeprecateFileHeader: RegisterFn = () => {
  StyleDictionary.registerFileHeader({
    name: HeaderDeprecate,
    fileHeader: headerDeprecate,
  });
};

export const HeaderDeprecate = "calcite/header/deprecate";
