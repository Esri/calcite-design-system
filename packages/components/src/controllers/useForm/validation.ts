import type { CheckableFormComponent, FormComponent, UseFormOptions } from "../useForm";

const joinableValueTypes = ["text", "email", "search", "hidden", "tel", "url"] as UseFormOptions["inputType"][];

type ValidationResult = { validity: ValidityStateFlags; validationMessage: string };

const allValid = Object.freeze({ validity: {}, validationMessage: "" });

export function validate({
  component,
  input,
  value,
}: {
  component?: FormComponent;
  input: HTMLInputElement;
  value: any;
}): ValidationResult {
  if (!Array.isArray(value)) {
    /*
     * This logic handles syncing each radio component's validity in a group, which is different than other form components whose validity state only depends upon itself.
     *
     * It does this by:
     * 1) Finding every element in the component's form whose name matches the component's name
     * 2) Filtering that set of elements by the component's tagName (to ensure they're all of the same element type)
     * 3) Checking if any element in the group has required set (if any or all or some have required, the whole group is required)
     * 4) Checking if any element in the group is currently checked/selected
     * 5) If #3 is true and #4 is false, it is invalid since a required radio group must have a selected value
     * 6) The validity and validationMessage properties are captured from the native input element passed in based on #3 and #4
     * 7) The properties in #6 are applied just to the other radio elements in the same group as the current component
     */
    if (component && input.type === "radio") {
      const item = component.elementInternals.form?.elements.namedItem(component.name!);

      if (item) {
        const elements = "length" in item ? Array.from(item) : [item];
        const group = elements.filter(
          (element): element is CheckableFormComponent["el"] =>
            (element as HTMLElement).tagName === component.el.tagName,
        );

        const isRequired = group.some((radioTypeElement) => radioTypeElement.required);
        const isChecked = group.some((radioTypeElement) => radioTypeElement.checked);
        const others = group.filter((radioTypeElement) => radioTypeElement !== component.el);
        const valueMissing = isRequired && !isChecked;

        input.required = !!valueMissing;

        const validity = getValidityFlags(input.validity);
        const validationMessage = input.validationMessage;

        if (others?.length > 0) {
          others.forEach((other) => {
            if (valueMissing !== other.validity?.valueMissing && other.setValidity) {
              other.setValidity(validity, validationMessage);
            }
          });
        }
      }
    }

    if (validateValue(input, value)) {
      return allValid;
    }

    return {
      validity: getValidityFlags(input.validity),
      validationMessage: input.validationMessage,
    };
  }

  if (joinableValueTypes.includes(input.type)) {
    if (validateValue(input, value.join(","))) {
      return allValid;
    }

    return {
      validity: getValidityFlags(input.validity),
      validationMessage: input.validationMessage,
    };
  }

  const mergedValidity: ValidityStateFlags = {};
  const validationMessages: string[] = [];

  for (const item of value) {
    if (validateValue(input, item)) {
      continue;
    }

    Object.assign(mergedValidity, getValidityFlags(input.validity));

    if (input.validationMessage) {
      validationMessages.push(input.validationMessage);
    }
  }

  return {
    validity: mergedValidity,
    validationMessage: validationMessages.join("; "),
  };
}

function validateValue(inputDelegate: HTMLInputElement, valueToValidate: any): boolean {
  if (inputDelegate.type === "file") {
    // file will throw if non-empty string is provided
    inputDelegate.value = "";

    const isMissingValue = !valueToValidate || (valueToValidate instanceof FileList && valueToValidate.length === 0);
    // we override the delegate's validation as its value and files prop cannot be directly set for validation
    return !inputDelegate.required || !isMissingValue;
  }

  inputDelegate.value = valueToValidate == null ? "" : String(valueToValidate);

  return inputDelegate.validity.valid;
}

function getValidityFlags(validityState: ValidityState): ValidityStateFlags {
  const validityFlags: ValidityStateFlags = {};

  for (const [key, invalid] of Object.entries(validityState) as [keyof ValidityState, boolean][]) {
    if (key !== "valid" && invalid) {
      validityFlags[key] = true;
    }
  }

  return validityFlags;
}
