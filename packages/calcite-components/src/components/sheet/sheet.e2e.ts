import { html } from "../../../support/formatting";
import { focusable, renders, hidden, t9n } from "../../tests/commonTests";

describe("calcite-sheet properties", () => {
  describe("renders", () => {
    renders("calcite-sheet", { display: "flex", visible: false });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-modal");
  });

  describe("translation support", () => {
    t9n("calcite-modal");
  });

  describe("setFocus", () => {
    const createSheetHTML = (contentHTML?: string, attrs?: string) =>
      `<calcite-sheet open ${attrs}>${contentHTML}</calcite-sheet>`;

    const closeButtonTargetSelector = ".close";
    const focusableContentTargetClass = "test";

    const focusableContentHTML = html`<button class=${focusableContentTargetClass}>test</button>`;

    describe("focuses close button by default", () => {
      focusable(createSheetHTML(focusableContentHTML), {
        shadowFocusTargetSelector: closeButtonTargetSelector,
      });
    });

    describe("focuses content if there is no close button", () => {
      focusable(createSheetHTML(focusableContentHTML, "close-button-disabled"), {
        focusTargetSelector: `.${focusableContentTargetClass}`,
      });
    });
  });
});
