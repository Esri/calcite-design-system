import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders } from "../../tests/commonTests";

describe("calcite-sortable-list", () => {
  it("renders", async () => renders("calcite-sortable-list"));

  it("honors hidden attribute", async () => hidden("calcite-sortable-list"));

  it("is accessible", async () =>
    accessible(`<calcite-sortable-list></calcite-sortable-list>`));

  describe("drag and drop", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`<calcite-sortable-list>
        <div id="one"><calcite-handle></calcite-handle>1</div>
        <div id="two"><calcite-handle></calcite-handle>2</div>
        <div id="three"><calcite-handle></calcite-handle>3</div>
      </calcite-sortable-list>`);
    });
    it.skip("works using a mouse", async () => {
      // TODO: remove skip once https://github.com/GoogleChrome/puppeteer/issues/1376 addressed
      const itemBoundingBox = await page.evaluate(() => {
        const { left, top, width, height } = document
          .querySelector(`#one`)
          .getBoundingClientRect();
        return { left, top, width, height };
      });
      const handleBoundingBox = await page.evaluate(() => {
        const { left, top, width, height } = document
          .querySelector(`#one calcite-handle`)
          .shadowRoot.querySelector(`button`)
          .getBoundingClientRect();
        return { left, top, width, height };
      });
      const xCenter = handleBoundingBox.left + handleBoundingBox.width / 2;
      const yCenter = handleBoundingBox.top + handleBoundingBox.height / 2;
      await page.mouse.move(xCenter, yCenter);
      await page.mouse.down();
      await page.mouse.move(xCenter, yCenter + itemBoundingBox.height + 2);
      await page.mouse.up();

      // position in DOM of first and second item should be flipped
      const itemsAfter = await page.findAll("div");
      expect(await itemsAfter[0].getProperty("id")).toBe("two");
      expect(await itemsAfter[1].getProperty("id")).toBe("one");
    });

    it("works using a keyboard", async () => {
      page.keyboard.press("Tab");
      page.keyboard.press("Space");
      await page.waitForChanges();
      page.keyboard.press("ArrowDown");
      const itemsAfter = await page.findAll("div");
      expect(await itemsAfter[0].getProperty("id")).toBe("two");
      expect(await itemsAfter[1].getProperty("id")).toBe("one");
    });
  });
});
