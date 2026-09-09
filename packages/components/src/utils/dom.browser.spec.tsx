import { Fragment, JsxNode, LitElement, method } from "@arcgis/lumina";
import { mount } from "@arcgis/lumina-compiler/testing";
import { html } from "lit";
import { describe, expect, it, onTestFinished, vi } from "vitest";
import type { ModeName } from "../components/types";
import type { IconName } from "../components/icon/types";
import { guidPattern } from "./guid.browser.spec";
import {
  ensureId,
  focusElement,
  focusElementInGroup,
  focusFirstTabbable,
  getModeName,
  getShadowRootNode,
  getSlotAssignedElements,
  getStylePixelValue,
  hasVisibleContent,
  isBefore,
  isKeyboardTriggeredClick,
  isPrimaryPointerButton,
  nextFrame,
  queryElementRoots,
  setRequestedIcon,
  slotChangeGetAssignedElements,
  slotChangeGetAssignedNodes,
  slotChangeGetTextContent,
  slotChangeHasAssignedElement,
  slotChangeHasAssignedNode,
  slotChangeHasContent,
  slotChangeHasTextContent,
  viewportUnitToPixel,
  whenAnimationDone,
  whenTransitionDone,
} from "./dom";
import { Locator, page } from "vitest/browser";
import { css } from "../../support/formatting";

const myButtonId = "my.id";
const myButtonClass = "my-class";
const insideHost = "Inside Host";
const outsideHost = "Outside Host";
const insideShadow = "Inside Shadow";

describe(setRequestedIcon, () => {
  const iconObject: Record<string, IconName> = { exampleValue: "3d-glasses" };
  const matchedValue = "exampleValue";

  it("returns the custom icon name if custom value is passed", () =>
    expect(setRequestedIcon(iconObject, "banana", matchedValue)).toBe("banana"));

  it("returns the pre-defined icon name if custom value is true", () =>
    expect(setRequestedIcon(iconObject, true, matchedValue)).toBe(iconObject[matchedValue]));

  it("returns the pre-defined icon name if is an empty string", () =>
    expect(setRequestedIcon(iconObject, "", matchedValue)).toBe(iconObject[matchedValue]));

  it("returns undefined if custom value is undefined", () =>
    expect(setRequestedIcon(iconObject, undefined, matchedValue)).toBe(undefined));

  it("returns undefined if custom value is false", () =>
    expect(setRequestedIcon(iconObject, false, matchedValue)).toBe(undefined));
});

describe(ensureId, () => {
  it("generates unique ID on an element", async () => {
    await mount(html`<input />`);
    const input = page.getByRole("textbox").element();

    expect(ensureId(input)).toMatch(new RegExp(`input-${guidPattern.source}`));
  });

  it("returns the element's ID if it exists", async () => {
    await mount(html`<input id="test" />`);
    const input = page.getByRole("textbox").element();

    expect(ensureId(input)).toBe("test");
  });

  it("returns empty string if invoked without element", () => {
    expect(ensureId(undefined)).toBe("");
  });
});

describe(getModeName, () => {
  class ModeComponent extends LitElement {
    static tagName = "mode-element";

    foundModeName!: ModeName;

    connectedCallback(): void {
      this.foundModeName = getModeName(this);
    }
  }

  it("finds the closest mode if set (light)", async () => {
    const { el } = await mount(
      html` <div class="calcite-mode-dark">
        <div class="calcite-mode-light">
          <mode-element></mode-element>
        </div>
      </div>`,
      {
        dynamicComponents: [ModeComponent],
      },
    );

    expect(el.foundModeName).toBe("light");
  });

  it("finds the closest mode if set (dark)", async () => {
    const { el } = await mount(
      html`
        <div class="calcite-mode-light">
          <div class="calcite-mode-dark">
            <mode-element></mode-element>
          </div>
        </div>
      `,
      {
        dynamicComponents: [ModeComponent],
      },
    );

    expect(el.foundModeName).toBe("dark");
  });

  it("sets to default (light) if no mode is set", async () => {
    const { el } = await mount(
      html`
        <div>
          <div>
            <mode-element></mode-element>
          </div>
        </div>
      `,
      {
        dynamicComponents: [ModeComponent],
      },
    );

    expect(el.foundModeName).toBe("light");
  });

  it("returns 'dark' if the closest element has 'calcite-mode-auto' class and prefers-color-scheme is dark", async () => {
    vi.stubGlobal("matchMedia", (query: string) => ({
      matches: query === "(prefers-color-scheme: dark)",
    }));

    onTestFinished(() => {
      vi.unstubAllGlobals();
    });

    const { el } = await mount(
      html`
        <div class="calcite-mode-auto">
          <div>
            <mode-element></mode-element>
          </div>
        </div>
      `,
      {
        dynamicComponents: [ModeComponent],
      },
    );
    expect(el.foundModeName).toBe("dark");
  });
});

describe(isPrimaryPointerButton, () => {
  it("handles pointer events", () => {
    expect(
      isPrimaryPointerButton(new PointerEvent("pointerdown", { button: 0, isPrimary: true })),
    ).toBe(true);
    expect(
      isPrimaryPointerButton(new PointerEvent("pointerdown", { button: 1, isPrimary: true })),
    ).toBe(false);
    expect(
      isPrimaryPointerButton(new PointerEvent("pointerdown", { button: 0, isPrimary: false })),
    ).toBe(false);
  });
});

describe("slot utils", () => {
  describe(hasVisibleContent, () => {
    it("should return true if element has visible content", async () => {
      await mount(html`<div data-testid="container"><p>hello</p></div>`);
      const container = page.getByTestId("container").element() as HTMLElement;

      expect(hasVisibleContent(container)).toBe(true);
    });

    it("should return false if element has no visible content", async () => {
      await mount(html`<div data-testid="container"></div>`);
      const container = page.getByTestId("container").element() as HTMLElement;

      expect(hasVisibleContent(container)).toBe(false);

      container.innerHTML = "\n<!-- some comment -->\n";
      expect(hasVisibleContent(container)).toBe(false);
    });
  });

  class SimpleSlotComponent extends LitElement {
    override render(): JsxNode {
      return <slot />;
    }
  }

  class NestedSlotsComponent extends LitElement {
    override render(): JsxNode {
      return (
        <>
          <slot />
          <slot name="foo">
            <slot name="bar" />
            <slot name="baz" />
          </slot>
        </>
      );
    }
  }

  describe(getSlotAssignedElements, () => {
    it("returns slotted elements with no selector", async () => {
      await mount(
        html`
          <simple-slot-component>
            <div></div>
            <div></div>
          </simple-slot-component>
        `,
        {
          dynamicComponents: [SimpleSlotComponent],
        },
      );
      const slotEl = page.getBySelector("slot").element() as HTMLSlotElement;

      expect(getSlotAssignedElements(slotEl)).toHaveLength(2);
    });

    it("returns no slotted elements", async () => {
      await mount(SimpleSlotComponent);
      const slotEl = page.getBySelector("slot").element() as HTMLSlotElement;

      expect(getSlotAssignedElements(slotEl)).toHaveLength(0);
    });

    it("returns slotted elements with direct element selector", async () => {
      await mount(
        html`
          <simple-slot-component>
            <span></span>
            <div></div>
            <span></span>
          </simple-slot-component>
        `,
        {
          dynamicComponents: [SimpleSlotComponent],
        },
      );
      const slotEl = page.getBySelector("slot").element() as HTMLSlotElement;

      expect(getSlotAssignedElements(slotEl, "div")).toHaveLength(1);
      expect(getSlotAssignedElements(slotEl, "span")).toHaveLength(2);
    });

    it("returns slotted elements with class selector", async () => {
      await mount(
        html`
          <simple-slot-component>
            <span></span>
            <span class="my-span"></span>
            <div></div>
            <div class="my-div"></div>
          </simple-slot-component>
        `,
        {
          dynamicComponents: [SimpleSlotComponent],
        },
      );
      const slotEl = page.getBySelector("slot").element() as HTMLSlotElement;

      expect(getSlotAssignedElements(slotEl, ".my-div")).toHaveLength(1);
      expect(getSlotAssignedElements(slotEl, ".my-span")).toHaveLength(1);
    });
  });

  async function setUpSimpleSlotTest(): Promise<{
    el: SimpleSlotComponent["el"];
    reRender: () => Promise<boolean>;
    slotEl: HTMLSlotElement;
  }> {
    const result = await mount(SimpleSlotComponent);

    return {
      ...result,
      slotEl: page.getBySelector("slot").element() as HTMLSlotElement,
    };
  }

  describe(slotChangeGetAssignedElements, () => {
    it("handles slotted elements", async () => {
      let assigned: Element[] | undefined;
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();

      slotEl.addEventListener("slotchange", (event) => {
        assigned = slotChangeGetAssignedElements(event);
      });

      const items = [document.createElement("div"), document.createElement("div")];
      el.append(...items);
      await reRender();

      expect(assigned).toEqual(items);

      assigned = undefined;
      items.forEach((el) => el.remove());
      await reRender();

      expect(assigned).toEqual([]);
    });

    it("handles nested slot structure", async () => {
      const slotToAssigned: Record<string, Element[]> = {};
      const { el, reRender } = await mount(NestedSlotsComponent);
      const slots = page.getBySelector("slot");
      slots.elements().forEach((el) => {
        el.addEventListener(
          "slotchange",
          (event) =>
            (slotToAssigned[(event.currentTarget as HTMLSlotElement).name] =
              slotChangeGetAssignedElements(event)),
        );
      });

      const nodes = [
        document.createTextNode("hello"),
        document.createElement("div"),
        Object.assign(document.createElement("div"), { slot: "foo" }),
        Object.assign(document.createElement("div"), { slot: "bar" }),
        Object.assign(document.createElement("div"), { slot: "bar" }),
        Object.assign(document.createElement("div"), { slot: "baz" }),
        Object.assign(document.createElement("div"), { slot: "baz" }),
        Object.assign(document.createElement("div"), { slot: "baz" }),
      ];

      el.append(...nodes);
      await reRender();

      expect(slotToAssigned).toEqual({
        "": [nodes[1]],
        foo: [nodes[2]],
        bar: [nodes[3], nodes[4]],
        baz: [nodes[5], nodes[6], nodes[7]],
      });

      // TODO: check if we can remove below
      // Object.keys(slotToAssigned).forEach((key) => delete slotToAssigned[key]);
      nodes.forEach((el) => el.remove());
      await reRender();

      expect(slotToAssigned).toEqual({
        "": [],
        foo: [],
        bar: [],
        baz: [],
      });
    });
  });

  describe(slotChangeHasAssignedElement, () => {
    it("handles slotted elements", async () => {
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      const slotChangeHandler = vi.fn((event: Event) => {
        expect(slotChangeHasAssignedElement(event)).toBe(true);
      });
      slotEl.addEventListener("slotchange", slotChangeHandler);

      const items = [document.createElement("div"), document.createElement("div")];
      el.append(...items);
      await reRender();

      expect(slotChangeHandler).toHaveBeenCalledTimes(1);
    });

    it("handles no slotted elements", async () => {
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      const nodes = [document.createTextNode("hello"), document.createTextNode("world")];
      el.append(...nodes);
      await reRender();
      const slotChangeHandler = vi.fn((event: Event) => {
        expect(slotChangeHasAssignedElement(event)).toBe(false);
      });
      slotEl.addEventListener("slotchange", slotChangeHandler);

      nodes.forEach((el) => el.remove());
      await reRender();

      expect(slotChangeHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe(slotChangeHasAssignedNode, () => {
    it("handles slotted nodes", async () => {
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      const slotChangeHandler = vi.fn((event: Event) => {
        expect(slotChangeHasAssignedNode(event)).toBe(true);
      });
      slotEl.addEventListener("slotchange", slotChangeHandler);

      const nodes = [document.createTextNode("hello"), document.createTextNode("world")];
      el.append(...nodes);
      await reRender();

      expect(slotChangeHandler).toHaveBeenCalledTimes(1);
    });

    it("handles no slotted nodes", async () => {
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      const nodes = [document.createTextNode("hello"), document.createTextNode("world")];
      el.append(...nodes);
      await reRender();
      const slotChangeHandler = vi.fn((event: Event) => {
        expect(slotChangeHasAssignedNode(event)).toBe(false);
      });
      slotEl.addEventListener("slotchange", slotChangeHandler);

      nodes.forEach((el) => el.remove());
      await reRender();

      expect(slotChangeHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe(slotChangeGetAssignedNodes, () => {
    it("returns assigned nodes on slotchange", async () => {
      let assigned: Node[] | undefined;
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      slotEl.addEventListener("slotchange", (event) => {
        assigned = slotChangeGetAssignedNodes(event);
      });
      const nodes = [
        document.createTextNode("hello"),
        document.createElement("div"),
        document.createTextNode("world"),
      ];

      el.append(...nodes);
      await reRender();

      expect(assigned!).toEqual(nodes);

      assigned = undefined;
      nodes.forEach((el) => el.remove());
      await reRender();

      expect(assigned).toEqual([]);
    });

    it("handles nested slot structure", async () => {
      const slotToAssigned: Record<string, Node[]> = {};
      const { el, reRender } = await mount(NestedSlotsComponent);
      const slots = page.getBySelector("slot");
      slots.elements().forEach((el) => {
        el.addEventListener("slotchange", (event) => {
          slotToAssigned[(event.currentTarget as HTMLSlotElement).name] =
            slotChangeGetAssignedNodes(event);
        });
      });

      const nodes = [
        document.createTextNode("hello"),
        document.createElement("div"),
        Object.assign(document.createElement("div"), { slot: "foo" }),
        Object.assign(document.createElement("div"), { slot: "bar" }),
        Object.assign(document.createElement("div"), { slot: "bar" }),
        Object.assign(document.createElement("div"), { slot: "baz" }),
        Object.assign(document.createElement("div"), { slot: "baz" }),
        Object.assign(document.createElement("div"), { slot: "baz" }),
      ];

      el.append(...nodes);
      await reRender();

      expect(slotToAssigned).toEqual({
        "": [nodes[0], nodes[1]],
        foo: [nodes[2]],
        bar: [nodes[3], nodes[4]],
        baz: [nodes[5], nodes[6], nodes[7]],
      });

      // TODO: check if we can remove below
      // Object.keys(slotToAssigned).forEach((key) => delete slotToAssigned[key]);
      nodes.forEach((node) => node.remove());
      await reRender();

      expect(slotToAssigned).toEqual({
        "": [],
        foo: [],
        bar: [],
        baz: [],
      });
    });
  });

  describe(slotChangeGetTextContent, () => {
    it("handles slotted nodes", async () => {
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      const slotChangeHandler = vi.fn((event: Event) => {
        expect(slotChangeGetTextContent(event)).toEqual("helloworld");
      });
      slotEl.addEventListener("slotchange", slotChangeHandler);

      const nodes = [document.createTextNode("hello"), document.createTextNode("world")];
      el.append(...nodes);
      await reRender();

      expect(slotChangeHandler).toHaveBeenCalledTimes(1);
    });

    it("handles no slotted nodes", async () => {
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      const nodes = [document.createTextNode("hello"), document.createTextNode("world")];
      el.append(...nodes);
      await reRender();
      const slotChangeHandler = vi.fn((event: Event) => {
        expect(slotChangeGetTextContent(event)).toEqual("");
      });
      slotEl.addEventListener("slotchange", slotChangeHandler);

      nodes.forEach((el) => el.remove());
      await reRender();

      expect(slotChangeHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe(slotChangeHasContent, () => {
    it("handles slotted nodes", async () => {
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      const slotChangeHandler = vi.fn((event: Event) => {
        expect(slotChangeHasContent(event)).toEqual(true);
      });
      slotEl.addEventListener("slotchange", slotChangeHandler);

      const nodes = [document.createTextNode("hello"), document.createTextNode("world")];
      el.append(...nodes);
      await reRender();

      expect(slotChangeHandler).toHaveBeenCalledTimes(1);
    });

    it("handles slotted elements", async () => {
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      const slotChangeHandler = vi.fn((event: Event) => {
        expect(slotChangeHasContent(event)).toEqual(true);
      });
      slotEl.addEventListener("slotchange", slotChangeHandler);

      el.append(document.createElement("div"));
      await reRender();

      expect(slotChangeHandler).toHaveBeenCalledTimes(1);
    });

    it("handles no slotted nodes or elements", async () => {
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      const nodes = [document.createTextNode("hello"), document.createTextNode("world")];
      el.append(...nodes);
      await reRender();
      const slotChangeHandler = vi.fn((event: Event) => {
        expect(slotChangeHasContent(event)).toEqual(false);
      });
      slotEl.addEventListener("slotchange", slotChangeHandler);

      nodes.forEach((el) => el.remove());
      await reRender();

      expect(slotChangeHandler).toHaveBeenCalledTimes(1);
    });
  });

  describe(slotChangeHasTextContent, () => {
    it("handles slotted nodes", async () => {
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      const slotChangeHandler = vi.fn((event: Event) => {
        expect(slotChangeHasTextContent(event)).toEqual(true);
      });
      slotEl.addEventListener("slotchange", slotChangeHandler);

      const nodes = [document.createTextNode("hello"), document.createTextNode("world")];
      el.append(...nodes);
      await reRender();

      expect(slotChangeHandler).toHaveBeenCalledTimes(1);
    });

    it("handles no slotted nodes", async () => {
      const { el, reRender, slotEl } = await setUpSimpleSlotTest();
      const nodes = [document.createTextNode("hello"), document.createTextNode("world")];
      el.append(...nodes);
      await reRender();
      const slotChangeHandler = vi.fn((event: Event) => {
        expect(slotChangeHasTextContent(event)).toEqual(false);
      });
      slotEl.addEventListener("slotchange", slotChangeHandler);

      nodes.forEach((el) => el.remove());
      await reRender();

      expect(slotChangeHandler).toHaveBeenCalledTimes(1);
    });
  });
});

describe(focusElement, () => {
  it("focuses the element if it is focusable", async () => {
    await mount(html`<div data-testid="container" tabindex="0"></div>`);
    const container = page.getByTestId("container");

    await focusElement(container.element() as HTMLElement);
    await expect.element(container).toHaveFocus();
  });

  it("does not focus the element if it is not focusable", async () => {
    await mount(html`<div data-testid="container"></div>`);
    const container = page.getByTestId("container");

    await focusElement(container.element() as HTMLElement);
    await expect.element(container).not.toHaveFocus();
  });

  it("focuses first focusable child if includeContainer = false", async () => {
    await mount(
      html`<div data-testid="container" tabindex="-1">
        <div data-testid="child" tabindex="0"></div>
      </div>`,
    );

    await focusElement(page.getByTestId("container").element() as HTMLElement, false);
    await expect.element(page.getByTestId("child")).toHaveFocus();
  });

  it("focuses element if focusable and includeContainer = true (default)", async () => {
    await mount(
      html`<div data-testid="container" tabindex="0">
        <div data-testid="child" tabindex="0"></div>
      </div>`,
    );
    const container = page.getByTestId("container");

    await focusElement(container.element() as HTMLElement, true);
    await expect.element(container).toHaveFocus();
  });

  it("does not focus if element has no focusable child and includeContainer = false", async () => {
    await mount(html`<div data-testid="container"></div>`);
    const container = page.getByTestId("container");

    await focusElement(container.element() as HTMLElement, false);
    await expect.element(container).not.toHaveFocus();
  });

  it("focuses first focusable when strategy='focusable'", async () => {
    await mount(
      html`<div data-testid="container" tabindex="0">
        <div data-testid="child" tabindex="-1"></div>
      </div>`,
    );

    await focusElement(page.getByTestId("container").element() as HTMLElement, false, "focusable");
    await expect.element(page.getByTestId("child")).toHaveFocus();
  });

  it("focuses first tabbable when strategy='tabbable'", async () => {
    await mount(
      html`<div data-testid="container" tabindex="-1">
        <div data-testid="child" tabindex="0"></div>
      </div>`,
    );

    await focusElement(page.getByTestId("container").element() as HTMLElement, true, "tabbable");
    await expect.element(page.getByTestId("child")).toHaveFocus();
  });

  it("avoids infinite loop on setFocus components by using context", async () => {
    let useContext = true;
    let setFocusCalls = 0;

    class SetFocusEdgeCaseComponent extends LitElement {
      @method()
      async setFocus(options?: FocusOptions): Promise<void> {
        if (setFocusCalls++ > 10) {
          // simulates infinite loop without having to trigger a real one in test environment
          throw new RangeError("setFocus called too many times, likely an infinite loop");
        }

        return focusElement(this, false, "tabbable", useContext ? this : undefined, options);
      }

      override render(): JsxNode {
        return <div tabIndex={0} />;
      }
    }

    const { el } = await mount(SetFocusEdgeCaseComponent);

    vi.spyOn(el, "focus");
    vi.spyOn(el, "setFocus");

    await el.setFocus();

    expect(el.setFocus).toHaveBeenCalledTimes(1);
    expect(el.focus).toHaveBeenCalledTimes(0);

    useContext = false;
    try {
      await el.setFocus();
      expect.unreachable("should not reach here, setFocus should throw an error");
    } catch (error) {
      // eslint-disable-next-line vitest/no-conditional-expect -- we use expect.unreachable() above to properly fail the test if no error is thrown
      expect(error).toBeInstanceOf(RangeError);
    }
  });

  describe("focus options", () => {
    it("supports focus options", async () => {
      await mount(html`<div data-testid="container" tabindex="0"></div>`);
      const container = page.getByTestId("container");
      const element = container.element() as HTMLElement;
      const focusOptions = { preventScroll: true };
      const focusSpy = vi.spyOn(element, "focus");

      await focusElement(element, true, "tabbable", undefined, focusOptions);

      await expect.element(container).toHaveFocus();
      expect(focusSpy).toHaveBeenCalledWith(focusOptions);
      expect(focusSpy).toHaveBeenCalledTimes(1);
    });

    it("supports focus options on setFocus elements", async () => {
      class SetFocusCallingFocusElementComponent extends LitElement {
        @method()
        async setFocus(options?: FocusOptions): Promise<void> {
          return focusElement(this, false, "tabbable", this, options);
        }

        override render(): JsxNode {
          return <div tabIndex={0} />;
        }
      }

      const { el } = await mount(SetFocusCallingFocusElementComponent);

      vi.spyOn(el, "setFocus");

      const focusOptions = { preventScroll: true };
      await focusElement(el, false, "tabbable", undefined, focusOptions);

      await expect.element(el).toHaveFocus();
      expect(el.setFocus).toHaveBeenCalledWith(focusOptions);
      expect(el.setFocus).toHaveBeenCalledTimes(1);
    });
  });
});

describe(focusFirstTabbable, () => {
  it("focuses the first tabbable element", async () => {
    await mount(html`
      <div data-testid="container">
        <div></div>
        <div data-testid="target" tabindex="0"></div>
        <div></div>
      </div>
    `);

    focusFirstTabbable(page.getByTestId("container").element() as HTMLElement);

    await expect.element(page.getByTestId("target")).toHaveFocus();
  });

  it("does not focus if no tabbable elements are found", async () => {
    await mount(html`
      <div data-testid="container">
        <div></div>
        <div></div>
        <div></div>
      </div>
    `);

    focusFirstTabbable(page.getByTestId("container").element() as HTMLElement);

    await expect.element(document.body).toHaveFocus();
  });

  it("supports including parent in focus search", async () => {
    await mount(html`
      <div data-testid="root" tabindex="0">
        <div></div>
        <div data-testid="target" tabindex="0"></div>
        <div></div>
      </div>
    `);
    const root = page.getByTestId("root").element() as HTMLElement;

    focusFirstTabbable(root);

    await expect.element(page.getByTestId("target")).toHaveFocus();

    focusFirstTabbable(root, true);

    await expect.element(root).toHaveFocus();
  });

  it("supports passing focus options", async () => {
    await mount(html`
      <div data-testid="container">
        <div></div>
        <div data-testid="target" tabindex="0"></div>
        <div></div>
      </div>
    `);
    const target = page.getByTestId("target").element() as HTMLElement;

    const focusSpy = vi.spyOn(target, "focus");
    const focusOptions = { preventScroll: true };

    focusFirstTabbable(page.getByTestId("container").element() as HTMLElement, false, focusOptions);

    await expect.element(target).toHaveFocus();
    expect(focusSpy).toHaveBeenCalledWith(focusOptions);
    expect(focusSpy).toHaveBeenCalledTimes(1);
  });
});

describe(focusElementInGroup, () => {
  let items: Locator;
  let elements: HTMLElement[];

  async function setUp(withFocusableChild = false): Promise<void> {
    await mount(html`
      ${Array.from(
        { length: 3 },
        () => html`
          <div class="item" tabindex="0">
            ${withFocusableChild ? html`<div class="child" tabindex="0"></div>` : null}
          </div>
        `,
      )}
    `);

    items = page.getBySelector(".item");
    elements = items.elements() as HTMLElement[];
  }

  it("cycles through the array by default", async () => {
    await setUp();

    expect(focusElementInGroup(elements, elements[0], "previous")).toBe(elements[2]);
    await expect.element(elements[2]).toHaveFocus();
    expect(focusElementInGroup(elements, elements[2], "next")).toBe(elements[0]);
    await expect.element(elements[0]).toHaveFocus();
  });

  it("supports not cycling through the array", async () => {
    await setUp();

    expect(focusElementInGroup(elements, elements[0], "previous", false)).toBe(elements[0]);
    await expect.element(elements[0]).toHaveFocus();
    expect(focusElementInGroup(elements, elements[2], "next", false)).toBe(elements[2]);
    await expect.element(elements[2]).toHaveFocus();
  });

  describe("when item and first child are both focusable", () => {
    it("focus item (default)", async () => {
      await setUp(true);

      expect(focusElementInGroup(elements, elements[0], "previous")).toBe(elements[2]);
      await expect.element(elements[2]).toHaveFocus();
      expect(focusElementInGroup(elements, elements[2], "next")).toBe(elements[0]);
      await expect.element(elements[0]).toHaveFocus();
    });

    it("focus item's first focusable", async () => {
      await setUp(true);

      expect(focusElementInGroup(elements, elements[0], "previous", true, false)).toBe(elements[2]);
      await expect.element(items.nth(2).getBySelector(".child")).toHaveFocus();
      expect(focusElementInGroup(elements, elements[2], "next", true, false)).toBe(elements[0]);
      await expect.element(items.nth(0).getBySelector(".child")).toHaveFocus();
    });
  });

  it("allows specifying target as focus context", async () => {
    class SetFocusCallingFocusComponent extends LitElement {
      static tagName = "test-focus-context";

      @method()
      async setFocus(options?: FocusOptions): Promise<void> {
        // simulate setFocus workflow
        this.focus(options);
      }

      override render(): JsxNode {
        return <div data-testid="inner" tabIndex={0} />;
      }
    }

    await mount(
      html`
        <test-focus-context id="item-1" tabindex="0"></test-focus-context>
        <test-focus-context id="item-2" tabindex="0"></test-focus-context>
        <test-focus-context id="item-3" tabindex="0"></test-focus-context>
      `,
      {
        dynamicComponents: [SetFocusCallingFocusComponent],
      },
    );

    const focusContextItems = page.getBySelector("test-focus-context");
    const elements = focusContextItems.elements() as SetFocusCallingFocusComponent["el"][];

    // assertions only cover the focus context portion, the rest is covered by the previous tests

    expect(focusElementInGroup(elements, elements[0], "next", true, false)).toBe(elements[1]);
    await expect.element(elements[1]).toHaveFocus();
    await expect.element(elements[1]).toHaveProperty("shadowRoot.activeElement", null);

    expect(focusElementInGroup(elements, elements[0], "next", true, false, true)).toBe(elements[1]);
    await expect.element(elements[1]).toHaveFocus();
    await expect
      .element(elements[1])
      .toHaveProperty(
        "shadowRoot.activeElement",
        focusContextItems.nth(1).getByTestId("inner").element(),
      );
  });
});

describe(getShadowRootNode, () => {
  class SimpleComponent extends LitElement {
    override render(): JsxNode {
      return <button type="button">Hello</button>;
    }
  }

  it("should return shadowRoot for shadowed element", async () => {
    const { el } = await mount(SimpleComponent);
    const button = page.getByRole("button");
    expect(getShadowRootNode(button.element())).toEqual(el.shadowRoot);
  });

  it("should return null for non shadowed element", async () => {
    await mount(html`<div data-testid="container"></div>`);

    expect(getShadowRootNode(page.getByTestId("container").element() as HTMLElement)).toBe(null);
  });
});

describe(isBefore, () => {
  it("should return true if element A is before element B", async () => {
    await mount(html`
      <div class="element"></div>
      <div class="element"></div>
    `);
    const [el1, el2] = page.getBySelector(".element").elements() as HTMLElement[];

    expect(isBefore(el1, el2)).toBe(true);
  });

  it("should return false if element A is after element B", async () => {
    await mount(html`
      <div class="element"></div>
      <div class="element"></div>
    `);
    const [el1, el2] = page.getBySelector(".element").elements() as HTMLElement[];
    expect(isBefore(el2, el1)).toBe(false);
  });
});

describe(isKeyboardTriggeredClick, () => {
  it("should return true if click is triggered by keyboard", () => {
    const event = new MouseEvent("click", { detail: 0 });
    expect(isKeyboardTriggeredClick(event)).toBe(true);
  });

  it("should return false if click is triggered by mouse/pointer", () => {
    const event = new MouseEvent("click", { detail: 1 });
    expect(isKeyboardTriggeredClick(event)).toBe(false);
  });
});

describe("transition/animation helpers", () => {
  const duration = 100;
  const animationName = "fade";
  const transitionProperty = "opacity";
  type Type = "animation" | "transition";

  let element: HTMLDivElement;

  async function setUp(type: Type, effectDuration = duration): Promise<void> {
    const styles =
      type === "transition"
        ? css`
            .effect {
              opacity: 0;
              transition: ${transitionProperty} ${effectDuration}ms linear;
            }

            .effect--start {
              opacity: 1;
            }
          `
        : css`
            .effect {
              animation-duration: ${effectDuration}ms;
              animation-timing-function: linear;
            }

            .effect--start {
              animation-name: ${animationName};
            }

            @keyframes ${animationName} {
              from {
                opacity: 0;
              }
              to {
                opacity: 1;
              }
            }
          `;

    await mount(html`
      <style>
        ${styles}
      </style>
      <div class="effect" data-testid="target"></div>
    `);
    element = page.getByTestId("target").element() as HTMLDivElement;
  }

  async function triggerEffect(): Promise<void> {
    element.classList.add("effect--start");
    await nextFrame();
  }

  async function assertResolution(promise: Promise<void>): Promise<void> {
    let resolved = false;
    void promise.then(() => (resolved = true));

    expect(resolved).toBe(false);

    await nextFrame();
    expect(resolved).toBe(false);

    await promise;
    expect(resolved).toBe(true);
  }

  const helpers = [whenTransitionDone, whenAnimationDone] as const;

  helpers.forEach((helper) => {
    const type: Type = helper === whenTransitionDone ? "transition" : "animation";
    const effectName = type === "transition" ? transitionProperty : animationName;

    describe(`${helper.name}`, () => {
      it(`should return a promise that resolves after the ${type} (running at call time)`, async () => {
        await setUp(type);
        const promise = helper(element, effectName);
        await triggerEffect();

        await assertResolution(promise);
      });

      it(`should return a promise that resolves after the ${type} (running frame after call time)`, async () => {
        await setUp(type);

        const promise = helper(element, effectName);
        await triggerEffect();

        await assertResolution(promise);
      });

      it(`should return a promise that resolves after 0s ${type} or has not started when expected (fallback cases)`, async () => {
        await setUp(type, 0);
        await triggerEffect();

        await expect(helper(element, effectName)).resolves.toBeUndefined();
      });
    });
  });
});

describe(nextFrame, () => {
  it("should resolve in the same frame as requestAnimationFrame", async () => {
    let frameResolved = false;
    requestAnimationFrame(() => (frameResolved = true));

    expect(frameResolved).toBe(false);

    await nextFrame();

    expect(frameResolved).toBe(true);
  });
});

describe(getStylePixelValue, () => {
  it("returns the numeric value for 'px' values", () => {
    expect(getStylePixelValue("10px")).toBe(10);
    expect(getStylePixelValue("0px")).toBe(0);
    expect(getStylePixelValue("123.45px")).toBe(123.45);
  });

  it("calculates the pixel value for 'vw' values", () => {
    const viewportWidth = window.innerWidth;
    expect(getStylePixelValue("50vw")).toBe(viewportUnitToPixel(50, viewportWidth));
    expect(getStylePixelValue("100vw")).toBe(viewportWidth);
  });

  it("calculates the pixel value for 'vh' values", () => {
    const viewportHeight = window.innerHeight;
    expect(getStylePixelValue("50vh")).toBe(viewportUnitToPixel(50, viewportHeight));
    expect(getStylePixelValue("100vh")).toBe(viewportHeight);
  });

  it("returns 0 for unsupported or invalid values", () => {
    expect(getStylePixelValue("10em")).toBe(0);
    expect(getStylePixelValue("abc")).toBe(0);
    expect(getStylePixelValue("")).toBe(0);
    expect(getStylePixelValue("10")).toBe(0);
  });
});

describe(queryElementRoots, () => {
  class QueryElementRootsComponent extends LitElement {
    static tagName = "test-component";

    override render(): JsxNode {
      return (
        <div data-testid="container">
          <button id={myButtonId} type="button">
            {insideShadow}
            <slot />
          </button>
        </div>
      );
    }
  }

  it("should query from inside host element", async () => {
    const { el } = await mount(
      html`
        <span>Test</span>
        <button id="${myButtonId}">${outsideHost}</button>
        <test-component><button class="${myButtonClass}">${insideHost}</button></test-component>
      `,
      { dynamicComponents: [QueryElementRootsComponent] },
    );
    const queryEl = page.elementLocator(el).getBySelector("div").element();

    expect(
      queryElementRoots(queryEl, {
        selector: `button.${myButtonClass}`,
      }),
    ).toHaveTextContent(insideHost);
  });

  it("should query id from inside shadow element", async () => {
    const { el } = await mount(
      html`
        <span>Test</span>
        <button id="${myButtonId}">${outsideHost}</button>
        <test-component><button class="${myButtonClass}">${insideHost}</button></test-component>
      `,
      { dynamicComponents: [QueryElementRootsComponent] },
    );
    const queryEl = page.elementLocator(el).getBySelector("div").element();

    expect(queryElementRoots(queryEl, { id: myButtonId })).toHaveTextContent(insideShadow);
  });

  it("should query from outside host element", async () => {
    await mount(
      html`
        <span>Test</span>
        <button id="${myButtonId}">${outsideHost}</button>
        <test-component><button class="${myButtonClass}">${insideHost}</button></test-component>
      `,
      { dynamicComponents: [QueryElementRootsComponent] },
    );

    const source = page.getBySelector("span");

    expect(
      queryElementRoots<HTMLButtonElement>(source.element(), {
        selector: "button",
      }),
    ).toHaveTextContent(outsideHost);
  });

  it("should query id from outside host element", async () => {
    await mount(
      html`
        <span>Test</span>
        <button id="${myButtonId}">${outsideHost}</button>
        <test-component><button class="${myButtonClass}">${insideHost}</button></test-component>
      `,
      { dynamicComponents: [QueryElementRootsComponent] },
    );

    const source = page.getBySelector("span");

    expect(queryElementRoots(source.element(), { id: myButtonId })).toHaveTextContent(outsideHost);
  });
});
