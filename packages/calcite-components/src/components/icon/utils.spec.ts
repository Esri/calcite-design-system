import { fetchIcon, FetchIconProps, iconCache, normalizeIconName, requestCache, scaleToPx } from "./utils";

describe("utils", () => {
  describe("scaleToPx", () => {
    it("maps scale values to sizes", () => {
      expect(scaleToPx["s"]).toBe(16);
      expect(scaleToPx["m"]).toBe(24);
      expect(scaleToPx["l"]).toBe(32);
    });
  });

  describe("fetchIcon", () => {
    beforeAll(() => {
      // we mock fetch since we are not testing the icon data itself
      (global.fetch as jest.Mock) = jest.fn(async () =>
        Promise.resolve({
          json: () =>
            Promise.resolve({
              /* intentionally empty */
            }),
        })
      );
    });

    afterAll(() => {
      (global.fetch as jest.Mock).mockReset();
    });

    it("avoids fetching if icon data is available", async () => {
      expect(Object.keys(requestCache)).toHaveLength(0);
      expect(Object.keys(iconCache)).toHaveLength(0);

      const smallBanana: FetchIconProps = {
        icon: "banana",
        scale: "s",
      };
      const mediumBanana: FetchIconProps = {
        icon: "banana",
        scale: "m",
      };
      const circle: FetchIconProps = {
        icon: "circleF",
        scale: "s",
      };
      const circleKebab: FetchIconProps = {
        icon: "circle-f",
        scale: "m",
      };
      const circleCamel: FetchIconProps = {
        icon: "circleF",
        scale: "m",
      };

      await fetchIcon(smallBanana);
      expect(Object.keys(requestCache)).toHaveLength(1);
      expect(Object.keys(iconCache)).toHaveLength(1);

      await fetchIcon(mediumBanana);
      expect(Object.keys(requestCache)).toHaveLength(2);
      expect(Object.keys(iconCache)).toHaveLength(2);

      await fetchIcon(circle);
      expect(Object.keys(requestCache)).toHaveLength(3);
      expect(Object.keys(iconCache)).toHaveLength(3);

      await fetchIcon(circleKebab);
      expect(Object.keys(requestCache)).toHaveLength(4);
      expect(Object.keys(iconCache)).toHaveLength(4);

      await fetchIcon(smallBanana);
      await fetchIcon(mediumBanana);
      await fetchIcon(circleCamel);
      expect(Object.keys(requestCache)).toHaveLength(4);
      expect(Object.keys(iconCache)).toHaveLength(4);
    });

    it("normalizes icon name (used internally by fetchIcon)", () => {
      expect(normalizeIconName("1-8x")).toBe("i18X");
      expect(normalizeIconName("1-8X")).toBe("i18X");
      expect(normalizeIconName("18X")).toBe("i18X");

      expect(normalizeIconName("1x")).toBe("i1X");
      expect(normalizeIconName("1X")).toBe("i1X");

      expect(normalizeIconName("2d-explore")).toBe("i2DExplore");
      expect(normalizeIconName("2DExplore")).toBe("i2DExplore");

      expect(normalizeIconName("360-view")).toBe("i360View");
      expect(normalizeIconName("360View")).toBe("i360View");

      expect(normalizeIconName("a-z")).toBe("aZ");
      expect(normalizeIconName("aZ")).toBe("aZ");

      expect(normalizeIconName("attachment")).toBe("attachment");

      expect(normalizeIconName("classify-pixels")).toBe("classifyPixels");
      expect(normalizeIconName("classifyPixels")).toBe("classifyPixels");

      expect(normalizeIconName("display-selection-lock")).toBe("displaySelectionLock");
      expect(normalizeIconName("displaySelectionLock")).toBe("displaySelectionLock");

      expect(normalizeIconName("number-circle-6")).toBe("numberCircle6");
      expect(normalizeIconName("numberCircle6")).toBe("numberCircle6");

      expect(normalizeIconName("x-axis-guide")).toBe("xAxisGuide");
      expect(normalizeIconName("xAxisGuide")).toBe("xAxisGuide");
    });
  });
});
