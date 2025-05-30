import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, hidden, renders, slots, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { mockConsole } from "../../tests/utils/logging";
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

  it("should set 'layout' and 'position' on slotted panels", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-shell>
        <calcite-shell-panel slot="${SLOTS.panelStart}" position="start">
          <p>Start Content</p>
        </calcite-shell-panel>
        <calcite-shell-panel slot="${SLOTS.panelEnd}" position="end">
          <p>End Content</p>
        </calcite-shell-panel>
        <calcite-shell-panel slot="${SLOTS.panelBottom}" position="start">
          <p>Bottom Content</p>
        </calcite-shell-panel>
        <calcite-shell-panel slot="${SLOTS.panelTop}" position="end">
          <p>Top Content</p>
        </calcite-shell-panel>
      </calcite-shell>`,
    );

    await page.waitForChanges();

    const startPanel = await page.find(`[slot="${SLOTS.panelStart}"]`);
    expect(await startPanel.getProperty("position")).toBe("start");
    expect(await startPanel.getProperty("layout")).toBe("vertical");

    const endPanel = await page.find(`[slot="${SLOTS.panelEnd}"]`);
    expect(await endPanel.getProperty("position")).toBe("end");
    expect(await endPanel.getProperty("layout")).toBe("vertical");

    const bottomPanel = await page.find(`[slot="${SLOTS.panelBottom}"]`);
    expect(await bottomPanel.getProperty("position")).toBe("end");
    expect(await bottomPanel.getProperty("layout")).toBe("horizontal");

    const topPanel = await page.find(`[slot="${SLOTS.panelTop}"]`);
    expect(await topPanel.getProperty("position")).toBe("start");
    expect(await topPanel.getProperty("layout")).toBe("horizontal");
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

  it("should position panel-bottom slot at content's bottom when no other panels exist", async () => {
    const page = await newE2EPage();

    await page.setContent(
      html`<calcite-shell>
        <calcite-shell-panel slot="${SLOTS.panelBottom}" display-mode="float" layout="horizontal">
          <p>Primary Content</p>
        </calcite-shell-panel>
      </calcite-shell>`,
    );

    await page.waitForChanges();

    const contentBottom = await page.find(`calcite-shell >>> .${CSS.contentBottom}`);

    expect(contentBottom).not.toBeNull();
  });

  describe("embedded", () => {
    mockConsole();

    it("sheet embedded in shell slot does not prevent interaction with page content outside slot", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html` <calcite-shell>
          <calcite-shell-panel slot="panel-start">
            <calcite-panel heading="Example">
              <calcite-block heading="Example" collapsible id="example-block"></calcite-block>
            </calcite-panel>
          </calcite-shell-panel>
          <calcite-panel heading="Content">
            <calcite-shell style="position:relative">
              <calcite-sheet slot="sheets" open>
                <calcite-panel heading="Sheet"></calcite-panel>
              </calcite-sheet>
            </calcite-shell>
          </calcite-panel>
        </calcite-shell>`,
      );
      const block = await page.find("calcite-block");
      block.click();
      await page.waitForChanges();
      expect(await block.getProperty("expanded")).toBe(true);
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(block.id);
    });

    it("modal dialog embedded in shell slot does not prevent interaction with page content outside slot", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html` <calcite-shell>
          <calcite-shell-panel slot="panel-start">
            <calcite-panel heading="Example">
              <calcite-block heading="Example" collapsible></calcite-block>
            </calcite-panel>
          </calcite-shell-panel>
          <calcite-panel heading="Content">
            <calcite-shell style="position:relative">
              <calcite-dialog heading="Dialog" slot="dialogs" open modal></calcite-dialog>
            </calcite-shell>
          </calcite-panel>
        </calcite-shell>`,
      );
      const block = await page.find("calcite-block");

      block.click();
      await page.waitForChanges();
      expect(await block.getProperty("expanded")).toBe(true);
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(block.id);
    });

    it("deprecated modal embedded in shell slot does not prevent interaction with page content outside slot", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html` <calcite-shell>
          <calcite-shell-panel slot="panel-start">
            <calcite-panel heading="Example">
              <calcite-block heading="Example" collapsible id="example-block"></calcite-block>
            </calcite-panel>
          </calcite-shell-panel>
          <calcite-panel heading="Content">
            <calcite-shell style="position:relative">
              <calcite-modal slot="modals" open>
                <calcite-panel heading="Modal"></calcite-panel>
              </calcite-modal>
            </calcite-shell>
          </calcite-panel>
        </calcite-shell>`,
      );
      const block = await page.find("calcite-block");
      block.click();
      await page.waitForChanges();
      expect(await block.getProperty("expanded")).toBe(true);
      expect(await page.evaluate(() => document.activeElement.id)).toEqual(block.id);
    });
  });

  describe("theme", () => {
    describe("default", () => {
      mockConsole();

      themed(
        html`<calcite-shell>
          <calcite-panel slot="panel-start" heading="Example">Hello world</calcite-panel>
          <calcite-flow slot="panel-end">
            <calcite-flow-item heading="Example">Hello world</calcite-flow-item>
          </calcite-flow>
          <calcite-shell-center-row slot="center-row">Hello world </calcite-shell-center-row>
        </calcite-shell>`,
        {
          "--calcite-shell-border-color": [
            {
              targetProp: "borderColor",
              selector: "calcite-panel",
            },
            {
              targetProp: "borderColor",
              selector: "calcite-flow",
            },
            {
              targetProp: "borderColor",
              selector: "calcite-shell-center-row",
            },
          ],
        },
      );
    });
    describe("deprecated", () => {
      themed(
        html` <calcite-shell
          ><calcite-tip-manager slot="center-row" id="tip-manager" hidden>
            <calcite-tip heading="The lack of imagery">
              <p>This tip has no image. As such, the content area will take up the entire width of the tip.</p>
              <p>
                This is the next paragraph and should show how wide the content area is now. Of course, the width of the
                overall tip will affect things. In astronomy, the terms object and body are often used interchangeably.
              </p>
              <a href="http://www.esri.com">View Esri</a>
            </calcite-tip>
          </calcite-tip-manager>
        </calcite-shell>`,
        {
          "--calcite-shell-tip-spacing": {
            targetProp: "insetInline",
            selector: "calcite-tip-manager",
          },
        },
      );
    });
  });
});
