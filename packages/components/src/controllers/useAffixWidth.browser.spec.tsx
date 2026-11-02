import { Fragment, h, JsxNode, LitElement } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { createRef } from "lit/directives/ref.js";
import { describe, expect, it, vi } from "vitest";
import { useAffixWidth } from "./useAffixWidth";

class AffixWidthTestComponent extends LitElement {
  prefixRef = createRef<HTMLDivElement>();

  suffixRef = createRef<HTMLDivElement>();

  affixWidth = useAffixWidth<AffixWidthTestComponent>({
    getTrailingWidth: (affix) => (affix === "prefix" ? 3 : 5),
  })(this);

  override render(): JsxNode {
    return (
      <>
        <div ref={this.prefixRef} />
        <div ref={this.suffixRef} />
      </>
    );
  }
}

describe("useAffixWidth", () => {
  it("returns rounded-up affix widths", async () => {
    const { component } = await mount(AffixWidthTestComponent);
    const prefixRect = { width: 12.25 } as DOMRect;
    const suffixRect = { width: 8.75 } as DOMRect;

    vi.spyOn(component.prefixRef.value!, "getBoundingClientRect").mockReturnValue(prefixRect);
    vi.spyOn(component.suffixRef.value!, "getBoundingClientRect").mockReturnValue(suffixRect);

    expect(component.affixWidth.getAffixWidth("prefix")).toBe(13);
    expect(component.affixWidth.getAffixWidth("suffix")).toBe(9);
  });

  it("returns the configured trailing width for each affix", async () => {
    const { component } = await mount(AffixWidthTestComponent);

    expect(component.affixWidth.getTrailingWidth("prefix")).toBe(3);
    expect(component.affixWidth.getTrailingWidth("suffix")).toBe(5);
  });

  it("sets and removes the corresponding affix width custom property", async () => {
    const { component, el } = await mount(AffixWidthTestComponent);

    component.affixWidth.setAffixWidth("prefix", 24);
    component.affixWidth.setAffixWidth("suffix", 32);

    expect(el.style.getPropertyValue("--calcite-internal-input-affix-prefix-width")).toBe("24px");
    expect(el.style.getPropertyValue("--calcite-internal-input-affix-suffix-width")).toBe("32px");

    component.affixWidth.setAffixWidth("prefix", undefined);
    component.affixWidth.setAffixWidth("suffix", undefined);

    expect(el.style.getPropertyValue("--calcite-internal-input-affix-prefix-width")).toBe("");
    expect(el.style.getPropertyValue("--calcite-internal-input-affix-suffix-width")).toBe("");
  });
});
