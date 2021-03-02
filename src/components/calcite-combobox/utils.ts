import { ComboboxAncestorElement } from "./interfaces";
import { ComboboxAncestorSelector } from "./resources";

export function getAncestors(element: HTMLElement): ComboboxAncestorElement[] {
  const parent: ComboboxAncestorElement = element.parentElement?.closest(ComboboxAncestorSelector);
  const grandparent: ComboboxAncestorElement = parent?.parentElement?.closest(ComboboxAncestorSelector);
  return [parent, grandparent].filter((el) => el);
}
