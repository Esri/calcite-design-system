import { newE2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";

const getActiveElementNameAfterClick = (): string => {
  document.querySelector("calcite-label")?.click();
  return document.activeElement.localName;
};

describe("calcite-label", () => {
  it("renders", async () => {
    const page = await newE2EPage();
    await page.setContent("<calcite-label></calcite-label>");
    const label = await page.find("calcite-label");
    expect(label).toHaveAttribute(HYDRATED_ATTR);
  });

  // todo: maybe we need a commonTest for calcite-label so each test for a component could be in the component's e2e test?
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
    <calcite-label status="invalid" layout="inline-space-between">
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-label");
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("layout", "inline-space-between");
  });

  describe("alignment prop", () => {
    let page;
    let element;
    let style;

    describe("default behavior", () => {
      it("should render with 'start' alignment", async () => {
        page = await newE2EPage({
          html: `<calcite-label>Label text
          <calcite-input></calcite-input>
          </calcite-label>`
        });
        element = await page.find("calcite-label");
        expect(await element.getProperty("alignment")).toEqual("start");
      });

      describe("when in a center-aligned container", () => {
        describe("when direction is left-to-right", () => {
          it("should render text left-aligned", async () => {
            page = await newE2EPage({
              html: `<div style="text-align: center;">
              <calcite-label dir="ltr">Label text
              <calcite-input></calcite-input>
              </calcite-label>
              </div>`
            });
            element = await page.find("calcite-label >>> .container");
            style = await element.getComputedStyle();
            expect(style["textAlign"]).toEqual("left");
          });
        });

        describe("when direction is right-to-left", () => {
          it("should render text right-aligned", async () => {
            page = await newE2EPage({
              html: `<div style="text-align: center;">
              <calcite-label dir="rtl">Label text
              <calcite-input></calcite-input>
              </calcite-label>
              </div>`
            });
            element = await page.find("calcite-label >>> .container");
            style = await element.getComputedStyle();
            expect(style["textAlign"]).toEqual("right");
          });
        });
      });
    });

    describe("when alignment prop is provided", () => {
      describe("'center' alignment", () => {
        it("should render text center-aligned", async () => {
          page = await newE2EPage({
            html: `<calcite-label alignment="center">Label text
            <calcite-input></calcite-input>
            </calcite-label>`
          });
          element = await page.find("calcite-label >>> .container");
          style = await element.getComputedStyle();
          expect(style["textAlign"]).toEqual("center");
        });
      });

      describe("'end' alignment", () => {
        describe("when direction is left-to-right", () => {
          it("should render text right-aligned", async () => {
            page = await newE2EPage({
              html: `<calcite-label alignment="end" dir="ltr">Label text
              <calcite-input></calcite-input>
              </calcite-label>`
            });
            element = await page.find("calcite-label >>> .container");
            style = await element.getComputedStyle();
            expect(style["textAlign"]).toEqual("right");
          });
        });

        describe("when direction is right-to-left", () => {
          it("should render text left-aligned", async () => {
            page = await newE2EPage({
              html: `<calcite-label alignment="end" dir="rtl">Label text
              <calcite-input></calcite-input>
              </calcite-label>`
            });
            element = await page.find("calcite-label >>> .container");
            style = await element.getComputedStyle();
            expect(style["textAlign"]).toEqual("left");
          });
        });
      });
    });
  });

  it("does not pass id to child label element", async () => {
    const page = await newE2EPage();
    await page.setContent(`
    <calcite-label id="dont-duplicate-me" status="invalid" layout="inline-space-between">
    Label text
    <calcite-input></calcite-input>
    </calcite-label>
    `);

    const element = await page.find("calcite-label");
    const childElement = await page.find("calcite-label >>> .container");
    expect(element).toEqualAttribute("id", "dont-duplicate-me");
    expect(childElement).not.toHaveAttribute("id");
    expect(element).toEqualAttribute("status", "invalid");
    expect(element).toEqualAttribute("layout", "inline-space-between");
  });

  describe("wrapped around labelable calcite controls", () => {
    it("focuses a wrapped calcite-input when clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label>
          Label text
          <calcite-input></calcite-input>
        </calcite-label>
    `);
      expect(await page.evaluate(getActiveElementNameAfterClick)).toEqual("calcite-input");
    });

    it("focuses a wrapped calcite-input with label wrapped in span when clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label>
          <span>Label text</span>
          <calcite-input></calcite-input>
        </calcite-label>
    `);
      expect(await page.evaluate(getActiveElementNameAfterClick)).toEqual("calcite-input");
    });

    it("focuses a wrapped calcite-input with for when clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label for="input">
          Label text
          <calcite-input id="input"></calcite-input>
        </calcite-label>
    `);
      expect(await page.evaluate(getActiveElementNameAfterClick)).toEqual("calcite-input");
    });

    it("focuses a wrapped calcite-input with for and label wrapped in span when clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label for="input">
          <span>Label text</span>
          <calcite-input id="input"></calcite-input>
        </calcite-label>
    `);
      expect(await page.evaluate(getActiveElementNameAfterClick)).toEqual("calcite-input");
    });

    it("focuses/checks a wrapped calcite-checkbox when clicked and clicks on the checkbox don't result in a double-check", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label>
          Label text
          <calcite-checkbox></calcite-checkbox>
        </calcite-label>
    `);
      const input = await page.find("input");
      const checkboxClass = input["_elmHandle"]["_remoteObject"].description;
      await page.evaluate(() => document.querySelector("calcite-label")?.click());
      const activeEl = await page.evaluateHandle(() => document.activeElement);
      const activeElClass = activeEl["_remoteObject"].description;
      expect(activeElClass).toEqual(checkboxClass);
      expect(await input.getProperty("checked")).toBe(true);

      const checkbox = await page.find("calcite-checkbox");
      await page.evaluate(() => document.querySelector("calcite-checkbox")?.click());
      expect(await checkbox.getProperty("checked")).toBe(false);
      expect(await input.getProperty("checked")).toBe(false);
    });

    it("focuses/checks a wrapped calcite-checkbox with for when clicked and clicks on the checkbox don't result in a double-check", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label for="checkbox">
          Label text
          <calcite-checkbox id="checkbox"></calcite-checkbox>
        </calcite-label>
    `);
      const input = await page.find("input");
      const checkboxClass = input["_elmHandle"]["_remoteObject"].description;
      await page.evaluate(() => document.querySelector("calcite-label")?.click());
      const activeEl = await page.evaluateHandle(() => document.activeElement);
      const activeElClass = activeEl["_remoteObject"].description;
      expect(activeElClass).toEqual(checkboxClass);
      expect(await input.getProperty("checked")).toBe(true);

      const checkbox = await page.find("calcite-checkbox");
      await page.evaluate(() => document.querySelector("calcite-checkbox")?.click());
      expect(await checkbox.getProperty("checked")).toBe(false);
      expect(await input.getProperty("checked")).toBe(false);
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

    it("checks first calcite-radio-button only when the wrapping label is clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label>
          Label text
          <calcite-radio-button id="one" name="radio" value="one"></calcite-radio-button>
          <calcite-radio-button id="two" name="radio" value="two"></calcite-radio-button>
        </calcite-label>
    `);
      const radio1 = await page.find("#one");
      await page.evaluate(() => document.querySelector("calcite-label")?.click());
      await page.waitForChanges();
      expect(await radio1.getProperty("checked")).toBe(true);

      const radio2 = await page.find("#two");
      await page.evaluate(() => (document.querySelector("#two") as HTMLElement)?.click());
      await page.waitForChanges();

      expect(await radio2.getProperty("checked")).toBe(true);

      await page.evaluate(() => document.querySelector("calcite-label")?.click());
      await page.waitForChanges();
      expect(await radio1.getProperty("checked")).toBe(true);
    });

    it("checks first calcite-radio-button only when the wrapping label wrapped in a span is clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label>
          <span>Label text</span>
          <calcite-radio-button id="one" name="radio" value="one"></calcite-radio-button>
          <calcite-radio-button id="two" name="radio" value="two"></calcite-radio-button>
        </calcite-label>
    `);
      const radio1 = await page.find("#one");

      await page.evaluate(() => document.querySelector("span")?.click());
      await page.waitForChanges();

      expect(await radio1.getProperty("checked")).toBe(true);

      const radio2 = await page.find("#two");
      await page.evaluate(() => (document.querySelector("#two") as HTMLElement)?.click());
      await page.waitForChanges();
      expect(await radio2.getProperty("checked")).toBe(true);

      await page.evaluate(() => document.querySelector("span")?.click());
      await page.waitForChanges();
      expect(await radio1.getProperty("checked")).toBe(true);
    });

    it("focuses and switches a wrapped calcite-switch when clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <calcite-label>
      Label text
      <calcite-switch></calcite-switch>
      </calcite-label>
    `);
      const switchEl = await page.find("calcite-switch");
      const switchElClass = switchEl["_elmHandle"]["_remoteObject"].description;
      await page.evaluate(() => document.querySelector("calcite-label")?.click());
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
      const slider = await page.find("calcite-slider");
      const sliderClass = slider["_elmHandle"]["_remoteObject"].description;
      await page.evaluate(() => document.querySelector("calcite-label")?.click());
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
      const radioGroupItem = await page.find("calcite-radio-group-item[checked]");
      const radioGroupItemClass = radioGroupItem["_elmHandle"]["_remoteObject"].description;
      await page.evaluate(() => document.querySelector("calcite-label")?.click());
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

  describe("sibling of labelable calcite controls", () => {
    it("focuses a sibling calcite-input when clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label for="input">
          Label text
        </calcite-label>
        <calcite-input id="input"></calcite-input>
      `);
      expect(await page.evaluate(getActiveElementNameAfterClick)).toEqual("calcite-input");
    });

    it("focuses a sibling calcite-input when clicked with label wrapped in span", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label for="input">
          <span>Label text</span>
        </calcite-label>
        <calcite-input id="input"></calcite-input>
      `);
      expect(await page.evaluate(getActiveElementNameAfterClick)).toEqual("calcite-input");
    });

    it("focuses/checks a sibling calcite-checkbox when clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label for="checkbox">
          Label text
        </calcite-label>
        <calcite-checkbox id="checkbox"></calcite-checkbox>
      `);
      const input = await page.find("input");
      const checkboxClass = input["_elmHandle"]["_remoteObject"].description;
      await page.evaluate(() => document.querySelector("calcite-label")?.click());
      const activeEl = await page.evaluateHandle(() => document.activeElement);
      const activeElClass = activeEl["_remoteObject"].description;
      expect(activeElClass).toEqual(checkboxClass);
      expect(await input.getProperty("checked")).toBe(true);

      const checkbox = await page.find("calcite-checkbox");
      await page.evaluate(() => document.querySelector("calcite-checkbox")?.click());
      expect(await checkbox.getProperty("checked")).toBe(false);
      expect(await input.getProperty("checked")).toBe(false);
    });

    it("checks calcite-radio-button when its sibling label is clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label for="one">
          Label text
        </calcite-label>
        <calcite-radio-button id="one" name="radio" value="one"></calcite-radio-button>
        <calcite-radio-button id="two" name="radio" value="two"></calcite-radio-button>
    `);
      const radio1 = await page.find("#one");

      await page.evaluate(() => document.querySelector("calcite-label")?.click());
      await page.waitForChanges();
      expect(await radio1.getProperty("checked")).toBe(true);

      const radio2 = await page.find("#two");
      await page.evaluate(() => (document.querySelector("#two") as HTMLElement)?.click());
      await page.waitForChanges();
      expect(await radio2.getProperty("checked")).toBe(true);

      await page.evaluate(() => document.querySelector("calcite-label")?.click());
      await page.waitForChanges();
      expect(await radio1.getProperty("checked")).toBe(true);
    });

    it("checks calcite-radio-button when its sibling label wrapped in a span is clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label for="one">
          <span>Label text</span>
        </calcite-label>
        <calcite-radio-button id="one" name="radio" value="one"></calcite-radio-button>
        <calcite-radio-button id="two" name="radio" value="two"></calcite-radio-button>
    `);
      const radio1 = await page.find("#one");

      await page.evaluate(() => document.querySelector("span")?.click());
      await page.waitForChanges();
      expect(await radio1.getProperty("checked")).toBe(true);

      const radio2 = await page.find("#two");
      await page.evaluate(() => (document.querySelector("#two") as HTMLElement)?.click());
      await page.waitForChanges();
      expect(await radio2.getProperty("checked")).toBe(true);

      await page.evaluate(() => document.querySelector("span")?.click());
      await page.waitForChanges();
      expect(await radio1.getProperty("checked")).toBe(true);
    });

    it("switches a sibling calcite-switch when clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label for="switch">
          Label text
        </calcite-label>
        <calcite-switch id="switch"></calcite-switch>
      `);
      const switchEl = await page.find("calcite-switch");
      await page.evaluate(() => document.querySelector("calcite-label")?.click());
      await page.waitForChanges();
      expect(switchEl).toHaveAttribute("switched");
    });

    it("focuses a sibling calcite-slider when clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <calcite-label for="slider">
          Label text
        </calcite-label>
        <calcite-slider id="slider"></calcite-slider>
      `);
      const slider = await page.find("calcite-slider");
      const sliderClass = slider["_elmHandle"]["_remoteObject"].description;
      await page.evaluate(() => document.querySelector("calcite-label")?.click());
      const activeEl = await page.evaluateHandle(() => document.activeElement);
      const activeElClass = activeEl["_remoteObject"].description;
      expect(activeElClass).toEqual(sliderClass);
    });
  });

  it("clicking sibling label focuses input when both are inside a shadowRoot", async () => {
    const page = await newE2EPage();

    await page.evaluate(() => {
      document.addEventListener("calciteInputFocus", (event: CustomEvent): void => {
        (window as any).eventDetail = event.detail;
      });
    });

    await page.evaluate(() => {
      class ShadowComponent extends HTMLElement {
        constructor() {
          super();
          const shadow = this.attachShadow({ mode: "open" });
          shadow.innerHTML = `
            <calcite-label for="input">Label</calcite-label>
            <calcite-input id="input"></calcite-input>
          `;
        }
      }

      customElements.define("shadow-component", ShadowComponent);

      const shadowComponent = document.createElement("shadow-component");
      document.body.appendChild(shadowComponent);

      shadowComponent.shadowRoot.querySelector("calcite-label").click();
    });

    const eventDetail: any = await page.evaluateHandle(() => (window as any).eventDetail);

    expect(eventDetail).toBeTruthy();
  });
});
