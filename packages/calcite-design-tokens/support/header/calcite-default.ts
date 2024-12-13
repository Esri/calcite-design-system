import StyleDictionary from "style-dictionary";

export const headerCalciteDefault = (passedMessage = [""]): Promise<string[]> | string[] => {
  return ["// Calcite Design System", "// Do not edit directly, this file was auto-generated.", ...passedMessage];
};

export const registerCalciteDefaultFileHeader = (sd: StyleDictionary): void =>
  sd.registerFileHeader({
    name: HeaderCalciteDefault,
    fileHeader: headerCalciteDefault,
  });

export const HeaderCalciteDefault = "calcite/header/default";
