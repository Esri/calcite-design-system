import { dedupeStringsInArray } from "./dedupeStringsInArray.js";

describe('if the string at "x" is included in the string at "x+1"', () => {
  it('should not include the string at "x"', () => {
    const testString = dedupeStringsInArray(["star", "star trek", "vulcan"]);
    expect(testString).toMatchObject(["star trek", "vulcan"]);
  });
});
