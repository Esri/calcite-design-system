import { E2EPage, newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { beforeEach, describe, expect, it } from "vitest";
import { accessible, disabled, focusable, hidden, renders, slots, themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { CSS, IDS, SLOTS } from "./resources";

describe("calcite-swatch", () => {
  describe("renders", () => {
    renders("calcite-swatch", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-swatch");
  });

  describe("accessible", () => {
    accessible("calcite-swatch");
    accessible(`<calcite-swatch label="swatch" value="123" selected></calcite-swatch>`);
    accessible(`<calcite-swatch label="swatch" value="123" color='#c0ffee'></calcite-swatch>`);
    accessible(`<calcite-swatch label="swatch" value="123" color='#c0ffee'></calcite-swatch>`);
    accessible(`<calcite-swatch label="swatch" value="123" selected color='#c0ffee'></calcite-swatch>`);
  });

  describe("slots", () => {
    slots("calcite-swatch", SLOTS);
  });

  describe.skip("is focusable", () => {
    focusable("<calcite-swatch></calcite-swatch>");
  });

  describe.skip("can be disabled", () => {
    disabled("<calcite-swatch disabled></calcite-swatch>");
  });

  it("should not emit event after the swatch is clicked if interactive if not set", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-swatch id="swatch-1"></calcite-swatch>`);

    const eventSpy = await page.spyOnEvent("calciteSwatchSelect", "window");

    const swatch1 = await page.find("#swatch-1");
    await swatch1.click();
    await page.waitForChanges();

    expect(eventSpy).not.toHaveReceivedEvent();
  });

  it.skip("should emit event after the swatch button is clicked when interactive", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-swatch id="swatch-1" interactive></calcite-swatch>`);

    const eventSpy = await page.spyOnEvent("calciteSwatchSelect", "window");

    const swatch1 = await page.find("#swatch-1");
    await swatch1.click();
    await page.waitForChanges();

    expect(eventSpy).toHaveReceivedEvent();
  });

  it.skip("should receive focus when clicked", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-swatch interactive id="swatch-1"></calcite-swatch>`);

    const swatch1 = await page.find("#swatch-1");
    await swatch1.click();
    await page.waitForChanges();
    expect(await page.evaluate(() => document.activeElement.id)).toEqual(swatch1.id);
  });

  it("renders default props when none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-swatch>Swatch content</calcite-swatch>`);

    const element = await page.find("calcite-swatch");
    expect(element).toEqualAttribute("scale", "m");
  });

  it("renders requested props when valid props are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`<calcite-swatch scale="l">Swatch content</calcite-swatch>`);

    const element = await page.find("calcite-swatch");
    expect(element).toEqualAttribute("scale", "l");
  });

  describe("accepts CSS color strings", () => {
    let page: E2EPage;

    beforeEach(async () => (page = await newE2EPage()));

    it("supports rgb", async () => {
      await page.setContent("<calcite-swatch color='rgb(255, 255, 255)'></calcite-swatch>");
      const swatch = await page.find(`calcite-swatch >>> .${CSS.swatch} #${IDS.swatchSolid}`);
      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(255, 255, 255)");
    });

    it("supports keywords", async () => {
      await page.setContent("<calcite-swatch color='chartreuse'></calcite-swatch>");
      const swatch = await page.find(`calcite-swatch >>> .${CSS.swatch} #${IDS.swatchSolid}`);
      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(127, 255, 0)");
    });

    it("supports hsl", async () => {
      await page.setContent("<calcite-swatch color='hsl(120, 100%, 97%)'></calcite-swatch>");
      const swatch = await page.find(`calcite-swatch >>> .${CSS.swatch} #${IDS.swatchSolid}`);
      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(240, 255, 240)");
    });

    it("supports hex", async () => {
      await page.setContent("<calcite-swatch color='#ff8200'></calcite-swatch>");
      const swatch = await page.find(`calcite-swatch >>> .${CSS.swatch} #${IDS.swatchSolid}`);
      const style = await swatch.getComputedStyle();

      expect(style["fill"]).toBe("rgb(255, 130, 0)");
    });

    describe("with alpha values", () => {
      it("supports rgba", async () => {
        await page.setContent("<calcite-swatch color='rgba(255, 255, 255, 0.5)'></calcite-swatch>");
        const swatch = await page.find(`calcite-swatch >>> .${CSS.swatch} #${IDS.swatchTransparent}`);
        const style = await swatch.getComputedStyle();

        expect(style["fill"]).toBe("rgba(255, 255, 255, 0.5)");
      });

      it("supports hsla", async () => {
        await page.setContent("<calcite-swatch color='hsla(120, 100%, 97%, 0.5)'></calcite-swatch>");
        const swatch = await page.find(`calcite-swatch >>> .${CSS.swatch} #${IDS.swatchTransparent}`);
        const style = await swatch.getComputedStyle();

        expect(style["fill"]).toBe("rgba(240, 255, 240, 0.5)");
      });

      it("supports hexa", async () => {
        await page.setContent("<calcite-swatch color='#ff820080'></calcite-swatch>");
        const swatch = await page.find(`calcite-swatch >>> .${CSS.swatch} #${IDS.swatchTransparent}`);
        const style = await swatch.getComputedStyle();

        expect(style["fill"]).toBe("rgba(255, 130, 0, 0.5)");
      });
    });
  });
  describe("themed", () => {
    describe("default", () => {
      themed(html`calcite-swatch`, {
        "--calcite-swatch-corner-radius": [
          { shadowSelector: `.${CSS.container}`, targetProp: "borderRadius" },
          { shadowSelector: `#${IDS.swatchRect}`, targetProp: "rx" },
        ],
      });
    });
    describe("solid ", () => {
      themed(html`<calcite-swatch color="#ff8200"></calcite-swatch>`, {
        "--calcite-swatch-corner-radius": [{ shadowSelector: `#${IDS.swatchSolid}`, targetProp: "rx" }],
      });
    });
    describe("transparent ", () => {
      themed(html`<calcite-swatch color="rgba(255, 255, 255, 0.5)"></calcite-swatch>`, {
        "--calcite-swatch-corner-radius": [{ shadowSelector: `#${IDS.swatchTransparent}`, targetProp: "rx" }],
      });
    });
  });
});
