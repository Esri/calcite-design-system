import type iconData from "@esri/calcite-ui-icons/docs/icons.json";
import type { CamelCase } from "type-fest";

type KebabCaseIcons = keyof typeof iconData.icons;
type CamelCaseIcons = CamelCase<KebabCaseIcons>;

export type IconName = KebabCaseIcons | CamelCaseIcons;
