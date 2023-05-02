const mockCorrectTypeCompoundToken = {
  core: {
    1: {
      type: 'sizing',
      value: "10",
    }
  },
  compound: {
    type: 'composition',
    value: {
      fontWeight: '$core.1',
      lineHeight: '2'
    }
  }
};
const mockTransformedCompoundTokens = {
  core: {
    1: {
      type: 'sizing',
      value: "10",
    }
  },
  compound: {
    fontWeight: {
      type: 'font-weight',
      value: '{core.1}'
    },
    lineHeight: {
      type: 'line-height',
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

import * as expandComposites from "./expandComposites";

const expandCompositesSpy = jest.spyOn(expandComposites, 'expandComposites');

describe("expand token dictionary", () => {

  beforeEach(()=>{
    jest.clearAllMocks();
  });

  it("should not add placeholder elements", () => {
    const placeolderToken = {
      "[placeholder-component]": {
        type: 'other',
        value: '#333'
      }
    };
    const placeholderValue = {
      "compoonent": {
        type: 'other',
        value: '[placholder-value]'
      }
    }
  
    // @ts-expect-error - it's fine.
    const testExpandPlaceholderKey = expandComposites.expandComposites(placeolderToken, './fakePath');
    // @ts-expect-error - it's fine.
    const testExpandPlaceholderValue = expandComposites.expandComposites(placeholderValue, './fakePath');
  
    expect(testExpandPlaceholderKey).toMatchObject({});
    expect(testExpandPlaceholderValue).toMatchObject({});
  })
  
  it("should recursively call itself when dealing with neseted objects", () => {
    const nestedTokens = {
      "component": {
        "nested1": {
          type: 'other',
          value: '1'
        },
        "nested2": {
          type: 'other',
          value: '2'
        }
      }
    }
    // @ts-expect-error - it's fine.
    const testNestedToken = expandComposites.expandComposites(nestedTokens,  './fakePath');
    expect(expandCompositesSpy).toBeCalledTimes(2);
  })
  
  it("should loop through a dictionary and run \"shouldExpand\" and  \"expandToken\" on each composite token", () => {
    // @ts-expect-error - it's fine.
    const testExpandComposite = expandComposites.expandComposites(mockCorrectTypeCompoundToken, './fakePath');
    expect(expandCompositesSpy).toBeCalledTimes(1);
    expect(handleTokenStudioVariables).toBeCalledTimes(1);
    expect(shouldExpand).toBeCalledTimes(1);
    expect(expandToken).toBeCalledTimes(1);
    expect(testExpandComposite).toMatchObject(mockTransformedCompoundTokens);
  })
  
  it("should not run expand token on unrecognized types", () => {
    const mockDictionary = {
      'core': {
        type: 'customType',
        value: '#333'
      }
    };
    // @ts-expect-error - it's fine this is a test
    const testExpandComposite = expandComposites.expandComposites(mockDictionary, './fakePath')
    expect(shouldExpand).not.toBeCalled();
    expect(expandToken).not.toBeCalled();
    expect(testExpandComposite).toMatchObject(mockDictionary)
  })
})
