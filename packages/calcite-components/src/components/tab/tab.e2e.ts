import { defaults, renders, hidden } from "../../tests/commonTests";

describe("calcite-tab", () => {
  const tabHtml = "<calcite-tab>A tab</calcite-tab>";
  const tabHtmlSelected = "<calcite-tab selected>A tab</calcite-tab>";

  describe("renders", () => {
    renders(tabHtml, { display: "none", visible: false });
    renders(tabHtmlSelected, { display: "block", visible: true });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-tab");
  });

  describe("defaults", () => {
    defaults("calcite-tab", [
      { propertyName: "tab", defaultValue: undefined },
      { propertyName: "selected", defaultValue: false },
      { propertyName: "scale", defaultValue: "m" },
    ]);
  });
});
