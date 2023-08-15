import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders, slots, hidden, t9n } from "../../tests/commonTests";
import { placeholderImage } from "../../../.storybook/placeholderImage";
import { CSS, SLOTS } from "./resources";
import { html } from "../../../support/formatting";

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

  describe("accessible when selectable", () => {
    accessible(html`<calcite-card selectable>
      <img slot="thumbnail" src="${placeholder}" alt="Test image" />
    </calcite-card>`);
  });

  describe("slots", () => {
    slots("calcite-card", SLOTS);
  });

  it("renders with default props if none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card>
        <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>`);

    const element = await page.find("calcite-card");
    expect(element).not.toHaveAttribute("disabled");
    expect(element).not.toHaveAttribute("loading");
    expect(element).not.toHaveAttribute("selectable");
    expect(element).not.toHaveAttribute("selected");
  });

  it("renders with requested props", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card loading selectable selected disabled>
        <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>`);

    const element = await page.find("calcite-card");
    expect(element).toHaveAttribute("disabled");
    expect(element).toHaveAttribute("loading");
    expect(element).toHaveAttribute("selectable");
    expect(element).toHaveAttribute("selected");
  });

  it("should have a thumbnail container", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card>
        <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>
    `);

    const thumbContainer = await page.find(`calcite-card >>> .${CSS.thumbnailWrapper}`);

    expect(thumbContainer).not.toBeNull();
  });

  it("should render a checkbox if selectable", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card selectable>
      <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>
    `);

    const thumbContainer = await page.find(`calcite-card >>> .${CSS.checkboxWrapper}`);

    expect(thumbContainer).not.toBeNull();
  });

  describe("when a card is selectable", () => {
    it("should update the card's selected state when its checkbox is clicked", async () => {
      const page = await newE2EPage();
      await page.setContent(`
      <div style="width:260px">
        <calcite-card selectable>
          <h3 slot="title">ArcGIS Online: Gallery and Organization pages</h3>
          <span slot="subtitle">
            A great example of a study description that might wrap to a line or two, but isn't overly verbose.
          </span>
        </calcite-card>
      </div>
      `);
      const card = await page.find("calcite-card");
      const checkbox = await page.find(`calcite-card >>> .${CSS.checkboxWrapper} calcite-checkbox`);
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
      <calcite-card selectable loading>
      <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>
    `);

    const loaderContainer = await page.find("calcite-card >>> .calcite-card-loader-container");
    expect(loaderContainer.getAttribute("aria-live")).toBe("polite");
  });
});
