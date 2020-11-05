import { newE2EPage } from "@stencil/core/testing";
import { accessible, focusable, reflects, renders } from "../../tests/commonTests";
import dedent from "dedent";
import { CSS } from "./resources";

describe("calcite-select", () => {
  const simpleTestMarkup = dedent`
    <calcite-select label="required-for-a11y-test">
      <calcite-option>uno</calcite-option>
      <calcite-option>dos</calcite-option>
      <calcite-option>tres</calcite-option>
    </calcite-select>
  `;

  it("renders", async () => renders(simpleTestMarkup));

  it("is accessible", async () => accessible(simpleTestMarkup));

  it("is focusable", async () => focusable(simpleTestMarkup));

  it("reflects", async () =>
    reflects(simpleTestMarkup, [
      {
        propertyName: "disabled",
        value: true
      },
      {
        propertyName: "scale",
        value: "m"
      },
      {
        propertyName: "theme",
        value: "light"
      }
    ]));

  describe("flat options", () => {
    it("allows selecting items", async () => {
      const page = await newE2EPage({
        html: dedent`
          <calcite-select>
            <calcite-option>uno</calcite-option>
            <calcite-option>dos</calcite-option>
            <calcite-option>tres</calcite-option>
          </calcite-select>
        `
      });
      const select = await page.find("calcite-select");
      const spy = await select.spyOnEvent("calciteSelectChange");

      const internalSelect = await page.evaluateHandle(() =>
        document.querySelector("calcite-select").shadowRoot.querySelector("select")
      );

      await internalSelect.asElement().select("dos");
      await page.waitForChanges();

      const selected = await page.findAll("calcite-option[selected]");

      expect(selected.length).toBe(1);
      expect(selected[0].innerText).toBe("dos");
      expect(spy).toHaveReceivedEventTimes(1);
    });

    it("selects the last selected option when multiple are selected", async () => {
      const page = await newE2EPage({
        html: dedent`
          <calcite-select>
            <calcite-option selected>uno</calcite-option>
            <calcite-option selected>dos</calcite-option>
            <calcite-option selected>tres</calcite-option>
          </calcite-select>
        `
      });
      const selected = await page.findAll("calcite-option[selected]");

      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("tres");
    });

    it("selects the first available option when none are selected", async () => {
      const page = await newE2EPage({
        html: dedent`
          <calcite-select>
            <calcite-option>uno</calcite-option>
            <calcite-option>dos</calcite-option>
            <calcite-option>tres</calcite-option>
          </calcite-select>
        `
      });
      const selected = await page.findAll("calcite-option[selected]");

      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("uno");
    });

    it("internally maps children to native elements", async () => {
      const page = await newE2EPage({
        html: dedent`
          <calcite-select>
            <calcite-option>uno</calcite-option>
            <calcite-option>dos</calcite-option>
            <calcite-option>tres</calcite-option>
          </calcite-select>
        `
      });
      const internalSelect = await page.find(`calcite-select >>> .${CSS.select}`);

      expect(await internalSelect.findAll("option")).toHaveLength(3);

      const options = await page.findAll("calcite-option");

      for (let i = 0; i < options.length; i++) {
        await options[i].callMethod("remove");
      }

      expect(await internalSelect.findAll("option")).toHaveLength(0);

      await page.$eval("calcite-select", (select) => {
        const number = document.createElement("calcite-option");
        number.innerHTML = "cuatro";

        select.append(number);
      });

      expect(await internalSelect.findAll("option")).toHaveLength(1);
    });
  });

  describe("grouped options", () => {
    it("allows selecting items", async () => {
      const page = await newE2EPage({
        html: dedent`
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
        `
      });
      const select = await page.find("calcite-select");
      const spy = await select.spyOnEvent("calciteSelectChange");

      const internalSelect = await page.evaluateHandle(() =>
        document.querySelector("calcite-select").shadowRoot.querySelector("select")
      );

      await internalSelect.asElement().select("c");
      await page.waitForChanges();

      const selected = await page.findAll("calcite-option[selected]");

      expect(selected.length).toBe(1);
      expect(selected[0].innerText).toBe("c");
      expect(spy).toHaveReceivedEventTimes(1);
    });

    it("selects the last selected option when multiple are selected", async () => {
      const page = await newE2EPage({
        html: dedent`
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
        `
      });
      const selected = await page.findAll("calcite-option[selected]");

      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("3");
    });

    it("selects the first available option when none are selected", async () => {
      const page = await newE2EPage({
        html: dedent`
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
        `
      });
      const selected = await page.findAll("calcite-option[selected]");

      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("a");
    });

    describe("label compatibility", () => {
      it("focuses when enclosing label is clicked", async () => {
        const page = await newE2EPage({
          html: dedent`
            <calcite-label>
              Click me!
              <calcite-select>
                <calcite-option>1</calcite-option>
                <calcite-option>2</calcite-option>
                <calcite-option>3</calcite-option>
              </calcite-select>
            </calcite-label>
          `
        });

        // grab internal label to ensure click doesn't hit select
        const internalLabel = await page.find("calcite-label .calcite-label-text");
        await internalLabel.click();
        await page.waitForChanges();

        expect(await page.evaluate(() => document.activeElement.tagName)).toEqual("CALCITE-SELECT");
      });

      it("focuses when associated label is clicked", async () => {
        const page = await newE2EPage({
          html: dedent`
            <calcite-label for="select">Click me!</calcite-label>
            <calcite-select id="select">
              <calcite-option>1</calcite-option>
              <calcite-option>2</calcite-option>
              <calcite-option>3</calcite-option>
            </calcite-select>
          `
        });

        const label = await page.find("calcite-label");
        await label.click();
        await page.waitForChanges();

        expect(await page.evaluate(() => document.activeElement.tagName)).toEqual("CALCITE-SELECT");
      });
    });

    it("internally maps children to native elements", async () => {
      const page = await newE2EPage({
        html: dedent`
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
        `
      });
      const internalSelect = await page.find(`calcite-select >>> .${CSS.select}`);

      expect(await internalSelect.findAll("option")).toHaveLength(3);
      expect(await internalSelect.findAll("optgroup")).toHaveLength(3);

      const optionsAndGroups = await page.findAll("calcite-option, calcite-option-group");

      for (let i = 0; i < optionsAndGroups.length; i++) {
        await optionsAndGroups[i].callMethod("remove");
      }

      expect(await internalSelect.findAll("option, optgroup")).toHaveLength(0);

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

      expect(await internalSelect.findAll("option")).toHaveLength(2);
      expect(await internalSelect.findAll("optgroup")).toHaveLength(2);
    });
  });
});
