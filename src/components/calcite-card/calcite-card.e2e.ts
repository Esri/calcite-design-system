import { newE2EPage } from "@stencil/core/testing";
import { accessible, renders } from "../../tests/commonTests";
import { placeholderImage } from "../../tests/utils";
import { CSS } from "./resources";
const placeholder = placeholderImage({
  width: 350,
  height: 150
});

describe("calcite-card", () => {
  it("renders", async () => renders("calcite-card"));

  it("is accessible", async () => accessible("calcite-card"));

  it("is accessible when selectable", async () =>
    accessible(`
      <calcite-card selectable>
        <img slot="thumbnail" src="${placeholder}" alt="Test image" />
      </calcite-card>`));

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

  it("renders with requsted props", async () => {
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
});
