import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount, wrapController } from "@arcgis/lumina-compiler/testing";
import { useSizeOverride, SizeAxis } from "./useSizeOverride";

describe("useSizeOverride (wrapController)", () => {
  let targetEl: HTMLDivElement;
  let resizeValues: { inlineSize: number | null; blockSize: number | null };
  let setInternalStateSpy: ReturnType<typeof vi.fn>;
  let controller: ReturnType<typeof useSizeOverride>;

  beforeEach(async () => {
    targetEl = document.createElement("div");
    document.body.appendChild(targetEl);

    resizeValues = { inlineSize: null, blockSize: null };
    setInternalStateSpy = vi.fn((axis: SizeAxis, value: number | null) => {
      resizeValues[axis === "inline" ? "inlineSize" : "blockSize"] = value;
    });

    const Host = wrapController(() =>
      useSizeOverride({
        targetElement: () => targetEl,
        getMin: (axis) => (axis === "inline" ? 100 : 60),
        getMax: (axis) => (axis === "inline" ? 500 : 400),
        setInternalState: setInternalStateSpy,
      }),
    );

    const { component } = await mount(Host);
    controller = component.controller;
  });

  it("applies clamped size within min/max", () => {
    controller.apply(200, "inline");
    expect(targetEl.style.width).toBe("200px");
    expect(resizeValues.inlineSize).toBe(200);
  });

  it("clamps size below min", () => {
    controller.apply(50, "inline");
    expect(targetEl.style.width).toBe("100px");
    expect(resizeValues.inlineSize).toBe(100);
  });

  it("clamps size above max", () => {
    controller.apply(600, "inline");
    expect(targetEl.style.width).toBe("500px");
    expect(resizeValues.inlineSize).toBe(500);
  });

  it("clears override when size is null", () => {
    // eslint-disable-next-line prefer-spread
    controller.apply(null, "inline");
    expect(targetEl.style.width).toBe("");
    expect(resizeValues.inlineSize).toBeNull();
  });

  it("applies block axis", () => {
    controller.apply(300, "block");
    expect(targetEl.style.height).toBe("300px");
    expect(resizeValues.blockSize).toBe(300);
  });

  it("calls setInternalState with applied value", () => {
    controller.apply(400, "inline");
    expect(setInternalStateSpy).toHaveBeenCalledWith("inline", 400);
  });
});
