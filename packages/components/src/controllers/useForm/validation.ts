import { CheckableFormComponent } from "../../utils/form";
import type { FormComponent, UseFormOptions } from "../useForm";

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
    if (component && input.type === "radio") {
      let group = component.elementInternals.form?.elements[component.name];
      if (group?.length > 0) {
        group = Array.from(group).filter((element: any) => element.tagName === component.el.tagName) as FormComponent[];

        const isRequired = group.some((radioTypeElement) => (radioTypeElement as CheckableFormComponent).required);
        const isChecked = group.some((radioTypeElement) => (radioTypeElement as CheckableFormComponent).checked);
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
  inputDelegate.value =
    // file will throw if non-empty string is provided
    inputDelegate.type === "file" || valueToValidate == null ? "" : String(valueToValidate);

  return inputDelegate.validity.valid;
}

function getValidityFlags(validityState: ValidityState): ValidityStateFlags {
  const validityFlags: ValidityStateFlags = {};

  for (const key in validityState) {
    if (key !== "valid" && validityState[key]) {
      validityFlags[key] = true;
    }
  }

  return validityFlags;
}
