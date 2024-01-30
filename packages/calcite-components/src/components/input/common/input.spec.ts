/* eslint-disable jest/no-conditional-expect -- Using conditional logic in a confined test helper to handle specific scenarios, reducing duplication, balancing test readability and maintainability. **/
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
      expect(hiddenFormInput.type).toBe(type);

      if (minMaxStepTypes.includes(type)) {
        expect(hiddenFormInput.min).toBe("0");
        expect(hiddenFormInput.max).toBe("10");
        expect(hiddenFormInput.step).toBe("1");
      }

      if (minMaxLengthTypes.includes(type)) {
        expect(hiddenFormInput.minLength).toBe(0);
        expect(hiddenFormInput.maxLength).toBe(10);
      }

      if (patternTypes.includes(type)) {
        expect(hiddenFormInput.pattern).toBe("test");
      }
    });
  });
});
