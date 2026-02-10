import { it, expect, describe } from "vitest";
import { mount } from "@arcgis/lumina-compiler/testing";
import { h, JsxNode, LitElement, property } from "@arcgis/lumina";
import { createRef } from "lit/directives/ref.js";
import { isInTopLayer } from "../tests/utils/dom";
import { afterNextFrame } from "../tests/utils/timing";
import { useTopLayer } from "./useTopLayer";

describe("useTopLayer", () => {
  it("places elements on the top layer", async () => {
    class Test extends LitElement {
      overlayRef = createRef<HTMLDivElement>();

      topLayer = useTopLayer({
        target: this.overlayRef,
      })(this);

      render(): JsxNode {
        return (
          <div>
            <div popover="manual" ref={this.overlayRef}>
              overlay
            </div>
          </div>
        );
      }
    }

    const { component } = await mount(Test);

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(true);

    await component.topLayer.hide();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);
  });

  it("allows disabling top layer placement", async () => {
    class Test extends LitElement {
      @property() topLayerDisabled = false;

      overlayRef = createRef<HTMLDivElement>();

      topLayer = useTopLayer({
        target: this.overlayRef,
      })(this);

      render(): JsxNode {
        return (
          <div>
            <div popover="manual" ref={this.overlayRef}>
              overlay
            </div>
          </div>
        );
      }
    }

    const { el, component } = await mount(Test);

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(true);

    await component.topLayer.hide();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    el.topLayerDisabled = true;

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    await component.topLayer.hide();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    el.topLayerDisabled = false;

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(true);

    await component.topLayer.hide();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);
  });

  it("allows conditionally disabling top layer placement", async () => {
    class Test extends LitElement {
      @property() topLayerDisabled = false;

      overlayRef = createRef<HTMLDivElement>();

      someInternalProp = false;

      topLayer = useTopLayer({
        disabledOverride: () => {
          return this.someInternalProp;
        },
        target: this.overlayRef,
      })(this);

      render(): JsxNode {
        return (
          <div>
            <div popover="manual" ref={this.overlayRef}>
              overlay
            </div>
          </div>
        );
      }
    }

    const { component } = await mount(Test);

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(true);

    await component.topLayer.hide();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    component.someInternalProp = true;

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    await component.topLayer.hide();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    component.someInternalProp = false;

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(true);

    await component.topLayer.hide();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    component.topLayerDisabled = true;

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    await component.topLayer.hide();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    component.someInternalProp = true;

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    await component.topLayer.hide();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);
  });

  it("removes target from top layer when disabled while shown", async () => {
    class Test extends LitElement {
      @property() topLayerDisabled = false;

      overlayRef = createRef<HTMLDivElement>();

      someInternalProp = false;

      topLayer = useTopLayer({
        disabledOverride: () => {
          return this.someInternalProp;
        },
        target: this.overlayRef,
      })(this);

      render(): JsxNode {
        return (
          <div>
            <div popover="manual" ref={this.overlayRef}>
              overlay
            </div>
          </div>
        );
      }
    }

    const { el, component } = await mount(Test);

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(true);

    el.topLayerDisabled = true;

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    el.topLayerDisabled = false;

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(true);

    component.someInternalProp = true;

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);
  });

  it("does not toggle popover API if target element is missing popover attribute", async () => {
    class Test extends LitElement {
      overlayRef = createRef<HTMLDivElement>();

      topLayer = useTopLayer({
        target: this.overlayRef,
      })(this);

      render(): JsxNode {
        return (
          <div>
            <div ref={this.overlayRef}>overlay</div>
          </div>
        );
      }
    }

    const { component } = await mount(Test);

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    await expect(component.topLayer.show()).resolves.toBeUndefined();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    await expect(component.topLayer.hide()).resolves.toBeUndefined();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);
  });

  it("ensures top layer placement when an open component is removed then added back to the DOM", async () => {
    class Test extends LitElement {
      overlayRef = createRef<HTMLDivElement>();

      topLayer = useTopLayer({
        target: this.overlayRef,
      })(this);

      render(): JsxNode {
        return (
          <div>
            <div popover="manual" ref={this.overlayRef}>
              overlay
            </div>
          </div>
        );
      }
    }

    const { el, component, container } = await mount(Test);

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    await component.topLayer.show();

    expect(isInTopLayer(component.overlayRef.value)).toBe(true);

    el.remove();

    expect(isInTopLayer(component.overlayRef.value)).toBe(false);

    container.append(el);
    await afterNextFrame();

    expect(isInTopLayer(component.overlayRef.value)).toBe(true);
  });
});
