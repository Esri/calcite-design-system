import { matchDemiFontWeight, valueFontWeightDemi } from "./valueDemi";

const tokenDefaults = {
  filePath: "core/",
  isSource: true,
  name: "placeholder-name",
  path: ["placeholder", "path"]
};
const mockFalseMatches = {
  colorToken: {
    ...tokenDefaults,
    attributes: {
      type: "color"
    },
    original: {
      value: "Demi"
    },
    value: "Demi"
  },
  fontWeightNumber: {
    ...tokenDefaults,
    attributes: {
      type: "fontWeights"
    },
    original: {
      value: 200
    },
    value: 200
  }
};

const mockDemiToken = {
  ...tokenDefaults,
  attributes: { type: "fontWeights" },
  original: {
    value: "Demi"
  },
  value: "Demi"
};

describe("transform value for font-weight demi", () => {
  it("should only transform font-weight types", () => {
    expect(matchDemiFontWeight(mockFalseMatches.colorToken)).toBe(false);
  });

  it("should only transform 'Demi' value tokens", () => {
    expect(matchDemiFontWeight(mockFalseMatches.fontWeightNumber)).toBe(false);
  });

  it("should match 'Demi'", () => {
    expect(matchDemiFontWeight(mockDemiToken)).toBe(true);
  });

  it("should transform 'Demi'", () => {
    expect(valueFontWeightDemi(mockDemiToken)).toBe("600");
  });

  it("should not transform !'Demi'", () => {
    expect(
      valueFontWeightDemi({
        ...mockDemiToken,
        value: 600
      })
    ).toBe(600);
  });
});
