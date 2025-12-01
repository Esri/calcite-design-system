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

      async setFocus(options?: FocusOptions): Promise<void> {
        return this.focusSetter(() => this.inputRef.value, options);
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

      async setFocus(options?: FocusOptions): Promise<void> {
        return this.focusSetter(() => this.inputRef.value, options);
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

  it("focuses focusable host component", async () => {
    class Test extends LitElement {
      private focusSetter = useSetFocus()(this);

      async setFocus(options?: FocusOptions): Promise<void> {
        return this.focusSetter(() => this.el, options);
      }

      override render(): JsxNode {
        return <div tabIndex={0} />;
      }
    }

    const { el } = await mount(Test);

    expect(document.activeElement).not.toBe(el);
    await el.setFocus();
    expect(document.activeElement).toBe(el);
  });

  it("bails if component is disabled", async () => {
    class Test extends LitElement {
      private focusSetter = useSetFocus()(this);

      disabled = true;

      async setFocus(options?: FocusOptions): Promise<void> {
        return this.focusSetter(() => this.el, options);
      }

      override render(): JsxNode {
        return <div tabIndex={0} />;
      }
    }

    const { el } = await mount(Test);

    expect(document.activeElement).not.toBe(el);
    await el.setFocus();
    expect(document.activeElement).not.toBe(el);

    el.disabled = false;
    await el.setFocus();
    expect(document.activeElement).toBe(el);
  });

  it("bails if component is blurred before setFocus resolves", async () => {
    class Test extends LitElement {
      focusSetter = useSetFocus()(this);
      private inputRef = createRef<ToElement<Input["el"]>>();

      async setFocus(options?: FocusOptions): Promise<void> {
        return this.focusSetter(() => this.inputRef.value, options);
      }

      override render(): JsxNode {
        return <calcite-input ref={this.inputRef} />;
      }
    }

    const { el } = await mount(Test);
    const i = document.createElement("input");
    document.body.append(i);

    expect(document.activeElement).not.toBe(el);

    const input = el.shadowRoot.querySelector("calcite-input")!;
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

      async setFocus(options?: FocusOptions): Promise<void> {
        return this.focusSetter(() => this.inputRef.value, options);
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

      async setFocus(options?: FocusOptions): Promise<void> {
        return this.focusSetter(() => this.inputRef.value, options);
      }

      override render(): JsxNode {
        return <calcite-input ref={this.inputRef} />;
      }
    }

    const { el } = await mount(Test);
    expect(document.activeElement).not.toBe(el);

    const input = el.shadowRoot.querySelector("calcite-input")!;
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

      async setFocus(options?: FocusOptions): Promise<void> {
        return this.focusSetter(() => this.inputRef.value, options);
      }

      override render(): JsxNode {
        return <calcite-input ref={this.inputRef} />;
      }
    }

    const { el } = await mount(Test);
    const input = document.createElement("input");
    document.body.append(input);

    expect(document.activeElement).toBe(document.body);

    const internalInput = el.shadowRoot.querySelector("calcite-input")!;
    const spy = vi.spyOn(internalInput, "setFocus");
    const setFocusPromise = el.setFocus();
    input.focus();
    await setFocusPromise;

    expect(document.activeElement).toBe(input);
    expect(spy).not.toHaveBeenCalled();
  });

  describe("focus behavior options", () => {
    it("allows setting includeContainer", async () => {
      class Test extends LitElement {
        private focusSetter = useSetFocus()(this);
        private ref = createRef<HTMLDivElement>();

        async setFocus(options?: FocusOptions): Promise<void> {
          return this.focusSetter(
            () => ({ target: this.ref.value!, includeContainer: true }),
            options,
          );
        }

        override render(): JsxNode {
          return (
            <div id="target" ref={this.ref} tabIndex={0}>
              <button>Button</button>
            </div>
          );
        }
      }
      const { el } = await mount(Test);

      expect(document.activeElement).not.toBe(el);

      await el.setFocus();
      expect(document.activeElement!.shadowRoot!.activeElement).toBe(
        el.shadowRoot.querySelector("#target"),
      );
    });

    it("allows setting focus strategy", async () => {
      class Test extends LitElement {
        private focusSetter = useSetFocus()(this);
        private ref = createRef<HTMLDivElement>();

        async setFocus(options?: FocusOptions): Promise<void> {
          return this.focusSetter(
            () => ({ target: this.ref.value!, strategy: "focusable" }),
            options,
          );
        }

        override render(): JsxNode {
          return (
            <div ref={this.ref}>
              <div id="target" tabIndex={-1} />
              <button>Button</button>
            </div>
          );
        }
      }
      const { el } = await mount(Test);

      expect(document.activeElement).not.toBe(el);

      await el.setFocus();
      expect(document.activeElement!.shadowRoot!.activeElement).toBe(
        el.shadowRoot.querySelector("#target"),
      );
    });
  });

  it("supports passing focus options", async () => {
    class Test extends LitElement {
      private focusSetter = useSetFocus()(this);

      inputRef = createRef<HTMLInputElement>();

      async setFocus(options?: FocusOptions): Promise<void> {
        return this.focusSetter(() => this.inputRef.value, options);
      }

      override render(): JsxNode {
        return <input ref={this.inputRef} />;
      }
    }

    const { el, component } = await mount(Test);
    const focusSpy = vi.spyOn(component.inputRef.value!, "focus");

    expect(document.activeElement).not.toBe(el);

    const focusOptions: FocusOptions = { preventScroll: true };
    await el.setFocus(focusOptions);
    expect(document.activeElement).toBe(el);
    expect(focusSpy).toHaveBeenCalledWith(focusOptions);
    expect(focusSpy).toHaveBeenCalledTimes(1);
  });
});
