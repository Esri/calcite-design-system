import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { themed } from "../../tests/commonTests";
import { html } from "../../../support/formatting";
import { isElementFocused } from "../../tests/utils/puppeteer";
import { CSS } from "./resources";

describe("calcite-tile", () => {
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

  describe("keyboard", () => {
    it("should receive focus when tabbed to with keyboard", async () => {
      const page = await newE2EPage();
      await page.setContent(html` <calcite-tile interactive id="tile-1"></calcite-tile> `);
      await page.keyboard.press("Tab");
      await page.waitForChanges();

      expect(await isElementFocused(page, "#tile-1")).toBe(true);
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
      describe(`applies to selected item's outline using selection-appearance="highlight"`, () => {
        themed(
          html`
            <calcite-tile
              heading="Tile heading lorem ipsum"
              interactive
              selection-mode="single"
              selection-appearance="highlight"
              selected
            >
            </calcite-tile>
          `,
          {
            "--calcite-color-surface-highlight": {
              shadowSelector: `.${CSS.container}`,
              targetProp: "backgroundColor",
            },
            "--calcite-tile-accent-color-press": {
              shadowSelector: `.${CSS.container}`,
              targetProp: "outline",
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
