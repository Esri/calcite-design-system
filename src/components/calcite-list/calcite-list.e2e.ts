import { accessible, hidden, renders } from "../../tests/commonTests";
import { defaults } from "../../tests/commonTests";

describe("calcite-list-item", () => {
  it("renders", async () => renders("calcite-list-item"));

  it("honors hidden attribute", async () => hidden("calcite-list-item"));

  it("has property defaults", async () =>
    defaults("calcite-list-item", [
      {
        propertyName: "disabled",
        defaultValue: false
      }
    ]));

  it("should be accessible", async () => {
    await accessible(`<calcite-list-item></calcite-fab>`);
    await accessible(`<calcite-list-item disabled></calcite-list-item>`);
  });
});
