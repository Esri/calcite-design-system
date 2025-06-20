import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import {
  accessible,
  defaults,
  disabled,
  focusable,
  hidden,
  reflects,
  renders,
  slots,
  themed,
} from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { isElementFocused } from "../../tests/utils/puppeteer";
import { CSS, SLOTS } from "./resources";

describe("calcite-tile", () => {
  describe("accessibility", () => {
    describe("accessible without label", () => {
      accessible(html` <calcite-tile></calcite-tile> `);
    });
    describe("accessible with label only", () => {
      accessible(html` <calcite-tile label="my-tile"></calcite-tile> `);
    });
    describe("accessible in single selection-mode", () => {
      accessible(html` <calcite-tile label="my-tile" selection-mode="single"></calcite-tile> `);
    });
    describe("accessible in single-persist selection-mode", () => {
      accessible(html` <calcite-tile label="my-tile" selection-mode="single-persist"></calcite-tile> `);
    });
    describe("accessible in multiple selection-mode", () => {
      accessible(html` <calcite-tile label="my-tile" selection-mode="multiple"></calcite-tile> `);
    });
    describe("accessible as link with heading", () => {
      accessible(html` <calcite-tile href="#" heading="My link"></calcite-tile> `);
    });
    describe("accessible as link with description", () => {
      accessible(html` <calcite-tile href="#" description="My link"></calcite-tile> `);
    });
    describe("accessible as link with heading and label", () => {
      accessible(html` <calcite-tile label="my-tile" href="#" heading="My link"></calcite-tile> `);
    });
    describe("accessible as link with description and label", () => {
      accessible(html` <calcite-tile label="my-tile" href="#" description="My link"></calcite-tile> `);
    });
  });

  describe("click", () => {
    it("should not receive focus when clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile id="tile-1"></calcite-tile> `);
      await page.click("#tile-1");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#tile-1")).toBe(false);
    });
    it("should receive focus when clicked and interactive", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile interactive id="tile-1"></calcite-tile> `);
      await page.click("#tile-1");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#tile-1")).toBe(true);
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

  describe("disabled when interactive", () => {
    disabled(html` <calcite-tile interactive></calcite-tile> `);
  });

  describe("events", () => {
    it("should not emit select event after the tile is clicked if interactive is not set", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile id="tile-1"></calcite-tile> `);

      const eventSpy = await page.spyOnEvent("calciteTileSelect");

      await page.click("#tile-1");
      await page.waitForChanges();

      expect(eventSpy).not.toHaveReceivedEvent();
    });

    it("should emit select event after the tile is clicked when interactive", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile id="tile-1" interactive></calcite-tile> `);

      const eventSpy = await page.spyOnEvent("calciteTileSelect");

      await page.click("#tile-1");
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

  describe("keyboard", () => {
    it("should receive focus when tabbed to with keyboard", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile interactive id="tile-1"></calcite-tile> `);
      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#tile-1")).toBe(true);
    });
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

  describe("theme", () => {
    describe("default", () => {
      themed(
        html`
          <calcite-tile
            heading="Tile heading lorem ipsum"
            description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
            icon="layers"
            interactive
          >
          </calcite-tile>
        `,
        {
          "--calcite-tile-background-color": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "backgroundColor",
          },
          "--calcite-tile-border-color": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "outlineColor",
          },
          "--calcite-tile-corner-radius": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "borderRadius",
          },
          "--calcite-tile-text-color": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "color",
          },
          "--calcite-tile-heading-text-color": {
            shadowSelector: `.${CSS.heading}`,
            targetProp: "color",
          },
          "--calcite-tile-shadow": {
            selector: `calcite-tile`,
            targetProp: "boxShadow",
          },
        },
      );
    });
    describe("default changing text colors on hover", () => {
      themed(
        html`
          <calcite-tile
            heading="Tile heading lorem ipsum"
            description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
            icon="layers"
            interactive
          >
          </calcite-tile>
        `,
        {
          "--calcite-tile-text-color": {
            shadowSelector: `.${CSS.container}`,
            targetProp: "color",
            state: "hover",
          },
          "--calcite-tile-heading-text-color": {
            shadowSelector: `.${CSS.heading}`,
            targetProp: "color",
            state: "hover",
          },
        },
      );
    });
    describe("--calcite-tile-text-color", () => {
      describe("applies to the selection icon", () => {
        themed(
          html`
            <calcite-tile
              heading="Tile heading lorem ipsum"
              description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
              icon="layers"
              interactive
              selection-mode="single"
            >
            </calcite-tile>
          `,
          {
            "--calcite-tile-text-color": {
              shadowSelector: `.${CSS.selectionIcon}`,
              targetProp: "color",
            },
          },
        );
      });
      describe("applies to the icon", () => {
        themed(
          html`
            <calcite-tile
              heading="Tile heading lorem ipsum"
              description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
              icon="layers"
              interactive
            >
            </calcite-tile>
          `,
          {
            "--calcite-tile-text-color": {
              shadowSelector: `.${CSS.icon}`,
              targetProp: "color",
            },
          },
        );
      });
    });
    describe("--calcite-tile-accent-color-press", () => {
      describe("applies to border on hover", () => {
        themed(
          html`
            <calcite-tile
              heading="Tile heading lorem ipsum"
              description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
              icon="layers"
              interactive
              selection-mode="single"
            >
            </calcite-tile>
          `,
          {
            "--calcite-tile-accent-color-press": {
              shadowSelector: `.${CSS.container}`,
              targetProp: "outlineColor",
              state: "hover",
            },
          },
        );
      });
      describe("applies to selection icon on hover", () => {
        themed(
          html`
            <calcite-tile
              heading="Tile heading lorem ipsum"
              description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
              icon="layers"
              interactive
              selection-mode="single"
            >
            </calcite-tile>
          `,
          {
            "--calcite-tile-accent-color-press": {
              shadowSelector: `.${CSS.selectionIcon}`,
              targetProp: "outlineColor",
              state: "hover",
            },
          },
        );
      });
      describe("applies to selected item's border", () => {
        themed(
          html`
            <calcite-tile
              heading="Tile heading lorem ipsum"
              description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
              icon="layers"
              interactive
              selection-mode="single"
              selected
            >
            </calcite-tile>
          `,
          {
            "--calcite-tile-accent-color-press": {
              shadowSelector: `.${CSS.container}`,
              targetProp: "outlineColor",
            },
          },
        );
      });
      describe("applies to selected item's selection icon", () => {
        themed(
          html`
            <calcite-tile
              heading="Tile heading lorem ipsum"
              description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
              icon="layers"
              interactive
              selection-mode="single"
              selected
            >
            </calcite-tile>
          `,
          {
            "--calcite-tile-accent-color-press": {
              shadowSelector: `.${CSS.selectionIcon}`,
              targetProp: "color",
            },
          },
        );
      });
      describe(`applies to selected item's border using selection-appearance="border"`, () => {
        themed(
          html`
            <calcite-tile
              heading="Tile heading lorem ipsum"
              description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
              icon="layers"
              interactive
              selection-mode="single"
              selection-appearance="border"
              selected
            >
            </calcite-tile>
          `,
          {
            "--calcite-tile-accent-color-press": {
              shadowSelector: `.${CSS.container}`,
              targetProp: "boxShadow",
            },
          },
        );
      });
      describe(`selection-mode="none"`, () => {
        describe("applies --calcite-tile-border-color when idle and selected attribute is present", () => {
          themed(
            html`
              <calcite-tile
                heading="Tile heading lorem ipsum"
                description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
                icon="layers"
                interactive
                selection-mode="none"
                selected
              >
              </calcite-tile>
            `,
            {
              "--calcite-tile-border-color": {
                shadowSelector: `.${CSS.container}`,
                targetProp: "outlineColor",
              },
            },
          );
        });
        describe("applies --calcite-tile-border-color when hovered", () => {
          themed(
            html`
              <calcite-tile
                heading="Tile heading lorem ipsum"
                description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
                icon="layers"
                interactive
                selection-mode="none"
              >
              </calcite-tile>
            `,
            {
              "--calcite-tile-border-color": {
                shadowSelector: `.${CSS.container}`,
                targetProp: "outlineColor",
                state: "hover",
              },
            },
          );
        });
      });
    });

    describe("link (hovered)", () => {
      themed(
        html`
          <calcite-tile
            heading="Tile heading lorem ipsum"
            description="Leverage agile frameworks to provide a robust synopsis for high level overviews."
            icon="layers"
            href="#"
          >
          </calcite-tile>
        `,
        {
          "--calcite-tile-link-color": [
            {
              shadowSelector: `.${CSS.heading}`,
              targetProp: "color",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.icon}`,
              targetProp: "color",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.container}`,
              targetProp: "outlineColor",
              state: "hover",
            },
          ],
        },
      );
    });
  });
});
