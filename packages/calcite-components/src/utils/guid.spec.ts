import { guid } from "./guid";

export const guidPattern = /\w{8}-\w{4}-\w{4}-\w{4}-\w{12}/;

describe("guid", () => {
  it("returns a 36 character guid", () => {
    expect(guid()).toMatch(guidPattern);
  });
});
