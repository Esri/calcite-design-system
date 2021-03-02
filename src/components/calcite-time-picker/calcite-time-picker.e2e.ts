import { accessible, defaults, focusable, reflects, renders } from "../../tests/commonTests";

describe("calcite-time-picker", () => {
  it("renders", async () => renders("calcite-time-picker"));

  it("is accessible", async () => accessible(`<calcite-time-picker hour="00" minute="00"></calcite-time-picker>`));

  it("has defaults", async () =>
    defaults("calcite-time-picker", [
      { propertyName: "hour", defaultValue: "--" },
      { propertyName: "hourDisplayFormat", defaultValue: "12" },
      { propertyName: "minute", defaultValue: "--" },
      { propertyName: "second", defaultValue: "--" },
      { propertyName: "scale", defaultValue: "m" },
      { propertyName: "step", defaultValue: 60 },
      { propertyName: "theme", defaultValue: "light" }
    ]));

  it("reflects", async () =>
    reflects("calcite-time-picker", [
      { propertyName: "hour", value: "--" },
      { propertyName: "minute", value: "--" },
      { propertyName: "second", value: "--" },
      { propertyName: "scale", value: "m" },
      { propertyName: "step", value: 60 },
      { propertyName: "theme", value: "light" }
    ]));

  it("should focus the hour input", async () =>
    focusable(`calcite-time-picker`, {
      focusTargetSelector: "span.hour"
    }));
});
