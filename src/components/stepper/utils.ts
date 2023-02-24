export const getItemPosition = (
  stepperEl: HTMLCalciteStepperElement | null,
  stepperItemEl: HTMLCalciteStepperItemElement
): number => {
  return Array.from(stepperEl?.querySelectorAll("calcite-stepper-item")).indexOf(stepperItemEl);
};
