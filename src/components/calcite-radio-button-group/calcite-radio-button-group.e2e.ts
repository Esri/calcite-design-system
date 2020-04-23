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
    expect(element.getAttribute("scale")).toBe("medium");
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
    const theme = await radio.getProperty("theme");
    expect(name).toBe("radio");
    expect(scale).toBe("medium");
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
});
