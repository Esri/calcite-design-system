const mockCorrectTypeCompoundToken = {
  core: {
    1: {
      type: "sizing",
      value: "10"
    }
  },
  compound: {
    value: {
      fontFamily: "$core.font.font-family.primary",
      fontWeight: "$core.font.font-weight.light",
      lineHeight: "$core.font.line-height.fixed.0",
      fontSize: "$core.font.font-size.0",
      letterSpacing: "$core.font.letter-spacing.normal",
      paragraphSpacing: "$core.font.paragraph-spacing.normal",
      textDecoration: "$core.font.text-decoration.none",
      textCase: "$core.font.text-case.none"
    },
    type: "typography"
  }
};
const mockTransformedCompoundTokens = {
  core: {
    1: {
      type: "sizing",
      value: "10"
    }
  },
  compound: {
    "font-family": {
      value: "$core.font.font-family.primary",
      type: "font-family"
    },
    "font-weight": {
      value: "$core.font.font-weight.light",
      type: "font-weights"
    },
    "line-height": {
      value: "$core.font.line-height.fixed.0",
      type: "line-heights"
    },
    "font-size": {
      value: "$core.font.font-size.0",
      type: "font-size"
    },
    "letter-spacing": {
      value: "$core.font.letter-spacing.normal",
      type: "letter-spacing"
    },
    "paragraph-spacing": {
      value: "$core.font.paragraph-spacing.normal",
      type: "paragraph-spacing"
    },
    "text-decoration": {
      value: "$core.font.text-decoration.none",
      type: "font-style"
    },
    "text-case": {
      value: "$core.font.text-case.none",
      type: "text-case"
    }
  }
};

const handleTokenStudioVariables = jest.fn((token) => (token.includes("$") ? `{${token.replace(/\$/g, "")}}` : token));
const convertTokenToStyleDictionaryFormat = jest.fn(() => handleTokenStudioVariables);
const shouldExpand = jest.fn().mockReturnValue(true);
const expandToken = jest.fn().mockReturnValue(mockTransformedCompoundTokens);

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

import * as expandComposites from "./expandComposites";

describe("expand token dictionary", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should not add placeholder elements", () => {
    const placeolderToken = {
      "[placeholder-component]": {
        type: "other",
        value: "#333"
      }
    };
    const placeholderValue = {
      compoonent: {
        type: "other",
        value: "[placholder-value]"
      }
    };

    // @ts-expect-error - it's fine.
    const testExpandPlaceholderKey = expandComposites.expandComposites(placeolderToken, "./fakePath");
    // @ts-expect-error - it's fine.
    const testExpandPlaceholderValue = expandComposites.expandComposites(placeholderValue, "./fakePath");

    expect(testExpandPlaceholderKey).toMatchObject({});
    expect(testExpandPlaceholderValue).toMatchObject({});
  });

  it('should loop through a dictionary and run "shouldExpand" and  "expandToken" on each composite token', () => {
    // @ts-expect-error - it's fine.
    const testExpandComposite = expandComposites.expandComposites(mockCorrectTypeCompoundToken, "./fakePath");
    expect(handleTokenStudioVariables).toHaveBeenCalledTimes(1);
    expect(shouldExpand).toHaveBeenCalledTimes(1);
    expect(expandToken).toHaveBeenCalledTimes(1);
    expect(testExpandComposite).toMatchObject(mockTransformedCompoundTokens);
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
