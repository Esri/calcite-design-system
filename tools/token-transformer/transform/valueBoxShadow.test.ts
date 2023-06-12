import { transformedTokens } from "../../_mocks_/mockStyleDictionaryTokens";
import { valueBoxShadow } from "./valueBoxShadow";

describe("transform value for box-shadow", () => {
  it("should transform a shadow token value from an array to a string", () => {
    expect(typeof valueBoxShadow(transformedTokens["box-shadow"].default)).toBe("string");
  });
});
