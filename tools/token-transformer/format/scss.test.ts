const createPropertyFormatterCallback = jest.fn((token) => `--${token.name}: blue;`);
const formattedVariables = jest.fn((tokens) => tokens.dictionary.allTokens.map(createPropertyFormatterCallback));
const fileHeader = jest.fn(() => "");
const createPropertyFormatter = jest.fn(
  (obj: { outputReferences: Record<any, any>; dictionary: Dictionary; format: "sass" | "css" }) => {
    const returnValue = obj.format === "css" ? jest.fn().mockReturnValue(cssRoot) : jest.fn().mockReturnValue(scssBase);
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
      fileHeader
    }
  };
});

import { formatSCSS } from "./scss";
import { tokens as mockTokens } from "../../_mocks_/mockStyleDictionaryTokens";
import { cssRoot, scssBase, scssCSSRoot, scssMixins } from "../../_mocks_/mockPlatformTokens";
import { Dictionary } from "style-dictionary";

const mock = {
  dictionary: mockTokens,
  file: {
    destination: "calciteLight.scss"
  },
  formattedTokenSet: [...scssBase, "", ...scssMixins, "", ...scssCSSRoot],
  options: {}
};

describe("formatting CSS Variable output", () => {
  it("should format values", () => {
    const cssFile = formatSCSS({ dictionary: mock.dictionary, file: mock.file, options: mock.options });
    expect(cssFile).toContain(mock.formattedTokenSet[0]);
    expect(cssFile).toContain(mock.formattedTokenSet[1]);
  });
});
