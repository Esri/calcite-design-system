import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, reflects, renders, hidden } from "../../tests/commonTests";

describe("calcite-option-group", () => {
  describe("renders", () => {
    renders("calcite-option-group", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-option-group");
  });

  describe("accessible", () => {
    accessible("calcite-option-group");
  });

  describe("defaults", () => {
    defaults("calcite-option-group", [
      {
        propertyName: "disabled",
        defaultValue: false,
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-option-group", [
      {
        propertyName: "disabled",
        value: true,
      },
    ]);
  });

  it("has a label", async () => {
    const page = await newE2EPage({
      html: `<calcite-option-group label="test-group"></calcite-option-group>`,
    });

    const group = await page.find("calcite-option-group");
    expect(group.shadowRoot.textContent).toBe("test-group");
  });
});
