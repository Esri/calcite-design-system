import { ComboboxChildElement } from "./interfaces";
import { ComboboxChildSelector } from "./resources";

export function getAncestors(element: HTMLElement): ComboboxChildElement[] {
  const parent: ComboboxChildElement = element.parentElement?.closest(ComboboxChildSelector);
  const grandparent: ComboboxChildElement = parent?.parentElement?.closest(ComboboxChildSelector);
  return [parent, grandparent].filter((el) => el);
}

export function getDepth(element: HTMLElement): number {
  const [parent, grandparent] = getAncestors(element);
  if (!parent) {
    return 0;
  }
  if (!grandparent) {
    return 1;
  }
  return 2;
}
