import { mount } from "@arcgis/lumina-compiler/testing";
import { createRef } from "lit/directives/ref.js";
import { h, JsxNode, LitElement, ToElement } from "@arcgis/lumina";
import { describe, expect, it, vi } from "vitest";
import { Input } from "../components/input/input";
import { useSetFocus } from "./useSetFocus";

describe("useSetFocus", () => {
  it("focuses native elements", async () => {
    class Test extends LitElement {
      private focusSetter = useSetFocus()(this);
      private inputRef = createRef<HTMLInputElement>();

      async setFocus(): Promise<void> {
        return this.focusSetter(() => this.inputRef.value);
      }

      override render(): JsxNode {
        return <input ref={this.inputRef} />;
      }
    }

    const { el } = await mount(Test);

    expect(document.activeElement).not.toBe(el);
    await el.setFocus();
    expect(document.activeElement).toBe(el);
  });

  it("focuses custom elements", async () => {
    class Test extends LitElement {
      private focusSetter = useSetFocus()(this);
      private inputRef = createRef<ToElement<Input["el"]>>();

      async setFocus(): Promise<void> {
        return this.focusSetter(() => this.inputRef.value);
      }

      override render(): JsxNode {
        return <calcite-input ref={this.inputRef} />;
      }
    }

    const { el } = await mount(Test);

    expect(document.activeElement).not.toBe(el);
    await el.setFocus();
    expect(document.activeElement).toBe(el);
  });

  it("bails if component is blurred before setFocus resolves", async () => {
    class Test extends LitElement {
      focusSetter = useSetFocus()(this);
      private inputRef = createRef<ToElement<Input["el"]>>();

      async setFocus(): Promise<void> {
        return this.focusSetter(() => this.inputRef.value);
      }

      override render(): JsxNode {
        return <calcite-input ref={this.inputRef} />;
      }
    }

    const { el } = await mount(Test);
    const i = document.createElement("input");
    document.body.append(i);

    expect(document.activeElement).not.toBe(el);

    const input = el.shadowRoot.querySelector("calcite-input");
    await input.setFocus();

    const spy = vi.spyOn(input, "setFocus");
    const setFocusPromise = el.setFocus();
    i.focus();
    await setFocusPromise;

    expect(document.activeElement).toBe(i);
    expect(spy).not.toHaveBeenCalled();
  });

  it("bails if target focus element is not available", async () => {
    class Test extends LitElement {
      private focusSetter = useSetFocus()(this);
      private inputRef = createRef<ToElement<Input["el"]>>();
      private ready = false;

      async setFocus(): Promise<void> {
        return this.focusSetter(() => this.inputRef.value);
      }

      override render(): JsxNode {
        return this.ready ? <calcite-input ref={this.inputRef} /> : null;
      }
    }

    const { el } = await mount(Test);

    expect(document.activeElement).not.toBe(el);
    await el.setFocus();
    expect(document.activeElement).not.toBe(el);
  });

  it("bails if component already has focus", async () => {
    class Test extends LitElement {
      focusSetter = useSetFocus()(this);
      private inputRef = createRef<ToElement<Input["el"]>>();

      async setFocus(): Promise<void> {
        return this.focusSetter(() => this.inputRef.value);
      }

      override render(): JsxNode {
        return <calcite-input ref={this.inputRef} />;
      }
    }

    const { el } = await mount(Test);
    expect(document.activeElement).not.toBe(el);

    const input = el.shadowRoot.querySelector("calcite-input");
    await input.setFocus();

    const spy = vi.spyOn(input, "setFocus");

    expect(spy).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(el);

    await el.setFocus();
    expect(spy).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(el);

    await el.setFocus();
    expect(spy).not.toHaveBeenCalled();
    expect(document.activeElement).toBe(el);
  });

  it("bails if focus moves from previously focused element to another before component's setFocus resolves", async () => {
    class Test extends LitElement {
      focusSetter = useSetFocus()(this);

      private inputRef = createRef<ToElement<Input["el"]>>();

      async setFocus(): Promise<void> {
        return this.focusSetter(() => this.inputRef.value);
      }

      override render(): JsxNode {
        return <calcite-input ref={this.inputRef} />;
      }
    }

    const { el } = await mount(Test);
    const i = document.createElement("input");
    document.body.append(i);

    expect(document.activeElement).toBe(document.body);

    const input = el.shadowRoot.querySelector("calcite-input");
    const spy = vi.spyOn(input, "setFocus");
    const setFocusPromise = el.setFocus();
    i.focus();
    await setFocusPromise;

    expect(document.activeElement).toBe(i);
    expect(spy).not.toHaveBeenCalled();
  });
});
