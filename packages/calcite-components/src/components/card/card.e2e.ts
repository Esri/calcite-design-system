import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders, slots, hidden, t9n, themed } from "../../tests/commonTests";
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
      await page.setContent(`
      <div style="width:260px">
        <calcite-card label="example-label" selectable>
          <h3 slot="title">ArcGIS Online: Gallery and Organization pages</h3>
          <span slot="subtitle">
            A great example of a study description that might wrap to a line or two, but isn't overly verbose.
          </span>
        </calcite-card>
      </div>
      `);
      const card = await page.find("calcite-card");
      const checkbox = await page.find(`calcite-card >>> .${CSS.checkboxWrapperDeprecated} calcite-checkbox`);
      const cardSelectSpy = await card.spyOnEvent("calciteCardSelect");
      const clickSpy = await card.spyOnEvent("calciteCardSelect");

      await checkbox.click();
      await page.waitForChanges();

      expect(cardSelectSpy).toHaveReceivedEventTimes(1);
      expect(clickSpy).toHaveReceivedEventTimes(1);
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
        "--calcite-card-background-color-hover": [
          {
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "backgroundColor",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "backgroundColor",
            state: "focus",
          },
        ],
        "--calcite-card-background-color-press": {
          shadowSelector: `.${CSS.checkboxWrapper}`,
          targetProp: "backgroundColor",
          state: { press: { attribute: "class", value: CSS.checkboxWrapper } },
        },
        "--calcite-card-border-color": {
          shadowSelector: `.${CSS.contentWrapper}`,
          targetProp: "borderColor",
        },
        "--calcite-card-corner-radius": { shadowSelector: `.${CSS.contentWrapper}`, targetProp: "borderRadius" },
        "--calcite-card-selection-color": {
          shadowSelector: `.${CSS.checkboxWrapper}`,
          targetProp: "color",
        },
        "--calcite-card-selection-color-hover": [
          {
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "color",
            state: "hover",
          },
          {
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "color",
            state: "focus",
          },
        ],
        "--calcite-card-shadow": { shadowSelector: `.${CSS.contentWrapper}`, targetProp: "boxShadow" },
      });
    });
    describe("selected", () => {
      themed(html`<calcite-card label="example-label" selected></calcite-card>`, {
        "--calcite-card-accent-color-selected": [
          {
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "color",
          },
          {
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "color",
            state: "focus",
          },
        ],
        "--calcite-card-background-color-press": {
          shadowSelector: `.${CSS.checkboxWrapper}`,
          targetProp: "backgroundColor",
          state: "focus",
        },
      });
    });
    describe("deprecated", () => {
      describe("default", () => {
        themed("calcite-card", {
          "--calcite-card-selection-icon-color-hover": [
            {
              shadowSelector: `.${CSS.checkboxWrapper}`,
              targetProp: "color",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.checkboxWrapper}`,
              targetProp: "color",
              state: "focus",
            },
          ],
          "--calcite-card-selection-background-color-hover": [
            {
              shadowSelector: `.${CSS.checkboxWrapper}`,
              targetProp: "backgroundColor",
              state: "hover",
            },
            {
              shadowSelector: `.${CSS.checkboxWrapper}`,
              targetProp: "backgroundColor",
              state: "focus",
            },
          ],
          "--calcite-card-selection-background-color-active": {
            shadowSelector: `.${CSS.checkboxWrapper}`,
            targetProp: "backgroundColor",
            state: { press: { attribute: "class", value: CSS.checkboxWrapper } },
          },
        });
      });
      describe("selected", () => {
        themed(html`<calcite-card label="example-label" selected></calcite-card>`, {
          "--calcite-card-selection-icon-color-selected": {
            targetProp: "color",
            shadowSelector: `.${CSS.checkboxWrapper}`,
          },
          "--calcite-card-selection-background-color-active": {
            targetProp: "backgroundColor",
            shadowSelector: `.${CSS.checkboxWrapper}`,
            state: "focus",
          },
        });
      });
    });
  });
});
