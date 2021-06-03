import { accessible, HYDRATED_ATTR } from "../../tests/commonTests";
import { E2EPage } from "@stencil/core/testing";
import { newE2EPage } from "@stencil/core/testing";

describe("calcite-inline-editable", () => {
  describe("rendering permutations", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
      <calcite-inline-editable>
        <calcite-input/>
      </calcite-inline-editable>
      `);
    });

    it("renders", async () => {
      const element = await page.find("calcite-inline-editable");
      expect(element).toHaveAttribute(HYDRATED_ATTR);
    });

    it("renders default props when none are provided", async () => {
      const element = await page.find("calcite-inline-editable");
      await page.waitForChanges();
      expect(element).not.toHaveAttribute("controls");
      expect(element).not.toHaveAttribute("editing-enabled");
      expect(element).not.toHaveAttribute("loading");
    });

    it("uses a wrapping label's scale when none are provided", async () => {
      page = await newE2EPage();
      await page.setContent(`
      <calcite-label scale="l">
        <calcite-inline-editable>
          <calcite-input/>
        </calcite-inline-editable>
      </calcite-label>
      `);
      await page.waitForChanges();
      const element = await page.find("calcite-inline-editable");
      expect(element).toEqualAttribute("scale", "l");
    });

    it("uses a child input's scale when none are provided", async () => {
      page = await newE2EPage();
      await page.setContent(`
      <calcite-label>
        <calcite-inline-editable>
          <calcite-input scale="l"/>
        </calcite-inline-editable>
      </calcite-label>
      `);
      await page.waitForChanges();
      const element = await page.find("calcite-inline-editable");
      expect(element).toEqualAttribute("scale", "l");
    });

    it("renders requested props when valid props are provided", async () => {
      page = await newE2EPage();
      await page.setContent(`
      <calcite-inline-editable controls editing-enabled loading disabled scale="l" >
        <calcite-input/>
      </calcite-inline-editable>
      `);
      await page.waitForChanges();
      const element = await page.find("calcite-inline-editable");
      expect(element).toEqualAttribute("scale", "l");
      expect(element).toHaveAttribute("controls");
      expect(element).toHaveAttribute("editing-enabled");
      expect(element).toHaveAttribute("loading");
      expect(element).toHaveAttribute("disabled");
    });
  });

  describe("does not have controls", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
      <calcite-inline-editable>
        <calcite-input value="John Doe"/>
      </calcite-inline-editable>
      `);
    });

    it("enables editing when enable button is clicked", async () => {
      const calciteInlineEditableEnableEditingChange = await page.spyOnEvent(
        "calciteInlineEditableEnableEditingChange"
      );
      const element = await page.find("calcite-inline-editable");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      expect(element).toHaveAttribute("editing-enabled");
      expect(calciteInlineEditableEnableEditingChange).toHaveReceivedEventTimes(1);
    });

    it("enables editing when the child input is clicked", async () => {
      const calciteInlineEditableEnableEditingChange = await page.spyOnEvent(
        "calciteInlineEditableEnableEditingChange"
      );
      const element = await page.find("calcite-inline-editable");
      await element.click();
      expect(element).toHaveAttribute("editing-enabled");
      expect(calciteInlineEditableEnableEditingChange).toHaveReceivedEventTimes(1);
    });

    it("prevents editing when the component is disabled", async () => {
      page = await newE2EPage();
      await page.setContent(`
      <calcite-inline-editable disabled>
        <calcite-input value="John Doe"/>
      </calcite-inline-editable>
      `);
      const calciteInlineEditableEnableEditingChange = await page.spyOnEvent(
        "calciteInlineEditableEnableEditingChange"
      );
      const element = await page.find("calcite-inline-editable");
      const input = await page.find("calcite-input");
      await element.click();
      expect(element).not.toHaveAttribute("editing-enabled");
      expect(input).toHaveAttribute("disabled");
      expect(calciteInlineEditableEnableEditingChange).toHaveReceivedEventTimes(0);
      element.setProperty("disabled", false);
      await page.waitForChanges();
      await element.click();
      expect(element).toHaveAttribute("editing-enabled");
      expect(input).not.toHaveAttribute("disabled");
      expect(calciteInlineEditableEnableEditingChange).toHaveReceivedEventTimes(1);
    });

    it("disables editing when the child input loses focus", async () => {
      const element = await page.find("calcite-inline-editable");
      const input = await page.find("calcite-input");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      expect(element).toHaveAttribute("editing-enabled");
      input.triggerEvent("calciteInputBlur");
      await page.waitForChanges();
      expect(element).not.toHaveAttribute("editing-enabled");
    });

    describe("accessibility", () => {
      it("is accessible", async () =>
        accessible(`
        <calcite-label>
          Label
          <calcite-inline-editable>
            <calcite-input value="John Doe"/>
          </calcite-inline-editable>
        <calcite-label>
      `));

      it("is accessible when editing is enabled", async () =>
        accessible(`
        <calcite-label>
          Label
          <calcite-inline-editable editing-enabled>
            <calcite-input value="John Doe"/>
          </calcite-inline-editable>
        </calcite-label>
      `));
    });
  });

  describe("has controls", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
      <calcite-inline-editable controls>
        <calcite-input value="John Doe"/>
      </calcite-inline-editable>
      `);
    });

    it("enables editing when enable button is clicked", async () => {
      const calciteInlineEditableEnableEditingChange = await page.spyOnEvent(
        "calciteInlineEditableEnableEditingChange"
      );
      const element = await page.find("calcite-inline-editable");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      expect(element).toHaveAttribute("editing-enabled");
      expect(calciteInlineEditableEnableEditingChange).toHaveReceivedEventTimes(1);
    });

    it("enables editing when the child input is clicked", async () => {
      const calciteInlineEditableEnableEditingChange = await page.spyOnEvent(
        "calciteInlineEditableEnableEditingChange"
      );
      const element = await page.find("calcite-inline-editable");
      await element.click();
      expect(element).toHaveAttribute("editing-enabled");
      expect(calciteInlineEditableEnableEditingChange).toHaveReceivedEventTimes(1);
    });

    it("restores input value after cancel button is clicked", async () => {
      const calciteInlineEditableEditingCancel = await page.spyOnEvent("calciteInlineEditableEditingCancel");
      const element = await page.find("calcite-inline-editable");
      const input = await element.find("calcite-input");
      await element.click();
      const cancelEditingButton = await element.find(".calcite-inline-editable-cancel-editing-button");
      expect(input.getAttribute("value")).toBe("John Doe");
      await page.$eval("calcite-input input", (input: HTMLInputElement): void => {
        input.setSelectionRange(input.value.length, input.value.length);
      });
      await input.type("typo");
      expect(input.getAttribute("value")).toBe("John Doetypo");
      await cancelEditingButton.click();
      await page.waitForChanges();
      expect(input.getAttribute("value")).toBe("John Doe");
      expect(calciteInlineEditableEditingCancel).toHaveReceivedEventTimes(1);
    });

    it("restores input value after escape key is pressed", async () => {
      const calciteInlineEditableEditingCancel = await page.spyOnEvent("calciteInlineEditableEditingCancel");
      const element = await page.find("calcite-inline-editable");
      const input = await element.find("calcite-input");
      await element.click();
      expect(input.getAttribute("value")).toBe("John Doe");
      await page.$eval("calcite-input input", (input: HTMLInputElement): void => {
        input.setSelectionRange(input.value.length, input.value.length);
      });
      await input.type("typo");
      expect(input.getAttribute("value")).toBe("John Doetypo");
      await page.keyboard.press("Escape");
      await page.waitForChanges();
      expect(input.getAttribute("value")).toBe("John Doe");
      expect(calciteInlineEditableEditingCancel).toHaveReceivedEventTimes(1);
    });

    it("does not disable editing when input focus is lost", async () => {
      const element = await page.find("calcite-inline-editable");
      const input = await page.find("calcite-input");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      expect(element).toHaveAttribute("editing-enabled");
      input.triggerEvent("calciteInputBlur");
      await page.waitForChanges();
      expect(element).toHaveAttribute("editing-enabled");
    });

    it("emits a confirm changes event when the save button is clicked", async () => {
      const calciteInlineEditableChangesConfirm = await page.spyOnEvent("calciteInlineEditableChangesConfirm");
      const element = await page.find("calcite-inline-editable");
      const input = await page.find("calcite-input");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      const confirmChangesButton = await element.find(".calcite-inline-editable-confirm-changes-button");
      await page.$eval("calcite-input input", (input: HTMLInputElement): void => {
        input.setSelectionRange(input.value.length, input.value.length);
      });
      await input.type("Moe");
      await confirmChangesButton.click();
      expect(calciteInlineEditableChangesConfirm).toHaveReceivedEventTimes(1);
      expect(input.getAttribute("value")).toBe("John DoeMoe");
      expect(element).toHaveAttribute("editing-enabled");
    });

    it("disables editing when afterConfirm resolves successfully", async () => {
      const element = await page.find("calcite-inline-editable");
      const afterConfirm: () => Promise<void> = () => new Promise((resolve) => setTimeout(resolve, 100));
      // https://github.com/ionic-team/stencil/issues/1174
      await page.exposeFunction("afterConfirm", afterConfirm);
      await page.$eval("calcite-inline-editable", (el: HTMLCalciteInlineEditableElement) => {
        el.afterConfirm = afterConfirm;
      });
      const calciteInlineEditableChangesConfirm = await page.spyOnEvent("calciteInlineEditableChangesConfirm");
      const input = await page.find("calcite-input");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      const confirmChangesButton = await element.find(".calcite-inline-editable-confirm-changes-button");
      await page.$eval("calcite-input input", (input: HTMLInputElement): void => {
        input.setSelectionRange(input.value.length, input.value.length);
      });
      await input.type("Moe");
      await confirmChangesButton.click();
      expect(calciteInlineEditableChangesConfirm).toHaveReceivedEventTimes(1);
      await page.waitForChanges();
      expect(input.getAttribute("value")).toBe("John DoeMoe");
      expect(element).not.toHaveAttribute("editing-enabled");
    });

    it("does not disable editing when afterConfirm resolves unsuccessfully", async () => {
      const element = await page.find("calcite-inline-editable");
      const afterConfirm: () => Promise<void> = () => new Promise((_resolve, reject) => setTimeout(reject, 100));
      // https://github.com/ionic-team/stencil/issues/1174
      await page.exposeFunction("afterConfirm", afterConfirm);
      await page.$eval("calcite-inline-editable", (el: HTMLCalciteInlineEditableElement) => {
        el.afterConfirm = afterConfirm;
      });
      const calciteInlineEditableChangesConfirm = await page.spyOnEvent("calciteInlineEditableChangesConfirm");
      const input = await page.find("calcite-input");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      const confirmChangesButton = await element.find(".calcite-inline-editable-confirm-changes-button");
      await page.$eval("calcite-input input", (input: HTMLInputElement): void => {
        input.setSelectionRange(input.value.length, input.value.length);
      });
      await input.type("Moe");
      await confirmChangesButton.click();
      expect(calciteInlineEditableChangesConfirm).toHaveReceivedEventTimes(1);
      await page.waitForChanges();
      expect(input.getAttribute("value")).toBe("John DoeMoe");
      expect(element).toHaveAttribute("editing-enabled");
    });

    describe("accessibility", () => {
      it("is accessible", async () =>
        accessible(`
        <calcite-label controls>
          Label
          <calcite-inline-editable>
            <calcite-input value="John Doe"/>
          </calcite-inline-editable>
        <calcite-label>
      `));

      it("is accessible when editing is enabled", async () =>
        accessible(`
        <calcite-label controls editing-enabled>
          Label
          <calcite-inline-editable editing-enabled>
            <calcite-input value="John Doe"/>
          </calcite-inline-editable>
        </calcite-label>
      `));
    });

    describe("with label", () => {
      beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
        <calcite-label>
          Hello
          <calcite-inline-editable controls>
            <calcite-input value="John Doe"/>
          </calcite-inline-editable>
        </calcite-label>
        `);
      });

      it("focuses the enable editing button when the label is clicked", async () => {
        expect(
          await page.evaluate(async () => {
            const label: HTMLSpanElement = document.querySelector("label");
            await label.click();
            return document.activeElement.className;
          })
        ).toContain("calcite-inline-editable-enable-editing-button");
      });

      it("focuses the input when editing is enabled and the label is subsequently clicked", async () => {
        const enableEditingButton = await page.find(".calcite-inline-editable-enable-editing-button");
        await enableEditingButton.click();
        const label = await page.find("label");
        await label.click();
        const activeEl = await page.evaluateHandle(() => document.activeElement);
        expect(activeEl["_remoteObject"].description).toMatch("input");
      });
    });
  });
});
