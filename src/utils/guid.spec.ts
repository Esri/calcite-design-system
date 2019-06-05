import { guid } from "./guid";

describe("guid", () => {
  it("returns a 36 character guid", () => {
    expect(guid().length).toEqual(36);
  });
});
