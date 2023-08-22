import { html } from "../../../support/formatting";
import { focusable, renders, hidden, t9n } from "../../tests/commonTests";

describe("calcite-sheet properties", () => {
  describe("renders", () => {
    renders("calcite-sheet", { display: "flex", visible: false });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-sheet");
  });

  describe("translation support", () => {
    t9n("calcite-sheet");
  });

  describe("setFocus", () => {
    const createSheetHTML = (contentHTML?: string, attrs?: string) =>
      `<calcite-sheet open ${attrs}>${contentHTML}</calcite-sheet>`;

    const focusableContentTargetClass = "test";

    const focusableContentHTML = html`<button class=${focusableContentTargetClass}>test</button>`;

    describe("focuses content by default", () => {
      focusable(createSheetHTML(focusableContentHTML), {
        focusTargetSelector: `.${focusableContentTargetClass}`,
      });
    });
  });
});
