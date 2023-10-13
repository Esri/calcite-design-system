import { html } from "../../../support/formatting";
import { disabled, renders, hidden, t9n } from "../../tests/commonTests";

describe("calcite-stepper-item", () => {
  describe("renders", () => {
    renders("calcite-stepper-item", { display: "flex" });
  });

  describe("honors hidden attribute", () => {
    hidden("calcite-stepper-item");
  });

  describe("disabled", () => {
    disabled("calcite-stepper-item");
  });

  describe("translation support", () => {
    t9n(html`<calcite-stepper>
      <calcite-stepper-item heading="Step 1" id="step-1">
        <div>Step 1 content</div>
      </calcite-stepper-item>
      <calcite-stepper-item heading="Step 2" id="step-2">
        <div>Step 2 content</div>
      </calcite-stepper-item>
    </calcite-stepper>`);
  });
});
