import { kebabCase } from "change-case";

export function propToAttr(name: string): string {
  return kebabCase(name);
}
