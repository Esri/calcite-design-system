import { tokens as mockTokens } from "../../_mocks_/mockStyleDictionaryTokens";
import * as platformMocks from "../../_mocks_/mockPlatformTokens";
/**
 * Test Setup
 */
const createPropertyFormatterCallback = jest.fn((token) => `--${token.name}: blue;`);
const formattedVariables = jest.fn((tokens) => tokens.dictionary.allTokens.map(createPropertyFormatterCallback));
const fileHeader = jest.fn(() => "");
const mockReturnValue = (format: "sass" | "css" | "scss") => (token) => {
  if (token) {
    return format === "css"
      ? platformMocks.cssRoot.find((v) => v.includes(token.name))
      : platformMocks.scssBase.find((v) => v.includes(token.name));
  }
  return format === "css" ? platformMocks.cssRoot : platformMocks.scssBase;
};
const createPropertyFormatter = jest.fn(
  (obj: { outputReferences: Record<any, any>; dictionary: Dictionary; format: "sass" | "css" | "scss" }) => {
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
      fileHeader
    }
  };
});

import { formatSCSS } from "./scss";
import { Dictionary } from "style-dictionary";

const mock = {
  dictionary: mockTokens,
  file: {
    destination: "calciteLight.scss"
  },
  formattedTokenSet: [
    ...platformMocks.scssBase,
    "",
    ...platformMocks.scssMixins,
    "",
    ...platformMocks.scssCSSRoot("calcite-theme-light")
  ],
  options: {}
};

/**
 * END Test Setup
 */
let scssFile;
describe("formatting SCSS Variable output", () => {
  beforeAll(() => {
    scssFile = formatSCSS({ dictionary: mock.dictionary, file: mock.file, options: mock.options });
  });
  it("should transform token names and values into SCSS variables", () => {
    expect(scssFile).toContain(platformMocks.scssBase[0]);
    expect(scssFile).toContain(platformMocks.scssBase[1]);
  });

  it("should contain a mixin", () => {
    expect(scssFile).toContain(platformMocks.scssMixins[0]);
  });
});
