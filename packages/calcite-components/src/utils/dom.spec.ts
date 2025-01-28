// @ts-strict-ignore
import { beforeAll, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { ModeName } from "../components/interfaces";
import { html } from "../../support/formatting";
import { waitForAnimationFrame } from "../tests/utils";
import { createControlledPromise } from "../tests/utils/promises";
import { guidPattern } from "./guid.spec";
import {
  ensureId,
  focusElementInGroup,
  getModeName,
  getShadowRootNode,
  getSlotAssignedElements,
  hasVisibleContent,
  isBefore,
  isKeyboardTriggeredClick,
  isPixelValue,
  isPrimaryPointerButton,
  setRequestedIcon,
  slotChangeGetAssignedElements,
  slotChangeGetAssignedNodes,
  slotChangeGetTextContent,
  slotChangeHasAssignedElement,
  slotChangeHasAssignedNode,
  slotChangeHasContent,
  slotChangeHasTextContent,
  toAriaBoolean,
  whenAnimationDone,
  whenTransitionDone,
} from "./dom";

describe("dom", () => {
  async function setUpSlotChange({
    assignedElements = [],
    assignedNodes = [],
    onSlotChange = () => {},
  }: {
    assignedElements?: Element[];
    assignedNodes?: Node[];
    onSlotChange?: (event: Event) => void;
  }): Promise<void> {
    return new Promise<void>((resolve) => {
      const target = document.createElement("slot");
      target.assignedElements = () => assignedElements;
      target.assignedNodes = () => assignedNodes;
      target.addEventListener(
        "slotchange",
        (event: Event) => {
          onSlotChange(event);
          resolve();
        },
        { once: true },
      );
      target.dispatchEvent(new Event("slotchange"));
    });
  }

  describe("setRequestedIcon()", () => {
    const iconObject = { exampleValue: "exampleReturnedValue" };
    const matchedValue = "exampleValue";

    it("returns the custom icon name if custom value is passed", () =>
      expect(setRequestedIcon(iconObject, "myCustomValue", matchedValue)).toBe("myCustomValue"));

    it("returns the pre-defined icon name if custom value is true", () =>
      expect(setRequestedIcon(iconObject, true, matchedValue)).toBe(iconObject[matchedValue]));

    it("returns the pre-defined icon name if is an empty string", () =>
      expect(setRequestedIcon(iconObject, "", matchedValue)).toBe(iconObject[matchedValue]));

    it("returns undefined if custom value is undefined", () =>
      expect(setRequestedIcon(iconObject, undefined, matchedValue)).toBe(undefined));

    it("returns undefined if custom value is false", () =>
      expect(setRequestedIcon(iconObject, false, matchedValue)).toBe(undefined));
  });

  describe("uniqueId", () => {
    it("generates unique ID on an element", () => {
      const input = document.createElement("input");
      expect(ensureId(input)).toMatch(new RegExp(`input-${guidPattern.source}`));
    });

    it("returns the element's ID if it exists", () => {
      const input = document.createElement("input");
      input.id = "test";
      expect(ensureId(input)).toBe("test");
    });

    it("returns empty string if invoked without element", () => {
      expect(ensureId(null)).toBe("");
    });
  });

  describe("getModeName()", () => {
    interface ModeElement extends HTMLElement {
      foundModeName: ModeName;
    }

    function getTestComponentMode(): string {
      return document.body.querySelector<ModeElement>("mode-element").foundModeName;
    }

    function defineTestComponents(): void {
      class ModeElement extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }

        foundModeName = null;

        connectedCallback(): void {
          this.foundModeName = getModeName(this);
        }
      }

      customElements.define("mode-element", ModeElement);
    }

    beforeAll(() => {
      defineTestComponents();
    });

    it("finds the closest mode if set (light)", () => {
      document.body.innerHTML = html`
        <div class="calcite-mode-dark">
          <div class="calcite-mode-light">
            <mode-element></mode-element>
          </div>
        </div>
      `;
      expect(getTestComponentMode()).toBe("light");
    });

    it("finds the closest mode if set (dark)", () => {
      document.body.innerHTML = html`
        <div class="calcite-mode-light">
          <div class="calcite-mode-dark">
            <mode-element></mode-element>
          </div>
        </div>
      `;
      expect(getTestComponentMode()).toBe("dark");
    });

    it("sets to default (light) if no mode is set", () => {
      document.body.innerHTML = html`
        <div>
          <div>
            <mode-element></mode-element>
          </div>
        </div>
      `;
      expect(getTestComponentMode()).toBe("light");
    });

    it("returns 'dark' if the closest element has 'calcite-mode-auto' class and prefers-color-scheme is dark", () => {
      window.matchMedia = vi.fn().mockImplementation((query) => ({
        matches: query === "(prefers-color-scheme: dark)",
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
      }));

      document.body.innerHTML = html`
        <div class="calcite-mode-auto">
          <div>
            <mode-element></mode-element>
          </div>
        </div>
      `;
      expect(getTestComponentMode()).toBe("dark");
    });
  });

  describe("toAriaBoolean()", () => {
    it("handles truthy values", () => {
      expect(toAriaBoolean(true)).toBe("true");
    });

    it("handles falsy values", () => {
      expect(toAriaBoolean(false)).toBe("false");
      expect(toAriaBoolean(null)).toBe("false");
      expect(toAriaBoolean(undefined)).toBe("false");
    });
  });

  describe("isPrimaryPointerButton()", () => {
    it("handles pointer events", () => {
      expect(isPrimaryPointerButton({ button: 0, isPrimary: true } as PointerEvent)).toBe(true);
      expect(isPrimaryPointerButton({ button: 1, isPrimary: true } as PointerEvent)).toBe(false);
      expect(isPrimaryPointerButton({ button: 0, isPrimary: false } as PointerEvent)).toBe(false);
      expect(isPrimaryPointerButton({} as PointerEvent)).toBe(false);
    });
  });

  describe("getSlotAssignedElements()", () => {
    it("returns slotted elements with no selector", () => {
      const slotEl = document.createElement("slot");
      slotEl.assignedElements = () => [document.createElement("div"), document.createElement("div")];
      expect(getSlotAssignedElements(slotEl)).toHaveLength(2);
    });
    it("returns no slotted elements", () => {
      const slotEl = document.createElement("slot");
      slotEl.assignedElements = () => [];
      expect(getSlotAssignedElements(slotEl)).toHaveLength(0);
    });
    it("returns slotted elements with direct element selector", () => {
      const slotEl = document.createElement("slot");
      slotEl.assignedElements = () => [
        document.createElement("span"),
        document.createElement("div"),
        document.createElement("span"),
      ];
      expect(getSlotAssignedElements(slotEl, "div")).toHaveLength(1);
      expect(getSlotAssignedElements(slotEl, "span")).toHaveLength(2);
    });
    it("returns slotted elements with class selector", () => {
      const slotEl = document.createElement("slot");
      const spanEl = document.createElement("span");
      spanEl.className = "my-span";
      const divEl = document.createElement("div");
      divEl.className = "my-div";
      slotEl.assignedElements = () => [document.createElement("span"), spanEl, document.createElement("div"), divEl];
      expect(getSlotAssignedElements(slotEl, ".my-div")).toHaveLength(1);
      expect(getSlotAssignedElements(slotEl, ".my-span")).toHaveLength(1);
    });
  });

  describe("slotChangeGetAssignedElements()", () => {
    it("handles slotted elements", async () =>
      await setUpSlotChange({
        assignedElements: [document.createElement("div"), document.createElement("div")],
        onSlotChange: (event) => expect(slotChangeGetAssignedElements(event)).toHaveLength(2),
      }));

    it("handles no slotted elements", async () =>
      await setUpSlotChange({
        onSlotChange: (event) => expect(slotChangeGetAssignedElements(event)).toHaveLength(0),
      }));
  });

  describe("slotChangeHasAssignedElement()", () => {
    it("handles slotted elements", async () =>
      await setUpSlotChange({
        assignedElements: [document.createElement("div"), document.createElement("div")],
        onSlotChange: (event) => expect(slotChangeHasAssignedElement(event)).toBe(true),
      }));

    it("handles no slotted elements", async () =>
      await setUpSlotChange({
        onSlotChange: (event) => expect(slotChangeHasAssignedElement(event)).toBe(false),
      }));
  });

  describe("slotChangeHasAssignedNode()", () => {
    it("handles slotted nodes", async () =>
      await setUpSlotChange({
        assignedNodes: [document.createTextNode("hello"), document.createTextNode("world")],
        onSlotChange: (event) => expect(slotChangeHasAssignedNode(event)).toBe(true),
      }));

    it("handles no slotted nodes", async () =>
      await setUpSlotChange({
        onSlotChange: (event) => expect(slotChangeHasAssignedNode(event)).toBe(false),
      }));
  });

  describe("slotChangeGetAssignedNodes()", () => {
    it("handles slotted nodes", async () =>
      await setUpSlotChange({
        assignedNodes: [document.createTextNode("hello"), document.createTextNode("world")],
        onSlotChange: (event) => expect(slotChangeGetAssignedNodes(event)).toHaveLength(2),
      }));

    it("handles no slotted nodes", async () =>
      await setUpSlotChange({
        onSlotChange: (event) => expect(slotChangeGetAssignedNodes(event)).toHaveLength(0),
      }));
  });

  describe("slotChangeGetTextContent()", () => {
    it("handles slotted nodes", async () => {
      await setUpSlotChange({
        assignedNodes: [document.createTextNode("hello"), document.createTextNode("world")],
        onSlotChange: (event) => expect(slotChangeGetTextContent(event)).toEqual("helloworld"),
      });
    });

    it("handles no slotted nodes", async () =>
      await setUpSlotChange({
        onSlotChange: (event) => expect(slotChangeGetTextContent(event)).toEqual(""),
      }));
  });

  describe("slotChangeHasContent()", () => {
    it("handles slotted nodes", async () =>
      await setUpSlotChange({
        assignedNodes: [document.createTextNode("hello"), document.createTextNode("world")],
        onSlotChange: (event) => expect(slotChangeHasContent(event)).toEqual(true),
      }));

    it("handles slotted elements", async () =>
      await setUpSlotChange({
        assignedElements: [document.createElement("div")],
        onSlotChange: (event) => expect(slotChangeHasContent(event)).toEqual(true),
      }));

    it("handles no slotted nodes or elements", async () =>
      await setUpSlotChange({
        onSlotChange: (event) => expect(slotChangeHasContent(event)).toEqual(false),
      }));
  });

  describe("slotChangeHasTextContent()", () => {
    it("handles slotted nodes", async () =>
      await setUpSlotChange({
        assignedNodes: [document.createTextNode("hello"), document.createTextNode("world")],
        onSlotChange: (event) => expect(slotChangeHasTextContent(event)).toEqual(true),
      }));

    it("handles no slotted nodes", async () =>
      await setUpSlotChange({
        onSlotChange: (event) => expect(slotChangeHasTextContent(event)).toEqual(false),
      }));
  });

  describe("hasVisibleContent", () => {
    it("should return true if element has visible content", () => {
      const element = document.createElement("div");
      element.innerHTML = "<p>hello</p>";
      document.body.append(element);
      expect(hasVisibleContent(element)).toBe(true);
    });

    it("should return false if element has no visible content", () => {
      const element = document.createElement("div");
      document.body.append(element);
      expect(hasVisibleContent(element)).toBe(false);

      element.innerHTML = "\n<!-- some comment -->\n";
      expect(hasVisibleContent(element)).toBe(false);
    });
  });

  describe("focusElementInGroup()", () => {
    it("should cycle through the array by default", () => {
      const elements = [document.createElement("div"), document.createElement("div"), document.createElement("div")];
      expect(focusElementInGroup(elements, elements[0], "previous")).toBe(elements[2]);
      expect(focusElementInGroup(elements, elements[2], "next")).toBe(elements[0]);
    });

    it("should not cycle through the array", () => {
      const elements = [document.createElement("div"), document.createElement("div"), document.createElement("div")];
      expect(focusElementInGroup(elements, elements[0], "previous", false)).toBe(elements[0]);
      expect(focusElementInGroup(elements, elements[2], "next", false)).toBe(elements[2]);
    });
  });

  describe("getShadowRootNode()", () => {
    function defineTestComponents(): void {
      class ShadowElement extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML = `<button>Hello</button>`;
        }
      }

      customElements.define("shadow-element", ShadowElement);
    }

    beforeAll(() => {
      defineTestComponents();
    });

    it("should return shadowRoot for shadowed element", () => {
      document.body.innerHTML = html` <shadow-element></shadow-element> `;
      const shadowElement = document.body.querySelector("shadow-element");
      const shadowRoot = shadowElement.shadowRoot;
      const button = shadowElement.shadowRoot.querySelector("button");
      expect(button).toBeDefined();
      expect(getShadowRootNode(button)).toEqual(shadowRoot);
    });

    it("should return null for non shadowed element", () => {
      document.body.innerHTML = html` <div></div> `;
      expect(getShadowRootNode(document.body.querySelector("div"))).toBe(null);
    });
  });

  describe("isBefore", () => {
    let div1: HTMLDivElement;
    let div2: HTMLDivElement;

    beforeEach(() => {
      div1 = document.createElement("div");
      div2 = document.createElement("div");
    });

    it("should return true if element A is before element B", () => {
      document.body.append(div1, div2);
      expect(isBefore(div1, div2)).toBe(true);
    });

    it("should return false if element A is after element B", () => {
      document.body.append(div2, div1);
      expect(isBefore(div1, div2)).toBe(false);
    });
  });

  describe("isKeyboardTriggeredClick", () => {
    it("should return true if click is triggered by keyboard", () => {
      const event = new MouseEvent("click", { detail: 0 });
      expect(isKeyboardTriggeredClick(event)).toBe(true);
    });

    it("should return false if click is triggered by mouse/pointer", () => {
      const event = new MouseEvent("click", { detail: 1 });
      expect(isKeyboardTriggeredClick(event)).toBe(false);
    });
  });

  async function promiseState(
    promise: Promise<any>,
  ): Promise<{ status: "fulfilled" | "rejected"; value?: any; reason: any }> {
    const pendingState = { status: "pending" };

    return Promise.race([promise, pendingState]).then(
      (value) => (value === pendingState ? value : { status: "fulfilled", value }),
      (reason) => ({ status: "rejected", reason }),
    );
  }

  /*
   * These tests depend on the `getAnimations` method which is not available in happy-dom,
   * so we try to mock it as close to the real thing as possible.
   */
  describe("transition/animation helpers", () => {
    let element: HTMLDivElement;
    let onStartCallback: Mock;
    let onEndCallback: Mock;

    beforeEach(() => {
      element = window.document.createElement("div");
      onStartCallback = vi.fn();
      onEndCallback = vi.fn();
    });

    const helpers = [whenTransitionDone, whenAnimationDone] as const;

    helpers.forEach((helper) => {
      const type = helper === whenTransitionDone ? "transition" : "animation";
      const animationPropName = helper === whenTransitionDone ? "transitionProperty" : "animationName";
      const testTransitionOrAnimationName = helper === whenTransitionDone ? "opacity" : "fade";

      describe(`${helper.name}`, () => {
        it(`should return a promise that resolves after the ${type} (running at call time)`, async () => {
          const controlledPromise = createControlledPromise<void>();
          const animationsPerCall = [
            [
              {
                [animationPropName]: testTransitionOrAnimationName,
                finished: controlledPromise.promise,
              } as unknown as Animation | CSSTransition,
            ],
          ];
          element.getAnimations = () => animationsPerCall.shift();

          const promise = helper(element, testTransitionOrAnimationName, onStartCallback, onEndCallback);
          expect(await promiseState(promise)).toHaveProperty("status", "pending");
          expect(onStartCallback).toHaveBeenCalled();
          expect(onEndCallback).not.toHaveBeenCalled();

          controlledPromise.resolve();

          expect(await promiseState(promise)).toHaveProperty("status", "pending");
          expect(onStartCallback).toHaveBeenCalled();
          expect(onEndCallback).toHaveBeenCalled();

          expect(await promiseState(promise)).toHaveProperty("status", "fulfilled");
          expect(onStartCallback).toHaveBeenCalled();
          await expect(onEndCallback).toHaveBeenCalled();
        });

        it(`should return a promise that resolves after the ${type} (running frame after call time)`, async () => {
          const controlledPromise = createControlledPromise<void>();
          const animationsPerCall = [
            [],
            [
              {
                [animationPropName]: testTransitionOrAnimationName,
                finished: controlledPromise.promise,
              } as unknown as Animation | CSSTransition,
            ],
          ];
          element.getAnimations = () => animationsPerCall.shift();

          const promise = helper(element, testTransitionOrAnimationName, onStartCallback, onEndCallback);

          expect(await promiseState(promise)).toHaveProperty("status", "pending");
          expect(onStartCallback).not.toHaveBeenCalled();
          expect(onEndCallback).not.toHaveBeenCalled();

          await waitForAnimationFrame();

          expect(await promiseState(promise)).toHaveProperty("status", "pending");
          expect(onStartCallback).toHaveBeenCalled();
          expect(onEndCallback).not.toHaveBeenCalled();

          controlledPromise.resolve();

          expect(await promiseState(promise)).toHaveProperty("status", "pending");
          expect(onStartCallback).toHaveBeenCalled();
          expect(onEndCallback).toHaveBeenCalled();

          expect(await promiseState(promise)).toHaveProperty("status", "fulfilled");
          expect(onStartCallback).toHaveBeenCalled();
          await expect(onEndCallback).toHaveBeenCalled();
        });

        it(`should return a promise that resolves after 0s ${type} or has not started when expected (fallback cases)`, async () => {
          const animationsPerCall = [[], []];
          element.getAnimations = () => animationsPerCall.shift();

          const promise = helper(element, testTransitionOrAnimationName, onStartCallback, onEndCallback);
          expect(await promiseState(promise)).toHaveProperty("status", "pending");

          await waitForAnimationFrame();
          expect(onStartCallback).not.toHaveBeenCalled();
          expect(onEndCallback).not.toHaveBeenCalled();

          await waitForAnimationFrame();
          expect(onStartCallback).toHaveBeenCalled();

          await waitForAnimationFrame();
          expect(onEndCallback).toHaveBeenCalled();

          expect(await promiseState(promise)).toHaveProperty("status", "fulfilled");
        });
      });
    });
  });

  describe("isPixelValue()", () => {
    it("returns true for pixel values", () => {
      expect(isPixelValue("10px")).toBe(true);
    });

    it("returns false for non-pixel values", () => {
      expect(isPixelValue("10%")).toBe(false);
      expect(isPixelValue("10em")).toBe(false);
    });
  });
});
