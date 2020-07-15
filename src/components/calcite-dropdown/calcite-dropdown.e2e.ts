import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-dropdown", () => {
  /**
   * Test helper for selected calcite-dropdown items. Expects items to have IDs to test against.
   */
  async function assertSelectedItems(
    page: E2EPage,
    expectedItemIds: string[]
  ): Promise<void> {
    const selectedItemIds = await page.evaluate(() => {
      const dropdown = document.querySelector<HTMLCalciteDropdownElement>(
        "calcite-dropdown"
      );
      return dropdown.selectedItems.map((item) => item.id);
    });

    expect(selectedItemIds).toHaveLength(expectedItemIds.length);

    expectedItemIds.forEach((itemId, index) =>
      expect(selectedItemIds[index]).toEqual(itemId)
    );
  }

  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    expect(element).toHaveAttribute(HYDRATED_ATTR);
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("width", "m");
    expect(element).toEqualAttribute("alignment", "start");
    expect(group1).toEqualAttribute("selection-mode", "single");
  });

  it("renders default props when invalid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown alignment="zip" scale="zop" theme="zut" width="zat">
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="zap">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("width", "m");
    expect(element).toEqualAttribute("alignment", "start");
    expect(group1).toEqualAttribute("selection-mode", "single");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown alignment="end" scale="l" width="l" theme="dark">
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="multi">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toEqualAttribute("width", "l");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toEqualAttribute("alignment", "end");
    expect(group1).toEqualAttribute("selection-mode", "multi");
  });

  it("renders icons if requested and does not render icons if not requested", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group>
    <calcite-dropdown-item icon-start="grid" id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item icon-end="grid" id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item icon-start="grid" icon-end="grid" id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-4">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const item1IconStart = await page.find(
      "calcite-dropdown-item[id='item-1'] >>> .dropdown-item-icon-start"
    );
    const item1IconEnd = await page.find(
      "calcite-dropdown-item[id='item-1'] >>> .dropdown-item-icon-end"
    );
    const item2IconStart = await page.find(
      "calcite-dropdown-item[id='item-2'] >>> .dropdown-item-icon-start"
    );
    const item2IconEnd = await page.find(
      "calcite-dropdown-item[id='item-2'] >>> .dropdown-item-icon-end"
    );
    const item3IconStart = await page.find(
      "calcite-dropdown-item[id='item-3'] >>> .dropdown-item-icon-start"
    );
    const item3IconEnd = await page.find(
      "calcite-dropdown-item[id='item-3'] >>> .dropdown-item-icon-end"
    );
    const item4IconStart = await page.find(
      "calcite-dropdown-item[id='item-4'] >>> .dropdown-item-icon-start"
    );
    const item4IconEnd = await page.find(
      "calcite-dropdown-item[id='item-4'] >>> .dropdown-item-icon-end"
    );
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
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" group-title="My Group 1 Title">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-group>
    <calcite-dropdown-group id="group-2">
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-4" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const group1Title = await page.find(
      "calcite-dropdown-group[id='group-1'] >>> .dropdown-title"
    );
    const group2Title = await page.find(
      "calcite-dropdown-group[id='group-2'] >>> .dropdown-title"
    );
    expect(group1Title).not.toBeNull();
    expect(group2Title).toBeNull();
  });

  it("renders active item based on attribute in dom", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    expect(item1).not.toHaveAttribute("active");
    expect(item2).toHaveAttribute("active");
    expect(item3).not.toHaveAttribute("active");
  });

  it("renders multiple active items when group is in multi selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="multi">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    const itemChangeSpy = await element.spyOnEvent("calciteDropdownSelect");
    expect(group1).toEqualAttribute("selection-mode", "multi");
    await trigger.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-2"]);
    await item1.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-2"]);
    await trigger.click();
    await page.waitForChanges();
    await item2.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1"]);
    await trigger.click();
    await page.waitForChanges();
    await item3.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3"]);
    expect(item1).toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
    expect(itemChangeSpy).toHaveReceivedEventTimes(3);
  });

  it("renders just one active item when group is in single selection mode", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="single">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    const itemChangeSpy = await element.spyOnEvent("calciteDropdownSelect");
    expect(group1).toEqualAttribute("selection-mode", "single");
    await assertSelectedItems(page, ["item-2"]);
    await trigger.click();
    await page.waitForChanges();
    await item1.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1"]);
    await trigger.click();
    await page.waitForChanges();
    await item3.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-3"]);

    expect(item1).not.toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
    expect(itemChangeSpy).toHaveReceivedEventTimes(2);
  });

  it("renders no active item when group is in none selection mode (and removes any active state set in dom)", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="none">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const group1 = await element.find("calcite-dropdown-group[id='group-1']");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item2 = await element.find("calcite-dropdown-item[id='item-2']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    const itemChangeSpy = await element.spyOnEvent("calciteDropdownSelect");
    expect(group1).toEqualAttribute("selection-mode", "none");
    await assertSelectedItems(page, []);
    await trigger.click();
    await item1.click();
    await page.waitForChanges();
    await assertSelectedItems(page, []);
    await trigger.click();
    await item2.click();
    await page.waitForChanges();
    await assertSelectedItems(page, []);
    await trigger.click();
    await item3.click();
    await page.waitForChanges();
    await assertSelectedItems(page, []);
    expect(item1).not.toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).not.toHaveAttribute("active");
    expect(itemChangeSpy).toHaveReceivedEventTimes(3);
  });

  it("renders the correct active state when parent contains groups of assorted selection modes", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button slot="dropdown-trigger" id="trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="multi">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group id="group-2" selection-mode="single">
    <calcite-dropdown-item id="item-4">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-5" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-6">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    <calcite-dropdown-group id="group-3" selection-mode="none">
    <calcite-dropdown-item id="item-7">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-8">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-9">
    Dropdown Item Content
    </calcite-dropdown-item>
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

    expect(group1).toEqualAttribute("selection-mode", "multi");
    expect(group2).toEqualAttribute("selection-mode", "single");
    expect(group3).toEqualAttribute("selection-mode", "none");
    await assertSelectedItems(page, ["item-2", "item-5"]);

    await trigger.click();
    await page.waitForChanges();
    await item1.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-2", "item-5"]);
    await trigger.click();
    await page.waitForChanges();
    await item2.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-5"]);
    await trigger.click();
    await page.waitForChanges();
    await item3.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3", "item-5"]);
    await trigger.click();
    await page.waitForChanges();
    await item4.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3", "item-4"]);
    await trigger.click();
    await page.waitForChanges();
    await item6.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3", "item-6"]);
    await trigger.click();
    await page.waitForChanges();
    await item7.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3", "item-6"]);
    await trigger.click();
    await page.waitForChanges();
    await item9.click();
    await page.waitForChanges();
    await assertSelectedItems(page, ["item-1", "item-3", "item-6"]);

    expect(item1).toHaveAttribute("active");
    expect(item2).not.toHaveAttribute("active");
    expect(item3).toHaveAttribute("active");
    expect(item4).not.toHaveAttribute("active");
    expect(item5).not.toHaveAttribute("active");
    expect(item6).toHaveAttribute("active");
    expect(item7).not.toHaveAttribute("active");
    expect(item8).not.toHaveAttribute("active");
    expect(item9).not.toHaveAttribute("active");
    expect(itemChangeSpy).toHaveReceivedEventTimes(7);
  });

  it("renders a calcite-dropdown-item with child anchor link with passed attributes if href is present", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-dropdown>
      <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
      <calcite-dropdown-group id="group-1" selection-mode="none">
      <calcite-dropdown-item id="item-1">
      Dropdown Item Content
      </calcite-dropdown-item>
      <calcite-dropdown-item id="item-2" href="google.com" rel="noopener noreferrer" target="_blank">
      Dropdown Item Content
      </calcite-dropdown-item>
      <calcite-dropdown-item id="item-3">
      Dropdown Item Content
      </calcite-dropdown-item>
      </calcite-dropdown-group>
      </calcite-dropdown>`
    );
    const elementAsLink = await page.find(
      "calcite-dropdown-item[id='item-2'] >>> a"
    );
    expect(elementAsLink).not.toBeNull();
    expect(elementAsLink).toEqualAttribute("href", "google.com");
    expect(elementAsLink).toEqualAttribute("rel", "noopener noreferrer");
    expect(elementAsLink).toEqualAttribute("target", "_blank");
  });

  it("should focus the first item on open when there is none", async () => {
    const page = await newE2EPage({
      html: `<calcite-dropdown>
    <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
    <calcite-dropdown-group>
      <calcite-dropdown-item id="1">1</calcite-dropdown-item>
      <calcite-dropdown-item id="2">2</calcite-dropdown-item>
      <calcite-dropdown-item id="3">3</calcite-dropdown-item>
      <calcite-dropdown-item id="4">4</calcite-dropdown-item>
      </calcite-dropdown-group>
      </calcite-dropdown>`,
    });

    const element = await page.find("calcite-dropdown");
    await element.click();
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toEqual("1");
  });

  it("should focus the first active item on open", async () => {
    const page = await newE2EPage({
      html: `<calcite-dropdown>
        <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
        <calcite-dropdown-group>
          <calcite-dropdown-item id="item-1">1</calcite-dropdown-item>
          <calcite-dropdown-item id="item-2">2</calcite-dropdown-item>
          <calcite-dropdown-item id="item-3" active>3</calcite-dropdown-item>
          <calcite-dropdown-item id="item-4">4</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`,
    });

    const element = await page.find("calcite-dropdown");
    await element.click();
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toEqual(
      "item-3"
    );
  });

  it("should focus the first active item on open", async () => {
    const page = await newE2EPage({
      html: `<calcite-dropdown>
        <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
        <calcite-dropdown-group selection-mode="multi">
          <calcite-dropdown-item id="item-1">1</calcite-dropdown-item>
          <calcite-dropdown-item id="item-2" active>2</calcite-dropdown-item>
          <calcite-dropdown-item id="item-3">3</calcite-dropdown-item>
          <calcite-dropdown-item id="item-4" active>4</calcite-dropdown-item>
        </calcite-dropdown-group>
      </calcite-dropdown>`,
    });

    const element = await page.find("calcite-dropdown");
    await element.click();
    await page.waitForChanges();

    expect(await page.evaluate(() => document.activeElement.id)).toEqual(
      "item-2"
    );
  });

  describe("scrolling", () => {
    it("focused item should be in view when long", async () => {
      const page = await newE2EPage();

      await page.setContent(`<calcite-dropdown>
      <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
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
        <calcite-dropdown-item id="item-50" active>50</calcite-dropdown-item>
      </calcite-dropdown-group>
    </calcite-dropdown>`);
      await page.waitForChanges();

      const element = await page.find("calcite-dropdown");
      await element.click();
      await page.waitForChanges();

      expect(await page.evaluate(() => document.activeElement.id)).toEqual(
        "item-50"
      );

      const item = await page.find("#item-50");

      expect(await item.isIntersectingViewport()).toBe(true);
    });

    it("control max items displayed", async () => {
      const page = await newE2EPage();

      const maxItems = 7;

      await page.setContent(`<calcite-dropdown max-items="${maxItems}">
    <calcite-button slot="dropdown-trigger">Open Dropdown</calcite-button>
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
  </calcite-dropdown>`);
      await page.waitForChanges();

      const element = await page.find("calcite-dropdown");
      await element.click();
      await page.waitForChanges();

      const items = await page.findAll("calcite-dropdown-item");

      for (let i = 0; i < items.length; i++) {
        expect(await items[i].isIntersectingViewport()).toBe(i <= maxItems);
      }
    });
  });

  it("closes when a selection is made", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="single">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const dropdownWrapper = await page.find(
      "calcite-dropdown >>> .calcite-dropdown-wrapper"
    );
    expect(await dropdownWrapper.isVisible()).toBe(false);
    await trigger.click();
    await page.waitForChanges();
    expect(await dropdownWrapper.isVisible()).toBe(true);
    await item1.click();
    await page.waitForChanges();
    expect(await dropdownWrapper.isVisible()).toBe(false);
  });

  it("remains open when disable-close-on-select is requested and selected item is not in a selection-mode:none group", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown disable-close-on-select>
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="single">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const item3 = await element.find("calcite-dropdown-item[id='item-3']");
    const dropdownWrapper = await page.find(
      "calcite-dropdown >>> .calcite-dropdown-wrapper"
    );
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

  it("closes when disable-close-on-select is requested and selected item is in a selection-mode:none group", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown disable-close-on-select>
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="none">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const dropdownWrapper = await page.find(
      "calcite-dropdown >>> .calcite-dropdown-wrapper"
    );
    expect(await dropdownWrapper.isVisible()).toBe(false);
    await trigger.click();
    await page.waitForChanges();
    expect(await dropdownWrapper.isVisible()).toBe(true);
    await item1.click();
    await page.waitForChanges();
    expect(await dropdownWrapper.isVisible()).toBe(false);
  });

  it("closes existing open dropdown when opened", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown id="dropdown-1">
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="single">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>
    <calcite-dropdown id="dropdown-2">
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="single">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>`);

    const element1 = await page.find("calcite-dropdown[id='dropdown-1']");
    const element2 = await page.find("calcite-dropdown[id='dropdown-2']");
    const trigger1 = await element1.find("#trigger");
    const trigger2 = await element2.find("#trigger");
    const dropdownWrapper1 = await page.find(
      "calcite-dropdown[id='dropdown-1'] >>> .calcite-dropdown-wrapper"
    );
    const dropdownWrapper2 = await page.find(
      "calcite-dropdown[id='dropdown-2'] >>> .calcite-dropdown-wrapper"
    );
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
    await page.setContent(`
    <calcite-dropdown>
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="single">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>
   `);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const item1 = await element.find("calcite-dropdown-item[id='item-1']");
    const dropdownWrapper = await page.find(
      "calcite-dropdown >>> .calcite-dropdown-wrapper"
    );
    expect(await dropdownWrapper.isVisible()).toBe(false);
    await trigger.click();
    await page.waitForChanges();
    expect(await dropdownWrapper.isVisible()).toBe(true);
    await item1.click();
    await page.waitForChanges();
    expect(await dropdownWrapper.isVisible()).toBe(false);
    expect(await page.evaluate(() => document.activeElement.id)).toEqual(
      "trigger"
    );
  });

  it("when disabled, clicks on slotted dropdown trigger do not open dropdown", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-dropdown disabled>
    <calcite-button id="trigger" slot="dropdown-trigger">Open dropdown</calcite-button>
    <calcite-dropdown-group id="group-1" selection-mode="single">
    <calcite-dropdown-item id="item-1">
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-2" active>
    Dropdown Item Content
    </calcite-dropdown-item>
    <calcite-dropdown-item id="item-3">
    Dropdown Item Content
    </calcite-dropdown-item>
    </calcite-dropdown-group>
    </calcite-dropdown>
   `);

    const element = await page.find("calcite-dropdown");
    const trigger = await element.find("#trigger");
    const dropdownWrapper = await page.find(
      "calcite-dropdown >>> .calcite-dropdown-wrapper"
    );
    expect(await dropdownWrapper.isVisible()).toBe(false);
    await trigger.click();
    await page.waitForChanges();
    expect(await dropdownWrapper.isVisible()).toBe(false);
  });
});
