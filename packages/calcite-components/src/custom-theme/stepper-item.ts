import { html } from "../../support/formatting";

export const stepperItemTokens = {
  calciteStepperItemBackgroundColorPress: "",
  calciteStepperItemHeaderTextColor: "",
  calciteStepperItemHeaderTextColorHover: "",
  calciteStepperItemSelectedHeaderTextColor: "",
  calciteStepperItemIconColor: "",
  calciteStepperItemCompleteIconColor: "",
  calciteStepperItemErrorIconColor: "",
  calciteStepperItemSelectedIconColor: "",
  calciteStepperItemDescriptionTextColor: "",
  calciteStepperItemDescriptionTextColorHover: "",
  calciteStepperItemBorderColor: "",
  calciteStepperItemBorderColorHover: "",
  calciteStepperItemCompleteBorderColor: "",
  calciteStepperItemCompleteBorderColorHover: "",
  calciteStepperItemErrorBorderColor: "",
  calciteStepperItemErrorBorderColorHover: "",
  calciteStepperItemSelectedBorderColor: "",
};

export const stepperItem = html`<calcite-stepper layout="horizontal" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 4" selected> </calcite-stepper-item>
</calcite-stepper>`;

export const stepperItemVertical = html`<calcite-stepper layout="vertical" scale="m"
  ><calcite-stepper-item heading="Item 1" active> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 2" complete> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 3" error> </calcite-stepper-item
  ><calcite-stepper-item heading="Item 4" selected> </calcite-stepper-item>
</calcite-stepper>`;
