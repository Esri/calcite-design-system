// @ts-strict-ignore
import { E2EElement, E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  formAssociated,
  hidden,
  labelable,
  reflects,
  renders,
  t9n,
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { findAll } from "../../tests/utils/puppeteer";
import { CSS } from "./resources";
import type { Select } from "./select";

describe("calcite-select", () => {
  const simpleTestMarkup = html`
    <calcite-select label="required-for-a11y-test">
      <calcite-option>uno</calcite-option>
      <calcite-option>dos</calcite-option>
      <calcite-option>tres</calcite-option>
    </calcite-select>
  `;

  describe("renders", () => {
    renders(simpleTestMarkup, { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-select");
  });

  describe("accessible", () => {
    accessible(simpleTestMarkup);
  });

  describe("is focusable", () => {
    focusable(simpleTestMarkup);
  });

  describe("defaults", () => {
    defaults("calcite-select", [
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "status", defaultValue: "idle" },
      { propertyName: "validationIcon", defaultValue: undefined },
      { propertyName: "validationMessage", defaultValue: undefined },
    ]);
  });

  describe("reflects", () => {
    reflects(simpleTestMarkup, [
      {
        propertyName: "disabled",
        value: true,
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "status",
        value: "invalid",
      },
      {
        propertyName: "validationIcon",
        value: true,
      },
    ]);
  });

  async function assertSelectedOption(page: E2EPage, selectedOption: E2EElement): Promise<void> {
    const selectedOptionValue = await page.$eval(
      "calcite-select",
      (select: Select["el"]): string => select.selectedOption.value,
    );

    expect(selectedOptionValue).toBe(await selectedOption.getProperty("value"));
  }

  describe("labelable", () => {
    labelable("calcite-select");
  });

  describe("disabled", () => {
    disabled("calcite-select");
  });

  describe("flat options", () => {
    it("allows selecting items", async () => {
      const page = await newE2EPage({
        html: html`
          <calcite-select>
            <calcite-option>uno</calcite-option>
            <calcite-option>dos</calcite-option>
            <calcite-option>tres</calcite-option>
          </calcite-select>
        `,
      });
      const select = await page.find("calcite-select");
      const spy = await select.spyOnEvent("calciteSelectChange");

      const internalSelect = await page.evaluateHandle(() =>
        document.querySelector("calcite-select").shadowRoot.querySelector("select"),
      );

      await internalSelect.asElement().select("dos");
      await page.waitForChanges();

      let selected = await findAll(page, "calcite-option[selected]");

      await assertSelectedOption(page, selected[0]);
      expect(selected.length).toBe(1);
      expect(selected[0].innerText).toBe("dos");
      expect(spy).toHaveReceivedEventTimes(1);

      const lastOption = await page.find("calcite-option:last-child");
      await lastOption.setProperty("selected", true);
      await page.waitForChanges();

      selected = await findAll(page, "calcite-option[selected]");

      await assertSelectedOption(page, selected[0]);
      expect(selected.length).toBe(1);
      expect(selected[0].innerText).toBe("tres");
      expect(spy).toHaveReceivedEventTimes(1);
    });

    it("selects the last selected option when multiple are selected", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-select>
          <calcite-option selected>uno</calcite-option>
          <calcite-option selected>dos</calcite-option>
          <calcite-option selected>tres</calcite-option>
        </calcite-select>
      `);
      await page.waitForChanges();
      const selected = await findAll(page, "calcite-option[selected]");

      await assertSelectedOption(page, selected[0]);
      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("tres");
    });

    it("selects the first available option when none are selected", async () => {
      const page = await newE2EPage({
        html: html`
          <calcite-select>
            <calcite-option>uno</calcite-option>
            <calcite-option>dos</calcite-option>
            <calcite-option>tres</calcite-option>
          </calcite-select>
        `,
      });
      const selected = await findAll(page, "calcite-option[selected]");

      await assertSelectedOption(page, selected[0]);
      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("uno");
    });

    it("internally maps children to native elements", async () => {
      const page = await newE2EPage({
        html: html`
          <calcite-select>
            <calcite-option>uno</calcite-option>
            <calcite-option>dos</calcite-option>
            <calcite-option>tres</calcite-option>
          </calcite-select>
        `,
      });
      const internalSelect = await page.find(`calcite-select >>> .${CSS.select}`);

      expect(await findAll(internalSelect, "option")).toHaveLength(3);

      const options = await findAll(page, "calcite-option");

      for (let i = 0; i < options.length; i++) {
        await options[i].callMethod("remove");
      }

      expect(await findAll(internalSelect, "option", { allowEmpty: true })).toHaveLength(0);

      await page.$eval("calcite-select", (select) => {
        const number = document.createElement("calcite-option");
        number.innerHTML = "cuatro";

        select.append(number);
      });
      await page.waitForChanges();

      expect(await findAll(internalSelect, "option")).toHaveLength(1);
    });
  });

  describe("grouped options", () => {
    it("allows selecting items", async () => {
      const page = await newE2EPage({
        html: html`
          <calcite-select>
            <calcite-option-group label="letters">
              <calcite-option>a</calcite-option>
              <calcite-option>b</calcite-option>
              <calcite-option>c</calcite-option>
              <calcite-option disabled>d (disabled)</calcite-option>
            </calcite-option-group>
            <calcite-option-group label="numbers">
              <calcite-option label="one">1</calcite-option>
              <calcite-option label="two" selected>2</calcite-option>
              <calcite-option label="three">3</calcite-option>
            </calcite-option-group>
          </calcite-select>
        `,
      });
      const select = await page.find("calcite-select");
      const spy = await select.spyOnEvent("calciteSelectChange");

      const internalSelect = await page.evaluateHandle(() =>
        document.querySelector("calcite-select").shadowRoot.querySelector("select"),
      );

      await internalSelect.asElement().select("c");
      await page.waitForChanges();

      let selected = await findAll(page, "calcite-option[selected]");

      await assertSelectedOption(page, selected[0]);
      expect(selected.length).toBe(1);
      expect(selected[0].innerText).toBe("c");
      expect(spy).toHaveReceivedEventTimes(1);

      const lastNumberOption = await page.find("calcite-option-group[label='numbers'] calcite-option:last-child");
      await lastNumberOption.setProperty("selected", true);
      await page.waitForChanges();

      selected = await findAll(page, "calcite-option[selected]");

      await assertSelectedOption(page, selected[0]);
      expect(selected.length).toBe(1);
      expect(selected[0].innerText).toBe("3");
      expect(spy).toHaveReceivedEventTimes(1);
    });

    it("selects the last selected option when multiple are selected", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-select>
          <calcite-option-group label="letters">
            <calcite-option selected>a</calcite-option>
            <calcite-option selected>b</calcite-option>
            <calcite-option selected>c</calcite-option>
          </calcite-option-group>
          <calcite-option-group label="numbers">
            <calcite-option selected>1</calcite-option>
            <calcite-option selected>2</calcite-option>
            <calcite-option selected>3</calcite-option>
          </calcite-option-group>
        </calcite-select>
      `);
      await page.waitForChanges();
      const selected = await findAll(page, "calcite-option[selected]");

      await assertSelectedOption(page, selected[0]);
      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("3");
    });

    it("selects the first available option when none are selected", async () => {
      const page = await newE2EPage({
        html: html`
          <calcite-select>
            <calcite-option-group label="letters">
              <calcite-option>a</calcite-option>
              <calcite-option>b</calcite-option>
              <calcite-option>c</calcite-option>
            </calcite-option-group>
            <calcite-option-group label="numbers">
              <calcite-option>1</calcite-option>
              <calcite-option>2</calcite-option>
              <calcite-option>3</calcite-option>
            </calcite-option-group>
          </calcite-select>
        `,
      });
      const selected = await findAll(page, "calcite-option[selected]");

      await assertSelectedOption(page, selected[0]);
      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("a");
    });

    it("internally maps children to native elements", async () => {
      const page = await newE2EPage({
        html: html`
          <calcite-select>
            <calcite-option-group label="letters">
              <calcite-option>a</calcite-option>
              <calcite-option>b</calcite-option>
            </calcite-option-group>
            <calcite-option-group label="numbers">
              <calcite-option label="one">1</calcite-option>
            </calcite-option-group>
            <calcite-option-group label="empty"></calcite-option-group>
          </calcite-select>
        `,
      });
      const internalSelect = await page.find(`calcite-select >>> .${CSS.select}`);

      expect(await findAll(internalSelect, "option")).toHaveLength(3);
      expect(await findAll(internalSelect, "optgroup")).toHaveLength(3);

      const optionsAndGroups = await findAll(page, "calcite-option, calcite-option-group");

      for (let i = 0; i < optionsAndGroups.length; i++) {
        await optionsAndGroups[i].callMethod("remove");
      }

      expect(await findAll(internalSelect, "option, optgroup", { allowEmpty: true })).toHaveLength(0);

      await page.$eval("calcite-select", (select) => {
        const letters = document.createElement("calcite-option-group");
        const numbers = document.createElement("calcite-option-group");

        const letter = document.createElement("calcite-option");
        letter.innerHTML = "c";

        const number = document.createElement("calcite-option");
        numbers.innerHTML = "2";

        letters.append(letter);
        numbers.append(number);

        select.append(letters, numbers);
      });
      await page.waitForChanges();

      expect(await findAll(internalSelect, "option")).toHaveLength(2);
      expect(await findAll(internalSelect, "optgroup")).toHaveLength(2);
    });
  });

  it("item is selected before change event", async () => {
    const page = await newE2EPage({
      html: html`
        <calcite-select>
          <calcite-option id="1">uno</calcite-option>
          <calcite-option id="2">dos</calcite-option>
          <calcite-option id="3">tres</calcite-option>
        </calcite-select>
      `,
    });

    type TestWindow = typeof window & { selectedOptionId: string };

    await page.evaluate(() => {
      document.querySelector("calcite-select").addEventListener("calciteSelectChange", (event) => {
        (window as TestWindow).selectedOptionId = (event.target as HTMLElement).querySelector(
          "calcite-option[selected]",
        ).id;
      });
    });

    const internalSelect = await page.evaluateHandle(() =>
      document.querySelector("calcite-select").shadowRoot.querySelector("select"),
    );

    await internalSelect.asElement().select("dos");
    await page.waitForChanges();

    const selectedOptionId = await page.evaluate(() => (window as TestWindow).selectedOptionId);

    expect(selectedOptionId).toBe("2");
  });

  it("honors empty value", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-select id="calcite-select">
        <calcite-option id="1" value="uno">uno</calcite-option>
        <calcite-option id="2" value="">dos</calcite-option>
      </calcite-select>
    `);

    type TestWindow = typeof window & { selectedOptionId: string };

    await page.$eval("calcite-select", (select: Select["el"]) =>
      select.addEventListener("calciteSelectChange", (event) => {
        (window as TestWindow).selectedOptionId = (event.target as HTMLElement).querySelector(
          "calcite-option[selected]",
        ).id;
      }),
    );

    const internalSelect = await page.evaluateHandle(() =>
      document.querySelector("calcite-select").shadowRoot.querySelector("select"),
    );

    await internalSelect.asElement().select("");
    await page.waitForChanges();

    const selectedOptionId = await page.evaluate(() => (window as TestWindow).selectedOptionId);

    expect(selectedOptionId).toBe("2");
    expect(await (await page.find("calcite-select")).getProperty("value")).toBe("");
  });

  it("selects initial value", async () => {
    const page = await newE2EPage();
    await page.setContent(html`
      <calcite-select value="">
        <calcite-option value="uno">One</calcite-option>
        <calcite-option value="dos">Two</calcite-option>
        <calcite-option value="">Three</calcite-option>
      </calcite-select>
    `);

    await assertSelectedOption(page, await page.find("calcite-option[value='']"));
  });

  describe("is form-associated", () => {
    formAssociated(
      html`
        <calcite-select>
          <calcite-option id="0"></calcite-option>
          <calcite-option id="1">uno</calcite-option>
          <calcite-option id="2">dos</calcite-option>
          <calcite-option id="3">tres</calcite-option>
        </calcite-select>
      `,
      {
        testValue: "dos",
        validation: true,
        // we use <select>'s char-matching behavior vs navigating with arrows + space/enter
        // due to the context menu not being accessible in puppeteer
        changeValueKeys: ["t"],
      },
    );
  });

  describe("translation support", () => {
    t9n("calcite-select");
  });

  describe("theme", () => {
    themed(
      html`
        <calcite-select label="calcite select">
          <calcite-option value="high">uno</calcite-option>
          <calcite-option value="medium">dos</calcite-option>
          <calcite-option value="low">tres</calcite-option>
        </calcite-select>
      `,
      {
        "--calcite-select-font-size": {
          shadowSelector: `.${CSS.select}`,
          targetProp: "fontSize",
        },
        "--calcite-select-text-color": {
          shadowSelector: `.${CSS.select}`,
          targetProp: "color",
        },
        "--calcite-select-border-color": [
          {
            shadowSelector: `.${CSS.select}`,
            targetProp: "borderColor",
          },
          {
            shadowSelector: `.${CSS.iconContainer}`,
            targetProp: "borderColor",
          },
        ],
        "--calcite-select-icon-color": {
          shadowSelector: `.${CSS.icon}`,
          targetProp: "color",
        },
        "--calcite-select-icon-color-hover": {
          shadowSelector: `.${CSS.icon}`,
          targetProp: "color",
          state: "hover",
        },
      },
    );
  });
});
