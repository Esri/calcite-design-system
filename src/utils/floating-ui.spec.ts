import { defaultOffsetDistance, hypotenuse } from "./floating-ui";

it("should have correct value for defaultOffsetDistance", () => {
  expect(defaultOffsetDistance).toBe(6);
});

it("should correctly calculate hypotenuse", () => {
  expect(Math.floor(hypotenuse(4, 4))).toBe(5);
});
