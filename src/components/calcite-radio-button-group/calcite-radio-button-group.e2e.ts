import { newE2EPage } from '@stencil/core/testing';

describe('calcite-radio-button-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<calcite-radio-button-group></calcite-radio-button-group>');

    const element = await page.find('calcite-radio-button-group');
    expect(element).toHaveClass('hydrated');
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
