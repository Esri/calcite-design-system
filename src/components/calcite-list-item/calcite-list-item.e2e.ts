import { newE2EPage } from "@stencil/core/testing";
import { hidden, renders } from "../../tests/commonTests";
import { defaults } from "../../tests/commonTests";
import { CSS } from "./resources";

describe("calcite-list-item", () => {
  it("renders", async () => renders("calcite-list-item", { display: "flex" }));

  it("honors hidden attribute", async () => hidden("calcite-list-item"));

  it("has property defaults", async () =>
    defaults("calcite-list-item", [
      {
        propertyName: "nonInteractive",
        defaultValue: false
      },
      {
        propertyName: "description",
        defaultValue: undefined
      },
      {
        propertyName: "disabled",
        defaultValue: false
      },
      {
        propertyName: "label",
        defaultValue: undefined
      }
    ]));

  it("renders content node when label is provided", async () => {
    const page = await newE2EPage({ html: `<calcite-list-item label="test"></calcite-list-item>` });

    const contentNode = await page.find(`calcite-list-item >>> .${CSS.content}`);

    expect(contentNode).not.toBeNull();
  });

  it("renders content node when description is provided", async () => {
    const page = await newE2EPage({ html: `<calcite-list-item description="test"></calcite-list-item>` });

    const contentNode = await page.find(`calcite-list-item >>> .${CSS.content}`);

    expect(contentNode).not.toBeNull();
  });

  it("does not render content node when description and label is not provided", async () => {
    const page = await newE2EPage({ html: `<calcite-list-item></calcite-list-item>` });

    const contentNode = await page.find(`calcite-list-item >>> .${CSS.content}`);

    expect(contentNode).toBeNull();
  });
});
