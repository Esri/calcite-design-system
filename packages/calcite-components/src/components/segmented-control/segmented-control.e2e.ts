import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { html } from "../../../support/formatting";
import { disabled, focusable, formAssociated, hidden, labelable, renders } from "../../tests/commonTests";

describe("calcite-segmented-control", () => {
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
      { focusTargetSelector: "calcite-segmented-control-item" }
    );
  });

  describe("disabled", () => {
    disabled(
      html`<calcite-segmented-control>
        <calcite-segmented-control-item value="1"></calcite-segmented-control-item>
        <calcite-segmented-control-item value="2"></calcite-segmented-control-item>
        <calcite-segmented-control-item value="3"></calcite-segmented-control-item>
      </calcite-segmented-control>`,
      { focusTarget: "child" }
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
        </calcite-segmented-control>`
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
        </calcite-segmented-control>`
    );
    const element = await page.find("calcite-segmented-control");

    const selected = await element.getProperty("selectedItem");
    expect(selected).toBeDefined();

    const selectedItems = await element.findAll("calcite-segmented-control-item[checked]");
    expect(selectedItems).toHaveLength(1);

    const selectedValue = await selectedItems[0].getProperty("value");
    expect(selectedValue).toBe("3");
  });

  it("allows items to be selected", async () => {
    async function getSelectedItemValue(page: E2EPage): Promise<string> {
      return page.$eval(
        "calcite-segmented-control",
        (segmentedControl: HTMLCalciteSegmentedControlElement) => segmentedControl.selectedItem.value
      );
    }

    const page = await newE2EPage();
    await page.setContent(
      `<calcite-segmented-control>
          <calcite-segmented-control-item value="1">one</calcite-segmented-control-item>
          <calcite-segmented-control-item value="2">two</calcite-segmented-control-item>
          <calcite-segmented-control-item value="3">three</calcite-segmented-control-item>
        </calcite-segmented-control>`
    );
    const element = await page.find("calcite-segmented-control");
    const eventSpy = await element.spyOnEvent("calciteSegmentedControlChange");
    expect(eventSpy).not.toHaveReceivedEvent();
    const [first, second, third] = await page.findAll("calcite-segmented-control-item");

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
  });

  it("does not emit extraneous events (edge case from #3210)", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-segmented-control>
          <calcite-segmented-control-item value="1">one</calcite-segmented-control-item>
          <calcite-segmented-control-item value="2">two</calcite-segmented-control-item>
        </calcite-segmented-control>`
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
    it("selects item with left and arrow keys", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-segmented-control>
          <calcite-segmented-control-item value="1" checked>one</calcite-segmented-control-item>
          <calcite-segmented-control-item value="2">two</calcite-segmented-control-item>
          <calcite-segmented-control-item value="3">three</calcite-segmented-control-item>
        </calcite-segmented-control>`
      );
      const element = await page.find("calcite-segmented-control");
      const spy = await element.spyOnEvent("calciteSegmentedControlChange");

      const firstElement = await element.find("calcite-segmented-control-item[checked]");
      await firstElement.click();
      await element.press("ArrowRight");
      await page.waitForChanges();

      let selected = await element.find("calcite-segmented-control-item[checked]");
      let value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowRight");
      selected = await element.find("calcite-segmented-control-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowRight");
      selected = await element.find("calcite-segmented-control-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      await element.press("ArrowLeft");
      selected = await element.find("calcite-segmented-control-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowLeft");
      selected = await element.find("calcite-segmented-control-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowLeft");
      selected = await element.find("calcite-segmented-control-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      expect(spy).toHaveReceivedEventTimes(6);
    });

    it("selects item with up and down keys", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-segmented-control>
          <calcite-segmented-control-item value="1" checked>one</calcite-segmented-control-item>
          <calcite-segmented-control-item value="2">two</calcite-segmented-control-item>
          <calcite-segmented-control-item value="3">three</calcite-segmented-control-item>
        </calcite-segmented-control>`
      );
      const element = await page.find("calcite-segmented-control");
      const spy = await element.spyOnEvent("calciteSegmentedControlChange");

      const firstElement = await element.find("calcite-segmented-control-item[checked]");
      await firstElement.click();
      await element.press("ArrowDown");
      let selected = await element.find("calcite-segmented-control-item[checked]");
      let value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowDown");
      selected = await element.find("calcite-segmented-control-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowDown");
      selected = await element.find("calcite-segmented-control-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      await element.press("ArrowUp");
      selected = await element.find("calcite-segmented-control-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowUp");
      selected = await element.find("calcite-segmented-control-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowUp");
      selected = await element.find("calcite-segmented-control-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      expect(spy).toHaveReceivedEventTimes(6);
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
      "<calcite-segmented-control scale='l' layout='vertical' appearance='outline' width='full'></calcite-segmented-control>"
    );
    const element = await page.find("calcite-segmented-control");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toEqualAttribute("layout", "vertical");
    expect(element).toEqualAttribute("appearance", "outline");
    expect(element).toEqualAttribute("width", "full");
  });

  it("renders default props", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-segmented-control></calcite-segmented-control>");
    const element = await page.find("calcite-segmented-control");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("layout", "horizontal");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("width", "auto");
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
        }
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
        }
      );
    });
  });

  describe("is form-associated", () => {
    const formAssociatedOptions = { testValue: "2" };

    describe("unselected value", () => {
      formAssociated(
        html`
          <calcite-segmented-control>
            <calcite-segmented-control-item id="child-1" value="1">one</calcite-segmented-control-item>
            <calcite-segmented-control-item id="child-2" value="2">two</calcite-segmented-control-item>
            <calcite-segmented-control-item id="child-3" value="3">three</calcite-segmented-control-item>
          </calcite-segmented-control>
        `,
        formAssociatedOptions
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
        formAssociatedOptions
      );
    });
  });

  describe("updates items when children are modified after initialization", () => {
    // TODO:
  });
});
