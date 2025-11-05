import { it, expect, describe, beforeEach, vi } from "vitest";
import { useSizeOverride, SizeOverrideContext } from "./useSizeOverride";

describe("useSizeOverride", () => {
  let el: HTMLElement;
  let context: SizeOverrideContext;

  beforeEach(() => {
    el = document.createElement("div");
    context = {
      targetElement: el,
      getMin: () => 100,
      getMax: () => 500,
      setInternalState: vi.fn(),
    };
  });

  it("applies clamped size within min/max", () => {
    const result = useSizeOverride(context, 200, "inline");
    expect(result).toBe(200);
    expect(el.style.width).toBe("200px");
  });

  it("clamps size below min", () => {
    const result = useSizeOverride(context, 50, "inline");
    expect(result).toBe(100);
    expect(el.style.width).toBe("100px");
  });

  it("clamps size above max", () => {
    const result = useSizeOverride(context, 600, "inline");
    expect(result).toBe(500);
    expect(el.style.width).toBe("500px");
  });

  it("clears override when size is null", () => {
    const result = useSizeOverride(context, null, "inline");
    expect(result).toBeNull();
    expect(el.style.width).toBe("");
  });

  it("applies block axis", () => {
    const result = useSizeOverride(context, 300, "block");
    expect(result).toBe(300);
    expect(el.style.height).toBe("300px");
  });

  it("calls setInternalState with applied value", () => {
    useSizeOverride(context, 400, "inline");
    expect(context.setInternalState).toHaveBeenCalledWith("inline", 400);
  });
});
