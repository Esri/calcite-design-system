import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, reflects, renders } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { getFocusedElementProp } from "../../tests/utils";

describe("calcite-radio-button-group", () => {
  describe("renders", () => {
    renders("calcite-radio-button-group", { display: "flex" });
  });

  describe("accessible", () => {
    accessible(
      `<calcite-radio-button-group><calcite-label><calcite-radio-button></calcite-radio-button>Label</calcite-label></calcite-radio-button-group>`
    );
  });

  describe("defaults", () => {
    defaults("calcite-radio-button-group", [
      { propertyName: "layout", defaultValue: "horizontal" },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });

  describe("is focusable", () => {
    focusable(
      html`<calcite-radio-button-group name="Options" layout="vertical">
        <calcite-label layout="inline">
          <calcite-radio-button value="flowers" disabled></calcite-radio-button>
          Flowers
        </calcite-label>
        <calcite-label layout="inline">
          <calcite-radio-button value="trees"></calcite-radio-button>
          Trees
        </calcite-label>
      </calcite-radio-button-group>`,
      { focusTargetSelector: "calcite-radio-button" }
    );
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-radio-button");

    it("honors hidden attribute when navigating", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-radio-button-group name="first">
          <calcite-label>
            1-1
            <calcite-radio-button value="first"></calcite-radio-button>
          </calcite-label>
          <calcite-label>
            1-2
            <calcite-radio-button value="second"></calcite-radio-button>
          </calcite-label>
          <calcite-label>
            1-3
            <calcite-radio-button value="third"></calcite-radio-button>
          </calcite-label>
        </calcite-radio-button-group>
        <calcite-radio-button-group name="second" hidden>
          <calcite-label>
            2-1
            <calcite-radio-button value="first"></calcite-radio-button>
          </calcite-label>
          <calcite-label>
            2-2
            <calcite-radio-button value="second"></calcite-radio-button>
          </calcite-label>
          <calcite-label>
            2-3
            <calcite-radio-button value="third"></calcite-radio-button>
          </calcite-label>
        </calcite-radio-button-group>
        <calcite-radio-button-group name="third">
          <calcite-label>
            3-1
            <calcite-radio-button value="first"></calcite-radio-button>
          </calcite-label>
          <calcite-label>
            3-2
            <calcite-radio-button value="second"></calcite-radio-button>
          </calcite-label>
          <calcite-label>
            3-3
            <calcite-radio-button value="third"></calcite-radio-button>
          </calcite-label>
        </calcite-radio-button-group>
      `);

      const firstElement = await page.find("calcite-radio-button");
      await firstElement.click();
      await firstElement.press("Tab");
      await page.waitForChanges();

      const selected = await page.find("calcite-radio-button[focused]");
      const name = await selected.getProperty("name");
      const value = await selected.getProperty("value");
      expect(name).toBe("third");
      expect(value).toBe("first");
    });
  });

  describe("reflects", () => {
    reflects("calcite-radio-button-group", [
      { propertyName: "disabled", value: true },
      { propertyName: "hidden", value: true },
      { propertyName: "layout", value: "horizontal" },
      { propertyName: "name", value: "reflects-name" },
      { propertyName: "required", value: true },
      { propertyName: "scale", value: "m" },
    ]);
  });

  it("has a radio input for form compatibility", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-button-group name="hidden-input">
        <calcite-label>
          1
          <calcite-radio-button value="1"></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          2
          <calcite-radio-button value="2" checked></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          3
          <calcite-radio-button value="3"></calcite-radio-button>
        </calcite-label>
      </calcite-radio-button-group>
    `);

    const radioInputs = await page.findAll("calcite-radio-button");
    expect(radioInputs).toHaveLength(3);

    for (let i = 0; i < radioInputs.length; i++) {
      const name = radioInputs[i].getAttribute("name");
      const value = radioInputs[i].getAttribute("value");
      expect(name).toBe("hidden-input");
      expect(value).toBe((i + 1).toString());
    }
  });

  it("does not require an item to be checked", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-button-group name="none-checked">
        <calcite-label>
          1
          <calcite-radio-button value="1"></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          2
          <calcite-radio-button value="2"></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          3
          <calcite-radio-button value="3"></calcite-radio-button>
        </calcite-label>
      </calcite-radio-button-group>
    `);
    const radioButtons = await page.findAll("calcite-radio-button");
    for (let i = 0; i < radioButtons.length; i++) {
      expect(await radioButtons[i].getProperty("checked")).toBe(false);
      expect(radioButtons[i].getAttribute("checked")).toBe(null);
    }
  });

  it("when multiple items are checked, last one wins", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-radio-button-group name="multiple-checked">
        <calcite-label>
          1
          <calcite-radio-button value="1" checked></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          2
          <calcite-radio-button value="2" checked></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          3
          <calcite-radio-button value="3" checked></calcite-radio-button>
        </calcite-label>
      </calcite-radio-button-group>`
    );
    await page.waitForChanges();
    const checkedItems = await page.findAll("calcite-radio-button[checked]");
    expect(checkedItems).toHaveLength(1);

    const selectedValue = await checkedItems[0].getProperty("value");
    expect(selectedValue).toBe("3");
  });

  it("selects item with left and arrow keys", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-button-group name="keyboard">
        <calcite-label>
          1
          <calcite-radio-button value="1" checked></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          2
          <calcite-radio-button value="2"></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          3
          <calcite-radio-button value="3"></calcite-radio-button>
        </calcite-label>
      </calcite-radio-button-group>
    `);
    const element = await page.find("calcite-radio-button-group");

    const firstElement = await element.find("calcite-radio-button[checked]");
    await firstElement.click();
    await element.press("ArrowRight");
    await page.waitForChanges();

    let selected = await element.find("calcite-radio-button[checked]");
    let value = await selected.getProperty("value");
    expect(value).toBe("2");

    await element.press("ArrowRight");
    selected = await element.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("3");

    await element.press("ArrowRight");
    selected = await element.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("1");

    await element.press("ArrowLeft");
    selected = await element.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("3");

    await element.press("ArrowLeft");
    selected = await element.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("2");

    await element.press("ArrowLeft");
    selected = await element.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("1");
  });

  it("selects item with up and down keys", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-button-group name="up-down-keys">
        <calcite-label>
          1
          <calcite-radio-button value="1" checked></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          2
          <calcite-radio-button value="2"></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          3
          <calcite-radio-button value="3"></calcite-radio-button>
        </calcite-label>
      </calcite-radio-button-group>
    `);
    const element = await page.find("calcite-radio-button-group");

    const firstElement = await element.find("calcite-radio-button[checked]");
    await firstElement.click();
    await element.press("ArrowDown");
    let selected = await element.find("calcite-radio-button[checked]");
    let value = await selected.getProperty("value");
    expect(value).toBe("2");

    await element.press("ArrowDown");
    selected = await element.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("3");

    await element.press("ArrowDown");
    selected = await element.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("1");

    await element.press("ArrowUp");
    selected = await element.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("3");

    await element.press("ArrowUp");
    selected = await element.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("2");

    await element.press("ArrowUp");
    selected = await element.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("1");
  });

  it("clicking a radio updates its checked status", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-button-group name="radio">
        <calcite-label>
          1
          <calcite-radio-button id="first" value="one" checked></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          2
          <calcite-radio-button id="second" value="two"></calcite-radio-button>
        </calcite-label>
      </calcite-radio-button-group>
    `);

    const first = await page.find("calcite-radio-button#first");
    const second = await page.find("calcite-radio-button#second");

    await second.click();
    await page.waitForChanges();

    expect(await first.getProperty("checked")).toBe(false);
    expect(await second.getProperty("checked")).toBe(true);

    await first.click();
    await page.waitForChanges();

    expect(await first.getProperty("checked")).toBe(true);
    expect(await second.getProperty("checked")).toBe(false);
  });

  it("programmatically checking a radio button updates the group's state correctly", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-button-group name="radio">
        <calcite-label>
          1
          <calcite-radio-button id="first" value="one" checked></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          2
          <calcite-radio-button id="second" value="two"></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          3
          <calcite-radio-button id="third" value="three"></calcite-radio-button>
        </calcite-label>
      </calcite-radio-button-group>
    `);
    await page.evaluate(() => {
      const second = document.querySelector("calcite-radio-button#second");
      (second as HTMLCalciteRadioButtonElement).checked = true;
    });
    await page.waitForChanges();

    const checkedItems = await page.findAll("calcite-radio-button[checked]");
    expect(checkedItems).toHaveLength(1);

    const selectedValue = await checkedItems[0].getProperty("value");
    expect(selectedValue).toBe("two");
  });

  it("programmatically un-checking a radio button updates the group's state correctly", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-button-group name="radio">
        <calcite-label>
          1
          <calcite-radio-button id="first" value="one" checked></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          2
          <calcite-radio-button id="second" value="two"></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          3
          <calcite-radio-button id="third" value="three"></calcite-radio-button>
        </calcite-label>
      </calcite-radio-button-group>
    `);
    await page.evaluate(() => {
      const second = document.querySelector("calcite-radio-button#first");
      (second as HTMLCalciteRadioButtonElement).checked = false;
    });
    await page.waitForChanges();

    const checkedItems = await page.findAll("calcite-radio-button[checked]");
    expect(checkedItems).toHaveLength(0);
  });

  it(`has a role of 'radiogroup'`, async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-button-group></calcite-radio-button-group>");
    const element = await page.find("calcite-radio-button-group");

    const role = element.getAttribute("role");
    expect(role).toEqualText("radiogroup");
  });

  it("radio-buttons receive necessary props", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-button-group name="radio">
        <calcite-label>
          1
          <calcite-radio-button value="one" checked></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          2
          <calcite-radio-button value="two"></calcite-radio-button>
        </calcite-label>
      </calcite-radio-button-group>
    `);

    const radio = await page.find("calcite-radio-button");
    const name = await radio.getProperty("name");
    const scale = await radio.getProperty("scale");
    const required = await radio.getProperty("required");
    expect(name).toBe("radio");
    expect(scale).toBe("m");
    expect(required).toBe(false);
  });

  it("appropriately triggers the custom change event", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-button-group name="changeEvent">
        <calcite-label>
          1
          <calcite-radio-button value="one" checked></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          2
          <calcite-radio-button value="two"></calcite-radio-button>
        </calcite-label>
        <calcite-label>
          3
          <calcite-radio-button value="three"></calcite-radio-button>
        </calcite-label>
      </calcite-radio-button-group>
    `);

    const getSelectedItemValue = async (): Promise<string> => {
      return await page.evaluate((): string => {
        return document.querySelector("calcite-radio-button-group")?.selectedItem?.value || "";
      });
    };

    const group = await page.find("calcite-radio-button-group");
    const firstRadio = await page.find('calcite-radio-button[value="one"]');
    const secondRadio = await page.find('calcite-radio-button[value="two"]');
    const thirdRadio = await page.find('calcite-radio-button[value="three"]');

    const changeEvent = await group.spyOnEvent("calciteRadioButtonGroupChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await firstRadio.click();
    expect(changeEvent).toHaveReceivedEventTimes(0);
    expect(await getSelectedItemValue()).toBe("one");

    await secondRadio.click();
    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(await getSelectedItemValue()).toBe("two");

    await thirdRadio.click();
    expect(changeEvent).toHaveReceivedEventTimes(2);
    expect(await getSelectedItemValue()).toBe("three");
  });

  it("should focus the checked radio-button on setFocus()", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-button-group name="Options" layout="vertical">
        <calcite-label layout="inline">
          <calcite-radio-button value="trees" disabled id="trees"></calcite-radio-button>
          Trees
        </calcite-label>
        <calcite-label layout="inline">
          <calcite-radio-button value="shrubs" id="shrubs"></calcite-radio-button>
          Shrubs
        </calcite-label>
        <calcite-label layout="inline">
          <calcite-radio-button value="flowers" id="flowers" checked></calcite-radio-button>
          Flowers
        </calcite-label>
      </calcite-radio-button-group>
    `);
    const group = await page.find("calcite-radio-button-group");
    await group.callMethod("setFocus");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("flowers");
  });

  it("should focus the first focusable radio-button on setFocus()", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-radio-button-group name="Options" layout="vertical">
        <calcite-label layout="inline">
          <calcite-radio-button value="trees" disabled id="trees"></calcite-radio-button>
          Trees
        </calcite-label>
        <calcite-label layout="inline">
          <calcite-radio-button value="shrubs" id="shrubs"></calcite-radio-button>
          Shrubs
        </calcite-label>
        <calcite-label layout="inline">
          <calcite-radio-button value="flowers" id="flowers"></calcite-radio-button>
          Flowers
        </calcite-label>
      </calcite-radio-button-group>
    `);
    const group = await page.find("calcite-radio-button-group");
    await group.callMethod("setFocus");
    await page.waitForChanges();
    expect(await getFocusedElementProp(page, "id")).toBe("shrubs");
  });
});
