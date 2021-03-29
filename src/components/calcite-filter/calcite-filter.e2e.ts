import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { accessible, focusable, hidden, renders } from "../../tests/commonTests";

describe("calcite-filter", () => {
  it("renders", async () => renders("calcite-filter"));

  it("honors hidden attribute", async () => hidden("calcite-filter"));

  it("is accessible", async () => accessible("calcite-filter"));

  it("is focusable", async () => focusable("calcite-filter"));

  describe("strings", () => {
    it("should update the filter placeholder when a string is provided", async () => {
      const page = await newE2EPage();
      const placeholderText = "hide em";
      await page.setContent(`<calcite-filter placeholder="${placeholderText}"></calcite-filter>`);

      const input = await page.find(`calcite-filter >>> input`);
      expect(await input.getProperty("placeholder")).toBe(placeholderText);
    });
  });

  describe("clear button", () => {
    let page;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent("<calcite-filter></calcite-filter>");
      await page.evaluate(() => {
        const filter = document.querySelector("calcite-filter");
        filter.data = [{ foo: "bar" }];
      });
    });

    it("should only display when the input has a value", async () => {
      let button = await page.find(`calcite-filter >>> button`);

      expect(button).toBeNull();

      const filter = await page.find("calcite-filter");
      await filter.callMethod("setFocus");

      await page.keyboard.type("developer");
      await page.waitForChanges();

      button = await page.find(`calcite-filter >>> button`);

      expect(button).not.toBeNull();
    });

    describe("clearing value", () => {
      const filterIsFocused = async (): Promise<boolean> =>
        page.evaluate(() => document.querySelector("calcite-filter") === document.activeElement);

      it("should clear the value in the input when pressed", async () => {
        const filter = await page.find("calcite-filter");
        await filter.callMethod("setFocus");

        await page.keyboard.type("developer");
        await page.waitForChanges();

        const button = await page.find(`calcite-filter >>> button`);

        await button.click();
        await page.waitForChanges();

        const value = await page.evaluate(() => {
          const filter = document.querySelector("calcite-filter");
          const filterInput = filter.shadowRoot.querySelector("input");
          return filterInput.value;
        });

        expect(value).toBe("");
        expect(await filterIsFocused()).toBe(true);
      });

      it("should clear the value in the input when the Escape key is pressed", async () => {
        const filter = await page.find("calcite-filter");
        await filter.callMethod("setFocus");

        await page.keyboard.type("developer");
        await page.waitForChanges();

        await page.keyboard.press("Escape");
        await page.waitForChanges();

        const value = await page.evaluate(() => {
          const filter = document.querySelector("calcite-filter");
          const filterInput = filter.shadowRoot.querySelector("input");
          return filterInput.value;
        });

        expect(value).toBe("");
        expect(await filterIsFocused()).toBe(true);
      });
    });
  });

  describe("filter behavior", () => {
    let page: E2EPage;

    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent("<calcite-filter></calcite-filter>");
      await page.evaluate(() => {
        const filter = document.querySelector("calcite-filter");
        filter.data = [
          {
            name: "Harry",
            description: "developer",
            value: "harry",
            metadata: { haircolor: "red", favoriteBand: "MetallicA" }
          },
          {
            name: "Matt",
            description: "developer",
            value: "matt",
            metadata: { haircolor: "black", favoriteBand: "unknown" }
          },
          {
            name: "Franco",
            description: "developer",
            value: "franco",
            metadata: { haircolor: "black", favoriteBand: "The Mars Volta" }
          },
          {
            name: "Katy",
            description: "engineer",
            value: "katy",
            metadata: { haircolor: "red", favoriteBand: "unknown" }
          },
          {
            name: "Jon",
            description: "developer",
            value: "jon",
            metadata: { haircolor: "brown", favoriteBand: "Hippity Hops" }
          },
          {
            name: "regex",
            description: "regex",
            value: "regex",
            metadata: { haircolor: "rainbow", favoriteBand: "regex()" }
          }
        ];
      });
    });

    it("emits an event with filtered data after a search query is typed into the input", async () => {
      const waitForEvent = page.waitForEvent("calciteFilterChange");
      await page.evaluate(() => {
        const filter = document.querySelector("calcite-filter");
        const filterInput = filter.shadowRoot.querySelector("input");
        filterInput.value = "developer";
        filterInput.dispatchEvent(new Event("input"));
      });
      const event = await waitForEvent;
      expect(event.detail).toBeDefined();
      expect(event.detail.find((element) => element.value === "harry")).toBeDefined();
      expect(event.detail.find((element) => element.value === "matt")).toBeDefined();
      expect(event.detail.find((element) => element.value === "franco")).toBeDefined();
      expect(event.detail.find((element) => element.value === "jon")).toBeDefined();
      expect(event.detail.find((element) => element.value === "katy")).toBeUndefined();
    });

    it("searches recursively in data and works and matches on a partial string ignoring case", async () => {
      const waitForEvent = page.waitForEvent("calciteFilterChange");
      await page.evaluate(() => {
        const filter = document.querySelector("calcite-filter");
        const filterInput = filter.shadowRoot.querySelector("input");
        filterInput.value = "volt";
        filterInput.dispatchEvent(new Event("input"));
      });
      const event = await waitForEvent;
      expect(event.detail).toBeDefined();
      expect(event.detail.length).toBe(1);
      expect(event.detail.find((element) => element.value === "franco")).toBeDefined();
    });

    it("should escape regex", async () => {
      const waitForEvent = page.waitForEvent("calciteFilterChange");
      await page.evaluate(() => {
        const filter = document.querySelector("calcite-filter");
        const filterInput = filter.shadowRoot.querySelector("input");
        filterInput.value = "regex()";
        filterInput.dispatchEvent(new Event("input"));
      });
      const event = await waitForEvent;
      expect(event.detail).toBeDefined();
      expect(event.detail.length).toBe(1);
      expect(event.detail.find((element) => element.value === "regex")).toBeDefined();
    });
  });
});
