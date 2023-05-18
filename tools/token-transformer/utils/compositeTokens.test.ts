import { tokens as mock_tokenStudioTokens } from "../../_mocks_/mockTokensFromTokenStudio";
import { tokens as mock_expandedTokens } from "../../_mocks_/mockTransformedTokens";
import { expandToken, shouldExpand } from "./compositeTokens";

const mockHandleValue = jest.fn((val) => val);

describe("expand composite token", () => {
  it("should expand a non-shadow token", () => {
    const testExpandToken = expandToken(mock_tokenStudioTokens.type["1"], false, mockHandleValue);
    expect(testExpandToken).toMatchObject(mock_expandedTokens.type["1"]);
  });
  it("should expand a shadow token", () => {
    const testExpandToken = expandToken(mock_tokenStudioTokens.boxShadow, true, mockHandleValue);
    expect(testExpandToken).toMatchObject(mock_expandedTokens.boxShadow);
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
