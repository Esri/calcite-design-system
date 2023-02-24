import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders, slots } from "../../tests/commonTests";
import { CSS, SLOTS } from "./resources";

describe("calcite-shell", () => {
  it("renders", async () => renders("calcite-shell", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-shell"));

  it("has slots", () => slots("calcite-shell", SLOTS));

  it("content node should always be present", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-shell></calcite-shell>`);

    const content = await page.find(`calcite-shell >>> .${CSS.content}`);

    expect(content).not.toBeNull();
  });

  it("should be accessible", async () =>
    accessible(`
    <calcite-shell>
      <calcite-shell-panel slot="${SLOTS.panelStart}" position="start">
        <p>Primary Content</p>
      </calcite-shell-panel>
      <calcite-shell-panel slot="${SLOTS.panelEnd}" position="end">
        <p>Primary Content</p>
      </calcite-shell-panel>
    </calcite-shell>
    `));

  it("should place content behind", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-shell content-behind>
    <calcite-shell-panel slot="${SLOTS.panelStart}" position="end">
      <p>Primary Content</p>
    </calcite-shell-panel>
    <calcite-shell-panel slot="${SLOTS.panelEnd}" position="start">
      <p>Primary Content</p>
    </calcite-shell-panel>
  </calcite-shell>`);

    await page.waitForChanges();

    const mainReversed = await page.find(`calcite-shell >>> .${CSS.contentBehind}`);

    expect(mainReversed).not.toBeNull();
  });

  it("should place the center-row inside the content node when content-behind is false", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-shell>
    <calcite-shell-panel slot="${SLOTS.panelStart}" position="end">
      <p>Primary Content</p>
    </calcite-shell-panel>
    <calcite-shell-panel slot="${SLOTS.panelEnd}" position="start">
      <p>Primary Content</p>
    </calcite-shell-panel>
    <p>Main content</p>
    <calcite-shell-center-row slot="${SLOTS.centerRow}">
      <p>Center row content</p>
    </calcite-shell-center-row>
  </calcite-shell>`);

    await page.waitForChanges();

    const contentNode = await page.find(`calcite-shell >>> .${CSS.content}`);
    const centerRow = await contentNode.find(`slot[name="${SLOTS.centerRow}"]`);

    expect(centerRow).not.toBeNull();
  });

  it("should place the center-row outside the content node when content-behind is true", async () => {
    const page = await newE2EPage();

    await page.setContent(`<calcite-shell content-behind>
    <calcite-shell-panel slot="${SLOTS.panelStart}" position="end">
      <p>Primary Content</p>
    </calcite-shell-panel>
    <calcite-shell-panel slot="${SLOTS.panelEnd}" position="start">
      <p>Primary Content</p>
    </calcite-shell-panel>
    <p>Main content</p>
    <calcite-shell-center-row slot="${SLOTS.centerRow}">
      <p>Center row content</p>
    </calcite-shell-center-row>
  </calcite-shell>`);

    await page.waitForChanges();

    const contentNode = await page.find(`calcite-shell >>> .${CSS.content}`);
    const centerRow = await contentNode.find(`slot[name="${SLOTS.centerRow}"]`);

    expect(centerRow).toBeNull();
  });
});
