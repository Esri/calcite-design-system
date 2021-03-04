import { accessible, hidden, renders, defaults, reflects } from "../../tests/commonTests";

describe("calcite-action-menu", () => {
  it("renders", async () => renders("calcite-action-menu"));

  it("honors hidden attribute", async () => hidden("calcite-action-menu"));

  it("should be accessible", async () =>
    accessible(`
    <calcite-action-menu>
      <calcite-action text="Add" icon="plus"></calcite-action>
    </calcite-action-menu>
    `));

  it("defaults", async () =>
    defaults("calcite-action-menu", [
      {
        propertyName: "expanded",
        defaultValue: false
      },
      {
        propertyName: "flipPlacements",
        defaultValue: undefined
      },
      {
        propertyName: "intlOptions",
        defaultValue: undefined
      },
      {
        propertyName: "offsetDistance",
        defaultValue: 0
      },
      {
        propertyName: "open",
        defaultValue: false
      },
      {
        propertyName: "placement",
        defaultValue: "auto"
      }
    ]));

  it("reflects", async () =>
    reflects("calcite-action-menu", [
      {
        propertyName: "expanded",
        value: true
      },
      {
        propertyName: "offsetDistance",
        value: 0
      },
      {
        propertyName: "open",
        value: true
      },
      {
        propertyName: "placement",
        value: "auto"
      }
    ]));
});
