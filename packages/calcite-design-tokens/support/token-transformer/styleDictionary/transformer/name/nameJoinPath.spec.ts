import { registerStyleDictionaryTransform } from "../../../../test/utils/registerStyleDictionaryFunction";
import { TransformedToken } from "../../../../types/styleDictionary/transformedToken";
import { registerNameJoinPath, transformNamesJoinPath } from "./nameJoinPath";

describe("StyleDictionary Transform Name to Joined path", () => {
  describe("register", () => {
    it("should call StyleDictionary registerTransform", () => registerStyleDictionaryTransform(registerNameJoinPath));
  });

  describe("transformer", () => {
    it("should transform a token name to a joined path", () => {
      const token = {
        name: "some fake name",
        path: ["tier", "group", "element", "property", "state"],
      } as TransformedToken;
      const args = {};
      const transformedName = transformNamesJoinPath(token, args);
      expect(transformedName).toBe("tier.group.element.property.state");
    });
  });
});
