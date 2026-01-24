import { html } from "../../support/formatting";

export const stepperTokens = {
  calciteStepperBarGap: "",
  calciteStepperBarInactiveFillColor: "",
  calciteStepperBarActiveFillColor: "",
  calciteStepperBarCompleteFillColor: "",
  calciteStepperBarErrorFillColor: "",
};

export const stepper = html`<calcite-stepper layout="horizontal-single" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item>
</calcite-stepper>`;
