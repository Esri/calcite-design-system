import { E2EElement, E2EPage, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { accessible, focusable, hidden, renders, t9n } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-pagination", () => {
  describe("renders", () => {
    renders("calcite-pagination", { display: "flex" });
  });

  describe("focuses previous button when not on the first page", () => {
    focusable('<calcite-pagination page-size="1" start-item="2" total-items="10"></calcite-pagination>', {
      shadowFocusTargetSelector: `.${CSS.previous}`,
    });
  });

  describe("focuses page number 1 when on the first page", () => {
    focusable('<calcite-pagination page-size="1" start-item="1" total-items="10"></calcite-pagination>', {
      shadowFocusTargetSelector: `.${CSS.page}`,
    });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-pagination");
  });

  describe("accessible", () => {
    accessible(`<calcite-pagination page-size="10" start-item="50" total-items="100"></calcite-pagination>`);
  });

  describe("translation support", () => {
    t9n("calcite-pagination");
  });

  describe("page links", () => {
    it("should render only one page when totalItems is less than pageSize", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-pagination total-items="10" page-size="11"></calcite-pagination>`);
      const links = await page.findAll(`calcite-pagination >>> .${CSS.page}`);
      expect(links.length).toBe(1);
    });
  });

  describe("ellipsis rendering", () => {
    it("should not render either ellipsis when total pages is less than or equal to 5", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-pagination total-items="80"></calcite-pagination>`);

      const startEllipsis = await page.find(`calcite-pagination >>> .${CSS.ellipsis}.${CSS.ellipsisStart}`);
      const endEllipsis = await page.find(`calcite-pagination >>> .${CSS.ellipsis}.${CSS.ellipsisEnd}`);
      expect(startEllipsis).toBeNull();
      expect(endEllipsis).toBeNull();
    });
    it("should render start ellipsis when total pages is over 5 and the selected page more than 4 from the starting page", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-pagination style="width:400px;" start-item="101" total-items="140" page-size="20"></calcite-pagination>`
      );

      const startEllipsis = await page.find(`calcite-pagination >>> .${CSS.ellipsis}.${CSS.ellipsisStart}`);
      expect(startEllipsis).not.toBeNull();
    });
    it("should render end ellipsis when total pages is over 5 and the selected page more than 3 from the final page", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-pagination style="width:400px;" start-item="801" total-items="1200" page-size="100"></calcite-pagination>`
      );
      const endEllipsis = await page.find(`calcite-pagination >>> .${CSS.ellipsis}.${CSS.ellipsisEnd}`);
      expect(endEllipsis).not.toBeNull();
    });
  });
  describe("next and previous buttons", () => {
    let page: E2EPage;
    let pagination: E2EElement;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(
        `<calcite-pagination start-item="1" total-items="124" page-size="20"></calcite-pagination>`
      );
      pagination = await page.find("calcite-pagination");
    });
    it("next button should increase selected page by 1 when clicked", async () => {
      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const nextButton = await page.find(`calcite-pagination >>> .${CSS.next}`);
      await nextButton.click();
      await page.waitForChanges();

      const selectedPage = await page.find(`calcite-pagination >>> .${CSS.page}.${CSS.selected}`);
      expect(selectedPage.innerText).toBe("2");
      expect(toggleSpy).toHaveReceivedEventTimes(1);
    });
    it("previous button should be disabled when selected page equals the starting page", async () => {
      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const previousButton = await page.find(`calcite-pagination >>> .${CSS.previous}`);
      await previousButton.click();
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEventTimes(0);
    });
    it("previous button should decrease selected page by 1", async () => {
      await pagination.setAttribute("start-item", "21");
      await page.waitForChanges();

      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const previousButton = await page.find(`calcite-pagination >>> .${CSS.previous}`);
      await previousButton.click();
      await page.waitForChanges();

      const selectedPage = await page.find(`calcite-pagination >>> .${CSS.page}.${CSS.selected}`);
      expect(selectedPage.innerText).toBe("1");
      expect(toggleSpy).toHaveReceivedEventTimes(1);
    });
    it("next button should be disabled on last page", async () => {
      await pagination.setAttribute("start-item", "121");
      await page.waitForChanges();

      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const nextButton = await page.find(`calcite-pagination >>> .${CSS.next}`);
      await nextButton.click();
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEventTimes(0);
    });
    it("next button should be enabled if last page has only 1 result", async () => {
      await pagination.setAttribute("total-items", "11");
      await pagination.setAttribute("page-size", "10");
      await pagination.setAttribute("start-item", "1");
      await page.waitForChanges();

      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const nextButton = await page.find(`calcite-pagination >>> .${CSS.next}`);
      await nextButton.click();
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEventTimes(1);
    });
  });
  describe("page buttons", () => {
    it("should switch selected page to the page that's clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-pagination start-item="1" total-items="36" page-size="10"></calcite-pagination>`);
      const toggleSpy = await page.spyOnEvent("calcitePaginationChange");
      const pages = await page.findAll("calcite-pagination >>> .page");
      await pages[1].click();
      await page.waitForChanges();

      let selectedPage = await page.find(`calcite-pagination >>> .${CSS.page}.${CSS.selected}`);
      expect(selectedPage.innerText).toBe("2");
      expect(toggleSpy).toHaveReceivedEventTimes(1);

      await pages[2].click();
      await page.waitForChanges();

      selectedPage = await page.find(`calcite-pagination >>> .${CSS.page}.${CSS.selected}`);
      expect(selectedPage.innerText).toBe("3");
      expect(toggleSpy).toHaveReceivedEventTimes(2);
    });
  });
  describe("showing one item at a time", () => {
    let page: E2EPage;
    let pagination: E2EElement;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`<calcite-pagination start-item="1" total-items="5" page-size="1"></calcite-pagination>`);
      pagination = await page.find("calcite-pagination");
    });
    it("should show the first page", async () => {
      const selectedPage = await page.find(`calcite-pagination >>> .${CSS.page}.${CSS.selected}`);
      expect(selectedPage.innerText).toBe("1");
    });
    it("previous button should be disabled when selected page equals the starting page", async () => {
      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const previousButton = await page.find(`calcite-pagination >>> .${CSS.previous}`);
      await previousButton.click();
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEventTimes(0);
    });
    it("next button should be disabled on last page", async () => {
      await pagination.setAttribute("start-item", "5");
      await page.waitForChanges();

      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const nextButton = await page.find(`calcite-pagination >>> .${CSS.next}`);
      await nextButton.click();
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEventTimes(0);
    });
  });

  describe("pageSize", () => {
    let page: E2EPage;
    let pagination: E2EElement;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`<calcite-pagination start-item="1" total-items="5" page-size="1"></calcite-pagination>`);
      pagination = await page.find("calcite-pagination");
    });

    it("should set pageSize to one when set to zero via attribute", async () => {
      expect(await pagination.getProperty("pageSize")).toBe(1);
    });

    it("should set pageSize to one when set to zero programmatically", async () => {
      expect(await pagination.getProperty("pageSize")).toBe(10);
      pagination.setProperty("pageSize", 0);
      await page.waitForChanges();
      expect(await pagination.getProperty("pageSize")).toBe(1);
    });
  });

  describe("number locale support", () => {
    let page: E2EPage;
    let element: E2EElement;
    const expectedNotSeparatedValueArray: string[] = ["14999997", "14999998", "14999999", "15000000"];

    const formattedValuesPerLanguageObject = {
      "de-CH": ["14’999’997", "14’999’998", "14’999’999", "15’000’000"],
      en: ["14,999,997", "14,999,998", "14,999,999", "15,000,000"],
      es: ["14.999.997", "14.999.998", "14.999.999", "15.000.000"],
      fr: [
        ["14", "999", "997"].join("\u00A0"),
        ["14", "999", "998"].join("\u00A0"),
        ["14", "999", "999"].join("\u00A0"),
        ["15", "000", "000"].join("\u00A0"),
      ],
      hi: ["1,49,99,997", "1,49,99,998", "1,49,99,999", "1,50,00,000"],
    };

    async function getDisplayedValues(): Promise<string[]> {
      const buttons = await page.findAll("calcite-pagination >>> .page");
      const buttonsTestedForSeparator = buttons.slice(-4);
      return buttonsTestedForSeparator.map((button) => button.innerText);
    }

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(
        html`<calcite-pagination lang="en" group-separator total-items="150000000" page-size="10"></calcite-pagination>`
      );
      element = await page.find("calcite-pagination");

      const buttons = await page.findAll(`calcite-pagination >>> .${CSS.page}`);
      const last = buttons[buttons.length - 1];
      await last.click();
    });

    it("does not render separated when groupSeparator prop is false", async () => {
      element.setProperty("groupSeparator", false);
      await page.waitForChanges();

      let noSeparator = await getDisplayedValues();
      expect(noSeparator).toEqual(expectedNotSeparatedValueArray);
      expect(await element.getProperty("groupSeparator")).toBe(false);

      element.setProperty("lang", "fr");
      await page.waitForChanges();

      noSeparator = await getDisplayedValues();
      expect(noSeparator).toEqual(expectedNotSeparatedValueArray);
      expect(await element.getProperty("groupSeparator")).toBe(false);
    });

    it("displays group separator for multiple locales", async () => {
      const testLocalizedGroupSeparator = async (lang: string, formattedValuesArr: string[]): Promise<void> => {
        element.setProperty("lang", lang);
        await page.waitForChanges();

        const withSeparator = await getDisplayedValues();
        expect(withSeparator).toEqual(formattedValuesArr);
      };

      for (const lang in formattedValuesPerLanguageObject) {
        await testLocalizedGroupSeparator(lang, formattedValuesPerLanguageObject[lang]);
      }
    });
  });
});
