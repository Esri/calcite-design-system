import { registerStyleDictionaryTransform } from "../../../../test/utils/registerStyleDictionaryFunction";
import { TransformedToken } from "../../../../types/styleDictionary/transformedToken";
import { registerNameSpacePath, transformNamesSpacePath } from "./nameSpacePath";

describe("StyleDictionary Transform Name to a spaced path", () => {
  describe("register", () => {
    it("should call StyleDictionary registerTransform", () => registerStyleDictionaryTransform(registerNameSpacePath));
  });

  describe("transformer", () => {
    it("should transform a token name to a joined path", () => {
      const token = {
        name: "some fake name",
        path: ["tier", "group", "element", "property", "state"],
      } as TransformedToken;
      const args = {};
      const transformedName = transformNamesSpacePath(token, args);
      expect(transformedName).toBe("Tier Group Element Property State");
    });
  });
});
