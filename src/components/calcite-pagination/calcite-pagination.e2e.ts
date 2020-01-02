import { newE2EPage } from "@stencil/core/testing";
import { accessible, hidden, renders } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-pagination", () => {
  it("renders", async () => renders("calcite-pagination"));
  it("honors hidden attribute", async () => hidden("calcite-pagination"));

  it("is accessible", async () => accessible( `<calcite-pagination></calcite-pagination>` ));

  describe('ellipsis rendering', () => {
    it("should render left ellipsis when total pages is over 5 and the selected page more than 4 from the starting page", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-pagination start="1" total="6" num="5"></calcite-pagination>`);
    });
    it("should render right ellipsis when total pages is over 5 and the selected page more than 3 from the final page", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-pagination start="1" total="6" num="3"></calcite-pagination>`);
    });
  });
  describe('next button', () => {
    let page;
    beforeEach( async () => {
      page = await newE2EPage();
      await page.setContent(`<calcite-pagination start="1" total="2" num="1"></calcite-pagination>`);
    });
    it("should increase selected page by 1 when clicked", async () => {
      const nextButton = await page.find(`calcite-pagination >>> .${CSS.next}`);
      await nextButton.click();

      const selectedPage = await page.find(`calcite-pagination >>> .${CSS.page}${CSS.selected}`);
      expect(selectedPage.innerText).toBe("2");
    });
    it('should be disabled when selected page equals the starting page', async () => {

    });
  });
  describe('previous button', () => {
    let page;
    beforeEach( async () => {
      page = await newE2EPage();
      await page.setContent(`<calcite-pagination start="1" total="2" num="2"></calcite-pagination>`);
    });
    it("previous button should decrease selected page by 1", async () => {
      const previousButton = await page.find(`calcite-pagination >>> .${CSS.previous}`);
      await previousButton.click();

      const selectedPage = await page.find(`calcite-pagination >>> .${CSS.page}${CSS.selected}`);
      expect(selectedPage.innerText).toBe("1");
    });
    it('next should be disabled when selected page equals the starting page', async () => {

    });
  });
});
