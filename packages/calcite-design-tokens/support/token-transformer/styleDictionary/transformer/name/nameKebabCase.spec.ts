import { registerStyleDictionaryTransform } from "../../../../test/utils/registerStyleDictionaryFunction";
import { TransformedToken } from "../../../../types/styleDictionary/transformedToken";
import { registerNameKebabCase, transformNamesKebabCase } from "./nameKebabCase";

describe("StyleDictionary Transform Name to Kebab Case", () => {
  describe("register", () => {
    it("should call StyleDictionary registerTransform", () => registerStyleDictionaryTransform(registerNameKebabCase));
  });

  describe("transformer", () => {
    it("should transform a token name to kebab case", () => {
      const token = {
        name: "some fake name",
        path: ["tier", "group", "element", "property", "state"],
      } as TransformedToken;
      const args = { prefix: undefined };
      const transformedName = transformNamesKebabCase(token, args);
      expect(transformedName).toBe("tier-group-element-property-state");
    });
  });
});
