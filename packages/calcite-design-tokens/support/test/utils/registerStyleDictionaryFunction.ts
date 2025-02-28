import { vi, expect } from "vitest";
import { Core as StyleDictionary } from "style-dictionary";

export const registerStyleDictionaryTransform = (fn: (sd: typeof StyleDictionary) => void): void => {
  const registerTransform = vi.fn();
  fn({ registerTransform } as unknown as StyleDictionary);
  expect(registerTransform).toHaveBeenCalled();
};

export const registerStyleDictionaryFilter = (fn: (sd: typeof StyleDictionary) => void): void => {
  const registerFilter = vi.fn();
  fn({ registerFilter });
  expect(registerFilter).toHaveBeenCalled();
};

export const registerStyleDictionaryParser = (fn: (sd: typeof StyleDictionary) => void): void => {
  const registerParser = vi.fn();
  fn({ registerParser } as unknown as StyleDictionary);
  expect(registerParser).toHaveBeenCalled();
};
