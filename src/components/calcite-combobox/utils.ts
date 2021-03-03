import { ComboboxChildElement } from "./interfaces";
import { ComboboxChildSelector } from "./resources";

export function getAncestors(element: HTMLElement): ComboboxChildElement[] {
  const parent: ComboboxChildElement = element.parentElement?.closest(ComboboxChildSelector);
  const grandparent: ComboboxChildElement = parent?.parentElement?.closest(ComboboxChildSelector);
  return [parent, grandparent].filter((el) => el);
}
