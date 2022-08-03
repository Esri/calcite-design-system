import { E2EPage, newE2EPage } from "@stencil/core/testing";
import { disabled, focusable, formAssociated, labelable, renders, hidden } from "../../tests/commonTests";
import { html } from "../../../support/formatting";

describe("calcite-radio-group", () => {
  it("renders", () => renders("calcite-radio-group", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-radio-group"));

  it("is labelable", async () =>
    labelable(
      html`<calcite-radio-group>
        <calcite-radio-group-item value="1"></calcite-radio-group-item>
        <calcite-radio-group-item value="2"></calcite-radio-group-item>
        <calcite-radio-group-item value="3"></calcite-radio-group-item>
      </calcite-radio-group>`,
      { focusTargetSelector: "calcite-radio-group-item" }
    ));

  it("can be disabled", () =>
    disabled(
      html`<calcite-radio-group>
        <calcite-radio-group-item value="1"></calcite-radio-group-item>
        <calcite-radio-group-item value="2"></calcite-radio-group-item>
        <calcite-radio-group-item value="3"></calcite-radio-group-item>
      </calcite-radio-group>`,
      { focusTarget: "child" }
    ));

  it("sets value from selected item", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-group>
        <calcite-radio-group-item id="child-1" value="1" checked>one</calcite-radio-group-item>
        <calcite-radio-group-item id="child-2" value="2">two</calcite-radio-group-item>
        <calcite-radio-group-item id="child-3" value="3">three</calcite-radio-group-item>
      </calcite-radio-group>
    `);

    const element = await page.find("calcite-radio-group");
    const value = await element.getProperty("value");

    expect(value).toBe("1");
  });

  it("does not require an item to be checked", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-group>
          <calcite-radio-group-item value="1"></calcite-radio-group-item>
          <calcite-radio-group-item value="2"></calcite-radio-group-item>
          <calcite-radio-group-item value="3"></calcite-radio-group-item>
        </calcite-radio-group>`
    );
    const element = await page.find("calcite-radio-group");

    const selected = await element.getProperty("selectedItem");
    expect(selected).not.toBeDefined();
  });

  it("when multiple items are checked, last one wins", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-group>
          <calcite-radio-group-item value="1" checked>one</calcite-radio-group-item>
          <calcite-radio-group-item value="2" checked>two</calcite-radio-group-item>
          <calcite-radio-group-item value="3" checked>three</calcite-radio-group-item>
        </calcite-radio-group>`
    );
    const element = await page.find("calcite-radio-group");

    const selected = await element.getProperty("selectedItem");
    expect(selected).toBeDefined();

    const selectedItems = await element.findAll("calcite-radio-group-item[checked]");
    expect(selectedItems).toHaveLength(1);

    const selectedValue = await selectedItems[0].getProperty("value");
    expect(selectedValue).toBe("3");
  });

  it("allows items to be selected", async () => {
    async function getSelectedItemValue(page: E2EPage): Promise<string> {
      return page.$eval(
        "calcite-radio-group",
        (radioGroup: HTMLCalciteRadioGroupElement) => radioGroup.selectedItem.value
      );
    }

    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-group>
          <calcite-radio-group-item value="1">one</calcite-radio-group-item>
          <calcite-radio-group-item value="2">two</calcite-radio-group-item>
          <calcite-radio-group-item value="3">three</calcite-radio-group-item>
        </calcite-radio-group>`
    );
    const element = await page.find("calcite-radio-group");
    const eventSpy = await element.spyOnEvent("calciteRadioGroupChange");
    expect(eventSpy).not.toHaveReceivedEvent();
    const [first, second, third] = await page.findAll("calcite-radio-group-item");

    await first.click();
    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(eventSpy).toHaveReceivedEventDetail("1");
    expect(await getSelectedItemValue(page)).toBe("1");

    // does not emit from programmatic changes
    third.setProperty("checked", true);
    await page.waitForChanges();
    expect(eventSpy).toHaveReceivedEventTimes(1);
    expect(await getSelectedItemValue(page)).toBe("3");

    await second.click();
    expect(eventSpy).toHaveReceivedEventTimes(2);
    expect(eventSpy).toHaveReceivedEventDetail("2");
    expect(await getSelectedItemValue(page)).toBe("2");
  });

  it("does not emit extraneous events (edge case from #3210)", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-group>
          <calcite-radio-group-item value="1">one</calcite-radio-group-item>
          <calcite-radio-group-item value="2">two</calcite-radio-group-item>
        </calcite-radio-group>`
    );

    const timesCalled = await page.evaluate(async () => {
      let calls = 0;

      const radioGroup = document.querySelector("calcite-radio-group");

      const waitForFrame = async () => await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

      document.addEventListener("calciteRadioGroupChange", () => calls++);

      let [first, second] = Array.from(document.querySelectorAll("calcite-radio-group-item"));

      first.checked = true;
      await waitForFrame();

      second.click();
      await waitForFrame();

      radioGroup.remove();
      await waitForFrame();

      document.body.innerHTML = `
      <calcite-radio-group>
          <calcite-radio-group-item value="1">one</calcite-radio-group-item>
          <calcite-radio-group-item value="2">two</calcite-radio-group-item>
        </calcite-radio-group>
      `;

      [first, second] = Array.from(document.querySelectorAll("calcite-radio-group-item"));

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
        `<calcite-radio-group>
          <calcite-radio-group-item value="1" checked>one</calcite-radio-group-item>
          <calcite-radio-group-item value="2">two</calcite-radio-group-item>
          <calcite-radio-group-item value="3">three</calcite-radio-group-item>
        </calcite-radio-group>`
      );
      const element = await page.find("calcite-radio-group");
      const spy = await element.spyOnEvent("calciteRadioGroupChange");

      const firstElement = await element.find("calcite-radio-group-item[checked]");
      await firstElement.click();
      await element.press("ArrowRight");
      await page.waitForChanges();

      let selected = await element.find("calcite-radio-group-item[checked]");
      let value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowRight");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowRight");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      await element.press("ArrowLeft");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowLeft");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowLeft");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      expect(spy).toHaveReceivedEventTimes(6);
    });

    it("selects item with up and down keys", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-radio-group>
          <calcite-radio-group-item value="1" checked>one</calcite-radio-group-item>
          <calcite-radio-group-item value="2">two</calcite-radio-group-item>
          <calcite-radio-group-item value="3">three</calcite-radio-group-item>
        </calcite-radio-group>`
      );
      const element = await page.find("calcite-radio-group");
      const spy = await element.spyOnEvent("calciteRadioGroupChange");

      const firstElement = await element.find("calcite-radio-group-item[checked]");
      await firstElement.click();
      await element.press("ArrowDown");
      let selected = await element.find("calcite-radio-group-item[checked]");
      let value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowDown");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowDown");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      await element.press("ArrowUp");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("3");

      await element.press("ArrowUp");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("2");

      await element.press("ArrowUp");
      selected = await element.find("calcite-radio-group-item[checked]");
      value = await selected.getProperty("value");
      expect(value).toBe("1");

      expect(spy).toHaveReceivedEventTimes(6);
    });
  });

  describe("WAI-ARIA Roles, States, and Properties", () => {
    it(`has a role of 'radiogroup'`, async () => {
      const page = await newE2EPage();
      await page.setContent("<calcite-radio-group></calcite-radio-group>");
      const element = await page.find("calcite-radio-group");

      const role = element.getAttribute("role");
      expect(role).toEqualText("radiogroup");
    });
  });

  it("renders requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-group scale='l' layout='vertical' appearance='outline' width='full'></calcite-radio-group>"
    );
    const element = await page.find("calcite-radio-group");
    expect(element).toEqualAttribute("scale", "l");
    expect(element).toEqualAttribute("layout", "vertical");
    expect(element).toEqualAttribute("appearance", "outline");
    expect(element).toEqualAttribute("width", "full");
  });

  it("renders default props", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-group></calcite-radio-group>");
    const element = await page.find("calcite-radio-group");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("layout", "horizontal");
    expect(element).toEqualAttribute("appearance", "solid");
    expect(element).toEqualAttribute("width", "auto");
  });

  describe("setFocus()", () => {
    it("focuses the first item if there is no selection", async () =>
      focusable(
        html`
          <calcite-radio-group>
            <calcite-radio-group-item id="child-1" value="1">one</calcite-radio-group-item>
            <calcite-radio-group-item id="child-2" value="2">two</calcite-radio-group-item>
            <calcite-radio-group-item id="child-3" value="3">three</calcite-radio-group-item>
          </calcite-radio-group>
        `,
        {
          focusTargetSelector: "#child-1"
        }
      ));

    it("focuses the selected item", async () =>
      focusable(
        html`
          <calcite-radio-group>
            <calcite-radio-group-item id="child-1" value="1">one</calcite-radio-group-item>
            <calcite-radio-group-item id="child-2" value="2">two</calcite-radio-group-item>
            <calcite-radio-group-item id="child-3" value="3" checked>three</calcite-radio-group-item>
          </calcite-radio-group>
        `,
        {
          focusTargetSelector: "#child-3"
        }
      ));
  });

  describe("is form-associated", () => {
    const formAssociatedOptions = { testValue: "2" };

    it("unselected value", () =>
      formAssociated(
        html`
          <calcite-radio-group>
            <calcite-radio-group-item id="child-1" value="1">one</calcite-radio-group-item>
            <calcite-radio-group-item id="child-2" value="2">two</calcite-radio-group-item>
            <calcite-radio-group-item id="child-3" value="3">three</calcite-radio-group-item>
          </calcite-radio-group>
        `,
        formAssociatedOptions
      ));

    it("selected-value", () =>
      formAssociated(
        html`
          <calcite-radio-group>
            <calcite-radio-group-item id="child-1" value="1">one</calcite-radio-group-item>
            <calcite-radio-group-item id="child-2" value="2" checked>two</calcite-radio-group-item>
            <calcite-radio-group-item id="child-3" value="3">three</calcite-radio-group-item>
          </calcite-radio-group>
        `,
        formAssociatedOptions
      ));
  });
});
