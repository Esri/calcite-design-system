import { IconScale } from "../../interfaces/Icon";
import { CalciteIconPath } from "@esri/calcite-ui-icons";
export interface FetchIconProps {
    icon: string;
    scale: IconScale;
}
/**
 * Icon data cache.
 * Exported for testing purposes.
 * @private
 */
export declare const iconCache: Record<string, CalciteIconPath>;
/**
 * Icon request cache.
 * Exported for testing purposes.
 * @private
 */
export declare const requestCache: Record<string, Promise<CalciteIconPath>>;
export declare const scaleToPx: Record<IconScale, number>;
export declare function fetchIcon({ icon, scale, }: FetchIconProps): Promise<CalciteIconPath>;
/**
 * Normalize the icon name to match the path data module exports.
 * Exported for testing purposes.
 * @private
 */
export declare function normalizeIconName(name: string): string;
