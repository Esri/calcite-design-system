import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

describe("calcite-label", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-label></calcite-label>");
    const label = await page.find("calcite-label");
    expect(label).toHaveAttribute(HYDRATED_ATTR);
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

  it("does not pass id to child label element", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label id="dont-duplicate-me" status="invalid" theme="dark" layout="inline-space-between">
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-label");
    const childElement = await page.find("calcite-label label");
    expect(element).toEqualAttribute("id", "dont-duplicate-me");
    expect(childElement).not.toHaveAttribute("id");
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("theme", "dark");
    expect(element).toEqualAttribute("layout", "inline-space-between");
  });

  it("focuses a requested, non-wrapped calcite-input", async () => {
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
        <input></input>
      </calcite-label>
  `);
    expect(
      await page.evaluate(async () => {
        const label: HTMLSpanElement = document.querySelector("label");
        await label.click();
        return document.activeElement.localName;
      })
    ).toEqual("input");
  });

  it("focuses a wrapped input with for when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label for="input">
        Label text
        <input id="input"></input>
      </calcite-label>
  `);
    expect(
      await page.evaluate(async () => {
        const label: HTMLSpanElement = document.querySelector("label");
        await label.click();
        return document.activeElement.localName;
      })
    ).toEqual("input");
  });

  it("focuses a wrapped textarea when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label>
        Label text
        <textarea></textarea>
      </calcite-label>
  `);
    expect(
      await page.evaluate(async () => {
        const label: HTMLSpanElement = document.querySelector("label");
        await label.click();
        return document.activeElement.localName;
      })
    ).toEqual("textarea");
  });

  it("focuses a wrapped textarea with for when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label for="textarea">
        Label text
        <textarea id="textarea"></textarea>
      </calcite-label>
  `);
    expect(
      await page.evaluate(async () => {
        const label: HTMLSpanElement = document.querySelector("label");
        await label.click();
        return document.activeElement.localName;
      })
    ).toEqual("textarea");
  });

  it("clicks a wrapped checkbox when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label>
        Label text
        <input type="checkbox">
      </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const checkbox = await page.find("input");
    await label.click();
    expect(await checkbox.getProperty("checked")).toBe(true);
  });

  it("clicks a wrapped checkbox with for when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label for="checkbox">
        Label text
        <input id="checkbox" type="checkbox">
      </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const checkbox = await page.find("input");
    await label.click();
    expect(await checkbox.getProperty("checked")).toBe(true);
  });

  it("clicks a wrapped radio input when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label>
        Label text
        <input type="radio" name="radio">
        <input type="radio" name="radio">
      </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const radio = await page.findAll("input");
    await label.click();
    expect(await radio[0].getProperty("checked")).toBe(true);
  });

  it("clicks a wrapped radio input with for when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label for="first-radio">
        Label text
        <input id="first-radio" type="radio">
        <input type="radio">
      </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const radio = await page.findAll("input");
    await label.click();
    expect(await radio[0].getProperty("checked")).toBe(true);
  });

  it("focuses a wrapped select when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
      Label text
      <select>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>
    </calcite-label>
  `);
    expect(
      await page.evaluate(async () => {
        const label: HTMLSpanElement = document.querySelector("label");
        await label.click();
        return document.activeElement.localName;
      })
    ).toEqual("select");
  });

  it("focuses a wrapped select with for when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label for="select">
        Label text
        <select id="select">
          <option value="volvo">Volvo</option>
          <option value="saab">Saab</option>
          <option value="mercedes">Mercedes</option>
          <option value="audi">Audi</option>
        </select>
      </calcite-label>
  `);
    expect(
      await page.evaluate(async () => {
        const label: HTMLSpanElement = document.querySelector("label");
        await label.click();
        return document.activeElement.localName;
      })
    ).toEqual("select");
  });

  it("focuses a wrapped calcite-input when clicked", async () => {
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

  it("focuses/clicks a wrapped button when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label>
        Label text
        <button type="button">Button</button>
      </calcite-label>
  `);
    expect(
      await page.evaluate(async () => {
        const label: HTMLSpanElement = document.querySelector("label");
        await label.click();
        return document.activeElement.localName;
      })
    ).toEqual("button");
  });

  it("focuses/clicks a wrapped button with for when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label for="button">
        Label text
        <button id="button" type="button">Button</button>
      </calcite-label>
  `);
    expect(
      await page.evaluate(async () => {
        const label: HTMLSpanElement = document.querySelector("label");
        await label.click();
        return document.activeElement.localName;
      })
    ).toEqual("button");
  });

  it("focuses a wrapped calcite-input with for when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label for="input">
        Label text
        <calcite-input id="input"></calcite-input>
      </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const input = await page.find("calcite-input");
    await label.click();
    const activeEl = await page.evaluate(() => document.activeElement["s-hn"]);
    expect(activeEl).toEqual(input.nodeName);
  });

  it("focuses a wrapped calcite-input when tabbed to", async () => {
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

  it("focuses and checks a wrapped calcite-checkbox when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label>
        Label text
        <calcite-checkbox></calcite-checkbox>
      </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const input = await page.find("input");
    const checkboxClass = input["_elmHandle"]["_remoteObject"].description;
    await label.click();
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(checkboxClass);
    expect(await input.getProperty("checked")).toBe(true);
  });

  it("focuses and checks a wrapped checkbox when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label>
    Label text
    <input type="checkbox">
    </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const input = await page.find("input");
    const checkboxClass = input["_elmHandle"]["_remoteObject"].description;
    await label.click();
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(checkboxClass);
    expect(await input.getProperty("checked")).toBe(true);
  });

  it("focuses and checks a wrapped checkbox with for when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label for="native">
    Label text
    <input id="native" type="checkbox">
    </calcite-label>
  `);
    const label = await page.find("calcite-label");
    const input = await page.find("input");
    const checkboxClass = input["_elmHandle"]["_remoteObject"].description;
    await label.click();
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(checkboxClass);
    expect(await input.getProperty("checked")).toBe(true);
  });

  it("focuses but does not check a wrapped calcite-checkbox when tabbed to", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-label>
        Label text
        <calcite-checkbox></calcite-checkbox>
      </calcite-label>
  `);
    const checkbox = await page.find("input");
    const checkboxClass = checkbox["_elmHandle"]["_remoteObject"].description;
    await page.keyboard.press("Tab");
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(checkboxClass);
    expect(checkbox).not.toHaveAttribute("checked");
  });

  it("focuses and switches a wrapped calcite-switch when clicked", async () => {
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

  it("focuses but does not switch a wrapped calcite-switch when tabbed to", async () => {
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

  it("focuses a wrapped calcite-slider when clicked", async () => {
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

  it("focuses a wrapped calcite-slider when tabbed to", async () => {
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

  it("focuses a wrapped checked calcite-radio-group-item when clicked", async () => {
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
    const radioGroupItemClass = radioGroupItem["_elmHandle"]["_remoteObject"].description;
    await label.click();
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(radioGroupItemClass);
  });

  it("focuses a wrapped checked calcite-radio-group-item when tabbed to", async () => {
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
    const radioGroupItemClass = radioGroupItem["_elmHandle"]["_remoteObject"].description;
    await page.keyboard.press("Tab");
    const activeEl = await page.evaluateHandle(() => document.activeElement);
    const activeElClass = activeEl["_remoteObject"].description;
    expect(activeElClass).toEqual(radioGroupItemClass);
  });
});
