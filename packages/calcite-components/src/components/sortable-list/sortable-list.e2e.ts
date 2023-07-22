import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { accessible, disabled, hidden, renders } from "../../tests/commonTests";
import { dragAndDrop } from "../../tests/utils";
import { html } from "../../../support/formatting";

describe("calcite-sortable-list", () => {
  describe("renders", () => {
    renders("calcite-sortable-list", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-sortable-list");
  });

  describe("accessible", () => {
    accessible(`<calcite-sortable-list></calcite-sortable-list>`);
  });

  describe("disabled", () => {
    disabled(
      html`<calcite-sortable-list>
        <div id="one"><calcite-handle></calcite-handle>1</div>
        <div id="two"><calcite-handle></calcite-handle>2</div>
        <div id="three"><calcite-handle></calcite-handle>3</div>
      </calcite-sortable-list>`,
      { focusTarget: "child" }
    );
  });

  const worksUsingMouse = async (page: E2EPage): Promise<void> => {
    await dragAndDrop(page, `#one calcite-handle`, `#two calcite-handle`);

    const [first, second] = await page.findAll("div");
    expect(await first.getProperty("id")).toBe("two");
    expect(await second.getProperty("id")).toBe("one");
  };

  const worksUsingKeyboard = async (page: E2EPage): Promise<void> => {
    await page.keyboard.press("Tab");
    await page.keyboard.press("Space");
    await page.waitForChanges();
    await page.keyboard.press("ArrowDown");
    const itemsAfter = await page.findAll("div");
    expect(await itemsAfter[0].getProperty("id")).toBe("two");
    expect(await itemsAfter[1].getProperty("id")).toBe("one");
  };

  describe("drag and drop", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage({
        html: `<calcite-sortable-list>
        <div id="one"><calcite-handle></calcite-handle>1</div>
        <div id="two"><calcite-handle></calcite-handle>2</div>
        <div id="three"><calcite-handle></calcite-handle>3</div>
      </calcite-sortable-list>`,
      });
    });

    it("works using a mouse", () => worksUsingMouse(page));

    it("works using a keyboard", () => worksUsingKeyboard(page));
  });

  describe("drag and drop with dragSelector", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage({
        html: `<calcite-sortable-list drag-selector=".calcite-sortable">
        <div class="calcite-sortable" id="one"><calcite-handle></calcite-handle>1</div>
        <div class="calcite-sortable" id="two"><calcite-handle></calcite-handle>2</div>
        <div class="calcite-sortable" id="three"><calcite-handle></calcite-handle>3</div>
      </calcite-sortable-list>`,
      });
    });

    it("works using a mouse", () => worksUsingMouse(page));

    it("works using a keyboard", () => worksUsingKeyboard(page));
  });
});
