// @ts-strict-ignore
import { E2EElement, E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { html } from "../../../support/formatting";
import {
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  labelable,
  reflects,
  renders,
  themed,
} from "../../tests/commonTests";
import { findAll, GlobalTestProps } from "../../tests/utils/puppeteer";
import type { SegmentedControl } from "./segmented-control";
import { CSS } from "./resources";

describe("calcite-segmented-control", () => {
  describe("defaults", () => {
    defaults("calcite-segmented-control", [
      {
        propertyName: "appearance",
        defaultValue: "solid",
      },
      {
        propertyName: "layout",
        defaultValue: "horizontal",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },

      {
        propertyName: "width",
        defaultValue: "auto",
      },
      {
        propertyName: "status",
        defaultValue: "idle",
      },
      {
        propertyName: "validationIcon",
        defaultValue: undefined,
      },
      {
        propertyName: "validationMessage",
        defaultValue: undefined,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-segmented-control", [
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "layout",
        value: "horizontal",
      },
      {
        propertyName: "appearance",
        value: "solid",
      },
      {
        propertyName: "width",
        value: "auto",
      },
      {
        propertyName: "status",
        value: "invalid",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ]);
  });

  describe("renders", () => {
    renders("calcite-segmented-control", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-segmented-control");
  });

  describe("labelable", () => {
    labelable(
      html`<calcite-segmented-control>
        <calcite-segmented-control-item value="1"></calcite-segmented-control-item>
        <calcite-segmented-control-item value="2"></calcite-segmented-control-item>
        <calcite-segmented-control-item value="3"></calcite-segmented-control-item>
      </calcite-segmented-control>`,
      { focusTargetSelector: "calcite-segmented-control-item" },
    );
  });

  describe("disabled", () => {
    disabled(
      html`<calcite-segmented-control>
        <calcite-segmented-control-item value="1"></calcite-segmented-control-item>
        <calcite-segmented-control-item value="2"></calcite-segmented-control-item>
        <calcite-segmented-control-item value="3"></calcite-segmented-control-item>
      </calcite-segmented-control>`,
      { focusTarget: "child" },
    );
  });

  it("sets value from selected item", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-segmented-control>
        <calcite-segmented-control-item id="child-1" value="1" checked>one</calcite-segmented-control-item>
        <calcite-segmented-control-item id="child-2" value="2">two</calcite-segmented-control-item>
        <calcite-segmented-control-item id="child-3" value="3">three</calcite-segmented-control-item>
      </calcite-segmented-control>
    `);

    const element = await page.find("calcite-segmented-control");
    const value = await element.getProperty("value");

    expect(value).toBe("1");
  });

  it("does not require an item to be checked", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-segmented-control>
          <calcite-segmented-control-item value="1"></calcite-segmented-control-item>
          <calcite-segmented-control-item value="2"></calcite-segmented-control-item>
          <calcite-segmented-control-item value="3"></calcite-segmented-control-item>
        </calcite-segmented-control>`,
    );
    const element = await page.find("calcite-segmented-control");

    const selected = await element.getProperty("selectedItem");
    expect(selected).not.toBeDefined();
  });

  it("when multiple items are checked, last one wins", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-segmented-control>
          <calcite-segmented-control-item value="1" checked>one</calcite-segmented-control-item>
          <calcite-segmented-control-item value="2" checked>two</calcite-segmented-control-item>
          <calcite-segmented-control-item value="3" checked>three</calcite-segmented-control-item>
        </calcite-segmented-control>`,
    );
    const element = await page.find("calcite-segmented-control");

    const selected = await element.getProperty("selectedItem");
    expect(selected).toBeDefined();

    const selectedItems = await findAll(element, "calcite-segmented-control-item[checked]");
    expect(selectedItems).toHaveLength(1);

    const selectedValue = await selectedItems[0].getProperty("value");
    expect(selectedValue).toBe("3");
  });

  async function getSelectedItemValue(page: E2EPage): Promise<string> {
    return page.$eval(
      "calcite-segmented-control",
      (segmentedControl: SegmentedControl["el"]) => segmentedControl.selectedItem.value,
    );
  }

  it("allows items to be selected", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-segmented-control>
          <calcite-segmented-control-item value="1">one</calcite-segmented-control-item>
          <calcite-segmented-control-item value="2">two</calcite-segmented-control-item>
          <calcite-segmented-control-item value="3">three</calcite-segmented-control-item>
        </calcite-segmented-control>`,
    );
    const element = await page.find("calcite-segmented-control");
    const eventSpy = await element.spyOnEvent("calciteSegmentedControlChange");
    expect(eventSpy).not.toHaveReceivedEvent();
    const [first, second, third] = await findAll(page, "calcite-segmented-control-item");

    type TestWindow = GlobalTestProps<{
      eventTimeValues: string[];
    }>;

    // We use the browser context to assert the value at the time of event emit.
    // Puppeteer APIs likely don't allow this due to async timing between calls.
    await page.evaluate(() => {
      (window as TestWindow).eventTimeValues = [];
      document.body.addEventListener("calciteSegmentedControlChange", (event: CustomEvent) => {
        (window as TestWindow).eventTimeValues.push((event.target as SegmentedControl["el"]).value);
      });
    });

    await first.click();
    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(await getSelectedItemValue(page)).toBe("1");

    // does not emit from programmatic changes
    third.setProperty("checked", true);
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(await getSelectedItemValue(page)).toBe("3");

    await second.click();
    expect(eventSpy).toHaveReceivedEventTimes(2);
    expect(await getSelectedItemValue(page)).toBe("2");

    expect(await page.evaluate(() => (window as TestWindow).eventTimeValues)).toEqual(["1", "2"]);
  });

  it("updates selection when cleared with undefined", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-segmented-control>
            <calcite-segmented-control-item value="1" checked>one</calcite-segmented-control-item>
            <calcite-segmented-control-item value="2">two</calcite-segmented-control-item>
          </calcite-segmented-control>`,
    );
    await page.waitForChanges();
    expect(await getSelectedItemValue(page)).toBe("1");

    const [first, second] = await findAll(page, "calcite-segmented-control-item");
    first.setProperty("checked", undefined);
    second.setProperty("checked", true);
    await page.waitForChanges();
    expect(await getSelectedItemValue(page)).toBe("2");

    first.setProperty("checked", true);
    second.setProperty("checked", undefined);
    await page.waitForChanges();
    expect(await getSelectedItemValue(page)).toBe("1");
  });

  it("does not emit extraneous events (edge case from #3210)", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-segmented-control>
          <calcite-segmented-control-item value="1">one</calcite-segmented-control-item>
          <calcite-segmented-control-item value="2">two</calcite-segmented-control-item>
        </calcite-segmented-control>`,
    );

    const timesCalled = await page.evaluate(async () => {
      let calls = 0;

      const segmentedControl = document.querySelector("calcite-segmented-control");

      const waitForFrame = async () => await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

      document.addEventListener("calciteSegmentedControlChange", () => calls++);

      let [first, second] = Array.from(document.querySelectorAll("calcite-segmented-control-item"));

      first.checked = true;
      await waitForFrame();

      second.click();
      await waitForFrame();

      segmentedControl.remove();
      await waitForFrame();

      document.body.innerHTML = `
      <calcite-segmented-control>
          <calcite-segmented-control-item value="1">one</calcite-segmented-control-item>
          <calcite-segmented-control-item value="2">two</calcite-segmented-control-item>
        </calcite-segmented-control>
      `;
      await waitForFrame();

      [first, second] = Array.from(document.querySelectorAll("calcite-segmented-control-item"));

      second.checked = true;
      await waitForFrame();

      first.click();
      await waitForFrame();

      return calls;
    });

    expect(timesCalled).toBe(2);
  });

  describe("keyboard navigation", () => {
    async function assertArrowSelection(page: E2EPage): Promise<void> {
      const element = await page.find("calcite-segmented-control");
      const spy = await element.spyOnEvent("calciteSegmentedControlChange");

      await tabIntoFirstElement();
      await cycleThroughItemsAndAssertValue("left-right");
      expect(spy).toHaveReceivedEventTimes(6);

      await tabIntoFirstElement();
      await cycleThroughItemsAndAssertValue("up-down");
      expect(spy).toHaveReceivedEventTimes(12);

      async function tabIntoFirstElement(): Promise<void> {
        const firstElement = await element.find("calcite-segmented-control-item[checked]");
        await firstElement.click();

        await page.keyboard.down("Shift");
        await page.keyboard.press("Tab");
        await page.keyboard.up("Shift");

        await page.keyboard.press("Tab");
      }

      async function cycleThroughItemsAndAssertValue(keys: "left-right" | "up-down"): Promise<void> {
        const [moveBeforeArrowKey, moveAfterArrowKey] =
          keys === "left-right" ? (["ArrowLeft", "ArrowRight"] as const) : (["ArrowUp", "ArrowDown"] as const);

        await element.press(moveAfterArrowKey);
        await page.waitForChanges();

        let selected = await element.find("calcite-segmented-control-item[checked]");
        let value = await selected.getProperty("value");
        expect(value).toBe("2");

        await element.press(moveAfterArrowKey);
        selected = await element.find("calcite-segmented-control-item[checked]");
        value = await selected.getProperty("value");
        expect(value).toBe("3");

        await element.press(moveAfterArrowKey);
        selected = await element.find("calcite-segmented-control-item[checked]");
        value = await selected.getProperty("value");
        expect(value).toBe("1");

        await element.press(moveBeforeArrowKey);
        selected = await element.find("calcite-segmented-control-item[checked]");
        value = await selected.getProperty("value");
        expect(value).toBe("3");

        await element.press(moveBeforeArrowKey);
        selected = await element.find("calcite-segmented-control-item[checked]");
        value = await selected.getProperty("value");
        expect(value).toBe("2");

        await element.press(moveBeforeArrowKey);
        selected = await element.find("calcite-segmented-control-item[checked]");
        value = await selected.getProperty("value");
        expect(value).toBe("1");
      }
    }

    it("selects item with left-right/up-down arrow keys", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-segmented-control>
          <calcite-segmented-control-item value="1" checked>one</calcite-segmented-control-item>
          <calcite-segmented-control-item value="2">two</calcite-segmented-control-item>
          <calcite-segmented-control-item value="3">three</calcite-segmented-control-item>
        </calcite-segmented-control>`,
      );

      await assertArrowSelection(page);
    });

    it("selects item with left-right/up-down arrow keys after adding items programmatically", async () => {
      const page = await newE2EPage();
      await page.setContent(html`<calcite-segmented-control></calcite-segmented-control>`);

      await page.$eval("calcite-segmented-control", (segmentedControl: SegmentedControl["el"]) => {
        segmentedControl.innerHTML = `
        <calcite-segmented-control-item value="1" checked>one</calcite-segmented-control-item>
          <calcite-segmented-control-item value="2">two</calcite-segmented-control-item>
          <calcite-segmented-control-item value="3">three</calcite-segmented-control-item>`;
      });
      await page.waitForChanges();

      await assertArrowSelection(page);
    });
  });

  describe("WAI-ARIA Roles, States, and Properties", () => {
    it(`has a role of 'radiogroup'`, async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-segmented-control></calcite-segmented-control>");
      const element = await page.find("calcite-segmented-control");

      const role = element.getAttribute("role");
      expect(role).toEqualText("radiogroup");
    });
  });

  it("renders requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-segmented-control scale='l' layout='vertical' appearance='outline' width='full'></calcite-segmented-control>",
    );
    const element = await page.find("calcite-segmented-control");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toEqualAttribute("layout", "vertical");
    expect(element).toEqualAttribute("appearance", "outline");
    expect(element).toEqualAttribute("width", "full");
  });

  it("inheritable props: `appearance`, `layout`, and `scale` modified on the parent get passed to items", async () => {
    async function inheritsProps(segmentedControlItems: E2EElement[]): Promise<void> {
      for (const item of segmentedControlItems) {
        expect(await item.getProperty("appearance")).toBe("outline");
        expect(await item.getProperty("layout")).toBe("vertical");
        expect(await item.getProperty("scale")).toBe("l");
      }
    }

    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-segmented-control appearance="outline" layout="vertical" scale="l">
        <calcite-segmented-control-item id="child-1" value="1">one</calcite-segmented-control-item>
        <calcite-segmented-control-item id="child-2" value="2">two</calcite-segmented-control-item>
        <calcite-segmented-control-item id="child-3" value="3">three</calcite-segmented-control-item>
      </calcite-segmented-control>
    `);
    await page.waitForChanges();

    const segmentedControl = await page.find("calcite-segmented-control");

    let segmentedControlItems = await findAll(page, "calcite-segmented-control-item");
    expect(segmentedControlItems).toHaveLength(3);
    await inheritsProps(segmentedControlItems);

    segmentedControl.innerHTML = html`
      <calcite-segmented-control-item id="child-4" value="4">one</calcite-segmented-control-item>
      <calcite-segmented-control-item id="child-5" value="5">two</calcite-segmented-control-item>
    `;
    await page.waitForChanges();

    segmentedControlItems = await findAll(page, "calcite-segmented-control-item");
    expect(segmentedControlItems).toHaveLength(2);
    await inheritsProps(segmentedControlItems);
  });

  describe("setFocus()", () => {
    describe("focuses the first item if there is no selection", () => {
      focusable(
        html`
          <calcite-segmented-control>
            <calcite-segmented-control-item id="child-1" value="1">one</calcite-segmented-control-item>
            <calcite-segmented-control-item id="child-2" value="2">two</calcite-segmented-control-item>
            <calcite-segmented-control-item id="child-3" value="3">three</calcite-segmented-control-item>
          </calcite-segmented-control>
        `,
        {
          focusTargetSelector: "#child-1",
        },
      );
    });

    describe("focuses the selected item", () => {
      focusable(
        html`
          <calcite-segmented-control>
            <calcite-segmented-control-item id="child-1" value="1">one</calcite-segmented-control-item>
            <calcite-segmented-control-item id="child-2" value="2">two</calcite-segmented-control-item>
            <calcite-segmented-control-item id="child-3" value="3" checked>three</calcite-segmented-control-item>
          </calcite-segmented-control>
        `,
        {
          focusTargetSelector: "#child-3",
        },
      );
    });
  });

  describe("is form-associated", () => {
    describe("unselected value", () => {
      formAssociated(
        html`
          <calcite-segmented-control>
            <calcite-segmented-control-item id="child-1" value="1">one</calcite-segmented-control-item>
            <calcite-segmented-control-item id="child-2" value="2">two</calcite-segmented-control-item>
            <calcite-segmented-control-item id="child-3" value="3">three</calcite-segmented-control-item>
          </calcite-segmented-control>
        `,
        { testValue: 2, validation: true, changeValueKeys: ["Space"] },
      );
    });

    describe("selected-value", () => {
      formAssociated(
        html`
          <calcite-segmented-control>
            <calcite-segmented-control-item id="child-1" value="1">one</calcite-segmented-control-item>
            <calcite-segmented-control-item id="child-2" value="2" checked>two</calcite-segmented-control-item>
            <calcite-segmented-control-item id="child-3" value="3">three</calcite-segmented-control-item>
          </calcite-segmented-control>
        `,
        { testValue: 2 },
      );
    });
  });

  describe("theme", () => {
    themed("calcite-segmented-control", {
      "--calcite-segmented-control-border-color": {
        shadowSelector: `.${CSS.itemWrapper}`,
        targetProp: "outlineColor",
      },
    });
  });
});
