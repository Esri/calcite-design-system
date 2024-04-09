import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders, t9n } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-carousel", () => {
  describe("renders", () => {
    renders(
      `<calcite-carousel label="Carousel example"><calcite-carousel-item label="Slide 1"><p>basic render</p></calcite-carousel-item><calcite-carousel-item label="Slide 2"><p>basic render</p></calcite-carousel-item></calcite-carousel>`,
      {
        display: "flex",
      },
    );
  });

  describe("honors hidden attribute", () => {
    hidden(
      `<calcite-carousel hidden label="Carousel example"><calcite-carousel-item label="Slide 1"><p>basic render</p></calcite-carousel-item><calcite-carousel-item label="Slide 2"><p>basic render</p></calcite-carousel-item></calcite-carousel>`,
    );
  });

  describe("accessible", () => {
    accessible(
      `<calcite-carousel label="Carousel example"><calcite-carousel-item label="Slide 1"><p>basic render</p></calcite-carousel-item><calcite-carousel-item label="Slide 2"><p>basic render</p></calcite-carousel-item></calcite-carousel>`,
    );
  });

  describe("translation support", () => {
    t9n("calcite-combobox");
  });

  describe("first render", () => {
    it("should render", async () => {
      const page = await newE2EPage();

      await page.setContent(
        `<calcite-carousel label="Carousel example"><calcite-carousel-item label="Slide 1"><p>basic render</p></calcite-carousel-item><calcite-carousel-item label="Slide 2"><p>basic render</p></calcite-carousel-item></calcite-carousel>`,
      );
      const itemManager = await page.find("calcite-carousel");
      expect(itemManager).not.toBeNull();
      const isVisible = await itemManager.isVisible();
      expect(isVisible).toBe(true);
    });

    it("should pre-select the correct item if the selected attribute is set", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example">
          <calcite-carousel-item label="Slide 1" id="one"><p>no pre-selected attribute</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 2" id="two" selected><p>pre-selected and not first</p></calcite-carousel-item>
          <calcite-carousel-item label="Slide 3" id="three"><p>no pre-selected attribute</p></calcite-carousel-item>
        </calcite-carousel>`,
      );

      await page.waitForChanges();
      const itemManager = await page.find("calcite-carousel");
      const selectedItem = await itemManager.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
    });
  });

  describe("pagination", () => {
    it("should select the first item by default and change the selectedIndex when the previous or next buttons are clicked", async () => {
      const page = await newE2EPage({
        html: `<calcite-carousel label="Carousel example">
      <calcite-carousel-item label="Slide 1" id="one"><p>first item default selected</p></calcite-carousel-item>
      <calcite-carousel-item label="Slide 2" id="two"><p>next/prev behavior</p></calcite-carousel-item>
    </calcite-carousel>`,
      });

      await page.waitForChanges();

      const itemManager = await page.find("calcite-carousel");
      let selectedItem = await itemManager.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");

      const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);
      await nextButton.click();
      await page.waitForChanges();

      selectedItem = await itemManager.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");

      const previousButton = await page.find(`calcite-carousel >>> .${CSS.pagePrevious}`);
      await previousButton.click();
      await page.waitForChanges();

      selectedItem = await itemManager.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("one");
    });

    it("pagination should be hidden if there is 1 or fewer items", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example"><calcite-carousel-item label="Slide 1" id="one"><p>first item default selected</p></calcite-carousel-item></calcite-carousel>`,
      );

      const pagination = await page.find(`calcite-carousel >>> .${CSS.pagination}`);
      expect(pagination).toBeNull();
    });
  });

  describe("handling dom updates after initial render", () => {
    it("should update if items are added after initial load", async () => {
      const page = await newE2EPage({
        html: `<calcite-carousel label="Carousel example">
      <calcite-carousel-item label="Slide 1"><p>dynamically adding/removing items</p></calcite-carousel-item>
    </calcite-carousel>`,
      });

      const itemManager = await page.find("calcite-carousel");
      const newItemId = "newItem";
      await page.evaluate((newId) => {
        const mgr = document.querySelector("calcite-carousel");
        const newItem = mgr.querySelector("calcite-carousel-item:last-child").cloneNode(true);
        (newItem as HTMLElement).id = newId;
        mgr.appendChild(newItem);
      }, newItemId);
      await page.waitForChanges();

      const items = await page.findAll("calcite-carousel calcite-carousel-item");
      expect(items.length).toBe(2);

      const nextButton = await page.find(`calcite-carousel >>> .${CSS.pageNext}`);
      await nextButton.click();
      await page.waitForChanges();

      const selectedItem = await itemManager.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual(newItemId);
    });

    it("should update visible item if selected item is removed", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-carousel label="Carousel example">
          <calcite-carousel-item id="one"><p>dynamically adding/removing items</p></calcite-carousel-item>
          <calcite-carousel-item id="two"><p>dynamically adding/removing items</p></calcite-carousel-item>
        </calcite-carousel>`,
      );
      const itemManager = await page.find("calcite-carousel");

      await page.evaluate(() => {
        document.querySelector("calcite-carousel-item:first-child").remove();
      });
      await page.waitForChanges();

      const selectedItem = await itemManager.find(`calcite-carousel-item[selected]`);
      expect(selectedItem.id).toEqual("two");
    });
  });
});
