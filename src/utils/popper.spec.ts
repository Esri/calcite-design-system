import { getPlacement, defaultOffsetDistance, hypotenuse } from "./popper";

it("should set calcite placement to popper placement", () => {
  const el = document.createElement("div");

  expect(getPlacement(el, "leading")).toBe("left");
  expect(getPlacement(el, "leading-start")).toBe("left-start");
  expect(getPlacement(el, "leading-end")).toBe("left-end");
  expect(getPlacement(el, "trailing")).toBe("right");
  expect(getPlacement(el, "trailing-start")).toBe("right-start");
  expect(getPlacement(el, "trailing-end")).toBe("right-end");

  el.dir = "rtl";

  expect(getPlacement(el, "leading")).toBe("right");
  expect(getPlacement(el, "leading-start")).toBe("right-start");
  expect(getPlacement(el, "leading-end")).toBe("right-end");
  expect(getPlacement(el, "trailing")).toBe("left");
  expect(getPlacement(el, "trailing-start")).toBe("left-start");
  expect(getPlacement(el, "trailing-end")).toBe("left-end");
});

it("should have correct value for defaultOffsetDistance", () => {
  expect(defaultOffsetDistance).toBe(6);
});

it("should correctly calculate hypotenuse", () => {
  expect(Math.floor(hypotenuse(4, 4))).toBe(5);
});
