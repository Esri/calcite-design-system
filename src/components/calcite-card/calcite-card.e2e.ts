import { newE2EPage } from "@stencil/core/testing";
import { renders } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-card", () => {
  it("renders", async () => renders("calcite-card"));

  it("renders with default props if none are provided", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card>
        <img slot="thumbnail" src="https://via.placeholder.com/350x150.png" />
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
        <img slot="thumbnail" src="https://via.placeholder.com/350x150.png" />
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
        <img slot="thumbnail" src="https://via.placeholder.com/350x150.png" />
      </calcite-card>
    `);

    const thumbContainer = await page.find(`calcite-card >>> .${CSS.thumbnailWrapper}`);

    expect(thumbContainer).not.toBeNull();
  });

  it("should render a checkbox if selectable", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card selectable>
      <img slot="thumbnail" src="https://via.placeholder.com/350x150.png" />
      </calcite-card>
    `);

    const thumbContainer = await page.find(`calcite-card >>> .${CSS.checkboxWrapper}`);

    expect(thumbContainer).not.toBeNull();
  });
});
