import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, disabled, focusable, hidden, renders, slots } from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";

describe("calcite-flow-item", () => {
  it("renders", async () => renders("calcite-flow-item", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-flow-item"));

  it("has property defaults", async () =>
    defaults("calcite-flow-item", [
      {
        propertyName: "closable",
        defaultValue: false
      },
      {
        propertyName: "closed",
        defaultValue: false
      },
      {
        propertyName: "disabled",
        defaultValue: false
      },
      {
        propertyName: "loading",
        defaultValue: false
      },
      {
        propertyName: "menuOpen",
        defaultValue: false
      },
      {
        propertyName: "showBackButton",
        defaultValue: false
      }
    ]));

  it("has slots", () => slots("calcite-flow-item", SLOTS));

  it("can be disabled", () => disabled(`<calcite-flow-item closable>scrolling content</calcite-flow-item>`));

  it("should be accessible", async () =>
    accessible(`
    <calcite-flow-item>
      <div slot="${SLOTS.headerActionsStart}">test start</div>
      <div slot="${SLOTS.headerContent}">test content</div>
      <div slot="${SLOTS.headerActionsEnd}">test end</div>
      <p>Content</p>
      <calcite-button slot="${SLOTS.footerActions}">test button 1</calcite-button>
      <calcite-button slot="${SLOTS.footerActions}">test button 2</calcite-button>
    </calcite-flow-item>
    `));

  it("should focus on back button", async () =>
    focusable(`<calcite-flow-item show-back-button>test</calcite-flow-item>`, {
      shadowFocusTargetSelector: "calcite-action"
    }));

  it("showBackButton", async () => {
    const page = await newE2EPage();

    await page.setContent("<calcite-flow-item></calcite-flow-item>");

    const element = await page.find("calcite-flow-item");

    const showBackButton = await element.getProperty("showBackButton");

    expect(showBackButton).toBe(false);

    const backButton = await page.find(`calcite-flow-item >>> .${CSS.backButton}`);

    expect(backButton).toBeNull();

    element.setProperty("showBackButton", true);

    await page.waitForChanges();

    const showBackButtonNew = await element.getProperty("showBackButton");

    expect(showBackButtonNew).toBe(true);

    const backButtonNew = await page.find(`calcite-flow-item >>> .${CSS.backButton}`);

    expect(backButtonNew).not.toBeNull();

    expect(await backButtonNew.isVisible()).toBe(true);

    const eventSpy = await page.spyOnEvent("calciteFlowItemBackClick", "window");

    await page.$eval("calcite-flow-item", (elm: HTMLElement) => {
      const nativeBackButton = elm.shadowRoot.querySelector(`calcite-action`);
      nativeBackButton.click();
    });

    expect(eventSpy).toHaveReceivedEvent();
  });
});
