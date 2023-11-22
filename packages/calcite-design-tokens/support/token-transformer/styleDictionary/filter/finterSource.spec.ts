import { registerStyleDictionaryFilter } from "../../../test/utils/registerStyleDictionaryFunction";
import { TransformedToken } from "../../../types/styleDictionary/transformedToken";
import { filterSourceMatcher, registerFilterSource } from "./filterSource";

describe("filter source", () => {
  describe("register", () => {
    it("should call StyleDictionary registerTransform", () => registerStyleDictionaryFilter(registerFilterSource));
  });

  describe("filter", () => {
    it("should return true", () => {
      const token = {
        isSource: true,
      } as TransformedToken;
      const match = filterSourceMatcher(token);
      expect(match).toBe(true);
    });

    it("should return false", () => {
      const token = {
        isSource: false,
      } as TransformedToken;
      const match = filterSourceMatcher(token);
      expect(match).toBe(false);
    });
  });
});
