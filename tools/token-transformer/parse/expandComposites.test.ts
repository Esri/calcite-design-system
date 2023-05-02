const createPropertyFormatterCallback = jest.fn((token, idx) => `--${token.name}: blue;`)
const formattedVariables = jest.fn((tokens) => tokens.dictionary.allTokens.map(createPropertyFormatterCallback));
const fileHeader = jest.fn(({file}) => '');

jest.mock('../utils/compositeTokens.js', () => {
  const originalModule = jest.requireActual('../utils/compositeTokens.js');
  return {
    __esModule: false,
    ...originalModule,
    shouldExpand,
    expandToken
  };
});

jest.mock('../utils/compositeTokens.js', () => {
  const originalModule = jest.requireActual('../utils/compositeTokens.js');
  return {
    __esModule: false,
    ...originalModule,
    shouldExpand,
    expandToken
  };
});


it("should loop through a dictionary and run \"convertTokenToStyleDictionary\" on each composite token", () => {
  
  expect()
})
