import { describe, it, expect } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { JsxNode, LitElement, h } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { useSizeOverride } from "./useSizeOverride";

describe("useSizeOverride", async () => {
  class Test extends LitElement {
    ref = createRef<HTMLDivElement>();
    resizeValues = { inlineSize: null, blockSize: null };

    controller = useSizeOverride({
      targetElement: () => this.ref.value,
      getBounds: (axis) => (axis === "inline" ? { min: 100, max: 500 } : { min: 60, max: 400 }),
    });

    override render(): JsxNode {
      return <div ref={this.ref} />;
    }
  }

  let el: HTMLElement;

  beforeEach(async () => {
    const mounted = await mount(Test);
    el = mounted.el;
  });

  it("applies clamped size within min/max", () => {
    el.controller.resize({ inline: 200 });
    expect(el.ref.value!.style.width).toBe("200px");
    expect(el.resizeValues.inlineSize).toBe(200);
  });

  it("clamps size below min", () => {
    el.controller.resize({ inline: 50 });
    expect(el.ref.value!.style.width).toBe("100px");
    expect(el.resizeValues.inlineSize).toBe(100);
  });

  it("clamps size above max", () => {
    el.controller.resize({ inline: 600 });
    expect(el.ref.value!.style.width).toBe("500px");
    expect(el.resizeValues.inlineSize).toBe(500);
  });

  it("clears override when size is null", () => {
    el.controller.resize({ inline: null });
    expect(el.ref.value!.style.width).toBe("");
    expect(el.resizeValues.inlineSize).toBeNull();
  });

  it("applies block axis", () => {
    el.controller.resize({ block: 300 });
    expect(el.ref.value!.style.height).toBe("300px");
    expect(el.resizeValues.blockSize).toBe(300);
  });

  it("applies inline axis", () => {
    el.controller.resize({ inline: 250 });
    expect(el.ref.value!.style.width).toBe("250px");
    expect(el.resizeValues.inlineSize).toBe(250);
  });

  it("returns applied value and updates style", () => {
    const applied = el.controller.resize({ inline: 400 });
    expect(applied).toEqual({ inline: 400 });
    expect(el.ref.value!.style.width).toBe("400px");
    expect(el.resizeValues.inlineSize).toBe(400);
  });
});
