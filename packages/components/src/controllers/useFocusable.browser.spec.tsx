import { mount } from "@arcgis/lumina-compiler/testing";
import { createRef } from "lit/directives/ref.js";
import { Fragment, h, JsxNode, LitElement, ToElement } from "@arcgis/lumina";
import { describe, expect, expectTypeOf, it, vi } from "vitest";
import { page } from "vitest/browser";
import { Input } from "../components/input/input";
import type { SetFocusable } from "../utils/dom";
import { useFocusable } from "./useFocusable";

declare global {
  interface DeclareElements {
    "focus-query-shadow-host": FocusQueryShadowHost;
  }
}

class FocusQueryShadowHost extends LitElement {
  static tagName = "focus-query-shadow-host";

  override render(): JsxNode {
    return <button type="button">Nested</button>;
  }
}

it("requires the component to implement setFocus", () => {
  expectTypeOf<Parameters<ReturnType<typeof useFocusable>>[0]>()
    .toHaveProperty("setFocus")
    .toEqualTypeOf<SetFocusable["setFocus"]>();
});

describe("focus queries", () => {
  class Test extends LitElement {
    focusable = useFocusable()(this);

    async setFocus(options?: FocusOptions): Promise<void> {
      return this.focusable.setFocus(() => this.el, options);
    }

    override render(): JsxNode {
      return (
        <>
          <focus-query-shadow-host data-testid="shadow-host" />
          <button type="button">Other</button>
        </>
      );
    }
  }

  async function mountNestedFocusTarget() {
    const { el, component } = await mount(Test, { dynamicComponents: [FocusQueryShadowHost] });
    const host = page.elementLocator(el).getByTestId("shadow-host");
    const button = host.getByRole("button", { name: "Nested" }).element() as HTMLButtonElement;
    return { el, component, host: host.element(), button };
  }

  it("finds focusable elements across shadow boundaries", async () => {
    const { el, component, button } = await mountNestedFocusTarget();
    const other = page.elementLocator(el).getByRole("button", { name: "Other" }).element();
    button.tabIndex = -1;

    expect(component.focusable.getFocusableElements(el)).toEqual([button, other]);
  });

  it("includes a focusable container only once", async () => {
    const { el, component } = await mountNestedFocusTarget();
    const button = page.elementLocator(el).getByRole("button", { name: "Other" }).element();

    expect(component.focusable.getFocusableElements(button)).toEqual([button]);
  });

  it("excludes a disabled container", async () => {
    const { el, component } = await mountNestedFocusTarget();
    const button = page
      .elementLocator(el)
      .getByRole("button", { name: "Other" })
      .element() as HTMLButtonElement;
    expect(component.focusable.getFocusableElements(button)).toEqual([button]);

    button.disabled = true;

    expect(component.focusable.getFocusableElements(button)).toEqual([]);
  });

  it("excludes a hidden container", async () => {
    const { el, component } = await mountNestedFocusTarget();
    const button = page
      .elementLocator(el)
      .getByRole("button", { name: "Other" })
      .element() as HTMLButtonElement;
    expect(component.focusable.getFocusableElements(button)).toEqual([button]);

    button.hidden = true;

    expect(component.focusable.getFocusableElements(button)).toEqual([]);
  });

  it("excludes an inert container", async () => {
    const { el, component } = await mountNestedFocusTarget();
    const button = page
      .elementLocator(el)
      .getByRole("button", { name: "Other" })
      .element() as HTMLButtonElement;
    expect(component.focusable.getFocusableElements(button)).toEqual([button]);

    button.inert = true;

    expect(component.focusable.getFocusableElements(button)).toEqual([]);
  });

  it("excludes disabled and hidden descendants", async () => {
    const { el, component, button } = await mountNestedFocusTarget();
    const other = page
      .elementLocator(el)
      .getByRole("button", { name: "Other" })
      .element() as HTMLButtonElement;
    other.disabled = true;
    button.hidden = true;

    expect(component.focusable.getFocusableElements(el)).toEqual([]);
  });

  it("returns no focusable elements without a container", async () => {
    const { component } = await mountNestedFocusTarget();

    expect(component.focusable.getFocusableElements(undefined)).toEqual([]);
  });

  it("resolves the deepest active element through nested shadow roots", async () => {
    const { component, button } = await mountNestedFocusTarget();

    button.focus();

    expect(component.focusable.getDeepActiveElement()).toBe(button);
  });

  it("reports whether focus is within the component", async () => {
    const { component, button } = await mountNestedFocusTarget();
    expect(component.focusable.hasFocus).toBe(false);

    button.focus();
    expect(component.focusable.hasFocus).toBe(true);

    button.blur();
    expect(component.focusable.hasFocus).toBe(false);
  });

  it("checks containment across shadow boundaries", async () => {
    const { el, component, host, button } = await mountNestedFocusTarget();
    const other = page.elementLocator(el).getByRole("button", { name: "Other" }).element();

    button.focus();

    expect(component.focusable.isFocusedWithin(el)).toBe(true);
    expect(component.focusable.isFocusedWithin(host)).toBe(true);
    expect(component.focusable.isFocusedWithin(button)).toBe(true);
    expect(component.focusable.isFocusedWithin(other)).toBe(false);
  });

  it("detects focus changes within the same shadow host", async () => {
    const { el, component, button } = await mountNestedFocusTarget();
    const other = page.elementLocator(el).getByRole("button", { name: "Other" }).element();
    button.focus();
    const focusedElement = component.focusable.getDeepActiveElement();
    expect(component.focusable.isFocusUnchanged(focusedElement)).toBe(true);

    other.focus();

    expect(component.focusable.isFocusUnchanged(focusedElement)).toBe(false);
  });
});

it("focuses native elements", async () => {
  class Test extends LitElement {
    private focusSetter = useFocusable()(this).setFocus;
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
    private focusSetter = useFocusable()(this).setFocus;
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
    private focusSetter = useFocusable()(this).setFocus;

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
    private focusSetter = useFocusable()(this).setFocus;

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
    focusSetter = useFocusable()(this).setFocus;
    private inputRef = createRef<ToElement<Input["el"]>>();

    async setFocus(options?: FocusOptions): Promise<void> {
      return this.focusSetter(() => this.inputRef.value, options);
    }

    override render(): JsxNode {
      return <calcite-input ref={this.inputRef} />;
    }
  }

  const { el } = await mount(Test);
  await mount(<input data-testid="outside-input" />);
  const input = page.getByTestId("outside-input").element();

  expect(document.activeElement).not.toBe(el);

  const internalInput = el.shadowRoot.querySelector("calcite-input")!;
  await internalInput.setFocus();

  const spy = vi.spyOn(internalInput, "setFocus");
  const setFocusPromise = el.setFocus();
  input.focus();
  await setFocusPromise;

  expect(document.activeElement).toBe(input);
  expect(spy).not.toHaveBeenCalled();
});

it("bails if target focus element is not available", async () => {
  class Test extends LitElement {
    private focusSetter = useFocusable()(this).setFocus;
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
    focusSetter = useFocusable()(this).setFocus;
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
    focusSetter = useFocusable()(this).setFocus;

    private inputRef = createRef<ToElement<Input["el"]>>();

    async setFocus(options?: FocusOptions): Promise<void> {
      return this.focusSetter(() => this.inputRef.value, options);
    }

    override render(): JsxNode {
      return <calcite-input ref={this.inputRef} />;
    }
  }

  const { el } = await mount(Test);
  await mount(<input data-testid="outside-input" />);
  const input = page.getByTestId("outside-input").element();

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
      private focusSetter = useFocusable()(this).setFocus;
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
      private focusSetter = useFocusable()(this).setFocus;
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
    private focusSetter = useFocusable()(this).setFocus;

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
