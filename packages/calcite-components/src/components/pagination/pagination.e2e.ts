// @ts-strict-ignore
import { E2EElement, E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { beforeEach, describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import { accessible, focusable, hidden, renders, t9n, themed } from "../../tests/commonTests";
import { findAll } from "../../tests/utils/puppeteer";
import { CSS } from "./resources";

describe("calcite-pagination", () => {
  describe("renders", () => {
    renders("calcite-pagination", { display: "flex" });
  });

  describe("focuses previous button when not on the first page", () => {
    focusable('<calcite-pagination page-size="1" start-item="2" total-items="10"></calcite-pagination>', {
      shadowFocusTargetSelector: `[data-test-chevron="previous"]`,
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
      const links = await findAll(page, `calcite-pagination >>> .${CSS.page}`);
      expect(links.length).toBe(1);
    });
  });

  describe("semantic elements are used", () => {
    it("should render a native list internally", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-pagination total-items="10" page-size="1"></calcite-pagination>`);
      const list = await page.find(`calcite-pagination >>> .${CSS.list}`);
      expect(list).not.toBeNull();
      const listItems = await findAll(page, `calcite-pagination >>> .${CSS.listItem}`);
      expect(listItems.length).toBe(12);
    });
  });

  describe("ellipsis rendering", () => {
    it("should not render either ellipsis when total pages is less than or equal to 5", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-pagination total-items="80"></calcite-pagination>`);

      const startEllipsis = await page.find(`calcite-pagination >>> [data-test-ellipsis="start"]`);
      const endEllipsis = await page.find(`calcite-pagination >>> [data-test-ellipsis="end"]`);
      expect(startEllipsis).toBeNull();
      expect(endEllipsis).toBeNull();
    });
    it("should render start ellipsis when total pages is over 5 and the selected page more than 4 from the starting page", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-pagination style="width:400px;" start-item="101" total-items="140" page-size="20"></calcite-pagination>`,
      );

      const startEllipsis = await page.find(`calcite-pagination >>> [data-test-ellipsis="start"]`);
      expect(startEllipsis).not.toBeNull();
    });
    it("should render end ellipsis when total pages is over 5 and the selected page more than 3 from the final page", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-pagination style="width:400px;" start-item="801" total-items="1200" page-size="100"></calcite-pagination>`,
      );
      const endEllipsis = await page.find(`calcite-pagination >>> [data-test-ellipsis="end"]`);
      expect(endEllipsis).not.toBeNull();
    });
  });
  describe("next and previous buttons", () => {
    let page: E2EPage;
    let pagination: E2EElement;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(
        `<calcite-pagination start-item="1" total-items="124" page-size="20"></calcite-pagination>`,
      );
      pagination = await page.find("calcite-pagination");
    });
    it("next button should increase selected page by 1 when clicked", async () => {
      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const nextButton = await page.find(`calcite-pagination >>> [data-test-chevron="next"]`);
      await nextButton.click();
      await page.waitForChanges();

      const selectedPage = await page.find(`calcite-pagination >>> .${CSS.page}.${CSS.selected}`);
      expect(selectedPage.innerText).toBe("2");
      expect(toggleSpy).toHaveReceivedEventTimes(1);
    });
    it("previous button should be disabled when selected page equals the starting page", async () => {
      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const previousButton = await page.find(`calcite-pagination >>> [data-test-chevron="previous"]`);
      await previousButton.click();
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEventTimes(0);
    });
    it("previous button should decrease selected page by 1", async () => {
      pagination.setAttribute("start-item", "21");
      await page.waitForChanges();

      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const previousButton = await page.find(`calcite-pagination >>> [data-test-chevron="previous"]`);
      await previousButton.click();
      await page.waitForChanges();

      const selectedPage = await page.find(`calcite-pagination >>> .${CSS.page}.${CSS.selected}`);
      expect(selectedPage.innerText).toBe("1");
      expect(toggleSpy).toHaveReceivedEventTimes(1);
    });
    it("next button should be disabled on last page", async () => {
      pagination.setAttribute("start-item", "121");
      await page.waitForChanges();

      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const nextButton = await page.find(`calcite-pagination >>> [data-test-chevron="next"]`);
      await nextButton.click();
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEventTimes(0);
    });
    it("next button should be enabled if last page has only 1 result", async () => {
      pagination.setAttribute("total-items", "11");
      pagination.setAttribute("page-size", "10");
      pagination.setAttribute("start-item", "1");
      await page.waitForChanges();

      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const nextButton = await page.find(`calcite-pagination >>> [data-test-chevron="next"]`);
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
      const pages = await findAll(page, "calcite-pagination >>> .page");
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
      const previousButton = await page.find(`calcite-pagination >>> [data-test-chevron="previous"]`);
      await previousButton.click();
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEventTimes(0);
    });
    it("next button should be disabled on last page", async () => {
      pagination.setAttribute("start-item", "5");
      await page.waitForChanges();

      const toggleSpy = await pagination.spyOnEvent("calcitePaginationChange");
      const nextButton = await page.find(`calcite-pagination >>> [data-test-chevron="next"]`);
      await nextButton.click();
      await page.waitForChanges();

      expect(toggleSpy).toHaveReceivedEventTimes(0);
    });
  });

  describe("pageSize", () => {
    it("should set pageSize to one when set to zero via attribute", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-pagination start-item="1" total-items="5" page-size="0"></calcite-pagination>`);
      const pagination = await page.find("calcite-pagination");
      expect(await pagination.getProperty("pageSize")).toBe(1);
    });

    it("should set pageSize to one when set to zero programmatically", async () => {
      const page = await newE2EPage();
      await page.setContent(`<calcite-pagination start-item="1" total-items="50" page-size="10"></calcite-pagination>`);
      const pagination = await page.find("calcite-pagination");
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
      const buttons = await findAll(page, "calcite-pagination >>> .page");
      const buttonsTestedForSeparator = buttons.slice(-4);
      return buttonsTestedForSeparator.map((button) => button.innerText);
    }

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(
        html`<calcite-pagination
          lang="en"
          group-separator
          total-items="150000000"
          page-size="10"
        ></calcite-pagination>`,
      );
      element = await page.find("calcite-pagination");

      const buttons = await findAll(page, `calcite-pagination >>> .${CSS.page}`);
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

  describe("navigation methods", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(
        `<calcite-pagination start-item="1" total-items="124" page-size="20"></calcite-pagination>`,
      );
    });

    it("navigates to last page", async () => {
      const element = await page.find("calcite-pagination");
      await element.callMethod("goTo", "end");
      await page.waitForChanges();
      const item = await element.getProperty("startItem");
      expect(item).toEqual(121);
    });

    it("navigates to first page", async () => {
      const element = await page.find("calcite-pagination");
      await element.callMethod("goTo", "end");
      await page.waitForChanges();
      let item = await element.getProperty("startItem");
      expect(item).toEqual(121);
      await element.callMethod("goTo", "start");
      await page.waitForChanges();
      item = await element.getProperty("startItem");
      expect(item).toEqual(1);
    });

    it("navigates middle page", async () => {
      const element = await page.find("calcite-pagination");
      await element.callMethod("goTo", 3);
      await page.waitForChanges();
      const item = await element.getProperty("startItem");
      expect(item).toEqual(41);
    });

    it("navigates beyond last page", async () => {
      const element = await page.find("calcite-pagination");
      await element.callMethod("goTo", 20);
      await page.waitForChanges();
      const item = await element.getProperty("startItem");
      expect(item).toEqual(121);
    });

    it("navigates before first page", async () => {
      const element = await page.find("calcite-pagination");
      await element.callMethod("goTo", -1);
      await page.waitForChanges();
      const item = await element.getProperty("startItem");
      expect(item).toEqual(1);
    });
  });

  describe("chevrons", () => {
    it("hides first and last chevrons when width is not xxsmall", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-pagination total-items="123456789" page-size="10" scale="l"></calcite-pagination>`,
      );
      const hiddenChevrons = await findAll(page, `calcite-pagination >>> .${CSS.hiddenItem}`);
      expect(hiddenChevrons.length).toBe(2);
    });

    it("does not hide first and last chevrons when width is xxsmall", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<div style="width: 100px;"><calcite-pagination total-items="123456789" page-size="10" scale="l"></calcite-pagination></div>`,
      );
      const hiddenChevrons = await findAll(page, `calcite-pagination >>> .${CSS.hiddenItem}`, { allowEmpty: true });
      expect(hiddenChevrons.length).toBe(0);
    });
  });

  describe("theme", () => {
    describe("default", () => {
      themed(html`<calcite-pagination total-items="1200" page-size="100" start-item="1"></calcite-pagination>`, {
        "--calcite-pagination-color": [
          {
            shadowSelector: `.${CSS.chevron}`,
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.page}:not(.${CSS.selected})`,
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.ellipsis}`,
            targetProp: "color",
          },
        ],
      });
    });
    describe("hover", () => {
      themed(html`<calcite-pagination total-items="1200" page-size="100" start-item="1"></calcite-pagination>`, {
        "--calcite-pagination-color-hover": [
          {
            shadowSelector: `.${CSS.chevron}:not(.${CSS.disabled})`,
            targetProp: "color",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.page}`,
            targetProp: "color",
            state: "hover",
          },
        ],
        "--calcite-pagination-color-border-hover": {
          shadowSelector: `.${CSS.page}:not(.${CSS.selected})`,
          targetProp: "borderBlockEndColor",
          state: "hover",
        },
        "--calcite-pagination-icon-color-background-hover": {
          shadowSelector: `.${CSS.chevron}:not(.${CSS.disabled})`,
          targetProp: "backgroundColor",
          state: "hover",
        },
      });
    });
    describe("active", () => {
      themed(html`<calcite-pagination total-items="1200" page-size="100" start-item="1"></calcite-pagination>`, {
        "--calcite-pagination-color-hover": [
          {
            shadowSelector: `.${CSS.chevron}:not(.${CSS.disabled})`,
            targetProp: "color",
            state: { press: { attribute: "class", value: `${CSS.chevron}` } },
          },
          {
            shadowSelector: `.${CSS.page}`,
            targetProp: "color",
            state: { press: { attribute: "class", value: `${CSS.page}` } },
          },
        ],
        "--calcite-pagination-background-color": [
          {
            shadowSelector: `.${CSS.page}:not(.${CSS.selected})`,
            targetProp: "backgroundColor",
            state: { press: { attribute: "class", value: `${CSS.page}` } },
          },
          {
            shadowSelector: `.${CSS.chevron}:not(.${CSS.disabled})`,
            targetProp: "backgroundColor",
            state: { press: { attribute: "class", value: `${CSS.chevron}` } },
          },
        ],
      });
    });
    describe("selected", () => {
      themed(html`<calcite-pagination total-items="1200" page-size="100" start-item="1"></calcite-pagination>`, {
        "--calcite-pagination-color-hover": {
          shadowSelector: `.${CSS.page}`,
          targetProp: "color",
          state: "focus",
        },
        "--calcite-pagination-color-border-active": {
          shadowSelector: `.${CSS.page}`,
          targetProp: "borderBlockEndColor",
          state: "focus",
        },
      });
    });
  });
});
