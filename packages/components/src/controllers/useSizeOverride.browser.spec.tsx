import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h, JsxNode, LitElement } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { useSizeOverride } from "./useSizeOverride";

describe("useSizeOverride", async () => {
  class Test extends LitElement {
    ref = createRef<HTMLDivElement>();
    resizeValues = { inlineSize: number | null, blockSize: number | null };

    controller = useSizeOverride({
      targetElement: () => this.ref.value,
      getBounds: (axis) => (axis === "inline" ? { min: 100, max: 500 } : { min: 60, max: 400 }),
    });

    applySizeOverride(sizes: { inline?: number | null; block?: number | null }): void {
      const appliedSizes = this.controller.resize(sizes);
      if (appliedSizes.inline !== undefined) {
        this.resizeValues.inlineSize = appliedSizes.inline ?? null;
      }
      if (appliedSizes.block !== undefined) {
        this.resizeValues.blockSize = appliedSizes.block ?? null;
      }
    }

    override render(): JsxNode {
      return <div ref={this.ref} />;
    }
  }

  let el;

  beforeEach(async () => {
    const mounted = await mount(Test);
    el = mounted.el;
  });

  it("applies clamped size within min/max", () => {
    el.applySizeOverride({ inline: 200 });
    expect(el.ref.value!.style.inlineSize).toBe("200px");
    expect(el.resizeValues.inlineSize).toBe(200);
  });

  it("clamps size below min", () => {
    el.applySizeOverride({ inline: 50 });
    expect(el.ref.value!.style.inlineSize).toBe("100px");
    expect(el.resizeValues.inlineSize).toBe(100);
  });

  it("clamps size above max", () => {
    el.applySizeOverride({ inline: 600 });
    expect(el.ref.value!.style.inlineSize).toBe("500px");
    expect(el.resizeValues.inlineSize).toBe(500);
  });

  it("clears override when size is null", () => {
    el.applySizeOverride({ inline: null });
    expect(el.ref.value!.style.inlineSize).toBe("");
    expect(el.resizeValues.inlineSize).toBeNull();
  });

  it("applies block axis", () => {
    el.applySizeOverride({ block: 300 });
    expect(el.ref.value!.style.blockSize).toBe("300px");
    expect(el.resizeValues.blockSize).toBe(300);
  });

  it("applies inline axis", () => {
    el.applySizeOverride({ inline: 250 });
    expect(el.ref.value!.style.inlineSize).toBe("250px");
    expect(el.resizeValues.inlineSize).toBe(250);
  });
});
