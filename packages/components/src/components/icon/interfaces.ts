import type { CamelCase } from "type-fest";
type iconsDocData = typeof import("@esri/calcite-ui-icons/docs/icons.json");

type KebabCaseIcons = keyof iconsDocData["icons"];
type CamelCaseIcons = CamelCase<KebabCaseIcons>;

export type IconName = KebabCaseIcons | CamelCaseIcons;
