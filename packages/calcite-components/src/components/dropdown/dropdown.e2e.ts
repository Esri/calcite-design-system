import { E2EPage, newE2EPage } from "@stencil/core/testing";
import dedent from "dedent";
import { html } from "../../../support/formatting";
import {
  accessible,
  defaults,
  disabled,
  floatingUIOwner,
  focusable,
  hidden,
  openClose,
  reflects,
  renders,
} from "../../tests/commonTests";
import { GlobalTestProps, getFocusedElementProp } from "../../tests/utils";

describe("calcite-dropdown", () => {
  const simpleDropdownHTML = html`
    <calcite-dropdown>
      <calcite-button slot="trigger">Open dropdown</calcite-button>
      <calcite-dropdown-group id="group-1">
        <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
        <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>
  `;

  describe("defaults", () => {
    defaults("calcite-dropdown", [
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "placement",
        defaultValue: "bottom-start",
      },
    ]);

    describe("reflects", () => {
      reflects("calcite-dropdown", [
        {
          propertyName: "scale",
          value: "m",
        },
        {
          propertyName: "placement",
          value: "bottom-start",
        },
      ]);
    });

    describe("focusable", () => {
      focusable(simpleDropdownHTML, {
        focusTargetSelector: '[slot="trigger"]',
      });
    });

    describe("renders", () => {
      renders(simpleDropdownHTML, { display: "inline-flex" });
    });

    describe("honors hidden attribute", () => {
      hidden("calcite-dropdown");
    });

    describe.skip("disabled", () => {
      disabled(simpleDropdownHTML, {
        focusTarget: {
          tab: "calcite-button",
          click: "calcite-dropdown-item",
        },
      });
    });

    describe("openClose", () => {
      openClose(simpleDropdownHTML);
    });

    interface SelectedItemsAssertionOptions {
      /**
       * IDs from items to assert selection
       */
      expectedItemIds: string[];
    }

    /**
     * Test helper for selected calcite-dropdown items. Expects items to have IDs to test against.
     *
     * Note: assertSelectedItems.setUpEvents must be called before using this method
     *
     * @param page
     * @param root0
     * @param root0.expectedItemIds
     */
    async function assertSelectedItems(
      page: E2EPage,
      { expectedItemIds }: SelectedItemsAssertionOptions
    ): Promise<void> {
      await page.waitForTimeout(100);
      const selectedItemIds = await page.evaluate(() => {
        const dropdown = document.querySelector<HTMLCalciteDropdownElement>("calcite-dropdown");
        return dropdown.selectedItems.map((item) => item.id);
      });

      expect(selectedItemIds).toHaveLength(expectedItemIds.length);

      expectedItemIds.forEach((itemId, index) => expect(selectedItemIds[index]).toEqual(itemId));
    }

    type SelectionEventTestWindow = GlobalTestProps<{ eventDetail: Selection }>;

    /**
     * Helper to wire up the page to assert on the event detail
     *
     * @param page
     */
    assertSelectedItems.setUpEvents = async (page: E2EPage) => {
      await page.evaluate(() => {
        document.addEventListener("calciteDropdownSelect", ({ detail }: CustomEvent<Selection>) => {
          (window as SelectionEventTestWindow).eventDetail = detail;
        });
      });
    };

    const dropdownSelectionModeContent = html`
      <calcite-dropdown>
        <calcite-button slot="trigger" id="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group id="group-1" selection-mode="multiple">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3" selected> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
        <calcite-dropdown-group id="group-2" selection-mode="single">
          <calcite-dropdown-item id="item-4"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-5" selected> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
        <calcite-dropdown-group id="group-3" selection-mode="none">
          <calcite-dropdown-item id="item-6"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-7" href="google.com"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>
    `;

    it("renders requested props when valid props are provided", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-dropdown placement="bottom-end" width-scale="l">
        <calcite-button slot="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group id="group-1" selection-mode="multiple">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`);

      const element = await page.find("calcite-dropdown");
      const group1 = await element.find("calcite-dropdown-group[id='group-1']");

      expect(element).toEqualAttribute("width-scale", "l");
      expect(element).toEqualAttribute("placement", "bottom-end");
      expect(group1).toEqualAttribute("selection-mode", "multiple");
    });

    it("inheritable non-default props `selectionMode` and `scale` set on parent get passed into items", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-dropdown selection-mode="single-persist" scale="s">
          <calcite-button slot="trigger">Open dropdown</calcite-button>
          <calcite-dropdown-group id="group-1">
            <calcite-dropdown-item id="item-1">Content</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2" selected>Content</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3">Content</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      `);
      const dropdownItems = await page.findAll("calcite-dropdown-items");

      dropdownItems.forEach(async (item) => {
        expect(await item.getProperty("selectionMode")).toBe("single-persist");
        expect(await item.getProperty("scale")).toBe("s");
      });
    });

    it("renders icons if requested and does not render icons if not requested", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-dropdown>
        <calcite-button slot="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group>
          <calcite-dropdown-item icon-start="grid" id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item icon-end="grid" id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item icon-start="grid" icon-end="grid" id="item-3">
            Dropdown Item Content
          </calcite-dropdown-item>
          <calcite-dropdown-item id="item-4"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`);

      const item1IconStart = await page.find("calcite-dropdown-item[id='item-1'] >>> .dropdown-item-icon-start");
      const item1IconEnd = await page.find("calcite-dropdown-item[id='item-1'] >>> .dropdown-item-icon-end");
      const item2IconStart = await page.find("calcite-dropdown-item[id='item-2'] >>> .dropdown-item-icon-start");
      const item2IconEnd = await page.find("calcite-dropdown-item[id='item-2'] >>> .dropdown-item-icon-end");
      const item3IconStart = await page.find("calcite-dropdown-item[id='item-3'] >>> .dropdown-item-icon-start");
      const item3IconEnd = await page.find("calcite-dropdown-item[id='item-3'] >>> .dropdown-item-icon-end");
      const item4IconStart = await page.find("calcite-dropdown-item[id='item-4'] >>> .dropdown-item-icon-start");
      const item4IconEnd = await page.find("calcite-dropdown-item[id='item-4'] >>> .dropdown-item-icon-end");
      expect(item1IconStart).not.toBeNull();
      expect(item1IconEnd).toBeNull();
      expect(item2IconStart).toBeNull();
      expect(item2IconEnd).not.toBeNull();
      expect(item3IconStart).not.toBeNull();
      expect(item3IconEnd).not.toBeNull();
      expect(item4IconStart).toBeNull();
      expect(item4IconEnd).toBeNull();
    });

    it("renders group title if specified and not if absent", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-dropdown>
        <calcite-button slot="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group id="group-1" group-title="My Group 1 Title">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
        <calcite-dropdown-group id="group-2">
          <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-4" selected> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`);

      const group1Title = await page.find("calcite-dropdown-group[id='group-1'] >>> .dropdown-title");
      const group2Title = await page.find("calcite-dropdown-group[id='group-2'] >>> .dropdown-title");
      expect(group1Title).not.toBeNull();
      expect(group2Title).toBeNull();
    });

    it("renders selected item based on attribute in dom", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-dropdown>
        <calcite-button slot="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group id="group-1">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`);

      const element = await page.find("calcite-dropdown");
      const item1 = await element.find("calcite-dropdown-item[id='item-1']");
      const item2 = await element.find("calcite-dropdown-item[id='item-2']");
      const item3 = await element.find("calcite-dropdown-item[id='item-3']");

      expect(item1).not.toHaveAttribute("selected");
      expect(item2).toHaveAttribute("selected");
      expect(item3).not.toHaveAttribute("selected");
    });

    it("renders multiple selected items when group is in multiple selection mode", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-dropdown>
          <calcite-button id="trigger" slot="trigger">Open dropdown</calcite-button>
          <calcite-dropdown-group id="group-1" selection-mode="multiple">
            <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
            <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
            <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      `);

      const element = await page.find("calcite-dropdown");
      const trigger = await element.find("#trigger");
      const group1 = await element.find("calcite-dropdown-group[id='group-1']");
      const item1 = await element.find("calcite-dropdown-item[id='item-1']");
      const item2 = await element.find("calcite-dropdown-item[id='item-2']");
      const item3 = await element.find("calcite-dropdown-item[id='item-3']");
      const itemChangeSpy = await element.spyOnEvent("calciteDropdownSelect");
      await assertSelectedItems.setUpEvents(page);
      expect(group1).toEqualAttribute("selection-mode", "multiple");
      await trigger.click();
      await page.waitForChanges();
      await assertSelectedItems(page, { expectedItemIds: ["item-2"] });
      await item1.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-1", "item-2"],
      });
      await trigger.click();
      await page.waitForChanges();
      await item2.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-1"],
      });
      await trigger.click();
      await page.waitForChanges();
      await item3.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-1", "item-3"],
      });

      expect(item1).toHaveAttribute("selected");
      expect(item2).not.toHaveAttribute("selected");
      expect(item3).toHaveAttribute("selected");
      expect(itemChangeSpy).toHaveReceivedEventTimes(3);
    });

    it("renders just one selected item when group is in single selection mode", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-dropdown>
        <calcite-button id="trigger" slot="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group id="group-1" selection-mode="single">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`);

      const element = await page.find("calcite-dropdown");
      const trigger = await element.find("#trigger");
      const group1 = await element.find("calcite-dropdown-group[id='group-1']");
      const item1 = await element.find("calcite-dropdown-item[id='item-1']");
      const item2 = await element.find("calcite-dropdown-item[id='item-2']");
      const item3 = await element.find("calcite-dropdown-item[id='item-3']");
      const itemChangeSpy = await element.spyOnEvent("calciteDropdownSelect");
      await assertSelectedItems.setUpEvents(page);
      expect(group1).toEqualAttribute("selection-mode", "single");
      await assertSelectedItems(page, { expectedItemIds: ["item-2"] });
      await trigger.click();
      await page.waitForChanges();
      await item1.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-1"],
      });
      await trigger.click();
      await page.waitForChanges();
      await item3.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-3"],
      });

      expect(item1).not.toHaveAttribute("selected");
      expect(item2).not.toHaveAttribute("selected");
      expect(item3).toHaveAttribute("selected");
      expect(itemChangeSpy).toHaveReceivedEventTimes(2);
    });

    it("renders no selected item when group is in none selection mode (and removes any selected state set in dom on load)", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-dropdown>
        <calcite-button id="trigger" slot="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group id="group-1" selection-mode="none">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`);

      const element = await page.find("calcite-dropdown");
      const trigger = await element.find("#trigger");
      const group1 = await element.find("calcite-dropdown-group[id='group-1']");
      const item1 = await element.find("calcite-dropdown-item[id='item-1']");
      const item2 = await element.find("calcite-dropdown-item[id='item-2']");
      const item3 = await element.find("calcite-dropdown-item[id='item-3']");
      const itemChangeSpy = await element.spyOnEvent("calciteDropdownSelect");
      await assertSelectedItems.setUpEvents(page);
      expect(group1).toEqualAttribute("selection-mode", "none");
      await trigger.click();
      await item1.click();
      await page.waitForChanges();
      await assertSelectedItems(page, { expectedItemIds: [] });
      await trigger.click();
      await item2.click();
      await page.waitForChanges();
      await assertSelectedItems(page, { expectedItemIds: [] });
      await trigger.click();
      await item3.click();
      await page.waitForChanges();
      await assertSelectedItems(page, { expectedItemIds: [] });

      expect(item1).not.toHaveAttribute("selected");
      expect(item2).not.toHaveAttribute("selected");
      expect(item3).not.toHaveAttribute("selected");
      expect(itemChangeSpy).toHaveReceivedEventTimes(3);
    });

    it("renders the correct selected state when parent contains groups of assorted selection modes", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-dropdown>
        <calcite-button slot="trigger" id="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group id="group-1" selection-mode="multiple">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
        <calcite-dropdown-group id="group-2" selection-mode="single">
          <calcite-dropdown-item id="item-4"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-5" selected> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-6"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
        <calcite-dropdown-group id="group-3" selection-mode="none">
          <calcite-dropdown-item id="item-7"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-8"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-9"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`);

      const element = await page.find("calcite-dropdown");
      const trigger = await element.find("#trigger");
      const group1 = await element.find("calcite-dropdown-group[id='group-1']");
      const group2 = await element.find("calcite-dropdown-group[id='group-2']");
      const group3 = await element.find("calcite-dropdown-group[id='group-3']");
      const item1 = await element.find("calcite-dropdown-item[id='item-1']");
      const item2 = await element.find("calcite-dropdown-item[id='item-2']");
      const item3 = await element.find("calcite-dropdown-item[id='item-3']");
      const item4 = await element.find("calcite-dropdown-item[id='item-4']");
      const item5 = await element.find("calcite-dropdown-item[id='item-5']");
      const item6 = await element.find("calcite-dropdown-item[id='item-6']");
      const item7 = await element.find("calcite-dropdown-item[id='item-7']");
      const item8 = await element.find("calcite-dropdown-item[id='item-8']");
      const item9 = await element.find("calcite-dropdown-item[id='item-9']");
      const itemChangeSpy = await element.spyOnEvent("calciteDropdownSelect");
      await assertSelectedItems.setUpEvents(page);

      expect(group1).toEqualAttribute("selection-mode", "multiple");
      expect(group2).toEqualAttribute("selection-mode", "single");
      expect(group3).toEqualAttribute("selection-mode", "none");
      await assertSelectedItems(page, { expectedItemIds: ["item-2", "item-5"] });

      await trigger.click();
      await page.waitForChanges();
      await item1.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-1", "item-2", "item-5"],
      });
      await trigger.click();
      await page.waitForChanges();
      await item2.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-1", "item-5"],
      });
      await trigger.click();
      await page.waitForChanges();
      await item3.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-1", "item-3", "item-5"],
      });
      await trigger.click();
      await page.waitForChanges();
      await item4.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-1", "item-3", "item-4"],
      });
      await trigger.click();
      await page.waitForChanges();
      await item6.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-1", "item-3", "item-6"],
      });
      await trigger.click();
      await page.waitForChanges();
      await item7.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-1", "item-3", "item-6"],
      });
      await trigger.click();
      await page.waitForChanges();
      await item9.click();
      await page.waitForChanges();
      await assertSelectedItems(page, {
        expectedItemIds: ["item-1", "item-3", "item-6"],
      });

      expect(item1).toHaveAttribute("selected");
      expect(item2).not.toHaveAttribute("selected");
      expect(item3).toHaveAttribute("selected");
      expect(item4).not.toHaveAttribute("selected");
      expect(item5).not.toHaveAttribute("selected");
      expect(item6).toHaveAttribute("selected");
      expect(item7).not.toHaveAttribute("selected");
      expect(item8).not.toHaveAttribute("selected");
      expect(item9).not.toHaveAttribute("selected");
      expect(itemChangeSpy).toHaveReceivedEventTimes(7);
    });

    it("renders a calcite-dropdown-item with child anchor link with passed attributes if href is present", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-dropdown>
        <calcite-button id="trigger" slot="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group id="group-1" selection-mode="none">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" href="google.com" rel="noopener noreferrer" target="_blank">
            Dropdown Item Content
          </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`);
      const elementAsLink = await page.find("calcite-dropdown-item[id='item-2'] >>> a");
      expect(elementAsLink).not.toBeNull();
      expect(elementAsLink).toEqualAttribute("href", "google.com");
      expect(elementAsLink).toEqualAttribute("rel", "noopener noreferrer");
      expect(elementAsLink).toEqualAttribute("target", "_blank");
    });

    it("should focus the first item on open when there is no selected item", async () => {
      const page = await newE2EPage({
        html: html`<calcite-dropdown>
          <calcite-button slot="trigger">Open Dropdown</calcite-button>
          <calcite-dropdown-group>
            <calcite-dropdown-item id="item-1">1</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
            <calcite-dropdown-item id="item-4">4</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>`,
      });

      const element = await page.find("calcite-dropdown");
      const dropdownOpenEvent = page.waitForEvent("calciteDropdownOpen");
      await element.click();
      await dropdownOpenEvent;
      expect(await page.evaluate(() => document.activeElement.id)).toEqual("item-1");
    });

    it("should focus the first selected item on open", async () => {
      const page = await newE2EPage({
        html: html`<calcite-dropdown>
          <calcite-button slot="trigger">Open Dropdown</calcite-button>
          <calcite-dropdown-group>
            <calcite-dropdown-item id="item-1">1</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3" selected>3</calcite-dropdown-item>
            <calcite-dropdown-item id="item-4">4</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>`,
      });

      const element = await page.find("calcite-dropdown");
      const dropdownOpenEvent = page.waitForEvent("calciteDropdownOpen");
      await element.click();
      await dropdownOpenEvent;

      expect(await page.evaluate(() => document.activeElement.id)).toEqual("item-3");
    });

    it("should focus the first selected item on open (multi)", async () => {
      const page = await newE2EPage({
        html: html`<calcite-dropdown>
          <calcite-button slot="trigger">Open Dropdown</calcite-button>
          <calcite-dropdown-group selection-mode="multiple">
            <calcite-dropdown-item id="item-1">1</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2" selected>2</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
            <calcite-dropdown-item id="item-4" selected>4</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>`,
      });

      const element = await page.find("calcite-dropdown");
      const dropdownOpenEvent = page.waitForEvent("calciteDropdownOpen");
      await element.click();
      await dropdownOpenEvent;

      expect(await page.evaluate(() => document.activeElement.id)).toEqual("item-2");
    });

    describe("scrolling", () => {
      it("focused item should be in view when long", async () => {
        const page = await newE2EPage();

        await page.setContent(html`<calcite-dropdown>
          <calcite-button slot="trigger">Open Dropdown</calcite-button>
          <calcite-dropdown-group>
            <calcite-dropdown-item id="item-1">1</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
            <calcite-dropdown-item id="item-4">4</calcite-dropdown-item>
            <calcite-dropdown-item id="item-5">5</calcite-dropdown-item>
            <calcite-dropdown-item id="item-6">6</calcite-dropdown-item>
            <calcite-dropdown-item id="item-7">7</calcite-dropdown-item>
            <calcite-dropdown-item id="item-8">8</calcite-dropdown-item>
            <calcite-dropdown-item id="item-9">9</calcite-dropdown-item>
            <calcite-dropdown-item id="item-10">10</calcite-dropdown-item>
            <calcite-dropdown-item id="item-11">11</calcite-dropdown-item>
            <calcite-dropdown-item id="item-12">12</calcite-dropdown-item>
            <calcite-dropdown-item id="item-13">13</calcite-dropdown-item>
            <calcite-dropdown-item id="item-14">14</calcite-dropdown-item>
            <calcite-dropdown-item id="item-15">15</calcite-dropdown-item>
            <calcite-dropdown-item id="item-16">16</calcite-dropdown-item>
            <calcite-dropdown-item id="item-17">17</calcite-dropdown-item>
            <calcite-dropdown-item id="item-18">18</calcite-dropdown-item>
            <calcite-dropdown-item id="item-19">19</calcite-dropdown-item>
            <calcite-dropdown-item id="item-20">20</calcite-dropdown-item>
            <calcite-dropdown-item id="item-21">21</calcite-dropdown-item>
            <calcite-dropdown-item id="item-22">22</calcite-dropdown-item>
            <calcite-dropdown-item id="item-23">23</calcite-dropdown-item>
            <calcite-dropdown-item id="item-24">24</calcite-dropdown-item>
            <calcite-dropdown-item id="item-25">25</calcite-dropdown-item>
            <calcite-dropdown-item id="item-26">26</calcite-dropdown-item>
            <calcite-dropdown-item id="item-27">27</calcite-dropdown-item>
            <calcite-dropdown-item id="item-28">28</calcite-dropdown-item>
            <calcite-dropdown-item id="item-29">29</calcite-dropdown-item>
            <calcite-dropdown-item id="item-30">30</calcite-dropdown-item>
            <calcite-dropdown-item id="item-41">41</calcite-dropdown-item>
            <calcite-dropdown-item id="item-42">42</calcite-dropdown-item>
            <calcite-dropdown-item id="item-43">43</calcite-dropdown-item>
            <calcite-dropdown-item id="item-44">44</calcite-dropdown-item>
            <calcite-dropdown-item id="item-45">45</calcite-dropdown-item>
            <calcite-dropdown-item id="item-46">46</calcite-dropdown-item>
            <calcite-dropdown-item id="item-47">47</calcite-dropdown-item>
            <calcite-dropdown-item id="item-48">48</calcite-dropdown-item>
            <calcite-dropdown-item id="item-49">49</calcite-dropdown-item>
            <calcite-dropdown-item id="item-50" selected>50</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>`);
        await page.waitForChanges();

        const element = await page.find("calcite-dropdown");
        const dropdownOpenEvent = page.waitForEvent("calciteDropdownOpen");
        await element.click();
        await dropdownOpenEvent;

        expect(await page.evaluate(() => document.activeElement.id)).toEqual("item-50");

        const item = await page.find("#item-50");

        expect(await item.isIntersectingViewport()).toBe(true);
      });

      it("control max items displayed", async () => {
        const maxItems = 7;
        const page = await newE2EPage({
          html: html`<calcite-dropdown max-items="${maxItems}">
            <calcite-button slot="trigger">Open Dropdown</calcite-button>
            <calcite-dropdown-group group-title="First group">
              <calcite-dropdown-item id="item-1">1</calcite-dropdown-item>
              <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
              <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
              <calcite-dropdown-item id="item-4">4</calcite-dropdown-item>
              <calcite-dropdown-item id="item-5">5</calcite-dropdown-item>
            </calcite-dropdown-group>
            <calcite-dropdown-group group-title="Second group">
              <calcite-dropdown-item id="item-6">6</calcite-dropdown-item>
              <calcite-dropdown-item id="item-7">7</calcite-dropdown-item>
              <calcite-dropdown-item id="item-8">8</calcite-dropdown-item>
              <calcite-dropdown-item id="item-9">9</calcite-dropdown-item>
              <calcite-dropdown-item id="item-10">10</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>`,
        });

        const element = await page.find("calcite-dropdown");
        const dropdownOpenEvent = page.waitForEvent("calciteDropdownOpen");
        await element.click();
        await dropdownOpenEvent;

        const items = await page.findAll("calcite-dropdown-item");

        for (let i = 0; i < items.length; i++) {
          expect(await items[i].isIntersectingViewport()).toBe(i <= maxItems - 1);
        }

        const newMaxItems = 4;
        element.setProperty("maxItems", newMaxItems);
        await page.waitForChanges();

        for (let i = 0; i < items.length; i++) {
          expect(await items[i].isIntersectingViewport()).toBe(i <= newMaxItems - 1);
        }
      });
    });

    it("closes when a selection is made", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-dropdown>
        <calcite-button id="trigger" slot="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group id="group-1" selection-mode="single">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`);

      const element = await page.find("calcite-dropdown");
      const trigger = await element.find("#trigger");
      const item1 = await element.find("calcite-dropdown-item[id='item-1']");
      const dropdownWrapper = await page.find("calcite-dropdown >>> .calcite-dropdown-wrapper");
      expect(await dropdownWrapper.isVisible()).toBe(false);
      await trigger.click();
      await page.waitForChanges();
      expect(await dropdownWrapper.isVisible()).toBe(true);
      await item1.click();
      await page.waitForChanges();
      expect(await dropdownWrapper.isVisible()).toBe(false);
    });

    it("remains open when close-on-select-disabled is requested and selected item is not in a selection-mode:none group", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-dropdown close-on-select-disabled>
        <calcite-button id="trigger" slot="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group id="group-1" selection-mode="single">
          <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item>
            <div id="item-3">Dropdown Item Content</div>
          </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`);

      const element = await page.find("calcite-dropdown");
      const trigger = await element.find("#trigger");
      const item1 = await element.find("#item-1");
      const item3 = await element.find("#item-3");
      const dropdownWrapper = await page.find("calcite-dropdown >>> .calcite-dropdown-wrapper");
      expect(await dropdownWrapper.isVisible()).toBe(false);
      await trigger.click();
      await page.waitForChanges();
      expect(await dropdownWrapper.isVisible()).toBe(true);
      await item1.click();
      await page.waitForChanges();
      expect(await dropdownWrapper.isVisible()).toBe(true);
      await item3.click();
      await page.waitForChanges();
      expect(await dropdownWrapper.isVisible()).toBe(true);
    });

    it("closes when close-on-select-disabled is requested and selected item is in a selection-mode:none group", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-dropdown close-on-select-disabled>
        <calcite-button id="trigger" slot="trigger">Open dropdown</calcite-button>
        <calcite-dropdown-group id="group-1" selection-mode="none">
          <calcite-dropdown-item>
            <div id="item-1">Dropdown Item Content</div>
          </calcite-dropdown-item>
          <calcite-dropdown-item id="item-2"> Dropdown Item Content </calcite-dropdown-item>
          <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`);

      const element = await page.find("calcite-dropdown");
      const trigger = await element.find("#trigger");
      const item1 = await element.find("#item-1");
      const dropdownWrapper = await page.find("calcite-dropdown >>> .calcite-dropdown-wrapper");
      expect(await dropdownWrapper.isVisible()).toBe(false);
      await trigger.click();
      await page.waitForChanges();
      expect(await dropdownWrapper.isVisible()).toBe(true);
      await item1.click();
      await page.waitForChanges();
      expect(await dropdownWrapper.isVisible()).toBe(false);
    });

    describe("toggles the dropdown with click, enter, or space", () => {
      it("toggles when trigger is a button", async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <calcite-dropdown>
            <calcite-button slot="trigger">Open dropdown</calcite-button>
            <calcite-dropdown-group selection-mode="single">
              <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
              <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        `);
        const element = await page.find("calcite-dropdown");
        const trigger = await element.find("calcite-button[slot='trigger']");
        const dropdownWrapper = await page.find(`calcite-dropdown >>> .calcite-dropdown-wrapper`);
        const calciteDropdownOpen = await element.spyOnEvent("calciteDropdownOpen");
        const calciteDropdownClose = await element.spyOnEvent("calciteDropdownClose");
        let waitForCalciteDropdownOpen = page.waitForEvent("calciteDropdownOpen");
        const waitForCalciteDropdownClose = page.waitForEvent("calciteDropdownClose");

        expect(await dropdownWrapper.isVisible()).toBe(false);
        await trigger.click();
        await page.waitForChanges();
        expect(await dropdownWrapper.isVisible()).toBe(true);
        await waitForCalciteDropdownOpen;
        expect(calciteDropdownOpen).toHaveReceivedEventTimes(1);
        expect(calciteDropdownClose).toHaveReceivedEventTimes(0);

        await element.callMethod("setFocus");
        await page.waitForChanges();
        await page.keyboard.press("Space");
        await page.waitForChanges();
        expect(await dropdownWrapper.isVisible()).toBe(false);
        await waitForCalciteDropdownClose;
        expect(calciteDropdownOpen).toHaveReceivedEventTimes(1);
        expect(calciteDropdownClose).toHaveReceivedEventTimes(1);

        waitForCalciteDropdownOpen = page.waitForEvent("calciteDropdownOpen");

        await page.keyboard.press("Enter");
        await page.waitForChanges();
        expect(await dropdownWrapper.isVisible()).toBe(true);
        await waitForCalciteDropdownOpen;
        expect(calciteDropdownOpen).toHaveReceivedEventTimes(2);
        expect(calciteDropdownClose).toHaveReceivedEventTimes(1);
      });

      it("toggle when trigger is an action", async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <calcite-dropdown>
            <calcite-action slot="trigger">Open dropdown</calcite-action>
            <calcite-dropdown-group selection-mode="single">
              <calcite-dropdown-item id="item-1"> Dropdown Item Content</calcite-dropdown-item>
              <calcite-dropdown-item id="item-2" selected> Dropdown Item Content</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        `);
        const element = await page.find("calcite-dropdown");
        const trigger = await element.find("calcite-action[slot='trigger'] >>> button");
        const dropdownWrapper = await page.find(`calcite-dropdown >>> .calcite-dropdown-wrapper`);
        const calciteDropdownOpen = await element.spyOnEvent("calciteDropdownOpen");
        const calciteDropdownClose = await element.spyOnEvent("calciteDropdownClose");
        let waitForCalciteDropdownOpen = page.waitForEvent("calciteDropdownOpen");
        const waitForCalciteDropdownClose = page.waitForEvent("calciteDropdownClose");

        expect(await dropdownWrapper.isVisible()).toBe(false);
        await trigger.click();
        await page.waitForChanges();
        expect(await dropdownWrapper.isVisible()).toBe(true);
        await waitForCalciteDropdownOpen;
        expect(calciteDropdownOpen).toHaveReceivedEventTimes(1);
        expect(calciteDropdownClose).toHaveReceivedEventTimes(0);

        await element.callMethod("setFocus");
        await page.waitForChanges();
        await page.keyboard.press("Space");
        await page.waitForChanges();
        expect(await dropdownWrapper.isVisible()).toBe(false);
        await waitForCalciteDropdownClose;
        expect(calciteDropdownOpen).toHaveReceivedEventTimes(1);
        expect(calciteDropdownClose).toHaveReceivedEventTimes(1);

        waitForCalciteDropdownOpen = page.waitForEvent("calciteDropdownOpen");

        await page.keyboard.press("Enter");
        await page.waitForChanges();
        expect(await dropdownWrapper.isVisible()).toBe(true);
        await waitForCalciteDropdownOpen;
        expect(calciteDropdownOpen).toHaveReceivedEventTimes(2);
        expect(calciteDropdownClose).toHaveReceivedEventTimes(1);
      });

      it("toggles when Enter keydown is dispatched", async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <calcite-dropdown>
            <calcite-button slot="trigger">Open dropdown</calcite-button>
            <calcite-dropdown-group selection-mode="single">
              <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
              <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        `);
        const element = await page.find("calcite-dropdown");
        const dropdownWrapper = await page.find(`calcite-dropdown >>> .calcite-dropdown-wrapper`);
        const calciteDropdownOpen = await element.spyOnEvent("calciteDropdownOpen");
        const calciteDropdownClose = await element.spyOnEvent("calciteDropdownClose");
        const waitForCalciteDropdownOpen = page.waitForEvent("calciteDropdownOpen");

        expect(await dropdownWrapper.isVisible()).toBe(false);

        await page.$eval("calcite-button[slot='trigger']", (triggerEl: HTMLCalciteButtonElement) => {
          // intentionally not pressing to avoid emitting `click`
          triggerEl.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
        });

        await page.waitForChanges();
        expect(await dropdownWrapper.isVisible()).toBe(true);
        await waitForCalciteDropdownOpen;
        expect(calciteDropdownOpen).toHaveReceivedEventTimes(1);
        expect(calciteDropdownClose).toHaveReceivedEventTimes(0);
      });
    });

    describe("Focus order with Tab key", () => {
      it("closes dropdown and focuses the next focusable element on Tab", async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <calcite-dropdown>
            <calcite-action slot="trigger" id="trigger">Open dropdown</calcite-action>
            <calcite-dropdown-group selection-mode="single">
              <calcite-dropdown-item id="item-1"> Dropdown Item Content</calcite-dropdown-item>
              <calcite-dropdown-item id="item-2" selected> Dropdown Item Content</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
          <calcite-button id="button-1">Click</calcite-button>
        `);
        const element = await page.find("calcite-dropdown");
        const trigger = await element.find("calcite-action[slot='trigger'] >>> button");
        const dropdownWrapper = await page.find(`calcite-dropdown >>> .calcite-dropdown-wrapper`);
        const calciteDropdownClose = await element.spyOnEvent("calciteDropdownClose");
        const calciteDropdownOpen = await element.spyOnEvent("calciteDropdownOpen");

        expect(await dropdownWrapper.isVisible()).toBe(false);
        await trigger.click();
        await page.waitForChanges();
        expect(await dropdownWrapper.isVisible()).toBe(true);
        expect(calciteDropdownOpen).toHaveReceivedEventTimes(1);
        expect(calciteDropdownClose).toHaveReceivedEventTimes(0);
        expect(await getFocusedElementProp(page, "id")).toBe("item-2");

        await element.press("Tab");
        await page.waitForChanges();
        expect(await getFocusedElementProp(page, "id")).toBe("button-1");
        expect(calciteDropdownClose).toHaveReceivedEventTimes(1);
        expect(await dropdownWrapper.isVisible()).toBe(false);
      });

      it("closes dropdown and focuses the trigger on Shift+Tab", async () => {
        const page = await newE2EPage();
        await page.setContent(html`
          <calcite-dropdown>
            <calcite-action slot="trigger" id="trigger">Open dropdown</calcite-action>
            <calcite-dropdown-group selection-mode="single">
              <calcite-dropdown-item id="item-1"> Dropdown Item Content</calcite-dropdown-item>
              <calcite-dropdown-item id="item-2" selected> Dropdown Item Content</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
          <calcite-button id="button-1">Click</calcite-button>
        `);
        const element = await page.find("calcite-dropdown");
        const trigger = await element.find("calcite-action[slot='trigger'] >>> button");
        const dropdownWrapper = await page.find(`calcite-dropdown >>> .calcite-dropdown-wrapper`);
        const calciteDropdownClose = await element.spyOnEvent("calciteDropdownClose");
        const calciteDropdownOpen = await element.spyOnEvent("calciteDropdownOpen");

        expect(await dropdownWrapper.isVisible()).toBe(false);
        await trigger.click();
        await page.waitForChanges();
        expect(await dropdownWrapper.isVisible()).toBe(true);
        expect(calciteDropdownOpen).toHaveReceivedEventTimes(1);
        expect(calciteDropdownClose).toHaveReceivedEventTimes(0);
        expect(await getFocusedElementProp(page, "id")).toBe("item-2");

        await page.keyboard.down("Shift");
        await element.press("Tab");
        await page.keyboard.up("Shift");
        await page.waitForChanges();
        expect(await getFocusedElementProp(page, "id")).toBe("trigger");
        expect(calciteDropdownClose).toHaveReceivedEventTimes(1);
        expect(await dropdownWrapper.isVisible()).toBe(false);
      });
    });

    it("closes existing open dropdown when opened", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-dropdown id="dropdown-1">
          <calcite-button id="trigger" slot="trigger">Open dropdown</calcite-button>
          <calcite-dropdown-group id="group-1" selection-mode="single">
            <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
            <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
            <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
        <calcite-dropdown id="dropdown-2">
          <calcite-button id="trigger" slot="trigger">Open dropdown</calcite-button>
          <calcite-dropdown-group id="group-1" selection-mode="single">
            <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
            <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
            <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>`);

      const element1 = await page.find("calcite-dropdown[id='dropdown-1']");
      const element2 = await page.find("calcite-dropdown[id='dropdown-2']");
      const trigger1 = await element1.find("#trigger");
      const trigger2 = await element2.find("#trigger");
      const dropdownWrapper1 = await page.find("calcite-dropdown[id='dropdown-1'] >>> .calcite-dropdown-wrapper");
      const dropdownWrapper2 = await page.find("calcite-dropdown[id='dropdown-2'] >>> .calcite-dropdown-wrapper");
      expect(await dropdownWrapper1.isVisible()).toBe(false);
      expect(await dropdownWrapper2.isVisible()).toBe(false);
      await trigger1.click();
      await page.waitForChanges();
      expect(await dropdownWrapper1.isVisible()).toBe(true);
      expect(await dropdownWrapper2.isVisible()).toBe(false);
      await trigger2.click();
      await page.waitForChanges();
      expect(await dropdownWrapper1.isVisible()).toBe(false);
      expect(await dropdownWrapper2.isVisible()).toBe(true);
    });

    it("focus is returned to trigger after close", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-dropdown>
          <calcite-button id="trigger" slot="trigger">Open dropdown</calcite-button>
          <calcite-dropdown-group id="group-1" selection-mode="single">
            <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
            <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
            <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      `);

      const element = await page.find("calcite-dropdown");
      const trigger = await element.find("#trigger");
      const item1 = await element.find("calcite-dropdown-item[id='item-1']");
      const dropdownWrapper = await page.find("calcite-dropdown >>> .calcite-dropdown-wrapper");
      expect(await dropdownWrapper.isVisible()).toBe(false);
      await trigger.click();
      await page.waitForChanges();
      expect(await dropdownWrapper.isVisible()).toBe(true);
      await item1.click();
      await page.waitForChanges();
      expect(await dropdownWrapper.isVisible()).toBe(false);
      expect(await page.evaluate(() => document.activeElement.id)).toEqual("trigger");
    });

    it("accepts multiple triggers", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-dropdown>
          <calcite-button class="trigger" slot="trigger">Open dropdown</calcite-button>
          <calcite-icon class="trigger" icon="caretDown" scale="s" slot="trigger"></calcite-icon>
          <calcite-dropdown-group id="group-1" selection-mode="single">
            <calcite-dropdown-item id="item-1"> Dropdown Item Content </calcite-dropdown-item>
            <calcite-dropdown-item id="item-2" selected> Dropdown Item Content </calcite-dropdown-item>
            <calcite-dropdown-item id="item-3"> Dropdown Item Content </calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      `);

      const element = await page.find("calcite-dropdown");
      const trigger = await element.findAll(".trigger");
      const dropdownWrapper = await page.find("calcite-dropdown >>> .calcite-dropdown-wrapper");
      await trigger[0].click();
      expect(await dropdownWrapper.isVisible()).toBe(true);
      await trigger[0].click();
      await page.waitForChanges();
      expect(await dropdownWrapper.isVisible()).toBe(false);
      await page.waitForChanges();
      await trigger[1].click();
      expect(await dropdownWrapper.isVisible()).toBe(true);
      await trigger[1].click();
      await page.waitForChanges();
      expect(await dropdownWrapper.isVisible()).toBe(false);
    });

    describe("accessible", () => {
      accessible(dedent`${dropdownSelectionModeContent}`);
    });

    it("correct role and aria properties are applied based on selection type", async () => {
      const page = await newE2EPage();
      await page.setContent(dedent`${dropdownSelectionModeContent}`);
      await page.waitForChanges();

      const element = await page.find("calcite-dropdown");
      const group1 = await element.find("calcite-dropdown-group[id='group-1']");
      const group2 = await element.find("calcite-dropdown-group[id='group-2']");
      const group3 = await element.find("calcite-dropdown-group[id='group-3']");
      const item1 = await element.find("calcite-dropdown-item[id='item-1']");
      const item2 = await element.find("calcite-dropdown-item[id='item-2']");
      const item3 = await element.find("calcite-dropdown-item[id='item-3']");
      const item4 = await element.find("calcite-dropdown-item[id='item-4']");
      const item5 = await element.find("calcite-dropdown-item[id='item-5']");
      const item6 = await element.find("calcite-dropdown-item[id='item-6']");
      const item7 = await element.find("calcite-dropdown-item[id='item-7']");

      expect(group1).toEqualAttribute("role", "group");
      expect(group2).toEqualAttribute("role", "group");
      expect(group3).toEqualAttribute("role", "group");

      expect(item1).toEqualAttribute("role", "menuitemcheckbox");
      expect(item1).toEqualAttribute("aria-checked", "false");

      expect(item2).toEqualAttribute("role", "menuitemcheckbox");
      expect(item2).toEqualAttribute("aria-checked", "true");

      expect(item3).toEqualAttribute("role", "menuitemcheckbox");
      expect(item3).toEqualAttribute("aria-checked", "true");

      expect(item4).toEqualAttribute("role", "menuitemradio");
      expect(item4).toEqualAttribute("aria-checked", "false");

      expect(item5).toEqualAttribute("role", "menuitemradio");
      expect(item5).toEqualAttribute("aria-checked", "true");

      expect(item6).toEqualAttribute("role", "menuitem");
      expect(item6).not.toHaveAttribute("aria-checked");

      expect(item7).not.toHaveAttribute("role");
      expect(item7).not.toHaveAttribute("aria-checked");
    });

    it("item selection should work when placed inside shadow DOM (#992)", async () => {
      const wrappedDropdownTemplateHTML = html`
        <calcite-dropdown close-on-select-disabled>
          <calcite-button slot="trigger">Open</calcite-button>
          <calcite-dropdown-group selection-mode="single">
            <calcite-dropdown-item id="item-1" selected>1</calcite-dropdown-item>
            <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
            <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
          </calcite-dropdown-group>
        </calcite-dropdown>
      `;

      const page = await newE2EPage({
        // load page with the dropdown template,
        // so they're available in the browser-evaluated fn below
        html: wrappedDropdownTemplateHTML,
      });
      await page.waitForChanges();

      const wrapperName = "dropdown-wrapping-component";

      await page.evaluate(
        async (templateHTML: string, wrapperName: string): Promise<void> => {
          customElements.define(
            wrapperName,
            class extends HTMLElement {
              constructor() {
                super();
              }

              connectedCallback(): void {
                this.attachShadow({ mode: "open" }).innerHTML = templateHTML;
              }
            }
          );

          document.body.innerHTML = `<${wrapperName}></${wrapperName}>`;

          const wrapper = document.querySelector(wrapperName);
          wrapper.shadowRoot.querySelector<HTMLCalciteDropdownItemElement>("#item-3").click();
        },
        wrappedDropdownTemplateHTML,
        wrapperName
      );

      await page.waitForChanges();

      const finalSelectedItem = await page.evaluate(async (wrapperName: string): Promise<string> => {
        const wrapper = document.querySelector(wrapperName);
        return wrapper.shadowRoot.querySelector("calcite-dropdown-item[selected]").id;
      }, wrapperName);

      await expect(finalSelectedItem).toBe("item-3");
    });

    it.skip("dropdown should not overflow when wrapped inside a tab #3007", async () => {
      const page = await newE2EPage({
        html: html`<calcite-tabs>
          <calcite-tab-nav slot="title-group">
            <calcite-tab-title is-active>First tab</calcite-tab-title>
          </calcite-tab-nav>
          <calcite-tab is-active>
            <calcite-dropdown>
              <calcite-button slot="trigger" class="dropdown">Dropdown</calcite-button>
              <calcite-dropdown-group group-title="Select one">
                <calcite-dropdown-item>First</calcite-dropdown-item>
                <calcite-dropdown-item>Second</calcite-dropdown-item>
              </calcite-dropdown-group>
            </calcite-dropdown>
          </calcite-tab>
        </calcite-tabs>`,
      });
      await page.waitForChanges();

      const button = await page.find("calcite-button");

      await button.click();
      await page.waitForChanges();

      expect(
        await page.$eval("calcite-dropdown", (dropdown) => {
          // check whether the element is overflown, ref :https://stackoverflow.com/questions/9333379/check-if-an-elements-content-is-overflowing
          const { clientWidth, clientHeight, scrollWidth, scrollHeight } = dropdown;
          return scrollHeight > clientHeight || scrollWidth > clientWidth;
        })
      ).toBe(false);
    });

    it("dropdown wrapper should have height when filter results empty and combined with a PickList in Panel  #3048", async () => {
      const page = await newE2EPage({
        html: html`<calcite-panel heading="Issue #3048">
          <calcite-pick-list filter-enabled>
            <calcite-dropdown slot="menu-actions" placement="bottom-end" type="click">
              <calcite-action slot="trigger" title="Sort" icon="sort-descending"> </calcite-action>
              <calcite-dropdown-group selection-mode="single">
                <calcite-dropdown-item>Display name</calcite-dropdown-item>
                <calcite-dropdown-item>Type</calcite-dropdown-item>
              </calcite-dropdown-group>
            </calcite-dropdown>
            <calcite-pick-list-item label="calcite" description="calcite!"> </calcite-pick-list-item>
            <calcite-pick-list-item label="calcite" description="calcite"> </calcite-pick-list-item>
          </calcite-pick-list>
        </calcite-panel>`,
      });
      await page.waitForChanges();

      const dropdownContentHeight = await (
        await page.find("calcite-dropdown >>> .calcite-dropdown-wrapper")
      ).getComputedStyle();

      await page.evaluate(() => {
        const filter = document.querySelector(`calcite-pick-list`).shadowRoot.querySelector("calcite-filter");
        const filterInput = filter.shadowRoot.querySelector("calcite-input");
        filterInput.value = "numbers";
      });

      expect(dropdownContentHeight.height).toBe("72px");
    });

    describe("owns a floating-ui", () => {
      floatingUIOwner(
        html`
          <calcite-dropdown>
            <calcite-button slot="trigger">Open</calcite-button>
            <calcite-dropdown-group selection-mode="single">
              <calcite-dropdown-item id="item-1" selected>1</calcite-dropdown-item>
              <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
              <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
            </calcite-dropdown-group>
          </calcite-dropdown>
        `,
        "open",
        {
          shadowSelector: ".calcite-dropdown-wrapper",
        }
      );
    });
  });
});
