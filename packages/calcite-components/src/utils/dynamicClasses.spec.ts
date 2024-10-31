import { getDimension } from "./dynamicClasses";

describe("getDimension", () => {
  const types = ["width", "height"] as const;
  const sizes = ["s", "m", "l", ""] as const;
  const scales = ["s", "m", "l", ""] as const;

  types.forEach((type) => {
    sizes.forEach((size) => {
      scales.forEach((scale) => {
        const expected = size ? `${type}-${size}` : scale ? `${type}-${scale}` : "";
        it(`should return "${expected}" for type="${type}", size="${size}", scale="${scale}"`, () => {
          const result = getDimension(type, size, scale);
          expect(result).toBe(expected);
        });
      });
    });
  });
});
