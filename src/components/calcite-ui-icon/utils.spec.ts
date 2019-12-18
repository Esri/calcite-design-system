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

      const smallFilledBanana: FetchIconProps = {
        icon: "banana",
        scale: "s",
        filled: false
      };
      const mediumNonFilledBanana: FetchIconProps = {
        icon: "banana",
        scale: "m",
        filled: false
      };
      const mediumFilledBanana: FetchIconProps = {
        icon: "banana",
        scale: "m",
        filled: true
      };
      const mediumFilledCamera: FetchIconProps = {
        icon: "camera",
        scale: "m",
        filled: true
      };

      await fetchIcon(smallFilledBanana);
      expect(Object.keys(requestCache)).toHaveLength(1);
      expect(Object.keys(iconCache)).toHaveLength(1);

      await fetchIcon(mediumNonFilledBanana);
      expect(Object.keys(requestCache)).toHaveLength(2);
      expect(Object.keys(iconCache)).toHaveLength(2);

      await fetchIcon(mediumFilledBanana);
      expect(Object.keys(requestCache)).toHaveLength(3);
      expect(Object.keys(iconCache)).toHaveLength(3);

      await fetchIcon(mediumFilledCamera);
      expect(Object.keys(requestCache)).toHaveLength(4);
      expect(Object.keys(iconCache)).toHaveLength(4);

      await fetchIcon(smallFilledBanana);
      await fetchIcon(mediumNonFilledBanana);
      await fetchIcon(mediumFilledBanana);
      await fetchIcon(mediumFilledCamera);
      expect(Object.keys(requestCache)).toHaveLength(4);
      expect(Object.keys(iconCache)).toHaveLength(4);
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
