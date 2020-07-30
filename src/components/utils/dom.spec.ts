import { getSlotted } from "./dom";

describe("dom", () => {
  describe("getSlotted()", () => {
    const testSlotName = "test";

    function getTestComponent(): HTMLElement {
      return document.body.querySelector("slot-test");
    }

    beforeAll(() => {
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
    });

    beforeEach(() => {
      document.body.innerHTML = `
      <slot-test>
        <h2 slot=${testSlotName}><span>😃</span></h2>
        <h2 slot=${testSlotName}><span>😂</span></h2>
      </slot-test>
    `;
    });

    afterEach(() => {
      while (document.body.firstChild) {
        document.body.firstChild.remove();
      }
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
          ).toHaveLength(2));

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
});
