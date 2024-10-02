import { defaults, renders, hidden, themed } from "../../tests/commonTests";
import { CSS } from "./resources";

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

  describe("theme", () => {
    describe("default", () => {
      themed("calcite-tab", {
        "--calcite-tab-content-space-y": {
          shadowSelector: `.${CSS.content}`,
          targetProp: "paddingBlock",
        },
      });
    });

    describe("deprecated", () => {
      themed("calcite-tab", {
        "--calcite-tab-content-block-padding": {
          shadowSelector: `.${CSS.content}`,
          targetProp: "paddingBlock",
        },
      });
    });
  });
});
