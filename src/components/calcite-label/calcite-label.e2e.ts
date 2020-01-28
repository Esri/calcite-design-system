import { newE2EPage } from "@stencil/core/testing";

describe("calcite-label", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-label></calcite-label>");
    const element = await page.find("calcite-label");
    expect(element).toHaveClass("hydrated");
  });

  it("focuses a requested, non-wrapped input", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label for="focus-input-demo-1">
    Label text
    </calcite-label>
    <calcite-input id="focus-input-demo-1"></calcite-input>
  `);

    const element = await page.find("calcite-label");
    const input = await page.find("calcite-input");
    const focusSpy = spyOn(input, 'focus');
    await element.click();
    await page.waitForChanges();
    expect(focusSpy).toHaveBeenCalled();
    expect(input).not.toEqual(input);
  });


  it("focuses a wrapped input when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
  `);
    const element = await page.find("calcite-label");
    let input;
    await element.click();
    await page.$eval("calcite-input", (el: HTMLCalciteInputElement) => {
      input = el.querySelector("calcite-input");
    });
    expect(document.activeElement).toEqual(input);
  });

  it("focuses a wrapped input when tabbed to", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
  `);
    let input;

    await page.keyboard.press("Tab");
    await page.$eval("calcite-input", (el: HTMLCalciteInputElement) => {
      input = el.querySelector("calcite-input");
    });
    expect(document.activeElement).toEqual(input);
  });

  it("focuses and checks a wrapped checkbox when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-checkbox></calcite-checkbox>
    </calcite-label>
  `);
    const element = await page.find("calcite-label");
    let checkbox;
    await page.find("calcite-checkbox");

    await element.click();
    expect(document.activeElement).toEqual(checkbox);
    expect(checkbox).toHaveAttribute("checked");
  });

  it("focuses but does not check a wrapped checkbox when tabbed to", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-checkbox></calcite-checkbox>
    </calcite-label>
  `);
    await page.keyboard.press("Tab");
    let checkbox;
    await page.$eval("calcite-checkbox", (el: HTMLCalciteCheckboxElement) => {
      checkbox = el.querySelector("calcite-checkbox");
    });
    expect(document.activeElement).toEqual(checkbox);
    expect(checkbox).not.toHaveAttribute("checked");
  });

  it("focuses and switches a wrapped switch when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-switch></calcite-switch>
    </calcite-label>
  `);
    const element = await page.find("calcite-label");
    let switchEl;
    await element.click();
    await page.$eval("calcite-switch", (el: HTMLCalciteSwitchElement) => {
      switchEl = el.querySelector("calcite-switch");
    });
    expect(document.activeElement).toEqual(switchEl);
    expect(switchEl).toHaveAttribute("switched");
  });

  it("focuses but does not switch a wrapped switch when tabbed to", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-switch></calcite-switch>
    </calcite-label>
  `);
    const element = await page.find("calcite-label");
    let switchEl;
    await element.click();
    await page.$eval("calcite-switch", (el: HTMLCalciteSwitchElement) => {
      switchEl = el.querySelector("calcite-switch");
    });
    expect(document.activeElement).toEqual(switchEl);
    expect(switchEl).not.toHaveAttribute("switched");
  });
});
