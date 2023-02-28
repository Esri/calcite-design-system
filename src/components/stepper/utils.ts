import { E2EPage } from "@stencil/core/testing";

export const getItemPosition = (
  stepperEl: HTMLCalciteStepperElement,
  stepperItemEl: HTMLCalciteStepperItemElement
): number => {
  return Array.from(stepperEl.querySelectorAll("calcite-stepper-item")).indexOf(stepperItemEl);
};

export const getSelectedItemId = async (page: E2EPage): Promise<string> => {
  return await page.evaluate((): string => {
    return document.querySelector("calcite-stepper")?.selectedItem?.id || "";
  });
};

export const clickStepperItemContent = async (page: E2EPage, selector: string): Promise<void> => {
  await page.$eval(selector, (item: HTMLCalciteStepperItemElement) =>
    item.shadowRoot.querySelector<HTMLElement>(".stepper-item-content").click()
  );
};

// we use browser-context function to click on items to workaround `E2EElement#click` error
export const itemClicker = async (item: HTMLCalciteStepperItemElement): Promise<void> => {
  item.click();
};
