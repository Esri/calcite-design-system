import iconMetadata from "@esri/calcite-ui-icons/docs/icons.json";
import { IconName } from "../src/components/icon/types";

// Use documented kebab-case metadata keys instead of camelCase path-data export names.
export const iconNames: IconName[] = Object.entries(iconMetadata.icons)
  .filter(([, icon]) => icon["16"] !== undefined)
  .map(([iconName]) => iconName as IconName)
  .sort((a, b) => a.localeCompare(b));
