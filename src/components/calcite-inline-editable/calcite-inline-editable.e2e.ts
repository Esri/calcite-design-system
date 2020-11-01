import { E2EPage } from "@stencil/core/testing";
import { HYDRATED_ATTR } from "../../tests/commonTests";
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
      expect(element).toEqualAttribute("scale", "m");
      expect(element).not.toHaveAttribute("has-controls");
      expect(element).not.toHaveAttribute("editing-enabled");
      expect(element).not.toHaveAttribute("loading");
    });

    it("uses a wrapping label's scale and theme when none are provided", async () => {
      page = await newE2EPage();
      await page.setContent(`
      <calcite-label theme="dark" scale="l">
        <calcite-inline-editable>
          <calcite-input/>
        </calcite-inline-editable>
      </calcite-label>
      `);
      await page.waitForChanges();
      const element = await page.find("calcite-inline-editable");
      expect(element).toEqualAttribute("scale", "l");
      expect(element).toEqualAttribute("theme", "dark");
    });

    it("uses a child input's scale and theme when none are provided", async () => {
      page = await newE2EPage();
      await page.setContent(`
      <calcite-label>
        <calcite-inline-editable>
          <calcite-input theme="dark" scale="l"/>
        </calcite-inline-editable>
      </calcite-label>
      `);
      await page.waitForChanges();
      const element = await page.find("calcite-inline-editable");
      expect(element).toEqualAttribute("scale", "l");
      expect(element).toEqualAttribute("theme", "dark");
    });

    it("renders requested props when valid props are provided", async () => {
      page = await newE2EPage();
      await page.setContent(`
      <calcite-inline-editable has-controls editing-enabled loading scale="l" theme="dark">
        <calcite-input/>
      </calcite-inline-editable>
      `);
      await page.waitForChanges();
      const element = await page.find("calcite-inline-editable");
      expect(element).toEqualAttribute("scale", "l");
      expect(element).toEqualAttribute("theme", "dark");
      expect(element).toHaveAttribute("has-controls");
      expect(element).toHaveAttribute("editing-enabled");
      expect(element).toHaveAttribute("loading");
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
      const calciteInlineEditableEnableEditing = await page.spyOnEvent("calciteInlineEditableEnableEditing");
      const element = await page.find("calcite-inline-editable");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      expect(element).toHaveAttribute("editing-enabled");
      expect(calciteInlineEditableEnableEditing).toHaveReceivedEventTimes(1);
    });

    it("enables editing when the child input is clicked", async () => {
      const calciteInlineEditableEnableEditing = await page.spyOnEvent("calciteInlineEditableEnableEditing");
      const element = await page.find("calcite-inline-editable");
      await element.click();
      expect(element).toHaveAttribute("editing-enabled");
      expect(calciteInlineEditableEnableEditing).toHaveReceivedEventTimes(1);
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
  });

  describe("has controls", () => {
    let page: E2EPage;
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`
      <calcite-inline-editable has-controls>
        <calcite-input value="John Doe"/>
      </calcite-inline-editable>
      `);
    });

    it("enables editing when enable button is clicked", async () => {
      const calciteInlineEditableEnableEditing = await page.spyOnEvent("calciteInlineEditableEnableEditing");
      const element = await page.find("calcite-inline-editable");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      expect(element).toHaveAttribute("editing-enabled");
      expect(calciteInlineEditableEnableEditing).toHaveReceivedEventTimes(1);
    });

    it("enables editing when the child input is clicked", async () => {
      const calciteInlineEditableEnableEditing = await page.spyOnEvent("calciteInlineEditableEnableEditing");
      const element = await page.find("calcite-inline-editable");
      await element.click();
      expect(element).toHaveAttribute("editing-enabled");
      expect(calciteInlineEditableEnableEditing).toHaveReceivedEventTimes(1);
    });

    it("restores input value after cancel button is clicked", async () => {
      const calciteInlineEditableCancelEditing = await page.spyOnEvent("calciteInlineEditableCancelEditing");
      const element = await page.find("calcite-inline-editable");
      const input = await element.find("calcite-input");
      await element.click();
      const cancelEditingButton = await element.find(".calcite-inline-editable-cancel-editing-button");
      expect(input.getAttribute("value")).toBe("John Doe");
      await input.type("typo");
      expect(input.getAttribute("value")).toBe("John Doetypo");
      await cancelEditingButton.click();
      await page.waitForChanges();
      expect(input.getAttribute("value")).toBe("John Doe");
      expect(calciteInlineEditableCancelEditing).toHaveReceivedEventTimes(1);
    });

    it("restores input value after escape key is pressed", async () => {
      const calciteInlineEditableCancelEditing = await page.spyOnEvent("calciteInlineEditableCancelEditing");
      const element = await page.find("calcite-inline-editable");
      const input = await element.find("calcite-input");
      await element.click();
      expect(input.getAttribute("value")).toBe("John Doe");
      await input.type("typo");
      expect(input.getAttribute("value")).toBe("John Doetypo");
      await page.keyboard.press("Escape");
      await page.waitForChanges();
      expect(input.getAttribute("value")).toBe("John Doe");
      expect(calciteInlineEditableCancelEditing).toHaveReceivedEventTimes(1);
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
      const calciteInlineEditableConfirmChanges = await page.spyOnEvent("calciteInlineEditableConfirmChanges");
      const element = await page.find("calcite-inline-editable");
      const input = await page.find("calcite-input");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      const confirmChangesButton = await element.find(".calcite-inline-editable-confirm-changes-button");
      await input.type("Moe");
      await confirmChangesButton.click();
      expect(calciteInlineEditableConfirmChanges).toHaveReceivedEventTimes(1);
      expect(input.getAttribute("value")).toBe("John DoeMoe");
      expect(element).toHaveAttribute("editing-enabled");
    });

    it("it disables editing when onConfirmChanges resolves successfully", async () => {
      const element = await page.find("calcite-inline-editable");
      const onConfirmChanges = () => new Promise((resolve) => setTimeout(resolve, 100));
      // https://github.com/ionic-team/stencil/issues/1174
      page.exposeFunction("onConfirmChanges", onConfirmChanges);
      page.$eval("calcite-inline-editable", (el: HTMLCalciteInlineEditableElement) => {
        el.onConfirmChanges = onConfirmChanges;
      });
      const calciteInlineEditableConfirmChanges = await page.spyOnEvent("calciteInlineEditableConfirmChanges");
      const input = await page.find("calcite-input");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      const confirmChangesButton = await element.find(".calcite-inline-editable-confirm-changes-button");
      await input.type("Moe");
      await confirmChangesButton.click();
      expect(calciteInlineEditableConfirmChanges).toHaveReceivedEventTimes(1);
      await page.waitForChanges();
      expect(input.getAttribute("value")).toBe("John DoeMoe");
      expect(element).not.toHaveAttribute("editing-enabled");
    });

    it("it does not disable editing when onConfirmChanges resolves unsuccessfully", async () => {
      const element = await page.find("calcite-inline-editable");
      const onConfirmChanges = () => new Promise((_resolve, reject) => setTimeout(reject, 100));
      // https://github.com/ionic-team/stencil/issues/1174
      page.exposeFunction("onConfirmChanges", onConfirmChanges);
      page.$eval("calcite-inline-editable", (el: HTMLCalciteInlineEditableElement) => {
        el.onConfirmChanges = onConfirmChanges;
      });
      const calciteInlineEditableConfirmChanges = await page.spyOnEvent("calciteInlineEditableConfirmChanges");
      const input = await page.find("calcite-input");
      const enableEditingButton = await element.find(".calcite-inline-editable-enable-editing-button");
      await enableEditingButton.click();
      const confirmChangesButton = await element.find(".calcite-inline-editable-confirm-changes-button");
      await input.type("Moe");
      await confirmChangesButton.click();
      expect(calciteInlineEditableConfirmChanges).toHaveReceivedEventTimes(1);
      await page.waitForChanges();
      expect(input.getAttribute("value")).toBe("John DoeMoe");
      expect(element).toHaveAttribute("editing-enabled");
    });

    describe("with label", () => {
      beforeEach(async () => {
        page = await newE2EPage();
        await page.setContent(`
        <calcite-label>
          <span>Hello</span>
          <calcite-inline-editable has-controls>
            <calcite-input value="John Doe"/>
          </calcite-inline-editable>
        </calcite-label>
        `);
      });

      it("focuses the enable editing button when the label is clicked", async () => {
        const label = await page.find("span");
        await label.click();
        const activeEl = await page.evaluateHandle(() => document.activeElement);
        expect(activeEl["_remoteObject"].description).toMatch(
          "calcite-button.calcite-inline-editable-enable-editing-button"
        );
      });

      it("focuses the input when editing is enabled and the label is subsequently clicked", async () => {
        const enableEditingButton = await page.find(".calcite-inline-editable-enable-editing-button");
        await enableEditingButton.click();
        const label = await page.find("span");
        await label.click();
        const activeEl = await page.evaluateHandle(() => document.activeElement);
        expect(activeEl["_remoteObject"].description).toMatch("input");
      });
    });
  });
});
