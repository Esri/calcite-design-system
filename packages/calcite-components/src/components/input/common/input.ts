export type InputComponent = NumericInputComponent | TextualInputComponent;

export interface NumericInputComponent {
  min: number;
  max: number;
  step: number | "any";
}

export interface TextualInputComponent {
  pattern?: string;
  minLength: number;
  maxLength: number;
}

/**
 * Exported for testing purposes only
 */
export const minMaxStepTypes = ["date", "datetime-local", "month", "number", "range", "time", "week"];

/**
 * Exported for testing purposes only
 */
export const patternTypes = ["email", "password", "search", "tel", "text", "url"];

/**
 * Exported for testing purposes only
 */
export const minMaxLengthTypes = ["email", "password", "search", "tel", "text", "textarea", "url"];

function toString(num: number): string {
  return num?.toString() ?? "";
}

/**
 * Synchronizes the hidden form input with the validation-related input properties.
 *
 * @param type - The input type.
 * @param inputComponent
 * @param hiddenFormInput
 */
export function syncHiddenFormInput(
  type: HTMLInputElement["type"] | "textarea",
  inputComponent: InputComponent,
  hiddenFormInput: HTMLInputElement,
): void {
  hiddenFormInput.type = type === "textarea" ? "text" : type;

  if (minMaxStepTypes.includes(type)) {
    const numericInputComponent = inputComponent as NumericInputComponent;
    hiddenFormInput.min = toString(numericInputComponent.min);
    hiddenFormInput.max = toString(numericInputComponent.max);

    const step = numericInputComponent.step;
    hiddenFormInput.step = step === "any" ? step : toString(step);
  }

  if (minMaxLengthTypes.includes(type)) {
    const textualInputComponent = inputComponent as TextualInputComponent;

    if (hiddenFormInput.minLength != null) {
      hiddenFormInput.minLength = textualInputComponent.minLength;
    }

    if (hiddenFormInput.maxLength != null) {
      hiddenFormInput.maxLength = textualInputComponent.maxLength;
    }
  }

  if (patternTypes.includes(type)) {
    const textualInputComponent = inputComponent as TextualInputComponent;
    hiddenFormInput.pattern = textualInputComponent.pattern || "";
  }
}
