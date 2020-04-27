import { newE2EPage } from '@stencil/core/testing';

describe('calcite-radio-button-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<calcite-radio-button-group></calcite-radio-button-group>');

    const element = await page.find('calcite-radio-button-group');
    expect(element).toHaveClass('hydrated');
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
    const element = await page.find("calcite-radio-button-group");

    const selected = await element.getProperty("selectedItem");
    expect(selected).not.toBeDefined();
  });

  it("when multiple items are checked, first one wins", async () => {
    const page = await newE2EPage();
    await page.setContent(
      `<calcite-radio-button-group>
          <calcite-radio-button value="1" checked>one</calcite-radio-button>
          <calcite-radio-button value="2" checked>two</calcite-radio-button>
          <calcite-radio-button value="3" checked>three</calcite-radio-button>
        </calcite-radio-button-group>`
    );
    const element = await page.find("calcite-radio-button-group");
    const selectedItems = await element.findAll(
      "calcite-radio-button[checked]"
    );
    expect(selectedItems).toHaveLength(1);

    const selectedValue = await selectedItems[0].getProperty("value");
    expect(selectedValue).toBe("1");
  });

  describe("keyboard navigation", () => {
    it("selects item with left and arrow keys", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-radio-button-group>
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

      Array.from(radioInputs).forEach(async (radioInput, i) => {
        const name = await radioInput.getAttribute("name");
        const value = await radioInput.getAttribute("value");
        expect(name).toBe("hiddeninput")
        expect(value).toBe((i+1).toString());
      });
    });

    it("selects item with up and down keys", async () => {
      const page = await newE2EPage();
      await page.setContent(
        `<calcite-radio-button-group>
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
  });

  it('defaults to medium', async () => {
    const page = await newE2EPage();
    await page.setContent('<calcite-radio-button-group></calcite-radio-button-group>');

    const element = await page.find('calcite-radio-button-group');
    expect(element.getAttribute("scale")).toBe("m");
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
});
