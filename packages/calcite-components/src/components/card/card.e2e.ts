import { newE2EPage } from "@arcgis/lumina-compiler/puppeteerTesting";
import { describe, expect, it } from "vitest";
import { accessible, renders, slots, hidden, t9n, themed, focusable } from "../../tests/commonTests";
import { placeholderImage } from "../../../.storybook/placeholder-image";
import { html } from "../../../support/formatting";
import { CSS, SLOTS } from "./resources";

const placeholder = placeholderImage({
  width: 350,
  height: 150,
});

describe("calcite-card", () => {
  describe("renders", () => {
    renders("calcite-card", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-card");
  });

  describe("focusable", () => {
    describe("default", () => {
      focusable("calcite-card");
    });

    describe("with interactive children", () => {
      focusable(html`
        <calcite-card id="parent">
          <div tabindex="0">focusable child</div>
        </calcite-card>
      `);
    });
  });

  describe("accessible", () => {
    accessible("calcite-card");
  });

  describe("accessible when selectable (deprecated)", () => {
    accessible(
      html`<calcite-card label="example-label" selectable>
        <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>`,
    );
  });

  describe("slots", () => {
    slots("calcite-card", SLOTS, true);
  });

  it("renders with default props if none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card label="example-label">
        <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>`);

    const element = await page.find("calcite-card");
    expect(element).not.toHaveAttribute("disabled");
    expect(element).not.toHaveAttribute("loading");
    expect(element).not.toHaveAttribute("selected");
  });

  it("renders with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card label="example-label" loading selected disabled>
        <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>`);

    const element = await page.find("calcite-card");
    expect(element).toHaveAttribute("disabled");
    expect(element).toHaveAttribute("loading");
    expect(element).toHaveAttribute("selected");
  });

  it("should have a thumbnail container", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card label="example-label">
        <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>
    `);

    const thumbContainer = await page.find(`calcite-card >>> .${CSS.thumbnailWrapper}`);

    expect(thumbContainer).not.toBeNull();
  });

  describe("when a card is selectable (deprecated)", () => {
    it("should update the card's selected state when its checkbox is clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(html`
        <calcite-card label="example-label" selectable>
          <h3 slot="title">ArcGIS Online: Gallery and Organization pages</h3>
          <span slot="subtitle">
            A great example of a study description that might wrap to a line or two, but isn't overly verbose.
          </span>
        </calcite-card>
      `);
      const card = await page.find("calcite-card");
      const checkbox = await page.find(`calcite-card >>> .${CSS.checkboxWrapperDeprecated} calcite-checkbox`);
      const cardSelectSpy = await card.spyOnEvent("calciteCardSelect");

      await checkbox.click();
      await page.waitForChanges();

      expect(cardSelectSpy).toHaveReceivedEventTimes(1);
      expect(await checkbox.getProperty("checked")).toBe(true);
      expect(await card.getProperty("selected")).toBe(true);
    });
  });

  describe("translation support", () => {
    t9n("calcite-card");
  });

  it("should have aria-live attribute set to polite on loader container when loading", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card label="example-label" selectable loading>
      <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>
    `);

    const loaderContainer = await page.find("calcite-card >>> .calcite-card-loader-container");
    expect(loaderContainer.getAttribute("aria-live")).toBe("polite");
  });

  describe("theme", () => {
    describe("default", () => {
      themed("calcite-card", {
        "--calcite-card-background-color": {
          shadowSelector: `.${CSS.contentWrapper}`,
          targetProp: "backgroundColor",
        },
        "--calcite-card-border-color": {
          shadowSelector: `.${CSS.contentWrapper}`,
          targetProp: "borderColor",
        },
        "--calcite-card-corner-radius": { shadowSelector: `.${CSS.contentWrapper}`, targetProp: "borderRadius" },
        "--calcite-card-shadow": { shadowSelector: `.${CSS.contentWrapper}`, targetProp: "boxShadow" },
      });
    });
    describe("selectable", () => {
      describe("default", () => {
        themed(
          html`<calcite-card label="example-label" selectable>
            <h3 slot="title">ArcGIS Online: Gallery and Organization pages</h3>
            <span slot="subtitle">
              A great example of a study description that might wrap to a line or two, but isn't overly verbose.
            </span>
          </calcite-card>`,
          {
            "--calcite-card-selection-background-color-hover": {
              shadowSelector: `.${CSS.checkboxWrapperDeprecated}`,
              targetProp: "backgroundColor",
              state: "hover",
            },
            "--calcite-card-selection-background-color-press": {
              shadowSelector: `.${CSS.checkboxWrapperDeprecated}`,
              targetProp: "backgroundColor",
              state: { press: { attribute: "class", value: CSS.checkboxWrapperDeprecated } },
            },
            "--calcite-card-selection-color": {
              shadowSelector: `.${CSS.checkboxWrapperDeprecated}`,
              targetProp: "color",
            },
            "--calcite-card-selection-color-hover": {
              shadowSelector: `.${CSS.checkboxWrapperDeprecated}`,
              targetProp: "color",
              state: "hover",
            },
          },
        );
      });
      describe("selected", () => {
        themed(
          html`<calcite-card label="example-label" selectable selected>
            <h3 slot="title">ArcGIS Online: Gallery and Organization pages</h3>
            <span slot="subtitle">
              A great example of a study description that might wrap to a line or two, but isn't overly verbose.
            </span>
          </calcite-card>`,
          {
            "--calcite-card-accent-color-selected": {
              shadowSelector: `.${CSS.checkboxWrapperDeprecated}`,
              targetProp: "color",
            },
          },
        );
      });
    });
  });
});
