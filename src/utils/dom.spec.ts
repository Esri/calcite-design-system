import { getElementProp, getSlotted, setRequestedIcon, ensureId } from "./dom";
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

      it("can cross shadow DOM boundary", async () => {
        document.body.innerHTML = `
        <prop-lookup-parent-test id="test" test-prop="parent"></prop-lookup-parent-test>
      `;

        expect(
          getElementProp(document.getElementById("test").shadowRoot.firstElementChild, "test-prop", "not-found", true)
        ).toBe("parent");
      });

      it("does not cross shadow DOM boundary (default)", () => {
        document.body.innerHTML = `
        <prop-lookup-parent-test id="test" test-prop="parent"></prop-lookup-parent-test>
      `;

        expect(
          getElementProp(document.getElementById("test").shadowRoot.firstElementChild, "test-prop", "not-found")
        ).toBe("not-found");
      });
    });
  });

  describe("getSlotted()", () => {
    const testSlotName = "test";

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
          this.shadowRoot.innerHTML = `<slot name="${testSlotName}"></slot>`;
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
      </slot-test>
    `;
    });

    describe("single slotted", () => {
      it("returns elements with matching slot name", () =>
        expect(getSlotted(getTestComponent(), testSlotName)).toBeTruthy());

      it("returns null when no results", () => expect(getSlotted(getTestComponent(), "non-existent-slot")).toBeNull());

      describe("scoped selector", () => {
        it("returns element with matching nested selector", () =>
          expect(getSlotted(getTestComponent(), testSlotName, { selector: "span" })).toBeTruthy());

        it("returns nothing with non-matching child selector", () =>
          expect(
            getSlotted(getTestComponent(), testSlotName, {
              selector: "non-existent-slot"
            })
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
              direct: true
            })
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
              direct: true
            })
          ).toBeTruthy();
        });
      });
    });

    describe("multiple slotted", () => {
      it("returns elements with matching slot name", () =>
        expect(getSlotted(getTestComponent(), testSlotName, { all: true })).toHaveLength(2));

      it("returns empty list when no results", () =>
        expect(getSlotted(getTestComponent(), "non-existent-slot", { all: true })).toHaveLength(0));

      describe("scoped selector", () => {
        it("returns child elements matching selector", () =>
          expect(
            getSlotted(getTestComponent(), testSlotName, {
              all: true,
              selector: "span"
            })
          ).toHaveLength(3));

        it("returns empty list with non-matching child selector", () =>
          expect(
            getSlotted(getTestComponent(), testSlotName, {
              all: true,
              selector: "non-existent"
            })
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
              direct: true
            })
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
              direct: true
            })
          ).toHaveLength(0);
        });
      });
    });
  });

  describe("setRequestedIcon()", () => {
    it("returns the custom icon name if custom value is passed", () =>
      expect(setRequestedIcon({ exampleValue: "exampleReturnedValue" }, "mycustomvalue", "exampleValue")).toBe(
        "mycustomvalue"
      ));

    it("returns the pre-defined icon name if custom value is not passed", () =>
      expect(setRequestedIcon({ exampleValue: "exampleReturnedValue" }, "", "exampleValue")).toBe(
        "exampleReturnedValue"
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
});
