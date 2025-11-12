import type { FileHeader } from "style-dictionary/types";
import StyleDictionary from "style-dictionary";
import type { RegisterFn } from "../../types/interfaces.d.ts";

export const headerDefault: FileHeader = (defaultMessage = [""]) => {
  return ["Calcite Design System", ...defaultMessage];
};

export const registerDefaultFileHeader: RegisterFn = () => {
  StyleDictionary.registerFileHeader({
    name: HeaderDefault,
    fileHeader: headerDefault,
  });
};

export const HeaderDefault = "calcite/header/default";
