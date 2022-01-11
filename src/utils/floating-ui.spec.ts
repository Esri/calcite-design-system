import { getEffectivePlacement, defaultOffsetDistance, hypotenuse } from "./floating-ui";

it("should set calcite placement to FloatingUI placement", () => {
  const el = document.createElement("div");

  expect(getEffectivePlacement(el, "leading")).toBe("left");
  expect(getEffectivePlacement(el, "leading-start")).toBe("left-start");
  expect(getEffectivePlacement(el, "leading-end")).toBe("left-end");
  expect(getEffectivePlacement(el, "trailing")).toBe("right");
  expect(getEffectivePlacement(el, "trailing-start")).toBe("right-start");
  expect(getEffectivePlacement(el, "trailing-end")).toBe("right-end");
  expect(getEffectivePlacement(el, "leading-leading")).toBe("left-start");
  expect(getEffectivePlacement(el, "leading-trailing")).toBe("left-end");
  expect(getEffectivePlacement(el, "trailing-leading")).toBe("right-start");
  expect(getEffectivePlacement(el, "trailing-trailing")).toBe("right-end");
  expect(getEffectivePlacement(el, "top-leading")).toBe("top-start");
  expect(getEffectivePlacement(el, "top-trailing")).toBe("top-end");
  expect(getEffectivePlacement(el, "bottom-leading")).toBe("bottom-start");
  expect(getEffectivePlacement(el, "bottom-trailing")).toBe("bottom-end");
  expect(getEffectivePlacement(el, "right-leading")).toBe("right-start");
  expect(getEffectivePlacement(el, "right-trailing")).toBe("right-end");
  expect(getEffectivePlacement(el, "left-leading")).toBe("left-start");
  expect(getEffectivePlacement(el, "left-trailing")).toBe("left-end");

  el.dir = "rtl";

  expect(getEffectivePlacement(el, "leading")).toBe("right");
  expect(getEffectivePlacement(el, "leading-start")).toBe("right-start");
  expect(getEffectivePlacement(el, "leading-end")).toBe("right-end");
  expect(getEffectivePlacement(el, "trailing")).toBe("left");
  expect(getEffectivePlacement(el, "trailing-start")).toBe("left-start");
  expect(getEffectivePlacement(el, "trailing-end")).toBe("left-end");
  expect(getEffectivePlacement(el, "leading-leading")).toBe("right-end");
  expect(getEffectivePlacement(el, "leading-trailing")).toBe("right-start");
  expect(getEffectivePlacement(el, "trailing-leading")).toBe("left-end");
  expect(getEffectivePlacement(el, "trailing-trailing")).toBe("left-start");
  expect(getEffectivePlacement(el, "top-leading")).toBe("top-end");
  expect(getEffectivePlacement(el, "top-trailing")).toBe("top-start");
  expect(getEffectivePlacement(el, "bottom-leading")).toBe("bottom-end");
  expect(getEffectivePlacement(el, "bottom-trailing")).toBe("bottom-start");
  expect(getEffectivePlacement(el, "right-leading")).toBe("right-end");
  expect(getEffectivePlacement(el, "right-trailing")).toBe("right-start");
  expect(getEffectivePlacement(el, "left-leading")).toBe("left-end");
  expect(getEffectivePlacement(el, "left-trailing")).toBe("left-start");
});

it("should have correct value for defaultOffsetDistance", () => {
  expect(defaultOffsetDistance).toBe(6);
});

it("should correctly calculate hypotenuse", () => {
  expect(Math.floor(hypotenuse(4, 4))).toBe(5);
});
