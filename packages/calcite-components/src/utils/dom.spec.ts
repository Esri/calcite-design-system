import { beforeAll, beforeEach, describe, expect, it, Mock, vi } from "vitest";
import { ModeName } from "../components/interfaces";
import { html } from "../../support/formatting";
import { createTransitionEventDispatcher, TransitionEventDispatcher } from "../tests/spec-helpers/transitionEvents";
import { AnimationEventDispatcher, createAnimationEventDispatcher } from "../tests/spec-helpers/animationEvents";
import { mockGetComputedStyleFor } from "../tests/spec-helpers/computedStyle";
import { waitForAnimationFrame } from "../tests/utils";
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
    assignedElements?: HTMLElement[];
    assignedNodes?: HTMLElement[];
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
    it("returns the custom icon name if custom value is passed", () =>
      expect(setRequestedIcon({ exampleValue: "exampleReturnedValue" }, "myCustomValue", "exampleValue")).toBe(
        "myCustomValue",
      ));

    it("returns the pre-defined icon name if custom value is not passed", () =>
      expect(setRequestedIcon({ exampleValue: "exampleReturnedValue" }, "", "exampleValue")).toBe(
        "exampleReturnedValue",
      ));
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
    });

    it("should return false if element has no visible content", () => {
      const element = document.createElement("div");
      element.innerHTML = "\n<!-- some comment -->\n";
      document.body.append(element);
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

  describe("whenTransitionDone", () => {
    const testProp = "opacity";
    const testDuration = "0.5s";

    let element: HTMLDivElement;
    let dispatchTransitionEvent: TransitionEventDispatcher;
    let onStartCallback: Mock;
    let onEndCallback: Mock;

    beforeEach(() => {
      dispatchTransitionEvent = createTransitionEventDispatcher();
      element = window.document.createElement("div");
      onStartCallback = vi.fn();
      onEndCallback = vi.fn();
    });

    it("should return a promise that resolves after the transition", async () => {
      const testTransition = `${testProp} ${testDuration} ease 0s`;

      element.style.transition = testTransition;
      window.document.body.append(element);
      mockGetComputedStyleFor(element, {
        transition: testTransition,
        transitionDuration: testDuration,
        transitionProperty: testProp,
      });

      const promise = whenTransitionDone(element, testProp, onStartCallback, onEndCallback);
      element.style.opacity = "0";

      expect(await promiseState(promise)).toHaveProperty("status", "pending");
      expect(onStartCallback).not.toHaveBeenCalled();
      expect(onEndCallback).not.toHaveBeenCalled();

      dispatchTransitionEvent(element, "transitionstart", testProp);

      expect(await promiseState(promise)).toHaveProperty("status", "pending");
      expect(onStartCallback).toHaveBeenCalled();
      expect(onEndCallback).not.toHaveBeenCalled();

      dispatchTransitionEvent(element, "transitionend", testProp);

      expect(await promiseState(promise)).toHaveProperty("status", "pending");
      expect(onStartCallback).toHaveBeenCalled();
      expect(onEndCallback).toHaveBeenCalled();

      expect(await promiseState(promise)).toHaveProperty("status", "fulfilled");
      expect(onStartCallback).toHaveBeenCalled();
      expect(onEndCallback).toHaveBeenCalled();
    });

    it("should return a promise that resolves after 0s transition", async () => {
      const testDuration = "0s"; // shadows the outer testDuration
      const testTransition = `${testProp} ${testDuration} ease 0s`;

      element.style.transition = testTransition;
      window.document.body.append(element);
      mockGetComputedStyleFor(element, {
        transition: testTransition,
        transitionDuration: testDuration,
        transitionProperty: testProp,
      });

      const promise = whenTransitionDone(element, testProp, onStartCallback, onEndCallback);
      element.style.opacity = "0";
      expect(await promiseState(promise)).toHaveProperty("status", "pending");
      await waitForAnimationFrame();
      expect(onStartCallback).toHaveBeenCalled();
      await waitForAnimationFrame();
      expect(onEndCallback).toHaveBeenCalled();

      expect(await promiseState(promise)).toHaveProperty("status", "fulfilled");
    });

    it("should return a promise that resolves when called and transition has not started when expected", async () => {
      const testTransition = `${testProp} ${testDuration} ease 0s`;

      element.style.transition = testTransition;
      window.document.body.append(element);
      mockGetComputedStyleFor(element, {
        transition: testTransition,
        transitionDuration: testDuration,
        transitionProperty: testProp,
      });

      const promise = whenTransitionDone(element, testProp, onStartCallback, onEndCallback);
      element.style.opacity = "0";
      expect(await promiseState(promise)).toHaveProperty("status", "pending");
      expect(onStartCallback).not.toHaveBeenCalled();
      expect(onEndCallback).not.toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(resolve, 500));

      expect(await promiseState(promise)).toHaveProperty("status", "fulfilled");
      await waitForAnimationFrame();
      expect(onStartCallback).toHaveBeenCalled();
      await waitForAnimationFrame();
      expect(onEndCallback).toHaveBeenCalled();
    });
  });

  describe("whenAnimationDone", () => {
    const testAnimationName = "fade";
    const testDuration = "0.5s";

    let element: HTMLDivElement;
    let dispatchAnimationEvent: AnimationEventDispatcher;
    let onStartCallback: Mock;
    let onEndCallback: Mock;

    beforeEach(() => {
      dispatchAnimationEvent = createAnimationEventDispatcher();
      element = window.document.createElement("div");
      onStartCallback = vi.fn();
      onEndCallback = vi.fn();
    });

    it("should return a promise that resolves after the animation", async () => {
      const testAnimation = `${testAnimationName} ${testDuration} ease 0s`;

      element.style.animation = testAnimation;
      window.document.body.append(element);
      mockGetComputedStyleFor(element, {
        animation: testAnimation,
        animationDuration: testDuration,
        animationName: testAnimationName,
      });

      const promise = whenAnimationDone(element, testAnimationName, onStartCallback, onEndCallback);
      element.style.animationName = "none";

      expect(await promiseState(promise)).toHaveProperty("status", "pending");
      expect(onStartCallback).not.toHaveBeenCalled();
      expect(onEndCallback).not.toHaveBeenCalled();

      dispatchAnimationEvent(element, "animationstart", testAnimationName);

      expect(await promiseState(promise)).toHaveProperty("status", "pending");
      expect(onStartCallback).toHaveBeenCalled();
      expect(onEndCallback).not.toHaveBeenCalled();

      dispatchAnimationEvent(element, "animationend", testAnimationName);

      expect(await promiseState(promise)).toHaveProperty("status", "pending");
      expect(onStartCallback).toHaveBeenCalled();
      expect(onEndCallback).toHaveBeenCalled();

      expect(await promiseState(promise)).toHaveProperty("status", "fulfilled");
      expect(onStartCallback).toHaveBeenCalled();
      expect(onEndCallback).toHaveBeenCalled();
    });

    it("should return a promise that resolves after 0s animation", async () => {
      const testDuration = "0s"; // shadows the outer testDuration
      const testAnimation = `${testAnimationName} ${testDuration} ease 0s`;

      element.style.animation = testAnimation;
      window.document.body.append(element);
      mockGetComputedStyleFor(element, {
        animation: testAnimation,
        animationDuration: testDuration,
        animationName: testAnimationName,
      });

      const promise = whenAnimationDone(element, testAnimationName, onStartCallback, onEndCallback);
      element.style.animationName = "none";
      expect(await promiseState(promise)).toHaveProperty("status", "pending");
      await waitForAnimationFrame();
      expect(onStartCallback).toHaveBeenCalled();
      await waitForAnimationFrame();
      expect(onEndCallback).toHaveBeenCalled();

      expect(await promiseState(promise)).toHaveProperty("status", "fulfilled");
    });

    it("should return a promise that resolves when called and animation has not started when expected", async () => {
      const testAnimation = `${testAnimationName} ${testDuration} ease 0s`;

      element.style.animation = testAnimation;
      window.document.body.append(element);
      mockGetComputedStyleFor(element, {
        animation: testAnimation,
        animationDuration: testDuration,
        animationName: testAnimationName,
      });

      const promise = whenAnimationDone(element, testAnimationName, onStartCallback, onEndCallback);
      element.style.animationName = "none";
      expect(await promiseState(promise)).toHaveProperty("status", "pending");
      expect(onStartCallback).not.toHaveBeenCalled();
      expect(onEndCallback).not.toHaveBeenCalled();

      await new Promise((resolve) => setTimeout(resolve, 500));

      expect(await promiseState(promise)).toHaveProperty("status", "fulfilled");
      await waitForAnimationFrame();
      expect(onStartCallback).toHaveBeenCalled();
      await waitForAnimationFrame();
      expect(onEndCallback).toHaveBeenCalled();
    });
  });
});
