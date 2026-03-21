export type InputComponent = NumericInputComponent | TextualInputComponent | DateTimeInputComponent;

export interface DateTimeInputComponent {
  min: string;
  max: string;
}

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

/** Exported for testing purposes only */
export const minMaxStepTypes = ["date", "datetime-local", "month", "number", "range", "time", "week"];

/** Exported for testing purposes only */
export const patternTypes = ["email", "password", "search", "tel", "text", "url"];

/** Exported for testing purposes only */
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
 */
export function syncHiddenFormInput(
  type: HTMLInputElement["type"] | "textarea",
  inputComponent: InputComponent,
  hiddenFormInput: HTMLInputElement,
): void {
  const effectiveType = type === "textarea" ? "text" : type;
  syncInputDelegate(effectiveType, inputComponent, hiddenFormInput);
}

/**
 * Synchronizes a form input delegate with the validation-related input properties.
 *
 * Note: loss of precision is expected due to the input's value and validation-constraint props being strings.
 */
export function syncInputDelegate(
  type: HTMLInputElement["type"],
  inputComponent: InputComponent,
  input: HTMLInputElement,
): void {
  input.type = type;

  const isMinMaxStepType = minMaxStepTypes.includes(type);
  const numericInputComponent = inputComponent as NumericInputComponent;

  updateConstraintValidation(numericInputComponent, input, "min", isMinMaxStepType);
  updateConstraintValidation(numericInputComponent, input, "max", isMinMaxStepType);
  updateConstraintValidation(numericInputComponent, input, "step", isMinMaxStepType);

  const isMinMaxLengthType = minMaxLengthTypes.includes(type);

  const textualInputComponent = inputComponent as TextualInputComponent;

  updateConstraintValidation(textualInputComponent, input, "minLength", isMinMaxLengthType);
  updateConstraintValidation(textualInputComponent, input, "maxLength", isMinMaxLengthType);

  const isPatternType = patternTypes.includes(type);

  updateConstraintValidation(textualInputComponent, input, "pattern", isPatternType);
}

export function isSupportedType(type: HTMLInputElement["type"] | "textarea"): boolean {
  const effectiveType = type === "textarea" ? "text" : type;
  return (
    minMaxStepTypes.includes(effectiveType) ||
    patternTypes.includes(effectiveType) ||
    minMaxLengthTypes.includes(effectiveType)
  );
}
