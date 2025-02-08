import { newE2EPage, E2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it, beforeAll } from "vitest";
import { defaults, hidden, reflects, renders, t9n } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { NumberStringFormatOptions } from "../../utils/locale";
import { isElementFocused } from "../../tests/utils";
import type { StepperItem } from "../stepper-item/stepper-item";
import type { Stepper } from "./stepper";

// we use browser-context function to click on items to workaround `E2EElement#click` error
async function itemClicker(item: StepperItem["el"]) {
  item.click();
}

describe("calcite-stepper", () => {
  describe("defaults", () => {
    defaults("calcite-stepper", [
      {
        propertyName: "icon",
        defaultValue: false,
      },
      {
        propertyName: "layout",
        defaultValue: "horizontal",
      },
      {
        propertyName: "numbered",
        defaultValue: false,
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-stepper", [
      {
        propertyName: "icon",
        value: true,
      },
      {
        propertyName: "layout",
        value: "horizontal",
      },
      {
        propertyName: "numbered",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
    ]);
  });

  describe("renders", () => {
    renders(
      html`<calcite-stepper>
        <calcite-stepper-item heading="Step 1" id="step-1">
          <div>Step 1 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 2" id="step-2">
          <div>Step 2 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 3" id="step-3">
          <div>Step 3 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 4" id="step-4">
          <div>Step 4 content</div>
        </calcite-stepper-item>
      </calcite-stepper>`,
      { display: "flex" },
    );
  });

  describe("translation support", () => {
    t9n("calcite-stepper");
  });

  it("root container display is set to grid in horizontal layout", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-stepper>
        <calcite-stepper-item heading="Step 1" id="step-1">
          <div>Step 1 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 2" id="step-2">
          <div>Step 2 content</div>
        </calcite-stepper-item>
      </calcite-stepper>`,
    );

    const containerEl = await page.find("calcite-stepper >>> .container");
    expect((await containerEl.getComputedStyle()).display).toBe("grid");
  });

  it("inheritable props: `icon`, `layout`, `numbered`, and `scale` get passed to items from parents", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-stepper layout="vertical" scale="l" numbered icon>
        <calcite-stepper-item heading="Step 1" id="step-1">
          <div>Step 1 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 2" id="step-2">
          <div>Step 2 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 3" id="step-3">
          <div>Step 3 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 4" id="step-4">
          <div>Step 4 content</div>
        </calcite-stepper-item>
      </calcite-stepper>
    `);
    const stepperItems = await page.findAll("calcite-stepper-items");

    for (const item of stepperItems) {
      expect(await item.getProperty("icon")).toBe(true);
      expect(await item.getProperty("layout")).toBe("vertical");
      expect(await item.getProperty("scale")).toBe("l");
      expect(await item.getProperty("numbered")).toBe(true);
    }
  });

  // eslint-disable-next-line jest/no-disabled-tests
  describe.skip("honors hidden attribute", () => {
    hidden("calcite-stepper");
  });

  it("adds selected attribute to requested item", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-stepper layout="vertical" scale="l" numbered icon>
        <calcite-stepper-item heading="Step 1" id="step-1">
          <div>Step 1 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 2" id="step-2">
          <div>Step 2 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 3" id="step-3" selected>
          <div>Step 3 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 4" id="step-4">
          <div>Step 4 content</div>
        </calcite-stepper-item>
      </calcite-stepper>`,
    );
    const step1 = await page.find("#step-1");
    const step2 = await page.find("#step-2");
    const step3 = await page.find("#step-3");
    const step4 = await page.find("#step-4");
    expect(step1).not.toHaveAttribute("selected");

    expect(step2).not.toHaveAttribute("selected");

    expect(step3).toHaveAttribute("selected");

    expect(step4).not.toHaveAttribute("selected");
  });

  it("adds selected attribute to first item if none are requested", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-stepper layout="vertical" scale="l" numbered icon>
        <calcite-stepper-item heading="Step 1" id="step-1">
          <div>Step 1 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 2" id="step-2">
          <div>Step 2 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 3" id="step-3">
          <div>Step 3 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 4" id="step-4">
          <div>Step 4 content</div>
        </calcite-stepper-item>
      </calcite-stepper>`,
    );
    const step1 = await page.find("#step-1");
    const step2 = await page.find("#step-2");
    const step3 = await page.find("#step-3");
    const step4 = await page.find("#step-4");
    expect(step1).toHaveAttribute("selected");

    expect(step2).not.toHaveAttribute("selected");

    expect(step3).not.toHaveAttribute("selected");

    expect(step4).not.toHaveAttribute("selected");
  });

  describe("navigation", () => {
    it("navigates correctly with nextStep and prevStep methods", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-stepper>
          <calcite-stepper-item heading="Step 1" id="step-1">
            <div>Step 1 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 2" id="step-2" selected>
            <div>Step 2 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 3" id="step-3">
            <div>Step 3 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 4" id="step-4">
            <div>Step 4 content</div>
          </calcite-stepper-item>
        </calcite-stepper>`,
      );
      const element = await page.find("calcite-stepper");
      const step1 = await page.find("#step-1");
      const step2 = await page.find("#step-2");
      const step3 = await page.find("#step-3");
      const step4 = await page.find("#step-4");
      const step1Content = await page.find("#step-1 >>> .stepper-item-content");
      const step2Content = await page.find("#step-2 >>> .stepper-item-content");
      const step3Content = await page.find("#step-3 >>> .stepper-item-content");
      const step4Content = await page.find("#step-4 >>> .stepper-item-content");
      expect(step1).not.toHaveAttribute("selected");
      expect(step2).toHaveAttribute("selected");
      expect(step3).not.toHaveAttribute("selected");
      expect(step4).not.toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(false);
      expect(await step2Content.isVisible()).toBe(true);
      expect(await step3Content.isVisible()).toBe(false);
      expect(await step4Content.isVisible()).toBe(false);
      await element.callMethod("nextStep");
      await page.waitForChanges();
      expect(step1).not.toHaveAttribute("selected");
      expect(step2).not.toHaveAttribute("selected");
      expect(step3).toHaveAttribute("selected");
      expect(step4).not.toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(false);
      expect(await step2Content.isVisible()).toBe(false);
      expect(await step3Content.isVisible()).toBe(true);
      expect(await step4Content.isVisible()).toBe(false);
      await element.callMethod("prevStep");
      await page.waitForChanges();
      expect(step1).not.toHaveAttribute("selected");
      expect(step2).toHaveAttribute("selected");
      expect(step3).not.toHaveAttribute("selected");
      expect(step4).not.toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(false);
      expect(await step2Content.isVisible()).toBe(true);
      expect(await step3Content.isVisible()).toBe(false);
      expect(await step4Content.isVisible()).toBe(false);
    });

    it("navigates disabled items correctly with nextStep and prevStep methods", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-stepper>
          <calcite-stepper-item heading="Step 1" id="step-1" selected>
            <div>Step 1 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 2" id="step-2" disabled>
            <div>Step 2 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 3" id="step-3">
            <div>Step 3 content</div>
          </calcite-stepper-item>
        </calcite-stepper>`,
      );
      const element = await page.find("calcite-stepper");
      const step1 = await page.find("#step-1");
      const step2 = await page.find("#step-2");
      const step3 = await page.find("#step-3");
      const step1Content = await page.find("#step-1 >>> .stepper-item-content");
      const step2Content = await page.find("#step-2 >>> .stepper-item-content");
      const step3Content = await page.find("#step-3 >>> .stepper-item-content");
      expect(step1).toHaveAttribute("selected");
      expect(step2).not.toHaveAttribute("selected");
      expect(step3).not.toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(true);
      expect(await step2Content.isVisible()).toBe(false);
      expect(await step3Content.isVisible()).toBe(false);
      await element.callMethod("nextStep");
      await page.waitForChanges();
      expect(step1).not.toHaveAttribute("selected");
      expect(step2).not.toHaveAttribute("selected");
      expect(step3).toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(false);
      expect(await step2Content.isVisible()).toBe(false);
      expect(await step3Content.isVisible()).toBe(true);
      await element.callMethod("prevStep");
      await page.waitForChanges();
      expect(step1).toHaveAttribute("selected");
      expect(step2).not.toHaveAttribute("selected");
      expect(step3).not.toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(true);
      expect(await step2Content.isVisible()).toBe(false);
      expect(await step3Content.isVisible()).toBe(false);
    });

    it("navigates correctly with startStep and endStep methods", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-stepper>
          <calcite-stepper-item heading="Step 1" id="step-1">
            <div>Step 1 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 2" id="step-2">
            <div>Step 2 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 3" id="step-3">
            <div>Step 3 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 4" id="step-4">
            <div>Step 4 content</div>
          </calcite-stepper-item>
        </calcite-stepper>`,
      );
      const element = await page.find("calcite-stepper");
      const step1 = await page.find("#step-1");
      const step2 = await page.find("#step-2");
      const step3 = await page.find("#step-3");
      const step4 = await page.find("#step-4");
      const step1Content = await page.find("#step-1 >>> .stepper-item-content");
      const step2Content = await page.find("#step-2 >>> .stepper-item-content");
      const step3Content = await page.find("#step-3 >>> .stepper-item-content");
      const step4Content = await page.find("#step-4 >>> .stepper-item-content");
      await element.callMethod("startStep");
      await page.waitForChanges();
      expect(step1).toHaveAttribute("selected");
      expect(step2).not.toHaveAttribute("selected");
      expect(step3).not.toHaveAttribute("selected");
      expect(step4).not.toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(true);
      expect(await step2Content.isVisible()).toBe(false);
      expect(await step3Content.isVisible()).toBe(false);
      expect(await step4Content.isVisible()).toBe(false);
      await element.callMethod("endStep");
      await page.waitForChanges();
      expect(step1).not.toHaveAttribute("selected");
      expect(step2).not.toHaveAttribute("selected");
      expect(step3).not.toHaveAttribute("selected");
      expect(step4).toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(false);
      expect(await step2Content.isVisible()).toBe(false);
      expect(await step3Content.isVisible()).toBe(false);
      expect(await step4Content.isVisible()).toBe(true);
    });

    it("navigates disabled items correctly with startStep and endStep methods", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-stepper>
          <calcite-stepper-item heading="Step 1" id="step-1" disabled>
            <div>Step 1 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 2" id="step-2">
            <div>Step 2 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 3" id="step-3">
            <div id="step-3 >>> .stepper-item-content">Step 3 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 4" id="step-4" disabled>
            <div>Step 4 content</div>
          </calcite-stepper-item>
        </calcite-stepper>`,
      );
      const element = await page.find("calcite-stepper");
      const step1 = await page.find("#step-1");
      const step2 = await page.find("#step-2");
      const step3 = await page.find("#step-3");
      const step4 = await page.find("#step-4");
      const step1Content = await page.find("#step-1 >>> .stepper-item-content");
      const step2Content = await page.find("#step-2 >>> .stepper-item-content");
      const step3Content = await page.find("#step-3 >>> .stepper-item-content");
      const step4Content = await page.find("#step-4 >>> .stepper-item-content");
      await element.callMethod("endStep");
      await page.waitForChanges();
      expect(step1).not.toHaveAttribute("selected");
      expect(step2).not.toHaveAttribute("selected");
      expect(step3).toHaveAttribute("selected");
      expect(step4).not.toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(false);
      expect(await step2Content.isVisible()).toBe(false);
      expect(await step3Content.isVisible()).toBe(true);
      expect(await step4Content.isVisible()).toBe(false);
      await element.callMethod("startStep");
      await page.waitForChanges();
      expect(step1).not.toHaveAttribute("selected");
      expect(step2).toHaveAttribute("selected");
      expect(step3).not.toHaveAttribute("selected");
      expect(step4).not.toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(false);
      expect(await step2Content.isVisible()).toBe(true);
      expect(await step3Content.isVisible()).toBe(false);
      expect(await step4Content.isVisible()).toBe(false);
    });

    it("navigates to requested step with goToStep method", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-stepper>
          <calcite-stepper-item heading="Step 1" id="step-1">
            <div>Step 1 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 2" id="step-2">
            <div>Step 2 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 3" id="step-3">
            <div>Step 3 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 4" id="step-4">
            <div>Step 4 content</div>
          </calcite-stepper-item>
        </calcite-stepper>`,
      );
      const element = await page.find("calcite-stepper");
      const step1 = await page.find("#step-1");
      const step2 = await page.find("#step-2");
      const step3 = await page.find("#step-3");
      const step4 = await page.find("#step-4");
      const step1Content = await page.find("#step-1 >>> .stepper-item-content");
      const step2Content = await page.find("#step-2 >>> .stepper-item-content");
      const step3Content = await page.find("#step-3 >>> .stepper-item-content");
      const step4Content = await page.find("#step-4 >>> .stepper-item-content");
      await element.callMethod("goToStep", 4);
      await page.waitForChanges();
      expect(step1).not.toHaveAttribute("selected");
      expect(step2).not.toHaveAttribute("selected");
      expect(step3).not.toHaveAttribute("selected");
      expect(step4).toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(false);
      expect(await step2Content.isVisible()).toBe(false);
      expect(await step3Content.isVisible()).toBe(false);
      expect(await step4Content.isVisible()).toBe(true);
      await element.callMethod("goToStep", 2);
      await page.waitForChanges();
      expect(step1).not.toHaveAttribute("selected");
      expect(step2).toHaveAttribute("selected");
      expect(step3).not.toHaveAttribute("selected");
      expect(step4).not.toHaveAttribute("selected");
      expect(await step1Content.isVisible()).toBe(false);
      expect(await step2Content.isVisible()).toBe(true);
      expect(await step3Content.isVisible()).toBe(false);
      expect(await step4Content.isVisible()).toBe(false);
    });

    it("next/previous methods work when placed inside shadow DOM (#992)", async () => {
      const templateHTML = html`
        <calcite-stepper id="stepper">
          <calcite-stepper-item id="item-1" selected heading="Add info" description="Subtitle lorem ipsum" complete
            >Step 1 Content here lorem ipsum</calcite-stepper-item
          >
          <calcite-stepper-item id="item-2" heading="Add data" description="Error example" error
            >Step 2 Content here error</calcite-stepper-item
          >
          <calcite-stepper-item id="item-3" heading="Upload images" description="Subtitle lorem ipsum">
            Step 3 Content here dolor sit amet consectetur</calcite-stepper-item
          >
          <calcite-stepper-item id="item-4" heading="Review" description="Disabled example" disabled
            >Step 4 Content here</calcite-stepper-item
          >
        </calcite-stepper>
        <calcite-button id="prev">Previous Step</calcite-button>
        <calcite-button id="next">Next Step</calcite-button>
      `;

      const page = await newE2EPage({ html: templateHTML });

      await page.waitForChanges();

      const finalSelectedItem = await page.evaluate(async (templateHTML: string): Promise<string> => {
        const wrapperName = "test-calcite-stepper";

        customElements.define(
          wrapperName,
          class extends HTMLElement {
            constructor() {
              super();
            }

            connectedCallback(): void {
              this.attachShadow({ mode: "open" }).innerHTML = templateHTML;
              const stepper = this.shadowRoot.getElementById("stepper") as Stepper["el"];
              this.shadowRoot.getElementById("next").addEventListener("click", () => stepper.nextStep());
              this.shadowRoot.getElementById("prev").addEventListener("click", () => stepper.prevStep());
            }
          },
        );

        document.body.innerHTML = `<${wrapperName}></${wrapperName}>`;
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

        const wrapper = document.querySelector(wrapperName);
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        const item2 = wrapper.shadowRoot.querySelector<HTMLElement>("#item-2");
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        item2.click();
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        wrapper.shadowRoot.querySelector<HTMLElement>("#next").click();
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
        await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));

        return wrapper.shadowRoot.querySelector("calcite-stepper-item[selected]").id;
      }, templateHTML);
      await page.waitForChanges();

      expect(finalSelectedItem).toBe("item-3");
    });
  });

  describe("should emit calciteStepperChange/calciteStepperItemChange on user interaction", () => {
    let layout: Stepper["el"]["layout"];

    async function assertEmitting(page: E2EPage, hasContent: boolean): Promise<void> {
      const element = await page.find("calcite-stepper");
      const itemChangeSpy = await element.spyOnEvent("calciteStepperItemChange");
      const changeSpy = await element.spyOnEvent("calciteStepperChange");
      const firstItem = await page.find("#step-1");

      const getSelectedItemId = async (): Promise<string> => {
        return await page.evaluate((): string => {
          return document.querySelector("calcite-stepper")?.selectedItem?.id || "";
        });
      };

      let expectedEvents = 0;

      // non user interaction
      firstItem.setProperty("selected", true);
      await page.waitForChanges();
      expect(itemChangeSpy).toHaveReceivedEventTimes(expectedEvents);
      expect(changeSpy).toHaveReceivedEventTimes(expectedEvents);

      await page.$eval("#step-2", itemClicker);
      expect(itemChangeSpy).toHaveReceivedEventTimes(++expectedEvents);
      expect(changeSpy).toHaveReceivedEventTimes(expectedEvents);
      expect(await getSelectedItemId()).toBe("step-2");

      if (hasContent) {
        await page.$eval("#step-1", (item: StepperItem["el"]) =>
          item.shadowRoot.querySelector<HTMLElement>(".stepper-item-content").click(),
        );

        if (layout === "vertical") {
          expect(itemChangeSpy).toHaveReceivedEventTimes(++expectedEvents);
          expect(changeSpy).toHaveReceivedEventTimes(expectedEvents);
          expect(await getSelectedItemId()).toBe("step-1");
        } else {
          // no events since horizontal layout moves content outside of item selection hit area
          expect(itemChangeSpy).toHaveReceivedEventTimes(expectedEvents);
          expect(changeSpy).toHaveReceivedEventTimes(expectedEvents);
        }
      }

      // disabled item
      await page.$eval("#step-3", itemClicker);
      expect(itemChangeSpy).toHaveReceivedEventTimes(expectedEvents);
      expect(changeSpy).toHaveReceivedEventTimes(expectedEvents);

      await page.$eval("#step-4", itemClicker);
      expect(itemChangeSpy).toHaveReceivedEventTimes(++expectedEvents);
      expect(changeSpy).toHaveReceivedEventTimes(expectedEvents);
      expect(await getSelectedItemId()).toBe("step-4");

      await element.callMethod("prevStep");
      await page.waitForChanges();
      expect(itemChangeSpy).toHaveReceivedEventTimes(expectedEvents);
      expect(changeSpy).toHaveReceivedEventTimes(expectedEvents);

      await element.callMethod("nextStep");
      await page.waitForChanges();
      expect(itemChangeSpy).toHaveReceivedEventTimes(expectedEvents);
      expect(changeSpy).toHaveReceivedEventTimes(expectedEvents);
    }

    describe("horizontal layout", () => {
      beforeAll(() => {
        layout = "horizontal";
      });

      it("emits with content", async () => {
        const page = await newE2EPage();
        await page.setContent(
          html`<calcite-stepper layout="${layout}">
            <calcite-stepper-item heading="Step 1" id="step-1">
              <div>Step 1 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Step 2" id="step-2">
              <div>Step 2 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Step 3" id="step-3" disabled>
              <div>Step 3 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Step 4" id="step-4">
              <div>Step 4 content</div>
            </calcite-stepper-item>
          </calcite-stepper>`,
        );

        await assertEmitting(page, true);
      });

      it("emits without content", async () => {
        const page = await newE2EPage();
        await page.setContent(
          html`<calcite-stepper layout="${layout}">
            <calcite-stepper-item heading="Step 1" id="step-1"></calcite-stepper-item>
            <calcite-stepper-item heading="Step 2" id="step-2"></calcite-stepper-item>
            <calcite-stepper-item heading="Step 3" id="step-3" disabled></calcite-stepper-item>
            <calcite-stepper-item heading="Step 4" id="step-4"></calcite-stepper-item>
          </calcite-stepper>`,
        );

        await assertEmitting(page, false);
      });
    });

    describe("vertical layout", () => {
      beforeAll(() => {
        layout = "vertical";
      });

      it("emits with content", async () => {
        const page = await newE2EPage();
        await page.setContent(
          html`<calcite-stepper layout="${layout}">
            <calcite-stepper-item heading="Step 1" id="step-1">
              <div>Step 1 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Step 2" id="step-2">
              <div>Step 2 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Step 3" id="step-3" disabled>
              <div>Step 3 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Step 4" id="step-4">
              <div>Step 4 content</div>
            </calcite-stepper-item>
          </calcite-stepper>`,
        );

        await assertEmitting(page, true);
      });

      it("emits without content", async () => {
        const page = await newE2EPage();
        await page.setContent(
          html`<calcite-stepper layout="${layout}">
            <calcite-stepper-item heading="Step 1" id="step-1"></calcite-stepper-item>
            <calcite-stepper-item heading="Step 2" id="step-2"></calcite-stepper-item>
            <calcite-stepper-item heading="Step 3" id="step-3" disabled></calcite-stepper-item>
            <calcite-stepper-item heading="Step 4" id="step-4"></calcite-stepper-item>
          </calcite-stepper>`,
        );

        await assertEmitting(page, false);
      });
    });
  });

  it("should render correct numbering-system with multiple stepper component", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-stepper numbered>
      <calcite-stepper-item heading="Add info" description="Subtitle lorem ipsum" complete id="step-one"
        >Step 1 Content here lorem ipsum</calcite-stepper-item
      >
    </calcite-stepper>

    <calcite-stepper numbered numbering-system="arab" lang="ar" dir="rtl" >
      <calcite-stepper-item heading="الخطوةالاولى" complete id="step-two">
       الخطوة الأولى للمحتوى هنا
    </calcite-stepper>`);
    const [stepper1, stepper2] = await page.findAll("calcite-stepper");
    expect(stepper2.getAttribute("numbering-system")).toEqual("arab");

    await stepper1.click();
    await page.waitForChanges();
    await stepper2.click();
    await page.waitForChanges();
    await stepper1.click();
    await page.waitForChanges();

    const stepper1Number = await page.find("calcite-stepper-item[id='step-one'] >>> .stepper-item-number");
    expect(stepper1Number.textContent).toBe("1.");

    stepper2.setProperty("numberingSystem", "arabext");
    await page.waitForChanges();

    const stepper2Number = await page.find("calcite-stepper-item[id='step-two'] >>> .stepper-item-number");

    const arabextNumeral1 = new Intl.NumberFormat("ar", {
      numberingSystem: "arabext",
    } as NumberStringFormatOptions).format(1);

    expect(stepper2Number.textContent).toBe(`${arabextNumeral1}.`);
  });

  it("should have correct ARIA attributes", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-stepper>
        <calcite-stepper-item heading="Step 1" id="step-1">
          <div>Step 1 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 2" id="step-2">
          <div>Step 2 content</div>
        </calcite-stepper-item>
      </calcite-stepper>`,
    );

    const stepper = await page.find("calcite-stepper");
    const [stepperItem1, stepperItem2] = await page.findAll("calcite-stepper-item");
    const messages = await import("./assets/t9n/messages.json");

    expect(stepper.getAttribute("aria-label")).toEqual(messages.label);
    expect(stepperItem1.getAttribute("aria-current")).toEqual("step");

    await page.$eval("#step-2", itemClicker);
    await page.waitForChanges();
    expect(stepperItem2.getAttribute("aria-current")).toEqual("step");
  });

  it("should select the first stepper-item if none of the stepper-item's are selected", async () => {
    const page = await newE2EPage();
    await page.setContent(html`<calcite-stepper>
      <calcite-stepper-item heading="Step 1" id="step-1">
        <div>Step 1 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Step 2" id="step-2">
        <div>Step 2 content</div>
      </calcite-stepper-item>
    </calcite-stepper>
    <calcite-stepper-item heading="Step 3" id="step-3">
    <div>Step 3content</div>
  </calcite-stepper-item>
</calcite-stepper>`);

    const [stepperItem1, stepperItem2, stepperItem3] = await page.findAll("calcite-stepper-item");
    expect(await stepperItem1.getProperty("selected")).toBe(true);
    expect(await stepperItem2.getProperty("selected")).not.toBe(true);
    expect(await stepperItem3.getProperty("selected")).not.toBe(true);
  });

  it("should select the next enabled stepper-item if first stepper-item is disabled", async () => {
    const page = await newE2EPage();
    await page.setContent(
      html`<calcite-stepper>
        <calcite-stepper-item heading="Step 1" id="step-1" disabled>
          <div>Step 1 content</div>
        </calcite-stepper-item>
        <calcite-stepper-item heading="Step 2" id="step-2">
          <div>Step 2 content</div>
        </calcite-stepper-item>
      </calcite-stepper>`,
    );

    const [stepperItem1, stepperItem2] = await page.findAll("calcite-stepper-item");
    expect(await stepperItem1.getProperty("selected")).toBe(false);
    expect(await stepperItem2.getProperty("selected")).toBe(true);
  });

  describe("horizontal-single layout", () => {
    it("should display action buttons when layout is horizontal-single.", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-stepper layout="horizontal-single">
          <calcite-stepper-item heading="Step 1" id="step-1">
            <div>Step 1 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 2" id="step-2">
            <div>Step 2 content</div>
          </calcite-stepper-item>
        </calcite-stepper>`,
      );

      const [actionStart, actionEnd] = await page.findAll("calcite-stepper >>> calcite-action");
      const [stepperItem1, stepperItem2] = await page.findAll("calcite-stepper-item");

      expect(await actionStart.isVisible()).toBe(true);
      expect(await actionStart.getProperty("disabled")).toEqual(true);
      expect(await actionEnd.isVisible()).toBe(true);
      expect(await stepperItem1.isVisible()).toBe(true);
      expect(await stepperItem2.isVisible()).toBe(false);

      await actionEnd.click();
      await page.waitForChanges();
      expect(await stepperItem1.isVisible()).toBe(false);
      expect(await stepperItem2.isVisible()).toBe(true);
    });

    it("focus order", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-stepper layout="horizontal-single">
          <calcite-stepper-item heading="Step 1" id="step-1">
            <calcite-button id="button1">Click</calcite-button>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 2" id="step-2">
            <calcite-button id="button2">Click</calcite-button>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 3" id="step-3">
            <calcite-button id="button3">Click</calcite-button>
          </calcite-stepper-item>
        </calcite-stepper>`,
      );

      const [actionStart, actionEnd] = await page.findAll("calcite-stepper >>> calcite-action");

      const actionEndId = actionEnd.getAttribute("id");
      const actionStartId = actionStart.getAttribute("id");
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await isElementFocused(page, `#${actionEndId}`, { shadowed: true })).toBe(true);

      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await isElementFocused(page, `#button1`)).toBe(true);

      await actionEnd.click();
      await page.waitForChanges();
      await page.keyboard.press("Tab");
      await page.waitForChanges();
      expect(await isElementFocused(page, `#button2`)).toBe(true);

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      await page.waitForChanges();
      expect(await isElementFocused(page, `#${actionEndId}`, { shadowed: true })).toBe(true);

      await page.keyboard.down("Shift");
      await page.keyboard.press("Tab");
      await page.keyboard.up("Shift");
      await page.waitForChanges();
      expect(await isElementFocused(page, `#${actionStartId}`, { shadowed: true })).toBe(true);
    });

    it("should emit calciteStepperItemChange on user interaction", async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`<calcite-stepper layout="horizontal-single">
          <calcite-stepper-item heading="Step 1" id="step-1">
            <div>Step 1 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 2" id="step-2" disabled>
            <div>Step 2 content</div>
          </calcite-stepper-item>
          <calcite-stepper-item heading="Step 3" id="step-2">
            <div>Step 3 content</div>
          </calcite-stepper-item>
        </calcite-stepper>`,
      );

      const stepper = await page.find("calcite-stepper");
      const [actionStart, actionEnd] = await page.findAll("calcite-stepper >>> calcite-action");
      const changeSpy = await stepper.spyOnEvent("calciteStepperChange");
      const itemChangeSpy = await stepper.spyOnEvent("calciteStepperItemChange");
      expect(changeSpy).toHaveReceivedEventTimes(0);
      expect(itemChangeSpy).toHaveReceivedEventTimes(0);

      // shouldn't emit change event when disabled element is visible
      await actionEnd.click();
      expect(changeSpy).toHaveReceivedEventTimes(0);
      expect(itemChangeSpy).toHaveReceivedEventTimes(0);

      await actionEnd.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(itemChangeSpy).toHaveReceivedEventTimes(1);

      // shouldn't emit change event when disabled element is visible
      await actionStart.click();
      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(itemChangeSpy).toHaveReceivedEventTimes(1);

      await actionStart.click();
      expect(changeSpy).toHaveReceivedEventTimes(2);
      expect(itemChangeSpy).toHaveReceivedEventTimes(2);
    });

    it(`switching to layout="horizontal-single" dynamically from another option should display a single item (#8931)`, async () => {
      const page = await newE2EPage();
      await page.setContent(
        html`
          <calcite-stepper layout="horizontal">
            <calcite-stepper-item heading="Step 1" selected>
              <div>Step 1 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Step 2">
              <div>Step 2 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Step 3">
              <div>Step 3 content</div>
            </calcite-stepper-item>
            <calcite-stepper-item heading="Review">
              <div>Step 4 content</div>
            </calcite-stepper-item>
          </calcite-stepper>
          </calcite-stepper>`,
      );

      const stepper = await page.find("calcite-stepper");
      await stepper.setProperty("layout", "horizontal-single");
      await page.waitForChanges();

      const displayedItems = await page.findAll("calcite-stepper-item:not([hidden])");
      expect(displayedItems.length).toBe(1);
    });
  });
});
