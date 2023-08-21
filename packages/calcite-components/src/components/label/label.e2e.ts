import { newE2EPage } from "@stencil/core/testing";
import { renders, hidden } from "../../tests/commonTests";

describe("calcite-label", () => {
  describe("renders", () => {
    renders("calcite-label", { display: "flex" });
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-label");
    expect(element).toEqualAttribute("layout", "default");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label layout="inline-space-between">
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-label");
    expect(element).toEqualAttribute("layout", "inline-space-between");
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-label");
  });

  describe("alignment prop", () => {
    let page;
    let element;
    let style;

    describe("default behavior", () => {
      it("should render with 'start' alignment", async () => {
        page = await newE2EPage({
          html: `<calcite-label>Label text
          <calcite-input></calcite-input>
          </calcite-label>`,
        });
        element = await page.find("calcite-label");
        expect(await element.getProperty("alignment")).toEqual("start");
      });

      describe("when in a center-aligned container", () => {
        describe("when direction is left-to-right", () => {
          it("should render text left-aligned", async () => {
            page = await newE2EPage({
              html: `<div style="text-align: center;">
              <calcite-label dir="ltr">Label text
              <calcite-input></calcite-input>
              </calcite-label>
              </div>`,
            });
            element = await page.find("calcite-label >>> .container");
            style = await element.getComputedStyle();
            expect(style["textAlign"]).toEqual("start");
          });
        });

        describe("when direction is right-to-left", () => {
          it("should render text right-aligned", async () => {
            page = await newE2EPage({
              html: `<div style="text-align: center;">
              <calcite-label dir="rtl">Label text
              <calcite-input></calcite-input>
              </calcite-label>
              </div>`,
            });
            element = await page.find("calcite-label >>> .container");
            style = await element.getComputedStyle();
            expect(style["textAlign"]).toEqual("start");
          });
        });
      });
    });

    describe("when alignment prop is provided", () => {
      describe("'center' alignment", () => {
        it("should render text center-aligned", async () => {
          page = await newE2EPage({
            html: `<calcite-label alignment="center">Label text
            <calcite-input></calcite-input>
            </calcite-label>`,
          });
          element = await page.find("calcite-label >>> .container");
          style = await element.getComputedStyle();
          expect(style["textAlign"]).toEqual("center");
        });
      });

      describe("'end' alignment", () => {
        describe("when direction is left-to-right", () => {
          it("should render text right-aligned", async () => {
            page = await newE2EPage({
              html: `<calcite-label alignment="end" dir="ltr">Label text
              <calcite-input></calcite-input>
              </calcite-label>`,
            });
            element = await page.find("calcite-label >>> .container");
            style = await element.getComputedStyle();
            expect(style["textAlign"]).toEqual("end");
          });
        });

        describe("when direction is right-to-left", () => {
          it("should render text left-aligned", async () => {
            page = await newE2EPage({
              html: `<calcite-label alignment="end" dir="rtl">Label text
              <calcite-input></calcite-input>
              </calcite-label>`,
            });
            element = await page.find("calcite-label >>> .container");
            style = await element.getComputedStyle();
            expect(style["textAlign"]).toEqual("end");
          });
        });
      });
    });
  });

  it("does not pass id to child label element", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label id="do-not-duplicate-me" layout="inline-space-between">
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-label");
    const childElement = await page.find("calcite-label >>> .container");
    expect(element).toEqualAttribute("id", "do-not-duplicate-me");
    expect(childElement).not.toHaveAttribute("id");
    expect(element).toEqualAttribute("layout", "inline-space-between");
  });

  // TODO: need shadow DOM equivalent update on helper
  it("clicking sibling label focuses input when both are inside a shadowRoot", async () => {
    const page = await newE2EPage();

    await page.evaluate(() => {
      document.addEventListener("calciteInputFocus", (event: CustomEvent): void => {
        (window as any).eventDetail = event.detail;
      });
    });

    await page.evaluate(() => {
      class ShadowComponent extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML = `
            <calcite-label for="input">Label</calcite-label>
            <calcite-input id="input"></calcite-input>
          `;
        }
      }

      customElements.define("shadow-component", ShadowComponent);

      const shadowComponent = document.createElement("shadow-component");
      document.body.appendChild(shadowComponent);

      shadowComponent.shadowRoot.querySelector("calcite-label").click();
    });

    const eventDetail: any = await page.evaluateHandle(() => (window as any).eventDetail);

    expect(eventDetail).toBeTruthy();
  });
});
