import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-radio-button", () => {
  it("renders", async () => renders("calcite-radio-button"));

  it("is accessible", async () =>
    accessible(
      `<calcite-label><calcite-radio-button id="example" name="example" value="one"></calcite-radio-button>label</calcite-label>`
    ));

  it("has defaults", async () => defaults("calcite-radio-button", [{ propertyName: "scale", defaultValue: "m" }]));

  it("honors hidden attribute", async () => hidden("calcite-radio-button"));

  it("focusing skips over hidden radio-buttons", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="hidden" value="first"></calcite-radio-button>
      <calcite-radio-button name="hidden" value="second" hidden></calcite-radio-button>
      <calcite-radio-button name="hidden" value="third"></calcite-radio-button>
    `);

    const firstElement = await page.find("calcite-radio-button");
    await firstElement.click();
    await firstElement.press("ArrowDown");
    await page.waitForChanges();

    const selected = await page.find("calcite-radio-button[focused]");
    const value = await selected.getProperty("value");
    expect(value).toBe("third");
  });

  it("is focusable", () =>
    focusable("calcite-radio-button", {
      focusTargetSelector: "input[type=radio]"
    }));

  it("reflects", async () =>
    reflects("calcite-radio-button", [
      { propertyName: "checked", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "focused", value: true },
      { propertyName: "guid", value: "reflects-guid" },
      { propertyName: "hidden", value: true },
      { propertyName: "name", value: "reflects-name" },
      { propertyName: "required", value: true },
      { propertyName: "scale", value: "m" }
    ]));

  it("has a radio input for form compatibility", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="hidden-input" value="1"></calcite-radio-button>
      <calcite-radio-button name="hidden-input" value="2" checked></calcite-radio-button>
      <calcite-radio-button name="hidden-input" value="3"></calcite-radio-button>
    `);

    const radioInputs = await page.findAll('input[type="radio"]');
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
    await page.setContent(`
      <calcite-radio-button name="none-checked" value="1"></calcite-radio-button>
      <calcite-radio-button name="none-checked" value="2"></calcite-radio-button>
      <calcite-radio-button name="none-checked" value="3"></calcite-radio-button>
    `);
    const radioButtons = await page.findAll("calcite-radio-button");
    for (let i = 0; i < radioButtons.length; i++) {
      expect(await radioButtons[i].getProperty("checked")).toBe(false);
      expect(radioButtons[i].getAttribute("checked")).toBe(null);
    }
  });

  it("when multiple items are checked, last one wins", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="multiple-checked" value="1" checked></calcite-radio-button>
      <calcite-radio-button name="multiple-checked" value="2" checked></calcite-radio-button>
      <calcite-radio-button name="multiple-checked" value="3" checked></calcite-radio-button>
    `);
    const checkedItems = await page.findAll("calcite-radio-button[checked]");
    expect(checkedItems).toHaveLength(1);

    const selectedValue = await checkedItems[0].getProperty("value");
    expect(selectedValue).toBe("3");
  });

  it("selects item with left and arrow keys", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="keyboard" value="1" checked></calcite-radio-button>
      <calcite-radio-button name="keyboard" value="2"></calcite-radio-button>
      <calcite-radio-button name="keyboard" value="3"></calcite-radio-button>
    `);
    const element = await page.find("calcite-radio-button");

    const firstElement = await page.find("calcite-radio-button[checked]");
    await firstElement.click();
    await element.press("ArrowRight");
    await page.waitForChanges();

    let selected = await page.find("calcite-radio-button[checked]");
    let value = await selected.getProperty("value");
    expect(value).toBe("2");
    await element.press("ArrowRight");
    selected = await page.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("3");
    await element.press("ArrowRight");
    selected = await page.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("1");
    await element.press("ArrowLeft");
    selected = await page.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("3");
    await element.press("ArrowLeft");
    selected = await page.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("2");
    await element.press("ArrowLeft");
    selected = await page.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("1");
  });

  it("selects item with up and down keys", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="up-down-keys" value="1" checked></calcite-radio-button>
      <calcite-radio-button name="up-down-keys" value="2"></calcite-radio-button>
      <calcite-radio-button name="up-down-keys" value="3"></calcite-radio-button>
    `);
    const element = await page.find("calcite-radio-button");

    const firstElement = await page.find("calcite-radio-button[checked]");
    await firstElement.click();
    await element.press("ArrowDown");
    let selected = await page.find("calcite-radio-button[checked]");
    let value = await selected.getProperty("value");
    expect(value).toBe("2");
    await element.press("ArrowDown");
    selected = await page.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("3");
    await element.press("ArrowDown");
    selected = await page.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("1");
    await element.press("ArrowUp");
    selected = await page.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("3");
    await element.press("ArrowUp");
    selected = await page.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("2");
    await element.press("ArrowUp");
    selected = await page.find("calcite-radio-button[checked]");
    value = await selected.getProperty("value");
    expect(value).toBe("1");
  });

  it("clicking a radio updates its checked status", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="radio" value="one" checked></calcite-radio-button>
      <calcite-radio-button name="radio" value="two"></calcite-radio-button>
    `);

    const first = await page.find("calcite-radio-button[value=one]");
    const second = await page.find("calcite-radio-button[value=two]");

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
    await page.setContent(`
      <calcite-radio-button name="radio" value="one" checked></calcite-radio-button>
      <calcite-radio-button name="radio" value="two"></calcite-radio-button>
      <calcite-radio-button name="radio" value="three"></calcite-radio-button>
    `);
    await page.evaluate(() => {
      const second = document.querySelector("calcite-radio-button[value=two]");
      (second as HTMLCalciteRadioButtonElement).checked = true;
    });
    await page.waitForChanges();

    const checkedItems = await page.findAll("calcite-radio-button[checked]");
    expect(checkedItems.length).toEqual(1);

    const selectedValue = await checkedItems[0].getProperty("value");
    expect(selectedValue).toBe("two");
  });

  it("programmatically un-checking a radio button updates the group's state correctly", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="radio" value="one" checked></calcite-radio-button>
      <calcite-radio-button name="radio" value="two"></calcite-radio-button>
      <calcite-radio-button name="radio" value="three"></calcite-radio-button>
    `);
    await page.evaluate(() => {
      const second = document.querySelector("calcite-radio-button[value=one]");
      (second as HTMLCalciteRadioButtonElement).checked = false;
    });
    await page.waitForChanges();

    const checkedItems = await page.findAll("calcite-radio-button[checked]");
    expect(checkedItems).toHaveLength(0);
  });

  it("appropriately triggers the custom change event", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-radio-button></calcite-radio-button>`);

    const radio = await page.find("calcite-radio-button");

    const changeEvent = await radio.spyOnEvent("calciteRadioButtonChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await radio.click();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("triggers the custom change event just once when sibling calcite-label is clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-label for="radio">Label</calcite-label><calcite-radio-button id="radio"></calcite-radio-button>`
    );

    const radio = await page.find("calcite-radio-button");
    const label = await page.find("calcite-label");

    const changeEvent = await radio.spyOnEvent("calciteRadioButtonChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await label.click();

    expect(changeEvent).toHaveReceivedEventTimes(1);
  });

  it("doesn't emit when controlling checked attribute", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-button value='test-value'></calcite-radio-button>");
    const element = await page.find("calcite-radio-button");
    const spy = await element.spyOnEvent("calciteRadioButtonChange");

    await element.setProperty("checked", true);
    await page.waitForChanges();
    await element.setProperty("checked", false);
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(0);
  });

  it("is un-checked by default", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-button value='test-value'></calcite-radio-button>");
    const element = await page.find("calcite-radio-button");

    const checked = await element.getProperty("checked");
    expect(checked).toBe(false);
  });

  it("supports value and checked", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-radio-button value='test-value' checked></calcite-radio-button>");
    const element = await page.find("calcite-radio-button");

    const checked = await element.getProperty("checked");
    expect(checked).toBe(true);

    const value = await element.getProperty("value");
    expect(value).toBe("test-value");
  });

  it("resets to initial value when form reset event is triggered", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <form id="form">
        <calcite-radio-button id="unchecked" name="reset" value="unchecked"></calcite-radio-button>
        <calcite-radio-button id="checked" name="reset" value="checked" checked></calcite-radio-button>
        <button type="reset">Reset</button>
      </form>
    `);

    const unchecked = await page.find("#unchecked");
    expect(await unchecked.getProperty("checked")).toBe(false);

    const checked = await page.find("#checked");
    expect(await checked.getProperty("checked")).toBe(true);

    await unchecked.click();
    expect(await unchecked.getProperty("checked")).toBe(true);
    expect(await checked.getProperty("checked")).toBe(false);

    const resetButton = await page.find("button");
    await resetButton.click();

    await page.waitForChanges();

    expect(await unchecked.getProperty("checked")).toBe(false);
    expect(await checked.getProperty("checked")).toBe(true);
  });

  it("works correctly inside a shadowRoot", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <div></div>
      <template>
        <calcite-radio-button name="in-shadow" value="one"></calcite-radio-button>
        <calcite-radio-button name="in-shadow" value="two"></calcite-radio-button>
      </template>
      <script>
        const shadowRootDiv = document.querySelector("div");
        const shadowRoot = shadowRootDiv.attachShadow({ mode: "open" });
        shadowRoot.append(document.querySelector("template").content.cloneNode(true));
      </script>
    `);

    await page.waitForChanges();
    const radios = await page.findAll("div >>> calcite-radio-button");
    const inputs = await page.findAll("div >>> calcite-radio-button >>> input");

    await radios[0].click();

    expect(await radios[0].getProperty("checked")).toBe(true);
    expect(radios[0].getAttribute("checked")).toBe("");
    expect(await inputs[0].getProperty("checked")).toBe(true);

    await radios[1].click();

    expect(await radios[0].getProperty("checked")).toBe(false);
    expect(radios[0].getAttribute("checked")).toBe(null);
    expect(await inputs[0].getProperty("checked")).toBe(false);

    expect(await radios[1].getProperty("checked")).toBe(true);
    expect(radios[1].getAttribute("checked")).toBe("");
    expect(await inputs[1].getProperty("checked")).toBe(true);
  });

  it("selects properly when wrapped in a label", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <label>
        Wrapping label
        <calcite-radio-button id="one" name="wrapped" value="one"></calcite-radio-button>
        <calcite-radio-button id="two" name="wrapped" value="two"></calcite-radio-button>
      </label>
    `);
    const one = await page.find("#one");
    const two = await page.find("#two calcite-radio");

    await two.click();
    await page.waitForChanges();

    expect(await one.getProperty("checked")).toBe(false);
    expect(await two.getProperty("checked")).toBe(true);
  });

  it("disallows !important style overrides on the hidden input", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <style>
        input {
          margin: unset !important;
          opacity: unset !important;
          padding: unset !important;
          position: unset !important;
          transform: unset !important;
          z-index: unset !important;
        }
      </style>
      <calcite-radio-button></calcite-radio-button>
    `);
    const input = await page.find("input");
    const style = await input.getComputedStyle();
    expect(style["margin"]).toBe("0px");
    expect(style["opacity"]).toBe("0");
    expect(style["padding"]).toBe("0px");
    expect(style["position"]).toBe("absolute");
    expect(style["transform"]).toBe("none");
    expect(style["z-index"]).toBe("-1");
  });
});
