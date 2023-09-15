import { expandToken, shouldExpand } from "./compositeTokens.js";

const mockHandleValue = jest.fn((val) => val);

describe("expand composite token", () => {
  it("should expand a non-shadow token", () => {
    const mockTypographyToken = {
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
    };
    const mockExpandedTypographyToken = {
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
    };
    const testExpandToken = expandToken(mockTypographyToken, false, mockHandleValue);
    expect(testExpandToken).toMatchObject(mockExpandedTypographyToken);
  });
  it("should expand a shadow token", () => {
    const mockShadowToken = {
      value: [
        {
          x: "0",
          y: "2",
          blur: "8",
          spread: "0",
          color: "rgba($core.color.neutral.blk-240, $core.opacity.4)",
          type: "dropShadow"
        },
        {
          x: "0",
          y: "4",
          blur: "16",
          spread: "0",
          color: "rgba($core.color.neutral.blk-240, $core.opacity.8)",
          type: "dropShadow"
        }
      ],
      type: "boxShadow"
    };
    const mockExpandedShadowToken = {
      "1": {
        x: {
          type: "dimension",
          value: "0"
        },
        y: {
          type: "dimension",
          value: "2"
        },
        blur: {
          type: "dimension",
          value: "8"
        },
        spread: {
          type: "dimension",
          value: "0"
        },
        color: {
          type: "color",
          value: "rgba($core.color.neutral.blk-240, $core.opacity.4)"
        }
      }
    };
    const testExpandToken = expandToken(mockShadowToken, true, mockHandleValue);
    expect(testExpandToken).toMatchObject(mockExpandedShadowToken);
  });
});

describe("shouldExpand", () => {
  const filePath = "./mockFile.json";
  const mockToken = {
    name: "testToken",
    type: "fontFamilies",
    value: "san-serif"
  };

  it("should return true", () => {
    // @ts-expect-error - type is fine here.
    const testExpand = shouldExpand(mockToken, true, filePath);
    expect(testExpand).toBe(true);
  });
  it("should return false", () => {
    // @ts-expect-error - type is fine here.
    const testExpand = shouldExpand(mockToken, false, filePath);
    expect(testExpand).toBe(false);
  });
  it("should use condition function", () => {
    const mockExpandFunction = jest.fn(() => true);
    // @ts-expect-error - type is fine here.
    const testExpand = shouldExpand(mockToken, mockExpandFunction, filePath);
    expect(testExpand).toBe(true);
    expect(mockExpandFunction).toHaveBeenCalled();
  });
});
