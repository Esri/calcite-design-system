import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders, slots } from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";
import { html } from "../../../support/formatting";

describe("calcite-shell", () => {
  describe("renders", () => {
    renders("calcite-shell", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-shell");
  });

  describe("slots", () => {
    slots("calcite-shell", SLOTS);
  });

  it("content node should always be present", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-shell></calcite-shell>`);

    const content = await page.find(`calcite-shell >>> .${CSS.content}`);

    expect(content).not.toBeNull();
  });

  describe("accessible", () => {
    accessible(html`
      <calcite-shell>
        <calcite-shell-panel slot="${SLOTS.panelStart}" position="start">
          <p>Primary Content</p>
        </calcite-shell-panel>
        <calcite-shell-panel slot="${SLOTS.panelEnd}" position="end">
          <p>Primary Content</p>
        </calcite-shell-panel>
      </calcite-shell>
    `);
  });

  it("should place content behind", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-shell content-behind>
        <calcite-shell-panel slot="${SLOTS.panelStart}" position="end">
          <p>Primary Content</p>
        </calcite-shell-panel>
        <calcite-shell-panel slot="${SLOTS.panelEnd}" position="start">
          <p>Primary Content</p>
        </calcite-shell-panel>
      </calcite-shell>`,
    );

    await page.waitForChanges();

    const mainReversed = await page.find(`calcite-shell >>> .${CSS.contentBehind}`);

    expect(mainReversed).not.toBeNull();
  });

  it("should place the panel-top and panel-bottom slots inside the content node when content-behind is false", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-shell>
        <calcite-shell-panel slot="${SLOTS.panelStart}" position="end">
          <p>Primary Content</p>
        </calcite-shell-panel>
        <calcite-shell-panel slot="${SLOTS.panelEnd}" position="start">
          <p>Primary Content</p>
        </calcite-shell-panel>
        <p>Main content</p>
        <calcite-shell-center-row slot="${SLOTS.panelBottom}">
          <p>Center row content</p>
        </calcite-shell-center-row>
        <calcite-shell-center-row slot="${SLOTS.panelTop}">
          <p>Center row content</p>
        </calcite-shell-center-row>
      </calcite-shell>`,
    );

    await page.waitForChanges();

    const contentNode = await page.find(`calcite-shell >>> .${CSS.content}`);
    const panelBottom = await contentNode.find(`slot[name="${SLOTS.panelBottom}"]`);
    expect(panelBottom).not.toBeNull();

    const panelTop = await contentNode.find(`slot[name="${SLOTS.panelTop}"]`);
    expect(panelTop).not.toBeNull();
  });

  it("should place the panel-top and panel-bottom slots outside the content node when content-behind is true", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-shell content-behind>
        <calcite-shell-panel slot="${SLOTS.panelStart}" position="end">
          <p>Primary Content</p>
        </calcite-shell-panel>
        <calcite-shell-panel slot="${SLOTS.panelEnd}" position="start">
          <p>Primary Content</p>
        </calcite-shell-panel>
        <p>Main content</p>
        <calcite-shell-center-row slot="${SLOTS.panelBottom}">
          <p>Center row content</p>
        </calcite-shell-center-row>
        <calcite-shell-center-row slot="${SLOTS.panelTop}">
          <p>Center row content</p>
        </calcite-shell-center-row>
      </calcite-shell>`,
    );

    await page.waitForChanges();

    const contentNode = await page.find(`calcite-shell >>> .${CSS.content}`);
    const panelBottom = await contentNode.find(`slot[name="${SLOTS.panelBottom}"]`);
    expect(panelBottom).toBeNull();

    const panelTop = await contentNode.find(`slot[name="${SLOTS.panelTop}"]`);
    expect(panelTop).toBeNull();
  });
});
