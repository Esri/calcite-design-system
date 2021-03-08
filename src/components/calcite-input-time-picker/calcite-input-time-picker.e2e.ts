// import { newE2EPage } from "@stencil/core/testing";
import { accessible, defaults, focusable, reflects, renders } from "../../tests/commonTests";

describe("calcite-input-time-picker", () => {
  it("renders", async () => renders("calcite-input-time-picker"));

  it("is accessible", async () => accessible(`<calcite-input-time-picker></calcite-input-time-picker>`));

  it("has defaults", async () =>
    defaults("calcite-input-time-picker", [
      { propertyName: "active", defaultValue: false },
      { propertyName: "disabled", defaultValue: false },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 },
      { propertyName: "theme", defaultValue: "light" }
    ]));

  it("reflects", async () =>
    reflects(`calcite-input-time-picker`, [
      { propertyName: "active", value: true },
      { propertyName: "disabled", value: true },
      { propertyName: "guid", value: "my-id" },
      { propertyName: "name", value: "my-name" },
      { propertyName: "scale", value: "m" },
      { propertyName: "step", value: 60 },
      { propertyName: "theme", value: "light" },
      { propertyName: "value", value: "00:00" }
    ]));

  it("should focus the input when setFocus is called", async () =>
    focusable(`calcite-input-time-picker`, {
      focusTargetSelector: "input"
    }));
});
