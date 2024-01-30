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

function updateConstraintValidation(
  inputComponent: InputComponent,
  input: HTMLInputElement,
  propName: string,
  matchesType: boolean,
): void {
  const attributeName = propName.toLowerCase();
  const value = inputComponent[propName];

  if (matchesType && value != null) {
    input.setAttribute(attributeName, `${value}`);
  } else {
    // we remove the attribute to ensure validation-constraints are properly reset
    input.removeAttribute(attributeName);
  }
}

/**
 * Synchronizes the hidden form input with the validation-related input properties.
 *
 * Note: loss of precision is expected due to the hidden input's value and validation-constraint props being strings.
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

  const isMinMaxStepType = minMaxStepTypes.includes(type);
  const numericInputComponent = inputComponent as NumericInputComponent;

  updateConstraintValidation(numericInputComponent, hiddenFormInput, "min", isMinMaxStepType);
  updateConstraintValidation(numericInputComponent, hiddenFormInput, "max", isMinMaxStepType);
  updateConstraintValidation(numericInputComponent, hiddenFormInput, "step", isMinMaxStepType);

  const isMinMaxLengthType = minMaxLengthTypes.includes(type);

  const textualInputComponent = inputComponent as TextualInputComponent;

  updateConstraintValidation(textualInputComponent, hiddenFormInput, "minLength", isMinMaxLengthType);
  updateConstraintValidation(textualInputComponent, hiddenFormInput, "maxLength", isMinMaxLengthType);

  const isPatternType = patternTypes.includes(type);

  updateConstraintValidation(textualInputComponent, hiddenFormInput, "pattern", isPatternType);
}
