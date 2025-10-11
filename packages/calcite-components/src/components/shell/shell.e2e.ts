import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, hidden, renders, slots, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { getFocusedElementProp } from "../../tests/utils/puppeteer";
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
        <calcite-shell-panel slot="${SLOTS.panelBottom}">
          <p>Bottom panel content</p>
        </calcite-shell-panel>
        <calcite-shell-panel slot="${SLOTS.panelTop}">
          <p>Top panel content</p>
        </calcite-shell-panel>
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
        <calcite-shell-panel slot="${SLOTS.panelBottom}">
          <p>Bottom panel content</p>
        </calcite-shell-panel>
        <calcite-shell-panel slot="${SLOTS.panelTop}">
          <p>Top panel content</p>
        </calcite-shell-panel>
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

      const openEventSpy = await block.spyOnEvent("calciteBlockOpen");
      await block.click();
      await openEventSpy.next();

      expect(await block.getProperty("expanded")).toBe(true);
      expect(await getFocusedElementProp(page, "id")).toEqual(block.id);
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

      const openEventSpy = await block.spyOnEvent("calciteBlockOpen");
      await block.click();
      await openEventSpy.next();

      expect(await block.getProperty("expanded")).toBe(true);
      expect(await getFocusedElementProp(page, "id")).toEqual(block.id);
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
          ],
        },
      );
    });
  });
});
