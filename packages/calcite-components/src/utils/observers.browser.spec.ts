import { describe, it, expect, vi } from "vitest";
import { createObserver, updateRefObserver } from "./observers";

describe("observers", () => {
  describe("createObserver", () => {
    it("helps create any type of observer", () => {
      const callback = vi.fn();
      expect(createObserver("mutation", callback)).toBeInstanceOf(MutationObserver);
      expect(createObserver("intersection", callback)).toBeInstanceOf(IntersectionObserver);
      expect(createObserver("resize", callback)).toBeInstanceOf(ResizeObserver);
    });
  });

  describe("updateRefObserver", () => {
    it("helps update observers used in ref callbacks", () => {
      // any observer will do for this test
      const observer = createObserver("resize", vi.fn());

      // @ts-expect-error -- method isn't being extracted from the observer correctly
      const observeSpy = vi.spyOn(observer, "observe");
      // @ts-expect-error -- method isn't being extracted from the observer correctly
      const unobserveSpy = vi.spyOn(observer, "unobserve");

      updateRefObserver(undefined, undefined, undefined);
      expect(unobserveSpy).toHaveBeenCalledTimes(0);
      expect(observeSpy).toHaveBeenCalledTimes(0);

      updateRefObserver(observer, undefined, undefined);
      expect(unobserveSpy).toHaveBeenCalledTimes(0);
      expect(observeSpy).toHaveBeenCalledTimes(0);

      const ref1 = document.createElement("div");
      ref1.id = "ref1";

      updateRefObserver(observer, undefined, ref1);
      expect(unobserveSpy).toHaveBeenCalledTimes(0);
      expect(observeSpy).toHaveBeenCalledTimes(1);
      expect(observeSpy).toHaveBeenCalledWith(ref1);

      const ref2 = undefined;

      updateRefObserver(observer, ref1, ref2);
      expect(unobserveSpy).toHaveBeenCalledTimes(1);
      expect(unobserveSpy).toHaveBeenCalledWith(ref1);
      expect(observeSpy).toHaveBeenCalledTimes(1);

      const ref3 = document.createElement("div");
      ref3.id = "ref3";

      updateRefObserver(observer, ref2, ref3);
      expect(unobserveSpy).toHaveBeenCalledTimes(1);
      expect(observeSpy).toHaveBeenCalledTimes(2);
      expect(observeSpy).toHaveBeenCalledWith(ref3);

      const ref4 = document.createElement("div");
      ref4.id = "ref4";

      updateRefObserver(observer, ref3, ref4);
      expect(unobserveSpy).toHaveBeenCalledTimes(2);
      expect(unobserveSpy).toHaveBeenCalledWith(ref3);
      expect(observeSpy).toHaveBeenCalledTimes(3);
      expect(observeSpy).toHaveBeenCalledWith(ref4);
    });
  });
});
