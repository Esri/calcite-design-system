import { describe, expect, it } from "vitest";
import { minMaxLengthTypes, minMaxStepTypes, patternTypes, syncHiddenFormInput } from "./input";

describe("common input utils", () => {
  it("syncHiddenFormInput", async () => {
    const minMaxLengthTestValues = { minLength: 0, maxLength: 10 };
    const patternTestValue = { pattern: "test" };
    const minMaxStepTestValues = { min: 0, max: 10, step: 1 };

    const allTypes = Array.from(new Set([...minMaxLengthTypes, ...patternTypes, ...minMaxStepTypes]));
    const allValueFakeInputComponent = { ...minMaxLengthTestValues, ...minMaxStepTestValues, ...patternTestValue };

    const hiddenFormInput = document.createElement("input");

    allTypes.forEach((type) => {
      syncHiddenFormInput(type, allValueFakeInputComponent, hiddenFormInput);

      const expectedType = type === "textarea" ? "text" : type;

      expect(hiddenFormInput.type).toBe(expectedType);

      if (minMaxStepTypes.includes(type)) {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test config
        expect(hiddenFormInput.min).toBe(`${minMaxStepTestValues.min}`);
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test config
        expect(hiddenFormInput.max).toBe(`${minMaxStepTestValues.max}`);
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test config
        expect(hiddenFormInput.step).toBe(`${minMaxStepTestValues.step}`);
      }

      if (minMaxLengthTypes.includes(type)) {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test config
        expect(hiddenFormInput.minLength).toBe(minMaxLengthTestValues.minLength);
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test config
        expect(hiddenFormInput.maxLength).toBe(minMaxLengthTestValues.maxLength);
      }

      if (patternTypes.includes(type)) {
        // eslint-disable-next-line vitest/no-conditional-expect -- assertion depends on test config
        expect(hiddenFormInput.pattern).toBe(patternTestValue.pattern);
      }
    });
  });
});
