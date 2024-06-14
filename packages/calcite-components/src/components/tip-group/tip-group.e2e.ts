import { accessible, hidden, renders, themed } from "../../tests/commonTests";

describe("calcite-tip-group", () => {
  describe("renders", () => {
    renders("calcite-tip-group", { display: "block" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tip-group");
  });

  describe("accessible", () => {
    accessible(`calcite-tip-group`);
  });

  describe("theme", () => {
    describe("default", () => {
      themed("calcite-tip-group", {
        "--calcite-tip-group-background-color": {
          targetProp: "backgroundColor",
        },
        "--calcite-tip-group-text-color": {
          targetProp: "color",
        },
      });
    });
  });
});
