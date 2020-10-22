import { newE2EPage } from "@stencil/core/testing";
import { accessible, focusable, reflects, renders } from "../../tests/commonTests";
import dedent from "dedent";

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
        html: `<calcite-select>
        <calcite-option>uno</calcite-option>
        <calcite-option>dos</calcite-option>
        <calcite-option>tres</calcite-option>
      </calcite-select>`
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
        html: `<calcite-select>
        <calcite-option selected>uno</calcite-option>
        <calcite-option selected>dos</calcite-option>
        <calcite-option selected>tres</calcite-option>
      </calcite-select>`
      });
      const selected = await page.findAll("calcite-option[selected]");

      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("tres");
    });

    it("selects the first available option when none are selected", async () => {
      const page = await newE2EPage({
        html: `<calcite-select>
        <calcite-option>uno</calcite-option>
        <calcite-option>dos</calcite-option>
        <calcite-option>tres</calcite-option>
      </calcite-select>`
      });
      const selected = await page.findAll("calcite-option[selected]");

      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("uno");
    });
  });

  describe("grouped options", () => {
    it("allows selecting items", async () => {
      const page = await newE2EPage({
        html: `<calcite-select>
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
               </calcite-select>`
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
        html: `<calcite-select>
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
               </calcite-select>`
      });
      const selected = await page.findAll("calcite-option[selected]");

      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("3");
    });

    it("selects the first available option when none are selected", async () => {
      const page = await newE2EPage({
        html: `<calcite-select>
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
               </calcite-select>`
      });
      const selected = await page.findAll("calcite-option[selected]");

      expect(selected).toHaveLength(1);
      expect(selected[0].innerText).toBe("a");
    });
  });
});
