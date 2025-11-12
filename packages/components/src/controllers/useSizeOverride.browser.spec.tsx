import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { LitElement } from "@arcgis/lumina";
import { useSizeOverride, SizeAxis } from "./useSizeOverride";

class Test extends LitElement {
  elRef = document.createElement("div");
  resizeValues: Record<string, number | null> = { inlineSize: null, blockSize: null };
  setInternalStateSpy = vi.fn((axis: SizeAxis, value: number | null) => {
    this.resizeValues[axis === "inline" ? "inlineSize" : "blockSize"] = value;
  });
  sizeOverride = useSizeOverride({
    targetElement: () => this.elRef,
    getMin: (axis) => (axis === "inline" ? 100 : 60),
    getMax: (axis) => (axis === "inline" ? 500 : 400),
    setInternalState: this.setInternalStateSpy,
  });
  override connectedCallback(): void {
    super.connectedCallback();
    document.body.appendChild(this.elRef);
  }
}

describe("useSizeOverride", () => {
  let component: Test;

  beforeEach(async () => {
    ({ component } = await mount(Test));
  });

  it("applies clamped size within min/max", () => {
    component.sizeOverride.apply(200, "inline");
    expect(component.elRef.style.width).toBe("200px");
    expect(component.resizeValues.inlineSize).toBe(200);
  });

  it("clamps size below min", () => {
    component.sizeOverride.apply(50, "inline");
    expect(component.elRef.style.width).toBe("100px");
    expect(component.resizeValues.inlineSize).toBe(100);
  });

  it("clamps size above max", () => {
    component.sizeOverride.apply(600, "inline");
    expect(component.elRef.style.width).toBe("500px");
    expect(component.resizeValues.inlineSize).toBe(500);
  });

  it("clears override when size is null", () => {
    component.sizeOverride.apply(null, "inline");
    expect(component.elRef.style.width).toBe("");
    expect(component.resizeValues.inlineSize).toBeNull();
  });

  it("applies block axis", () => {
    component.sizeOverride.apply(300, "block");
    expect(component.elRef.style.height).toBe("300px");
    expect(component.resizeValues.blockSize).toBe(300);
  });

  it("calls setInternalState with applied value", () => {
    component.sizeOverride.apply(400, "inline");
    expect(component.setInternalStateSpy).toHaveBeenCalledWith("inline", 400);
  });
});
