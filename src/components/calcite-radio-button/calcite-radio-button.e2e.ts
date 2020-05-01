import { newE2EPage } from "@stencil/core/testing";

describe("calcite-radio-button", () => {
  it("renders with default props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button></calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");

    expect(element).toBeDefined();
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("theme", "light")
  });

  it("has a radio input for form compatibility", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="hiddeninput" value="1">one</calcite-radio-button>
      <calcite-radio-button name="hiddeninput" value="2" checked>two</calcite-radio-button>
      <calcite-radio-button name="hiddeninput" value="3">three</calcite-radio-button>
    `);

    const radioInputs = await page.findAll('input[type="radio"]');
    expect(radioInputs).toHaveLength(3);

    for (let i = 0; i < radioInputs.length; i++) {
      const name = await radioInputs[i].getAttribute("name");
      const value = await radioInputs[i].getAttribute("value");
      expect(name).toBe("hiddeninput")
      expect(value).toBe((i + 1).toString());
    }
  });

  it("does not require an item to be checked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="nonechecked" value="1"></calcite-radio-button>
      <calcite-radio-button name="nonechecked" value="2"></calcite-radio-button>
      <calcite-radio-button name="nonechecked" value="3"></calcite-radio-button>
    `);
    const radioButtons = await page.findAll('calcite-radio-button');
    for (let i = 0; i < radioButtons.length; i++) {
      expect(await radioButtons[i].getProperty("checked")).toBe(false);
      expect(await radioButtons[i].getAttribute("checked")).toBe(null);
    }
  });

  it("when multiple items are checked, first one wins", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="multipleChecked" value="1" checked>one</calcite-radio-button>
      <calcite-radio-button name="multipleChecked" value="2" checked>two</calcite-radio-button>
      <calcite-radio-button name="multipleChecked" value="3" checked>three</calcite-radio-button>
    `);
    const checkedItems = await page.findAll("calcite-radio-button[checked]");
    expect(checkedItems).toHaveLength(1);

    const selectedValue = await checkedItems[0].getProperty("value");
    expect(selectedValue).toBe("1");
  });

  it("selects item with left and arrow keys", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="keyboard" value="1" checked>one</calcite-radio-button>
      <calcite-radio-button name="keyboard" value="2">two</calcite-radio-button>
      <calcite-radio-button name="keyboard" value="3">three</calcite-radio-button>
    `);
    const element = await page.find("calcite-radio-button");

    const firstElement = await page.find(
      "calcite-radio-button[checked]"
    );
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
      <calcite-radio-button name="updownkeys" value="1" checked>one</calcite-radio-button>
      <calcite-radio-button name="updownkeys" value="2">two</calcite-radio-button>
      <calcite-radio-button name="updownkeys" value="3">three</calcite-radio-button>
    `);
    const element = await page.find("calcite-radio-button");

    const firstElement = await page.find(
      "calcite-radio-button[checked]"
    );
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

  it("validates incorrect props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button scale='none' theme='none' layout='none'></calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("theme", "light");
  });

  it('defaults to medium', async () => {
    const page = await newE2EPage();
    await page.setContent('<calcite-radio-button></calcite-radio-button>');

    const element = await page.find('calcite-radio-button');
    expect(element.getAttribute("scale")).toBe("m");
  });

  it('clicking a radio updates its checked status', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="radio" id="first" value="one" checked>
        One
      </calcite-radio-button>
      <calcite-radio-button name="radio" id="second" value="two">
          Two
      </calcite-radio-button>
    `);

    const first = await page.find('calcite-radio-button#first');
    const second = await page.find('calcite-radio-button#second');

    await second.click();
    await page.waitForChanges();

    expect(await first.getProperty("checked")).toBe(false);
    expect(await second.getProperty("checked")).toBe(true);

    await first.click();
    await page.waitForChanges();

    expect(await first.getProperty("checked")).toBe(true);
    expect(await second.getProperty("checked")).toBe(false);
  });

  it('removing a radio button also removes the hidden <input type=radio> element', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="radio" id="first" value="one" checked>
            One
      </calcite-radio-button>
      <calcite-radio-button name="radio" id="second" value="two">
          Two
      </calcite-radio-button>
    `);

    let firstInput = await page.find('input#first');
    expect(firstInput).toBeTruthy();

    await page.evaluate(() => {
      const first = document.querySelector("input#first");
      first.parentNode.removeChild(first);
    });
    await page.waitForChanges();

    firstInput = await page.find('input#first');

    expect(firstInput).toBeFalsy();
  });

  it("moving a radio button also moves the corresponding <input> element", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="radio" id="first" value="one" checked>
            One
      </calcite-radio-button>
      <calcite-radio-button name="radio" id="second" value="two">
          Two
      </calcite-radio-button>
    `);
    const documentBody = await page.evaluate(() => {
      document.body.appendChild(document.querySelector("calcite-radio-button#first"));
      return document.body;
    });
    await page.waitForChanges();

    const firstInput = document.querySelector("input#second");

    expect(documentBody.lastChild === firstInput);
  });

  /** Radio Button-specific tests */

  it("emits when checked", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button value='test-value'></calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");
    const spy = await element.spyOnEvent("calciteRadioButtonChange");

    await element.setProperty("checked", true);
    await page.waitForChanges();
    await element.setProperty("checked", false);
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(2);
  });

  it("is un-checked by default", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button value='test-value'></calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");

    const checked = await element.getProperty("checked");
    expect(checked).toBe(false);
  });

  it("supports value, label and checked", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button value='test-value' checked>test-label</calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");

    expect(element).toEqualText("test-label");

    const checked = await element.getProperty("checked");
    expect(checked).toBe(true);

    const value = await element.getProperty("value");
    expect(value).toBe("test-value");
  });

  it("uses value as fallback label", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button value='test-value' checked></calcite-radio-button>"
    );

    const label = await page.find("calcite-radio-button >>> calcite-label");
    expect(label).toEqualText("test-value");
  });

  it(`has a role of 'radio'`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button></calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");

    const role = await element.getAttribute("role");

    expect(role).toEqualText("radio");
  });

  it(`updates 'aria-checked' based on 'checked' property`, async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button></calcite-radio-button>"
    );
    const element = await page.find("calcite-radio-button");

    let ariaChecked = await element.getAttribute("aria-checked");

    expect(ariaChecked).toBe("false");

    element.setProperty("checked", true);
    await page.waitForChanges();

    ariaChecked = await element.getAttribute("aria-checked");

    expect(ariaChecked).toEqualText("true");

    element.setProperty("checked", false);
    await page.waitForChanges();

    ariaChecked = await element.getAttribute("aria-checked");

    expect(ariaChecked).toEqualText("false");
  });

  it("content/value is wrapped by label", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button></calcite-radio-button>"
    );
    const defaultSlot = await page.find(
      "calcite-radio-button >>> label slot"
    );

    expect(defaultSlot).toBeDefined();
  });
});
