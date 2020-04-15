import {
  fetchIcon,
  FetchIconProps,
  iconCache,
  normalizeIconName,
  requestCache,
  scaleToPx
} from "./utils";

describe("utils", () => {
  describe("scaleToPx", () => {
    it("maps scale values to sizes", () => {
      expect(scaleToPx["s"]).toBe(16);
      expect(scaleToPx["m"]).toBe(24);
      expect(scaleToPx["l"]).toBe(32);
    });
  });

  describe("fetchIcon", () => {
    it("avoids fetching if icon data is available", async () => {
      expect(Object.keys(requestCache)).toHaveLength(0);
      expect(Object.keys(iconCache)).toHaveLength(0);

      const smallBanana: FetchIconProps = {
        icon: "banana",
        scale: "s"
      };
      const mediumBanana: FetchIconProps = {
        icon: "banana",
        scale: "m"
      };

      await fetchIcon(smallBanana);
      expect(Object.keys(requestCache)).toHaveLength(1);
      expect(Object.keys(iconCache)).toHaveLength(1);

      await fetchIcon(mediumBanana);
      expect(Object.keys(requestCache)).toHaveLength(2);
      expect(Object.keys(iconCache)).toHaveLength(2);

      await fetchIcon(smallBanana);
      await fetchIcon(mediumBanana);
      expect(Object.keys(requestCache)).toHaveLength(2);
      expect(Object.keys(iconCache)).toHaveLength(2);
    });

    it("normalizes icon name", () => {
      // used internally by fetchIcon
      expect(normalizeIconName("aZ")).toBe("aZ");
      expect(normalizeIconName("a-z")).toBe("aZ");
      expect(normalizeIconName("2d-explore")).toBe("i2DExplore");
      expect(normalizeIconName("2DExplore")).toBe("i2DExplore");
    });
  });
});
