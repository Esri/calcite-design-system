import { hidden, renders, slots, defaults } from "../../tests/commonTests";
import { SLOTS } from "./resources";

describe("calcite-stack", () => {
  it("has defaults", async () =>
    defaults("calcite-stack", [
      {
        propertyName: "disabled",
        defaultValue: false
      }
    ]));

  describe("renders", () => {
    renders("calcite-stack", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-stack");
  });

  it("has slots", () => slots("calcite-stack", SLOTS));
});
