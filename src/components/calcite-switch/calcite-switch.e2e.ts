import { newE2EPage } from '@stencil/core/testing';

describe('calcite-switch', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<calcite-switch></calcite-switch>');
    const element = await page.find('calcite-switch');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the text data', async () => {
    const page = await newE2EPage();

    await page.setContent('<calcite-switch text="Test switch"></calcite-switch>');
    const component = await page.find('calcite-switch');
    const element = await page.find('calcite-switch >>> label');
    expect(element.textContent).toEqual(`Test switch`);

    component.setProperty('position', 'right');
    await page.waitForChanges();
    let pageEl = await page.find('calcite-switch >>> .toggle-switch-track');
    expect( pageEl).toHaveClass('toggle-switch-track--right');

    component.setProperty('position', 'left');
    await page.waitForChanges();
    expect( pageEl).toHaveClass('toggle-switch-track--left');

    
    const input = await page.find('calcite-switch >>> input');
    element.click();
    await page.waitForChanges();
    let value = await input.getProperty('checked');
    expect(value).toBe(true);
    
    element.click();
    await page.waitForChanges();
    value = await input.getProperty('checked');
    console.log(value);
    expect(value).toBe(false);
    
  });
});
