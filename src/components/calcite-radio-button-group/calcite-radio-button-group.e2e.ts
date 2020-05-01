import { newE2EPage } from '@stencil/core/testing';

describe('calcite-radio-button-group', () => {
  it('renders with default props', async () => {
    const page = await newE2EPage();
    await page.setContent('<calcite-radio-button-group></calcite-radio-button-group>');

    const element = await page.find('calcite-radio-button-group');
    expect(element).toHaveClass('hydrated');
    expect(element).toEqualAttribute("layout", "horizontal");
    expect(element).toEqualAttribute("scale", "m");
    expect(element).toEqualAttribute("theme", "light");
  });

  it("has a radio input for form compatibility", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-button-group name="hiddeninput">
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
      expect(name).toBe("hiddeninput")
      expect(value).toBe((i + 1).toString());
    }
  });

  it("does not require an item to be checked", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-button-group name="nonechecked">
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
      `<calcite-radio-button-group name="multipleChecked">
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
      `<calcite-radio-button-group name="updownkeys">
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

  it('defaults to medium', async () => {
    const page = await newE2EPage();
    await page.setContent('<calcite-radio-button-group></calcite-radio-button-group>');

    const element = await page.find('calcite-radio-button-group');
    expect(element.getAttribute("scale")).toBe("m");
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

  /** Group-Specific Tests */

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

  // it("focuses the first item if there is no selection", async () => {
  //   const page = await newE2EPage({
  //     html: `<calcite-radio-button-group>
  //         <calcite-radio-button id="child-1" value="1">one</calcite-radio-button>
  //         <calcite-radio-button id="child-2" value="2">two</calcite-radio-button>
  //         <calcite-radio-button id="child-3" value="3">three</calcite-radio-button>
  //       </calcite-radio-button-group>`
  //   });

  //   const element = await page.find("calcite-radio-button-group");
  //   await element.callMethod("setFocus");

  //   expect(await page.evaluate(() => document.activeElement.id)).toEqual("child-1");
  // });

  // it("focuses the selected item", async () => {
  //   const page = await newE2EPage({
  //     html: `<calcite-radio-button-group>
  //         <calcite-radio-button id="child-1" value="1">one</calcite-radio-button>
  //         <calcite-radio-button id="child-2" value="2">two</calcite-radio-button>
  //         <calcite-radio-button id="child-3" value="3" checked>three</calcite-radio-button>
  //       </calcite-radio-button-group>`
  //   });

  //   const element = await page.find("calcite-radio-button-group");
  //   await element.callMethod("setFocus");

  //   expect(await page.evaluate(() => document.activeElement.id)).toEqual("child-3");
  // });
});
