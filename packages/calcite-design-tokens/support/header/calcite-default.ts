import StyleDictionary from "style-dictionary";

export const headerCalciteDefault = (passedMessage = [""]): Promise<string[]> | string[] => {
  return ["Calcite Design System", ...passedMessage];
};

export const registerCalciteDefaultFileHeader = async (sd: typeof StyleDictionary): Promise<void> => {
  sd.registerFileHeader({
    name: HeaderCalciteDefault,
    fileHeader: headerCalciteDefault,
  });
};

export const HeaderCalciteDefault = "calcite/header/default";
