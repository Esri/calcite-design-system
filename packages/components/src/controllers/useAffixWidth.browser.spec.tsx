import { createEvent, Fragment, h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { createRef } from "lit/directives/ref.js";
import { describe, expect, it, vi } from "vitest";
import type { Scale } from "../components/types";
import { useAffixWidth } from "./useAffixWidth";

class AffixWidthTestComponent extends LitElement {
  @property() prefixText?: string;

  @property() suffixText?: string;

  @property() scale: Scale = "m";

  @property() disabled = false;

  calciteInternalInputAffixChange = createEvent({ cancelable: false });

  prefixRef = createRef<HTMLDivElement>();

  suffixRef = createRef<HTMLDivElement>();

  affixWidth = useAffixWidth<AffixWidthTestComponent>({
    getTrailingWidth: (affix) => (affix === "prefix" ? 3 : 5),
  })(this);

  override render(): JsxNode {
    return (
      <>
        <div data-scale={this.scale} ref={this.prefixRef}>
          {this.prefixText}
        </div>
        <div ref={this.suffixRef}>{this.suffixText}</div>
      </>
    );
  }
}

describe("useAffixWidth", () => {
  it.each(["prefixText", "suffixText", "scale"] as const)(
    "emits after rendering a %s change",
    async (property) => {
      const { component, el } = await mount(AffixWidthTestComponent);
      const listener = vi.fn(() => [
        component.prefixRef.value!.textContent,
        component.suffixRef.value!.textContent,
        component.prefixRef.value!.dataset.scale,
      ]);
      el.addEventListener("calciteInternalInputAffixChange", listener);

      el[property] = "l";
      await component.updateComplete;

      expect(listener).toHaveBeenCalledTimes(1);
      expect(listener).toHaveReturnedWith([el.prefixText ?? "", el.suffixText ?? "", el.scale]);
    },
  );

  it("emits one bubbling, composed, non-cancelable event for a batched affix update", async () => {
    const { component, el } = await mount(AffixWidthTestComponent);
    const listener = vi.fn();
    el.addEventListener("calciteInternalInputAffixChange", listener);

    el.prefixText = "Prefix";
    el.suffixText = "Suffix";
    el.scale = "l";
    await component.updateComplete;

    expect(listener).toHaveBeenCalledTimes(1);
    expect(listener.mock.calls[0][0]).toMatchObject({
      bubbles: true,
      composed: true,
      cancelable: false,
    });
  });

  it("does not emit for unrelated changes", async () => {
    const { component, el } = await mount(AffixWidthTestComponent);
    const listener = vi.fn();
    el.addEventListener("calciteInternalInputAffixChange", listener);

    el.disabled = true;
    await component.updateComplete;

    expect(listener).not.toHaveBeenCalled();
  });

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
