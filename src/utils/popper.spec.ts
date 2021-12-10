import { getPlacement, defaultOffsetDistance, hypotenuse } from "./popper";

it("should set calcite placement to popper placement", () => {
  const el = document.createElement("div");

  expect(getPlacement(el, "leading")).toBe("left");
  expect(getPlacement(el, "leading-start")).toBe("left-start");
  expect(getPlacement(el, "leading-end")).toBe("left-end");
  expect(getPlacement(el, "trailing")).toBe("right");
  expect(getPlacement(el, "trailing-start")).toBe("right-start");
  expect(getPlacement(el, "trailing-end")).toBe("right-end");
  expect(getPlacement(el, "leading-leading")).toBe("left-start");
  expect(getPlacement(el, "leading-trailing")).toBe("left-end");
  expect(getPlacement(el, "trailing-leading")).toBe("right-start");
  expect(getPlacement(el, "trailing-trailing")).toBe("right-end");
  expect(getPlacement(el, "top-leading")).toBe("top-start");
  expect(getPlacement(el, "top-trailing")).toBe("top-end");
  expect(getPlacement(el, "bottom-leading")).toBe("bottom-start");
  expect(getPlacement(el, "bottom-trailing")).toBe("bottom-end");
  expect(getPlacement(el, "right-leading")).toBe("right-start");
  expect(getPlacement(el, "right-trailing")).toBe("right-end");
  expect(getPlacement(el, "left-leading")).toBe("left-start");
  expect(getPlacement(el, "left-trailing")).toBe("left-end");

  el.dir = "rtl";

  expect(getPlacement(el, "leading")).toBe("right");
  expect(getPlacement(el, "leading-start")).toBe("right-start");
  expect(getPlacement(el, "leading-end")).toBe("right-end");
  expect(getPlacement(el, "trailing")).toBe("left");
  expect(getPlacement(el, "trailing-start")).toBe("left-start");
  expect(getPlacement(el, "trailing-end")).toBe("left-end");
  expect(getPlacement(el, "leading-leading")).toBe("right-end");
  expect(getPlacement(el, "leading-trailing")).toBe("right-start");
  expect(getPlacement(el, "trailing-leading")).toBe("left-end");
  expect(getPlacement(el, "trailing-trailing")).toBe("left-start");
  expect(getPlacement(el, "top-leading")).toBe("top-end");
  expect(getPlacement(el, "top-trailing")).toBe("top-start");
  expect(getPlacement(el, "bottom-leading")).toBe("bottom-end");
  expect(getPlacement(el, "bottom-trailing")).toBe("bottom-start");
  expect(getPlacement(el, "right-leading")).toBe("right-end");
  expect(getPlacement(el, "right-trailing")).toBe("right-start");
  expect(getPlacement(el, "left-leading")).toBe("left-end");
  expect(getPlacement(el, "left-trailing")).toBe("left-start");
});

it("should have correct value for defaultOffsetDistance", () => {
  expect(defaultOffsetDistance).toBe(6);
});

it("should correctly calculate hypotenuse", () => {
  expect(Math.floor(hypotenuse(4, 4))).toBe(5);
});
