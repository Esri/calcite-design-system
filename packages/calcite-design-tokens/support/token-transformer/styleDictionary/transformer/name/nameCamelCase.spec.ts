import { registerStyleDictionaryTransform } from "../../../../test/utils/registerStyleDictionaryFunction";
import { TransformedToken } from "../../../../types/styleDictionary/transformedToken";
import { registerNameCamelCase, transformNamesCamelCase } from "./nameCamelCase";

describe("StyleDictionary Transform Name to Camel Case", () => {
  describe("register", () => {
    it("should call StyleDictionary registerTransform", () => registerStyleDictionaryTransform(registerNameCamelCase));
  });

  describe("transformer", () => {
    it("should transform a token name to camel case", () => {
      const token = {
        name: "some fake name",
        path: ["tier", "group", "element", "property", "state"],
      } as TransformedToken;
      const args = {};
      const transformedName = transformNamesCamelCase(token, args);
      expect(transformedName).toBe("tierGroupElementPropertyState");
    });
  });
});
