import { newE2EPage } from "@stencil/core/testing";
import { defaults, renders } from "../../tests/commonTests";
import { setUpPage } from "../../tests/utils";

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
        defaultValue:false
      },
      {
        propertyName: "theme",
        defaultValue: "light"
      }
    ])
  });


})
