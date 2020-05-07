import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, hidden, renders } from "../../tests/commonTests";

describe("calcite-radio-button", () => {
  it("renders", async () => renders("calcite-radio-button"));

  it("is accessible", async () =>
    accessible(`<calcite-radio-button></calcite-radio-button>`));

  it("has defaults", async () =>
    defaults("calcite-radio-button", [
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "theme", defaultValue: "light" }
    ]));

  it("honors hidden attribute", async () => {
    hidden("calcite-radio-button");

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

    let selected = await page.find("calcite-radio-button[focused]");
    let value = await selected.getProperty("value");
    expect(value).toBe("third");
  });

  it("renders scales, checked and focus states correctly to design spec", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button scale="s">Small</calcite-radio-button>
      <calcite-radio-button scale="s" focused>Small Focused</calcite-radio-button>
      <calcite-radio-button scale="s" checked>Small Checked</calcite-radio-button>
      <calcite-radio-button scale="s" checked focused>Small Checked and Focused</calcite-radio-button>
      <calcite-radio-button scale="m">Medium</calcite-radio-button>
      <calcite-radio-button scale="m" focused>Medium Focused</calcite-radio-button>
      <calcite-radio-button scale="m" checked>Medium Checked </calcite-radio-button>
      <calcite-radio-button scale="m" checked focused>Medium Checked and Focused</calcite-radio-button>
      <calcite-radio-button scale="l">Large</calcite-radio-button>
      <calcite-radio-button scale="l" focused>Large Focused</calcite-radio-button>
      <calcite-radio-button scale="l" checked>Large Checked </calcite-radio-button>
      <calcite-radio-button scale="l" checked focused>Large Checked and Focused</calcite-radio-button>
    `);

    // To start comparing the visual result, you first must run page.compareScreenshot;
    // This will capture a screenshot, and save the file to "/screenshot/images".
    // You'll be able to check that into your repo to provide those results to your team.
    // You can only have one of these commands per test.
    const results = await page.compareScreenshot();

    // Finally, we can test against the previous screenshots.
    // Test against hard pixels
    expect(results).toMatchScreenshot({ allowableMismatchedPixels: 100 })

    // Test against the percentage of changes. if 'allowableMismatchedRatio' is above 20% changed,
    expect(results).toMatchScreenshot({ allowableMismatchedRatio: 0.2 })
  });

  it("has a radio input for form compatibility", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="hidden-input" value="1">one</calcite-radio-button>
      <calcite-radio-button name="hidden-input" value="2" checked>two</calcite-radio-button>
      <calcite-radio-button name="hidden-input" value="3">three</calcite-radio-button>
    `);

    const radioInputs = await page.findAll('input[type="radio"]');
    expect(radioInputs).toHaveLength(3);

    for (let i = 0; i < radioInputs.length; i++) {
      const name = await radioInputs[i].getAttribute("name");
      const value = await radioInputs[i].getAttribute("value");
      expect(name).toBe("hidden-input")
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
    const radioButtons = await page.findAll('calcite-radio-button');
    for (let i = 0; i < radioButtons.length; i++) {
      expect(await radioButtons[i].getProperty("checked")).toBe(false);
      expect(await radioButtons[i].getAttribute("checked")).toBe(null);
    }
  });

  it("when multiple items are checked, first one wins", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="multiple-checked" value="1" checked>one</calcite-radio-button>
      <calcite-radio-button name="multiple-checked" value="2" checked>two</calcite-radio-button>
      <calcite-radio-button name="multiple-checked" value="3" checked>three</calcite-radio-button>
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
      <calcite-radio-button name="up-down-keys" value="1" checked>one</calcite-radio-button>
      <calcite-radio-button name="up-down-keys" value="2">two</calcite-radio-button>
      <calcite-radio-button name="up-down-keys" value="3">three</calcite-radio-button>
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

  it("programmatically checking a radio button updates the group's state correctly", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button name="radio" id="first" value="one" checked>
            One
      </calcite-radio-button>
      <calcite-radio-button name="radio" id="second" value="two">
          Two
      </calcite-radio-button>
      <calcite-radio-button name="radio" id="third" value="three">
          Three
      </calcite-radio-button>
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
      <calcite-radio-button name="radio" id="first" value="one" checked>
            One
      </calcite-radio-button>
      <calcite-radio-button name="radio" id="second" value="two">
          Two
      </calcite-radio-button>
      <calcite-radio-button name="radio" id="third" value="three">
          Three
      </calcite-radio-button>
    `);
    await page.evaluate(() => {
      const second = document.querySelector("calcite-radio-button#first");
      (second as HTMLCalciteRadioButtonElement).checked = false;
    });
    await page.waitForChanges();

    const checkedItems = await page.findAll("calcite-radio-button[checked]");
    expect(checkedItems).toHaveLength(0);
  });

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
