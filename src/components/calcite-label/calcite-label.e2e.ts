import { newE2EPage } from "@stencil/core/testing";

describe("calcite-label", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-label></calcite-label>");
    const label = await page.find("calcite-label");
    expect(label).toHaveAttribute("hydrated");
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-label");
    expect(element).toEqualAttribute("status", "idle");
    expect(element).toEqualAttribute("layout", "default");
  });

  it("renders default props when invalid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label status="zip" theme="zap" layout="zot">
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-label");
    expect(element).toEqualAttribute("status", "idle");
    expect(element).toEqualAttribute("layout", "default");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label status="invalid" theme="dark" layout="inline-space-between">
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-label");
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toEqualAttribute("layout", "inline-space-between");
  });

  it("focuses a requested, non-wrapped input", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label for="focus-input-demo-1">
    Label text
    </calcite-label>
    <calcite-input id="focus-input-demo-1"></calcite-input>
  `);
    const label = await page.find("calcite-label");
    const input = await page.find("calcite-input");
    await label.click();
    const activeEl = await page.evaluate(() => document.activeElement["s-hn"]);
    expect(activeEl).toEqual(input.nodeName);
  });

  it("focuses a wrapped input when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const input = await page.find("calcite-input");
    await label.click();
    const activeEl = await page.evaluate(() => document.activeElement["s-hn"]);
    expect(activeEl).toEqual(input.nodeName);
  });

  it("focuses a wrapped input when tabbed to", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
  `);
    const input = await page.find("calcite-input");
    await page.keyboard.press("Tab");
    const activeEl = await page.evaluate(() => document.activeElement["s-hn"]);
    expect(activeEl).toEqual(input.nodeName);
  });

  it("focuses and checks a wrapped checkbox when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-checkbox></calcite-checkbox>
    </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const checkbox = await page.find("calcite-checkbox");
    const checkboxClass = checkbox["_elmHandle"]["_remoteObject"].description;
    await label.click();
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(checkboxClass);
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
    const checkbox = await page.find("calcite-checkbox");
    const checkboxClass = checkbox["_elmHandle"]["_remoteObject"].description;
    await page.keyboard.press("Tab");
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(checkboxClass);
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
    const label = await page.find("calcite-label");
    const switchEl = await page.find("calcite-switch");
    const switchElClass = switchEl["_elmHandle"]["_remoteObject"].description;
    await label.click();
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(switchElClass);
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
    const switchEl = await page.find("calcite-switch");
    const switchElClass = switchEl["_elmHandle"]["_remoteObject"].description;
    await page.keyboard.press("Tab");
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(switchElClass);
    expect(switchEl).not.toHaveAttribute("switched");
  });

  it("focuses a wrapped slider when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-slider></calcite-slider>
    </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const slider = await page.find("calcite-slider");
    const sliderClass = slider["_elmHandle"]["_remoteObject"].description;
    await label.click();
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(sliderClass);
  });

  it("focuses a wrapped slider when tabbed to", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-slider></calcite-slider>
    </calcite-label>
  `);
    const slider = await page.find("calcite-slider");
    const sliderClass = slider["_elmHandle"]["_remoteObject"].description;
    await page.keyboard.press("Tab");
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(sliderClass);
  });

  it("focuses a wrapped checked radio group item when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-radio-group>
      <calcite-radio-group-item value="react">React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember" checked>Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
    </calcite-radio-group>
    </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const radioGroupItem = await page.find("calcite-radio-group-item[checked]");
    const radioGroupItemClass =
      radioGroupItem["_elmHandle"]["_remoteObject"].description;
    await label.click();
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(radioGroupItemClass);
  });

  it("focuses a wrapped checked radio group item when tabbed to", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <calcite-radio-group>
      <calcite-radio-group-item value="react">React</calcite-radio-group-item>
      <calcite-radio-group-item value="ember" checked>Ember</calcite-radio-group-item>
      <calcite-radio-group-item value="angular">Angular</calcite-radio-group-item>
    </calcite-radio-group>
    </calcite-label>
  `);
    const radioGroupItem = await page.find("calcite-radio-group-item[checked]");
    const radioGroupItemClass =
      radioGroupItem["_elmHandle"]["_remoteObject"].description;
    await page.keyboard.press("Tab");
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(radioGroupItemClass);
  });
});
