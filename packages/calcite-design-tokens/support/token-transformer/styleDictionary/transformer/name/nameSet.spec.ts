import { registerStyleDictionaryTransform } from "../../../../test/utils/registerStyleDictionaryFunction";
import { TransformedToken } from "../../../../types/styleDictionary/transformedToken";
import { TransformerArgs } from "../utils";
import { registerNameSet, transformNamesSet } from "./nameSet";

describe("Set transformed name to token reference based on current platform", () => {
  describe("register", () => {
    it("should call StyleDictionary registerTransform", () => registerStyleDictionaryTransform(registerNameSet));
  });

  describe("transformer", () => {
    describe("handle css format", () => {
      it("should transform a token name to a token reference", () => {
        const token = {
          name: "some fake name",
          path: ["tier", "group", "element", "property", "state"],
        } as TransformedToken;
        const args = {
          options: { platform: "css" },
        } as TransformerArgs;
        const transformedName = transformNamesSet(token, args);
        expect(transformedName).toBe("var(--tier-group-element-property-state)");
      });
    });

    describe("handle scss format", () => {
      it("should transform a token name to a token reference", () => {
        const token = {
          name: "some fake name",
          path: ["tier", "group", "element", "property", "state"],
        } as TransformedToken;
        const args = {
          options: { platform: "scss" },
        } as TransformerArgs;
        const transformedName = transformNamesSet(token, args);
        expect(transformedName).toBe("$tier-group-element-property-state");
      });
    });

    describe("handle js format", () => {
      it("should transform a token name to a token reference", () => {
        const token = {
          name: "some fake name",
          path: ["tier", "group", "element", "property", "state"],
        } as TransformedToken;
        const args = {
          options: { platform: "js" },
        } as TransformerArgs;
        const transformedName = transformNamesSet(token, args);
        expect(transformedName).toBe("tier.group.element.property.state");
      });
    });

    describe("handle docs format", () => {
      it("should transform a token name to a token reference", () => {
        const token = {
          name: "some fake name",
          path: ["tier", "group", "element", "property", "state"],
        } as TransformedToken;
        const args = {
          options: { platform: "docs" },
        } as TransformerArgs;
        const transformedName = transformNamesSet(token, args);
        expect(transformedName).toBe("tier.group.element.property.state");
      });
    });

    describe("handle es6 format", () => {
      it("should transform a token name to a token reference", () => {
        const token = {
          name: "some fake name",
          path: ["tier", "group", "element", "property", "state"],
        } as TransformedToken;
        const args = {
          options: { platform: "es6" },
        } as TransformerArgs;
        const transformedName = transformNamesSet(token, args);
        expect(transformedName).toBe("tierGroupElementPropertyState");
      });
    });
  });
});
