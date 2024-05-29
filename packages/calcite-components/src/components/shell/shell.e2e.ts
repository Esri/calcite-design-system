import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders, slots, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { ComponentTestTokens } from "../../tests/commonTests/themed";
import { CSS, SLOTS } from "./resources";

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

describe("theme", () => {
  const shellHtml = html` <calcite-shell content-behind>
    <header slot="header">
      <h2>My Shell Header</h2>
    </header>
    <calcite-shell-panel slot="panel-start">
      <calcite-panel heading="Leading panel content">
        <div>Content</div>
      </calcite-panel>
    </calcite-shell-panel>
    <calcite-panel heading="Leading panel content">
      <div>Content</div>
    </calcite-panel>
    <calcite-tip-manager slot="center-row">
      <calcite-tip-group group-title="Astronomy">
        <calcite-tip heading="The Red Rocks and Blue Water">
          <p>This tip is how a tip should really look.</p>
        </calcite-tip>
      </calcite-tip-group>
    </calcite-tip-manager>
    <footer slot="footer">My Shell Footer</footer>
  </calcite-shell>`;
  describe("default", () => {
    const tokens: ComponentTestTokens = {
      "--calcite-shell-background-color": {
        targetProp: "backgroundColor",
      },
      "--calcite-shell-border-color": {
        // shadowSelector: `calcite-shell-panel calcite-panel`,
        targetProp: "borderColor",
      },
    };
    themed(shellHtml, tokens);
  });
});
