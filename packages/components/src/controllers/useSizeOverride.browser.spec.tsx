import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h, JsxNode, LitElement } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { ResizeValues } from "../components/interfaces";
import { useSizeOverride } from "./useSizeOverride";

describe("useSizeOverride", async () => {
  let onResizeSpy: (resizeValues: ResizeValues) => void;

  class Test extends LitElement {
    ref = createRef<HTMLDivElement>();

    sizeOverride = useSizeOverride({
      targetElement: this.ref,
      getBounds: () => ({ inline: { min: 100, max: 500 }, block: { min: 60, max: 400 } }),
      onResize: onResizeSpy,
    });

    override render(): JsxNode {
      return <div ref={this.ref} />;
    }
  }

  let component: Test;

  beforeEach(async () => {
    onResizeSpy = vi.fn();
    const mounted = await mount(Test);
    component = mounted.component;
  });

  it("applies clamped size within min/max", () => {
    const size = component.sizeOverride.resize({ inline: 200, block: 250 });
    expect(component.ref.value!.style.inlineSize).toBe("200px");
    expect(component.ref.value!.style.blockSize).toBe("250px");
    expect(size.inline).toBe(200);
    expect(size.block).toBe(250);
    expect(onResizeSpy).toHaveBeenCalledWith({
      inlineSize: 200,
      blockSize: 250,
      minInlineSize: 100,
      maxInlineSize: 500,
      minBlockSize: 60,
      maxBlockSize: 400,
    });
  });

  it("clamps size below min", () => {
    const size = component.sizeOverride.resize({ inline: 50, block: 50 });
    expect(component.ref.value!.style.inlineSize).toBe("100px");
    expect(component.ref.value!.style.blockSize).toBe("60px");
    expect(size.inline).toBe(100);
    expect(size.block).toBe(60);
  });

  it("clamps size above max", () => {
    const size = component.sizeOverride.resize({ inline: 600, block: 600 });
    expect(component.ref.value!.style.inlineSize).toBe("500px");
    expect(component.ref.value!.style.blockSize).toBe("400px");
    expect(size.inline).toBe(500);
    expect(size.block).toBe(400);
  });

  it("clears override when size is null", () => {
    const size = component.sizeOverride.resize({ inline: null, block: null });
    expect(component.ref.value!.style.inlineSize).toBe("");
    expect(component.ref.value!.style.blockSize).toBe("");
    expect(size.inline).toBeNull();
    expect(size.block).toBeNull();
  });

  it("applies block and inline axis", () => {
    const size = component.sizeOverride.resize({ block: 300, inline: 250 });
    expect(component.ref.value!.style.blockSize).toBe("300px");
    expect(component.ref.value!.style.inlineSize).toBe("250px");
    expect(size.block).toBe(300);
    expect(size.inline).toBe(250);
  });
});
