import StyleDictionary from "style-dictionary";

export const headerCalciteDefault = (passedMessage = [""]): Promise<string[]> | string[] => {
  return ["Calcite Design System", "file to be deprecated in next major release", ...passedMessage];
};

export const registerCalciteDeprecateFileHeader = async (sd: typeof StyleDictionary): Promise<void> => {
  sd.registerFileHeader({
    name: HeaderCalciteDeprecate,
    fileHeader: headerCalciteDefault,
  });
};

export const HeaderCalciteDeprecate = "calcite/header/deprecate";
