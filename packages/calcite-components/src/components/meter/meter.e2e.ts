import { accessible, renders, hidden, t9n, defaults, reflects } from "../../tests/commonTests";

describe("calcite-meter", () => {
  describe("renders", () => {
    renders("calcite-meter", { display: "flex" });
  });

  describe("defaults", () => {
    defaults("calcite-meter", [
      {
        propertyName: "appearance",
        defaultValue: "outline-fill",
      },
      {
        propertyName: "disabled",
        defaultValue: false,
      },
      {
        propertyName: "fillType",
        defaultValue: "range",
      },
      {
        propertyName: "groupSeparator",
        defaultValue: false,
      },
      {
        propertyName: "max",
        defaultValue: 100,
      },
      {
        propertyName: "min",
        defaultValue: 0,
      },
      {
        propertyName: "rangeLabelType",
        defaultValue: "percent",
      },
      {
        propertyName: "scale",
        defaultValue: "m",
      },
      {
        propertyName: "unitLabel",
        defaultValue: "",
      },
      {
        propertyName: "valueLabel",
        defaultValue: false,
      },
      {
        propertyName: "valueLabelType",
        defaultValue: "percent",
      },
    ]);
  });

  describe("reflects", () => {
    reflects("calcite-meter", [
      {
        propertyName: "appearance",
        value: "outline-fill",
      },
      {
        propertyName: "fillType",
        value: "range",
      },
      {
        propertyName: "max",
        value: 100,
      },
      {
        propertyName: "min",
        value: 0,
      },
      {
        propertyName: "rangeLabelType",
        value: "percent",
      },
      {
        propertyName: "scale",
        value: "m",
      },
      {
        propertyName: "valueLabelType",
        value: "percent",
      },
    ]);
  });

  describe("hidden", () => {
    hidden("calcite-meter");
  });

  describe("accessible", () => {
    accessible(`<calcite-meter label="A great meter"></calcite-meter>`);
  });

  describe("translation support", () => {
    t9n("calcite-meter");
  });
});
