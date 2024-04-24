import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, disabled, focusable, hidden, reflects, renders, slots } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { SLOTS } from "./resources";

describe("calcite-tile", () => {
  describe("accessibility", () => {
    accessible(html` <calcite-tile></calcite-tile> `, "accessible without label");
    accessible(html` <calcite-tile label="my-tile"></calcite-tile> `, "accessible with label only");
    accessible(
      html` <calcite-tile label="my-tile" selection-mode="single"></calcite-tile> `,
      "accessible in single selection-mode",
    );
    accessible(
      html` <calcite-tile label="my-tile" selection-mode="single-persist"></calcite-tile> `,
      "accessible in single-persist selection-mode",
    );
    accessible(
      html` <calcite-tile label="my-tile" selection-mode="multiple"></calcite-tile> `,
      "accessible in multiple selection-mode",
    );
    accessible(html` <calcite-tile href="#" heading="My link"></calcite-tile> `, "accessible as link with heading");
    accessible(
      html` <calcite-tile href="#" description="My link"></calcite-tile> `,
      "accessible as link with description",
    );
    accessible(
      html` <calcite-tile label="my-tile" href="#" heading="My link"></calcite-tile> `,
      "accessible as link with heading and label",
    );
    accessible(
      html` <calcite-tile label="my-tile" href="#" description="My link"></calcite-tile> `,
      "accessible as link with description and label",
    );
  });

  describe("click", () => {
    it("should receive focus when clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile id="tile-1"></calcite-tile> `);
      const tile1 = await page.find("#tile-1");
      await tile1.click();
      await page.waitForChanges();

      expect(await page.evaluate(() => document.activeElement.id)).toEqual(tile1.id);
    });
  });

  describe("defaults", () => {
    defaults("calcite-tile", [
      { propertyName: "active", defaultValue: false },
      { propertyName: "alignment", defaultValue: "start" },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "embed", defaultValue: false },
      { propertyName: "hidden", defaultValue: false },
      { propertyName: "iconFlipRtl", defaultValue: false },
      { propertyName: "interactive", defaultValue: false },
      { propertyName: "layout", defaultValue: "horizontal" },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "selectionAppearance", defaultValue: "icon" },
      { propertyName: "selectionMode", defaultValue: "none" },
    ]);
  });

  describe("disabled", () => {
    disabled(html` <calcite-tile heading="test" href="http://www.esri.com"></calcite-tile> `);
  });

  describe("disabled when interactive", () => {
    disabled(html` <calcite-tile interactive></calcite-tile> `);
  });

  describe("events", () => {
    it("should not emit select event after the tile is clicked if interactive is not set", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile id="tile-1"></calcite-tile> `);

      const eventSpy = await page.spyOnEvent("calciteTileSelect", "window");

      const tile1 = await page.find("#tile-1");
      await tile1.click();
      await page.waitForChanges();

      expect(eventSpy).not.toHaveReceivedEvent();
    });

    it("should emit select event after the tile is clicked when interactive", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile id="tile-1" interactive></calcite-tile> `);

      const eventSpy = await page.spyOnEvent("calciteTileSelect", "window");

      const tile1 = await page.find("#tile-1");
      await tile1.click();
      await page.waitForChanges();

      expect(eventSpy).toHaveReceivedEvent();
    });
  });

  describe("focusable", () => {
    focusable(html` <calcite-tile interactive></calcite-tile> `);
  });

  describe("hidden", () => {
    hidden("calcite-tile");
  });

  describe("slots", () => {
    slots("calcite-tile", SLOTS);
  });

  describe("reflects", () => {
    reflects("calcite-tile", [
      { propertyName: "active", value: true },
      { propertyName: "alignment", value: "center" },
      { propertyName: "description", value: "My test description" },
      { propertyName: "disabled", value: true },
      { propertyName: "embed", value: true },
      { propertyName: "heading", value: "My test heading" },
      { propertyName: "href", value: "http://www.esri.com" },
      { propertyName: "icon", value: "layers" },
      { propertyName: "iconFlipRtl", value: true },
      { propertyName: "scale", value: "s" },
      { propertyName: "selected", value: true },
      { propertyName: "selectionAppearance", value: "border" },
      { propertyName: "selectionMode", value: "single-persist" },
    ]);
  });

  describe("renders", () => {
    renders("calcite-tile", { display: "inline-block" });

    it("renders without a link by default", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile></calcite-tile> `);
      const link = await page.find("calcite-tile >>> calcite-link");
      expect(link).toBeNull();
    });

    it("renders a link when href attribute is supplied", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile href="http://www.esri.com"></calcite-tile> `);

      const link = await page.find("calcite-tile >>> calcite-link");
      const anchor = await page.find("calcite-tile >>> calcite-link >>> a");
      expect(link).toEqualAttribute("href", "http://www.esri.com");
      expect(anchor).toEqualAttribute("href", "http://www.esri.com");
    });

    it("renders heading only when supplied", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile heading="My Calcite Tile"></calcite-tile> `);

      const icon = await page.find("calcite-tile >>> .icon");
      const heading = await page.find("calcite-tile >>> .heading");
      const description = await page.find("calcite-tile >>> .description");
      expect(icon).toBeNull();
      expect(heading).toEqualText("My Calcite Tile");
      expect(description).toBeNull();
    });

    it("renders icon only when supplied", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile icon="layers"></calcite-tile> `);

      const icon = await page.find("calcite-tile >>> .icon");
      const heading = await page.find("calcite-tile >>> .heading");
      const description = await page.find("calcite-tile >>> .description");
      expect(icon).toBeDefined();
      expect(heading).toBeNull();
      expect(description).toBeNull();
    });

    it("renders description only when supplied", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile description="My Calcite Tile Description."></calcite-tile> `);

      const icon = await page.find("calcite-tile >>> .icon");
      const heading = await page.find("calcite-tile >>> .heading");
      const description = await page.find("calcite-tile >>> .description");
      expect(icon).toBeNull();
      expect(heading).toBeNull();
      expect(description).toEqualText("My Calcite Tile Description.");
    });

    it("renders large icon when only icon and heading are supplied", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile icon="layers" heading="My Large Visual Calcite Tile"></calcite-tile> `);

      const icon = await page.find("calcite-tile >>> calcite-icon");
      const heading = await page.find("calcite-tile >>> .heading");
      const description = await page.find("calcite-tile >>> .description");
      expect(icon).toEqualAttribute("icon", "layers");
      expect(icon).toEqualAttribute("scale", "l");
      expect(heading).toEqualText("My Large Visual Calcite Tile");
      expect(description).toBeNull();
    });
  });
});
