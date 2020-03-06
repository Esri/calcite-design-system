import { newE2EPage } from "@stencil/core/testing";
import { defaults, renders } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-card", () => {
  it("renders", async () => renders("calcite-card"));

  it("has property defaults", async () => {
    defaults("calcite-card", [
      {
        propertyName: "disabled",
        defaultValue: false
      },
      {
        propertyName: "loading",
        defaultValue: false,
      },
      {
        propertyName: "respectImageHeight",
        defaultValue: false
      },
      {
        propertyName: "selected",
        defaultValue: false
      }
    ])
  });

  it("should have an thumbnail container", async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card>
        <img slot="thumbnail" src="https://via.placeholder.com/350x150.png" />
      </calcite-card>
    `);

    const thumbContainer = await page.find(
      `calcite-card >>> .${CSS.thumbnailWrapper}`
    );

    expect( await thumbContainer.isVisible()).toBe(true);
  });

  it("should render a checkbox if selectable", async() => {
    const page = await newE2EPage();
    await page.setContent(`
      <calcite-card selectable>
      <img slot="thumbnail" src="https://via.placeholder.com/350x150.png" />
      </calcite-card>
    `);

    const thumbContainer = await page.find(
      `calcite-card >>> .${CSS.thumbnailWrapper}`
    );

    expect( await thumbContainer.isVisible()).toBe(true);
  });

})
