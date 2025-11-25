import { kebabCase } from "change-case";

export const HYDRATED_ATTR = "calcite-hydrated";

export function propToAttr(name: string): string {
  return kebabCase(name);
}
