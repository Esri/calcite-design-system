import { formatSCSS } from "./scss";

// const createPropertyFormatterCallback = jest.fn((token, idx) => `--mock-token-${idx}: blue;`)
// const createPropertyFormatter = jest.fn(() => []);
// const fileHeader = jest.fn(({file}) => '');

// jest.mock('style-dictionary', () => {
//   const originalModule = jest.requireActual('style-dictionary');

//   //Mock the default export and named export 'foo'
//   return {
//     __esModule: true,
//     ...originalModule,
//     formatHelpers: {
//       createPropertyFormatter,
//       fileHeader,
//     },
//   };
// });

const mockTokens = [
  {
    name: "core-token-example",
    value: "blue",
    path: ["core", "token", "example"],
    original: {
      value: "blue"
    },
    filePath: "core.json",
    isSource: true
  }
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
    getReferences: () => mockTokens
  },
  file: {
    destination: "calciteLight.scss"
  },
  formattedTokenSet: `@mixin calcite-theme-Light() {`,
  options: {}
};

describe("formatting CSS Variable output", () => {
  it("should format values", () => {
    const cssFile = formatSCSS({ dictionary: mock.dictionary, file: mock.file, options: mock.options });
    expect(cssFile).toContain(mock.formattedTokenSet);
  });
});
