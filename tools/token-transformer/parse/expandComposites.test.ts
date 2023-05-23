const handleTokenStudioVariables = jest.fn((token) => (token.includes("$") ? `{${token.replace(/\$/g, "")}}` : token));
const convertTokenToStyleDictionaryFormat = jest.fn(() => handleTokenStudioVariables);
const shouldExpand = jest.fn().mockReturnValue(true);
const expandToken = jest.fn((key) => json[key]);

jest.mock("../utils/compositeTokens.js", () => {
  const originalModule = jest.requireActual("../utils/compositeTokens.js");
  return {
    __esModule: false,
    ...originalModule,
    shouldExpand,
    expandToken
  };
});

jest.mock("../utils/convertTokenToStyleDictionaryFormat.js", () => {
  const originalModule = jest.requireActual("../utils/convertTokenToStyleDictionaryFormat.js");
  return {
    __esModule: false,
    ...originalModule,
    convertTokenToStyleDictionaryFormat
  };
});

import { json } from "../../_mocks_/mockPlatformTokens";
import { tokens as mocks_tokenStudio } from "../../_mocks_/mockTokensFromTokenStudio";
import { tokens as mocks_transformedTokens } from "../../_mocks_/mockTransformedTokens";
import * as expandComposites from "./expandComposites";

describe("expand token dictionary", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not add placeholder elements", () => {
    const tokensToRemove = Object.keys(mocks_tokenStudio).reduce((acc, key) => {
      if (["[placeholder-component]", "placeholder"].includes(key)) {
        acc[key] = mocks_tokenStudio[key];
      }
      return acc;
    }, {});
    const testExpandPlaceholderKey = expandComposites.expandComposites(tokensToRemove, "./fakePath");

    expect(testExpandPlaceholderKey).toMatchObject({});
  });

  it.skip('should loop through a dictionary and run "shouldExpand" and  "expandToken" on each composite token', () => {
    // @ts-expect-error - it's fine.
    const testExpandComposite = expandComposites.expandComposites(mocks_tokenStudio, "./fakePath");
    expect(handleTokenStudioVariables).toHaveBeenCalledTimes(1);
    expect(shouldExpand).toHaveBeenCalledTimes(1);
    expect(expandToken).toHaveBeenCalledTimes(1);
    expect(testExpandComposite).toMatchObject(mocks_transformedTokens);
  });

  it("should not run expand token on unrecognized types", () => {
    const mockDictionary = {
      core: {
        type: "customType",
        value: {
          fontFamily: "Avanir",
          fontSize: "12px"
        }
      }
    };
    // @ts-expect-error - it's fine this is a test
    const testExpandComposite = expandComposites.expandComposites(mockDictionary, "./fakePath");
    expect(shouldExpand).not.toHaveBeenCalled();
    expect(expandToken).not.toHaveBeenCalled();
    expect(testExpandComposite).toMatchObject(mockDictionary);
  });
});
