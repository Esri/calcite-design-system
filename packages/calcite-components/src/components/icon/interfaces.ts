import * as icons from "@esri/calcite-ui-icons";
import { KebabCase } from "type-fest";

type ExtractBaseIcon<T> = T extends `${infer Base}${"16" | "24" | "32"}`
  ? Base extends `i${infer Rest}`
    ? Rest
    : Base
  : never;

type CamelCaseIcons = ExtractBaseIcon<keyof typeof icons>;
type KebabCaseIcons = KebabCase<CamelCaseIcons>;

export type IconType = KebabCaseIcons | CamelCaseIcons;
