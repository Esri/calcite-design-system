import { Scale } from "../../interfaces/Icon";
export interface FetchIconProps {
    icon: string;
    scale: Scale;
    filled: boolean;
}
/**
 * Icon data cache.
 * Exported for testing purposes.
 * @private
 */
export declare const iconCache: Record<string, string>;
/**
 * Icon request cache.
 * Exported for testing purposes.
 * @private
 */
export declare const requestCache: Record<string, Promise<any>>;
export declare const scaleToPx: Record<Scale, number>;
export declare function fetchIcon({ icon, scale, filled }: FetchIconProps): Promise<string>;
/**
 * Normalize the icon name to match the path data module exports.
 * Exported for testing purposes.
 * @private
 */
export declare function normalizeIconName(name: string): string;
