import { ModeName } from "../../src/components/interfaces";
import { html } from "../../support/formatting";
import {
  ensureId,
  focusElementInGroup,
  getElementProp,
  getModeName,
  getSlotted,
  isPrimaryPointerButton,
  setRequestedIcon,
  slotChangeGetAssignedElements,
  slotChangeHasAssignedElement,
  toAriaBoolean,
  getShadowRootNode,
  slotChangeGetTextContent,
  slotChangeGetAssignedNodes,
  slotChangeHasAssignedNode,
  slotChangeHasTextContent,
  slotChangeHasContent,
  isBefore,
} from "./dom";
import { guidPattern } from "./guid.spec";

describe("dom", () => {
  describe("getElementProp()", () => {
    describe("light DOM", () => {
      it("returns match if found on self", async () => {
        document.body.innerHTML = `
        <div>
          <div>
            <div id="test" test-prop="self"></div>
          </div>
        </div>
      `;

        expect(getElementProp(document.getElementById("test"), "test-prop", "not-found")).toBe("self");
      });

      it("returns first ancestral match", async () => {
        document.body.innerHTML = `
        <div test-prop="root">
          <div>
            <div id="test" ></div>
          </div>
        </div>
      `;

        expect(getElementProp(document.getElementById("test"), "test-prop", "not-found")).toBe("root");
      });

      it("returns fallback if no match is found", async () => {
        document.body.innerHTML = `
        <div>
          <div>
            <div id="test"></div>
          </div>
        </div>
      `;

        expect(getElementProp(document.getElementById("test"), "test-prop", "not-found")).toBe("not-found");
      });
    });

    describe("shadow DOM boundaries", () => {
      function defineTestComponents(): void {
        class PropLookupParentTest extends HTMLElement {
          constructor() {
            super();
            this.attachShadow({ mode: "open" });
          }

          connectedCallback(): void {
            this.shadowRoot.innerHTML = `<prop-lookup-child-test></prop-lookup-child-test>`;
          }
        }

        class PropLookupChildTest extends HTMLElement {
          constructor() {
            super();
            this.attachShadow({ mode: "open" });
          }

          connectedCallback(): void {
            this.shadowRoot.innerHTML = "<div>😄</div>";
          }
        }

        customElements.define("prop-lookup-parent-test", PropLookupParentTest);
        customElements.define("prop-lookup-child-test", PropLookupChildTest);
      }

      beforeEach(defineTestComponents);

      it("does not cross shadow DOM boundary (default)", () => {
        document.body.innerHTML = `
        <prop-lookup-parent-test id="test" test-prop="parent"></prop-lookup-parent-test>
      `;

        expect(
          getElementProp(document.getElementById("test").shadowRoot.firstElementChild, "test-prop", "not-found"),
        ).toBe("not-found");
      });
    });
  });

  describe("getSlotted()", () => {
    const testSlotName = "test";
    const testSlotName2 = "test2";

    function getTestComponent(): HTMLElement {
      return document.body.querySelector("slot-test");
    }

    function defineTestComponents() {
      class SlotTest extends HTMLElement {
        constructor() {
          super();
          this.attachShadow({ mode: "open" });
        }

        connectedCallback(): void {
          this.shadowRoot.innerHTML = html`
            <slot name="${testSlotName}"></slot>
            <slot name="${testSlotName2}"></slot>
            <slot></slot>
          `;
        }
      }

      customElements.define("slot-test", SlotTest);
    }

    beforeEach(() => {
      defineTestComponents();

      document.body.innerHTML = `
      <slot-test>
        <h2 slot=${testSlotName}>
          <span>😃</span>
          <span>🙂</span>
        </h2>
        <h2 slot=${testSlotName}><span>😂</span></h2>
        <h3 slot=${testSlotName2}><span>😂</span></h3>
        <div id="default-slot-el"><p>🙂</p></div>
      </slot-test>
    `;
    });

    describe("single slotted", () => {
      it("returns elements with matching default slot", () => expect(getSlotted(getTestComponent())).toBeTruthy());

      it("returns elements with matching slot name", () =>
        expect(getSlotted(getTestComponent(), testSlotName)).toBeTruthy());

      it("returns elements with matching slot names", () =>
        expect(getSlotted(getTestComponent(), [testSlotName, testSlotName2])).toBeTruthy());

      it("returns null when no results", () => expect(getSlotted(getTestComponent(), "non-existent-slot")).toBeNull());

      describe("scoped selector", () => {
        it("returns element with matching default slot", () =>
          expect(getSlotted(getTestComponent(), { selector: "p" })).toBeTruthy());

        it("returns element with matching nested selector", () =>
          expect(getSlotted(getTestComponent(), testSlotName, { selector: "span" })).toBeTruthy());

        it("returns nothing with non-matching child selector", () =>
          expect(
            getSlotted(getTestComponent(), testSlotName, {
              selector: "non-existent-slot",
            }),
          ).toBeNull());
      });

      describe("direct slotted children", () => {
        it("returns element if slot is child of element", () => {
          document.body.innerHTML = `
            <slot-test>
              <h2 slot=${testSlotName}><span>😂</span></h2>
              <some-other-element>
                <h2 slot=${testSlotName}><span>🙃</span></h2>
              </some-other-element>
            </slot-test>
          `;

          expect(
            getSlotted(getTestComponent(), testSlotName, {
              direct: true,
            }),
          ).toBeTruthy();
        });

        it("returns null if slot is nested", () => {
          document.body.innerHTML = `
            <slot-test>
              <some-other-element>
                <h2 slot=${testSlotName}><span>🙃</span></h2>
              </some-other-element>
            </slot-test>
          `;

          expect(
            getSlotted(getTestComponent(), testSlotName, {
              all: true,
              direct: true,
            }),
          ).toBeTruthy();
        });
      });
    });

    describe("multiple slotted", () => {
      it("returns element with default slot name", () =>
        expect(getSlotted(getTestComponent(), { all: true })).toHaveLength(1));

      it("returns elements with matching slot name", () =>
        expect(getSlotted(getTestComponent(), testSlotName, { all: true })).toHaveLength(2));

      it("returns elements with matching slot names", () =>
        expect(
          getSlotted(getTestComponent(), [testSlotName, testSlotName2], {
            all: true,
          }),
        ).toHaveLength(3));

      it("returns empty list when no results", () =>
        expect(getSlotted(getTestComponent(), "non-existent-slot", { all: true })).toHaveLength(0));

      describe("scoped selector", () => {
        it("returns child elements matching selector", () =>
          expect(
            getSlotted(getTestComponent(), testSlotName, {
              all: true,
              selector: "span",
            }),
          ).toHaveLength(3));

        it("returns empty list with non-matching child selector", () =>
          expect(
            getSlotted(getTestComponent(), testSlotName, {
              all: true,
              selector: "non-existent",
            }),
          ).toHaveLength(0));
      });

      describe("direct slotted children", () => {
        it("returns child elements if children are direct descendants", () => {
          document.body.innerHTML = `
            <slot-test>
              <h2 slot=${testSlotName}><span>😃</span></h2>
              <some-other-element>
                <h2 slot=${testSlotName}><span>🙃</span></h2>
              </some-other-element>
            </slot-test>
          `;

          expect(
            getSlotted(getTestComponent(), testSlotName, {
              all: true,
              direct: true,
            }),
          ).toHaveLength(1);
        });

        it("returns empty list if children are nested", () => {
          document.body.innerHTML = `
            <slot-test>
              <some-other-element>
                <h2 slot=${testSlotName}><span>😃</span></h2>
                <h2 slot=${testSlotName}><span>🙃</span></h2>
              </some-other-element>
            </slot-test>
          `;

          expect(
            getSlotted(getTestComponent(), testSlotName, {
              all: true,
              direct: true,
            }),
          ).toHaveLength(0);
        });
      });
    });
  });

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
    beforeEach(() => {
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

  describe("slotChangeGetAssignedElements()", () => {
    it("handles slotted elements", () => {
      const target = document.createElement("slot");
      target.assignedElements = () => [document.createElement("div"), document.createElement("div")];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeGetAssignedElements(event)).toHaveLength(2);
    });

    it("handles no slotted elements", () => {
      const target = document.createElement("slot");
      target.assignedElements = () => [];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeGetAssignedElements(event)).toHaveLength(0);
    });
  });

  describe("slotChangeHasAssignedElement()", () => {
    it("handles slotted elements", () => {
      const target = document.createElement("slot");
      target.assignedElements = () => [document.createElement("div"), document.createElement("div")];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeHasAssignedElement(event)).toBe(true);
    });

    it("handles no slotted elements", () => {
      const target = document.createElement("slot");
      target.assignedElements = () => [];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeHasAssignedElement(event)).toBe(false);
    });
  });

  describe("slotChangeHasAssignedNode()", () => {
    it("handles slotted nodes", () => {
      const target = document.createElement("slot");
      target.assignedNodes = () => [document.createTextNode("hello"), document.createTextNode("world")];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeHasAssignedNode(event)).toBe(true);
    });

    it("handles no slotted nodes", () => {
      const target = document.createElement("slot");
      target.assignedNodes = () => [];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeHasAssignedNode(event)).toBe(false);
    });
  });

  describe("slotChangeGetAssignedNodes()", () => {
    it("handles slotted nodes", () => {
      const target = document.createElement("slot");
      target.assignedNodes = () => [document.createTextNode("hello"), document.createTextNode("world")];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeGetAssignedNodes(event)).toHaveLength(2);
    });

    it("handles no slotted nodes", () => {
      const target = document.createElement("slot");
      target.assignedNodes = () => [];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeGetAssignedNodes(event)).toHaveLength(0);
    });
  });

  describe("slotChangeGetTextContent()", () => {
    it("handles slotted nodes", () => {
      const target = document.createElement("slot");
      target.assignedNodes = () => [document.createTextNode("hello"), document.createTextNode("world")];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeGetTextContent(event)).toEqual("helloworld");
    });

    it("handles no slotted nodes", () => {
      const target = document.createElement("slot");
      target.assignedNodes = () => [];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeGetTextContent(event)).toEqual("");
    });
  });

  describe("slotChangeHasContent()", () => {
    it("handles slotted nodes", () => {
      const target = document.createElement("slot");
      target.assignedNodes = () => [document.createTextNode("hello")];
      target.assignedElements = () => [];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeHasContent(event)).toEqual(true);
    });

    it("handles slotted elements", () => {
      const target = document.createElement("slot");
      target.assignedNodes = () => [];
      target.assignedElements = () => [document.createElement("div")];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeHasContent(event)).toEqual(true);
    });

    it("handles no slotted nodes or elements", () => {
      const target = document.createElement("slot");
      target.assignedNodes = () => [];
      target.assignedElements = () => [];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeHasContent(event)).toEqual(false);
    });
  });

  describe("slotChangeHasTextContent()", () => {
    it("handles slotted nodes", () => {
      const target = document.createElement("slot");
      target.assignedNodes = () => [document.createTextNode("hello"), document.createTextNode("world")];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeHasTextContent(event)).toEqual(true);
    });

    it("handles no slotted nodes", () => {
      const target = document.createElement("slot");
      target.assignedNodes = () => [];
      const event = new Event("onSlotchange");
      target.dispatchEvent(event);
      expect(slotChangeHasTextContent(event)).toEqual(false);
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
    beforeEach(() => {
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
});
