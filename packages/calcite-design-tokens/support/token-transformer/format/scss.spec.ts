const createPropertyFormatterCallback = jest.fn((token) => `--${token.name}: blue;`);
const formattedVariables = jest.fn((tokens) => tokens.dictionary.allTokens.map(createPropertyFormatterCallback));
const fileHeader = jest.fn(({}) => "");
const formatHelpers = {
  formattedVariables,
  fileHeader,
};

jest.mock("style-dictionary", () => {
  const originalModule = jest.requireActual("style-dictionary");
  return {
    __esModule: false,
    ...originalModule,
    formatHelpers,
  };
});

import { formatSCSS } from "./scss";

const mockTokens = [
  {
    name: "core-token-example",
    value: "blue",
    path: ["core", "token", "example"],
    original: {
      value: "blue",
    },
    filePath: "core.json",
    isSource: true,
  },
];
const transformedTokens = mockTokens.reduce((acc, v) => {
  acc[v.name] = v;
  return acc;
}, {});

const mock = {
  dictionary: {
    allTokens: mockTokens,
    tokens: transformedTokens,
    allProperties: mockTokens,
    properties: transformedTokens,
    usesReference: () => true,
    getReferences: () => mockTokens,
  },
  file: {
    destination: "calciteLight.scss",
  },
  formattedTokenSet: [`@mixin calcite-theme-light() {`, "--core-token-example: blue"],
  options: {},
  platform: {},
};

describe("formatting CSS Variable output", () => {
  it("should format values", () => {
    const cssFile = formatSCSS({
      dictionary: mock.dictionary,
      file: mock.file,
      options: mock.options,
      platform: mock.platform,
    });
    expect(cssFile).toContain(mock.formattedTokenSet[0]);
    expect(cssFile).toContain(mock.formattedTokenSet[1]);
  });
});
