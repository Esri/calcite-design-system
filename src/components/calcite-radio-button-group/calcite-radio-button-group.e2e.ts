import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, reflects, renders } from "../../tests/commonTests";

describe("calcite-radio-button-group", () => {
  it("renders", async () => renders("calcite-radio-button-group"));

  it("is accessible", async () =>
    accessible(
      `<calcite-radio-button-group><calcite-radio-button></calcite-radio-button></calcite-radio-button-group>`
    ));

  it("has defaults", async () =>
    defaults("calcite-radio-button-group", [
      { propertyName: "layout", defaultValue: "horizontal" },
      { propertyName: "scale", defaultValue: "m" }
    ]));

  it("honors hidden attribute", async () => {
    await hidden("calcite-radio-button-group");

    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button-group name="first">
        <calcite-radio-button value="first">First</calcite-radio-button>
        <calcite-radio-button value="second">Second</calcite-radio-button>
        <calcite-radio-button value="third">Third</calcite-radio-button>
      </calcite-radio-button-group>
      <calcite-radio-button-group name="second" hidden>
        <calcite-radio-button value="first">First</calcite-radio-button>
        <calcite-radio-button value="second">Second</calcite-radio-button>
        <calcite-radio-button value="third">Third</calcite-radio-button>
      </calcite-radio-button-group>
      <calcite-radio-button-group name="third">
        <calcite-radio-button value="first">First</calcite-radio-button>
        <calcite-radio-button value="second">Second</calcite-radio-button>
        <calcite-radio-button value="third">Third</calcite-radio-button>
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

  it("reflects", async () =>
    reflects("calcite-radio-button-group", [
      { propertyName: "disabled", value: true },
      { propertyName: "hidden", value: true },
      { propertyName: "layout", value: "horizontal" },
      { propertyName: "name", value: "reflects-name" },
      { propertyName: "required", value: true },
      { propertyName: "scale", value: "m" },
      { propertyName: "theme", value: "light" }
    ]));

  it("has a radio input for form compatibility", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-button-group name="hidden-input">
          <calcite-radio-button value="1">one</calcite-radio-button>
          <calcite-radio-button value="2" checked>two</calcite-radio-button>
          <calcite-radio-button value="3">three</calcite-radio-button>
        </calcite-radio-button-group>`
    );

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
    await page.setContent(
      `<calcite-radio-button-group name="none-checked">
          <calcite-radio-button value="1"></calcite-radio-button>
          <calcite-radio-button value="2"></calcite-radio-button>
          <calcite-radio-button value="3"></calcite-radio-button>
        </calcite-radio-button-group>`
    );
    const radioButtons = await page.findAll("calcite-radio-button");
    for (let i = 0; i < radioButtons.length; i++) {
      expect(await radioButtons[i].getProperty("checked")).toBe(false);
      expect(radioButtons[i].getAttribute("checked")).toBe(null);
    }
  });

  it("when multiple items are checked, last one wins", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-button-group name="multiple-checked">
          <calcite-radio-button value="1" checked>one</calcite-radio-button>
          <calcite-radio-button value="2" checked>two</calcite-radio-button>
          <calcite-radio-button value="3" checked>three</calcite-radio-button>
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
    await page.setContent(
      `<calcite-radio-button-group name="keyboard">
          <calcite-radio-button value="1" checked>one</calcite-radio-button>
          <calcite-radio-button value="2">two</calcite-radio-button>
          <calcite-radio-button value="3">three</calcite-radio-button>
        </calcite-radio-button-group>`
    );
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
    await page.setContent(
      `<calcite-radio-button-group name="up-down-keys">
          <calcite-radio-button value="1" checked>one</calcite-radio-button>
          <calcite-radio-button value="2">two</calcite-radio-button>
          <calcite-radio-button value="3">three</calcite-radio-button>
        </calcite-radio-button-group>`
    );
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
    await page.setContent(`
      <calcite-radio-button-group name="radio">
        <calcite-radio-button id="first" value="one" checked>
              One
        </calcite-radio-button>
        <calcite-radio-button id="second" value="two">
            Two
        </calcite-radio-button>
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
    await page.setContent(`
      <calcite-radio-button-group name="radio">
        <calcite-radio-button id="first" value="one" checked>
              One
        </calcite-radio-button>
        <calcite-radio-button id="second" value="two">
            Two
        </calcite-radio-button>
        <calcite-radio-button id="third" value="three">
            Three
        </calcite-radio-button>
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
    await page.setContent(`
      <calcite-radio-button-group name="radio">
        <calcite-radio-button id="first" value="one" checked>
              One
        </calcite-radio-button>
        <calcite-radio-button id="second" value="two">
            Two
        </calcite-radio-button>
        <calcite-radio-button id="third" value="three">
            Three
        </calcite-radio-button>
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
    await page.setContent(`
      <calcite-radio-button-group name="radio">
        <calcite-radio-button value="one" checked>
              One
        </calcite-radio-button>
        <calcite-radio-button value="two">
            Two
        </calcite-radio-button>
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
    await page.setContent(
      `<calcite-radio-button-group name="changeEvent">
          <calcite-radio-button value="one">one</calcite-radio-button>
          <calcite-radio-button value="two">two</calcite-radio-button>
          <calcite-radio-button value="three">three</calcite-radio-button>
        </calcite-radio-button-group>`
    );

    const group = await page.find("calcite-radio-button-group");
    const firstRadio = await page.find('calcite-radio-button[value="one"]');
    const secondRadio = await page.find('calcite-radio-button[value="two"]');
    const thirdRadio = await page.find('calcite-radio-button[value="three"]');

    const changeEvent = await group.spyOnEvent("calciteRadioButtonGroupChange");

    expect(changeEvent).toHaveReceivedEventTimes(0);

    await firstRadio.click();
    expect(changeEvent).toHaveReceivedEventTimes(1);
    expect(changeEvent).toHaveReceivedEventDetail("one");

    await secondRadio.click();
    expect(changeEvent).toHaveReceivedEventTimes(2);
    expect(changeEvent).toHaveReceivedEventDetail("two");

    await thirdRadio.click();
    expect(changeEvent).toHaveReceivedEventTimes(3);
    expect(changeEvent).toHaveReceivedEventDetail("three");
  });
});
