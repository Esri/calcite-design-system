import { Dictionary } from "style-dictionary/types/Dictionary";
import * as platformMocks from "../../../mockPlatformTokens";
/**
 * Test Setup
 */
// const createPropertyFormatterCallback = jest.fn((token) => `--${token.name}: blue;`);
const formattedVariables = jest.fn(
  ({ dictionary, format, outputReferences }) =>
    `${dictionary.allTokens.map(createPropertyFormatter({ outputReferences, dictionary, format })).join(";\n")}`
);
// const formattedVariables = jest.fn((tokens) => tokens.dictionary.allTokens.map(createPropertyFormatterCallback).join('\n'));
const fileHeader = jest.fn(() => "");
const mockReturnValue = (format: "sass" | "css" | "scss") => (token) => {
  if (token) {
    return platformMocks.scssBase.find((v) => v.includes(token.name));
  }
  return format === "css" ? platformMocks.cssRoot : platformMocks.scssBase;
};
const createPropertyFormatter = jest.fn(
  (obj: { outputReferences: boolean; dictionary: Dictionary; format: "sass" | "css" | "scss" }) => {
    const returnValue = jest.fn(mockReturnValue(obj.format));
    // returnIndex++;
    return returnValue;
  }
);

jest.mock("style-dictionary", () => {
  const originalModule = jest.requireActual("style-dictionary");
  return {
    __esModule: false,
    ...originalModule,
    formatHelpers: {
      createPropertyFormatter,
      formattedVariables,
      fileHeader,
    },
  };
});
