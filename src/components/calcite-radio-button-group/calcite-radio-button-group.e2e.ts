import { newE2EPage } from '@stencil/core/testing';
import { accessible, defaults, renders } from "../../tests/commonTests";

describe('calcite-radio-button-group', () => {
  it("renders", async () => renders("calcite-radio-button-group"));

  it("is accessible", async () =>
    accessible(`<calcite-radio-button-group><calcite-radio-button></calcite-radio-button></calcite-radio-button-group>`));

  it("has defaults", async () =>
    defaults("calcite-radio-button-group", [
      { propertyName: "layout", defaultValue: "horizontal" },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "theme", defaultValue: "light" }
    ]));

  it("renders layouts, scales and checked correctly to design spec", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button-group name="small" scale="s">
        <calcite-radio-button checked>Small Horizontal 1</calcite-radio-button>
        <calcite-radio-button>Small Horizontal 2</calcite-radio-button>
        <calcite-radio-button>Small Horizontal 3</calcite-radio-button>
      </calcite-radio-button-group>
      <calcite-radio-button-group name="medium" scale="m">
        <calcite-radio-button checked>Medium Horizontal 1</calcite-radio-button>
        <calcite-radio-button>Medium Horizontal 2</calcite-radio-button>
        <calcite-radio-button>Medium Horizontal 3</calcite-radio-button>
      </calcite-radio-button-group>
      <calcite-radio-button-group name="large" scale="l">
        <calcite-radio-button checked>Large Horizontal 1</calcite-radio-button>
        <calcite-radio-button>Large Horizontal 2</calcite-radio-button>
        <calcite-radio-button>Large Horizontal 3</calcite-radio-button>
      </calcite-radio-button-group>
      <calcite-radio-button-group name="small-vert" scale="s" layout="vertical">
        <calcite-radio-button checked>Small Vertical 1</calcite-radio-button>
        <calcite-radio-button>Small Vertical 2</calcite-radio-button>
        <calcite-radio-button>Small Vertical 3</calcite-radio-button>
      </calcite-radio-button-group>
      <calcite-radio-button-group name="medium-vert" scale="m" layout="vertical">
        <calcite-radio-button checked>Medium Vertical 1</calcite-radio-button>
        <calcite-radio-button>Medium Vertical 2</calcite-radio-button>
        <calcite-radio-button>Medium Vertical 3</calcite-radio-button>
      </calcite-radio-button-group>
      <calcite-radio-button-group name="large-vert" scale="l" layout="vertical">
        <calcite-radio-button checked>Large Vertical 1</calcite-radio-button>
        <calcite-radio-button>Large Vertical 2</calcite-radio-button>
        <calcite-radio-button>Large Vertical 3</calcite-radio-button>
      </calcite-radio-button-group>
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
      const name = await radioInputs[i].getAttribute("name");
      const value = await radioInputs[i].getAttribute("value");
      expect(name).toBe("hidden-input")
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
    const radioButtons = await page.findAll('calcite-radio-button');
    for (let i = 0; i < radioButtons.length; i++) {
      expect(await radioButtons[i].getProperty("checked")).toBe(false);
      expect(await radioButtons[i].getAttribute("checked")).toBe(null);
    }
  });

  it("when multiple items are checked, first one wins", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-button-group name="multiple-checked">
          <calcite-radio-button value="1" checked>one</calcite-radio-button>
          <calcite-radio-button value="2" checked>two</calcite-radio-button>
          <calcite-radio-button value="3" checked>three</calcite-radio-button>
        </calcite-radio-button-group>`
    );
    const checkedItems = await page.findAll(
      "calcite-radio-button[checked]"
    );
    expect(checkedItems).toHaveLength(1);

    const selectedValue = await checkedItems[0].getProperty("value");
    expect(selectedValue).toBe("1");
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

    const firstElement = await element.find(
      "calcite-radio-button[checked]"
    );
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

    const firstElement = await element.find(
      "calcite-radio-button[checked]"
    );
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

  it("validates incorrect props", async () => {
    const page = await newE2EPage();
    await page.setContent(
      "<calcite-radio-button-group scale='none' theme='none' layout='none'></calcite-radio-button-group>"
    );
    const element = await page.find("calcite-radio-button-group");
    expect(element).toEqualAttribute("layout", "horizontal");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("theme", "light");
  });

  it('clicking a radio updates its checked status', async () => {
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
      <calcite-radio-button-group name="radio">
        <calcite-radio-button id="first" value="one" checked>
              One
        </calcite-radio-button>
        <calcite-radio-button id="second" value="two">
            Two
        </calcite-radio-button>
      </calcite-radio-button-group>
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
      <calcite-radio-button-group name="radio">
        <calcite-radio-button id="first" value="one" checked>
              One
        </calcite-radio-button>
        <calcite-radio-button id="second" value="two">
            Two
        </calcite-radio-button>
      </calcite-radio-button-group>
    `);
    const group = await page.evaluate(() => {
      const group = document.querySelector("calcite-radio-button-group");
      group.appendChild(document.querySelector("calcite-radio-button#first"));
      return group;
    });
    await page.waitForChanges();

    const firstInput = document.querySelector("input#second");

    expect(group.lastChild === firstInput);
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

    const role = await element.getAttribute("role");
    expect(role).toEqualText("radiogroup");
  });

  it('radio-buttons receive necessary props', async () => {
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

    const radio = await page.find('calcite-radio-button');
    const name = await radio.getProperty("name");
    const scale = await radio.getProperty("scale");
    const required = await radio.getProperty("required");
    const theme = await radio.getProperty("theme");
    expect(name).toBe("radio");
    expect(scale).toBe("m");
    expect(required).toBe(false);
    expect(theme).toBe("light");
  });

  it('radio-button-group and radio-buttons receive necessary validated props', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-radio-button-group name="radio" layout="none" scale="none" theme="none">
        <calcite-radio-button value="one" checked>
              One
        </calcite-radio-button>
        <calcite-radio-button value="two">
            Two
        </calcite-radio-button>
        <calcite-radio-button value="three">
            Three
        </calcite-radio-button>
      </calcite-radio-button-group>
    `);

    const radioButtonGroup = await page.find('calcite-radio-button-group');
    expect(await radioButtonGroup.getProperty("layout")).toBe("horizontal");
    expect(await radioButtonGroup.getProperty("scale")).toBe("m");
    expect(await radioButtonGroup.getProperty("theme")).toBe("light");

    const child1 = await page.find("calcite-radio-button[value=one]");
    const child2 = await page.find("calcite-radio-button[value=two]");
    const child3 = await page.find("calcite-radio-button[value=three]");
    expect(child1).toEqualAttribute("scale", "m");
    expect(child2).toEqualAttribute("scale", "m");
    expect(child3).toEqualAttribute("scale", "m");
    expect(child1).toEqualAttribute("theme", "light");
    expect(child2).toEqualAttribute("theme", "light");
    expect(child3).toEqualAttribute("theme", "light");
  });
});
