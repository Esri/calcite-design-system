import { DeepKeyTokenMap } from "@tokens-studio/types";

const mockCompoundToken = {
  compound: {
    type: 'color',
    value: {
      token1: '$compound.token2',
      token2: '#fff'
    }
  }
};
const mockTransformedCompoundTokens = {
  compound: {
    token1: {
      type: 'color',
      value: '{compound.token2}'
    },
    token2: {
      type: 'color',
      value: '#fff'
    }
  }
};

const handleTokenStudioVariables = jest.fn((token) => `{${token.replace(/\$/g, '')}}`);
const convertTokenToStyleDictionaryFormat = jest.fn((customToken) => handleTokenStudioVariables)
const shouldExpand = jest.fn().mockReturnValue(true);
const expandToken = jest.fn().mockReturnValue(mockTransformedCompoundTokens);

jest.mock('../utils/compositeTokens.js', () => {
  const originalModule = jest.requireActual('../utils/compositeTokens.js');
  return {
    __esModule: false,
    ...originalModule,
    shouldExpand,
    expandToken
  };
});

jest.mock('../utils/convertTokenToStyleDictionaryFormat.js', () => {
  const originalModule = jest.requireActual('../utils/convertTokenToStyleDictionaryFormat.js');
  return {
    __esModule: false,
    ...originalModule,
    convertTokenToStyleDictionaryFormat
  };
});

import { expandComposites } from "./expandComposites";

it("should loop through a dictionary and run \"convertTokenToStyleDictionary\" on each composite token", () => {

  // @ts-expect-error - it's fine.
  const testExpandComposite = expandComposites(mockCompoundToken, './fakePath')
  expect(handleTokenStudioVariables).toBeCalled();
})
