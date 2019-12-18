import { getAssetPath } from "@stencil/core";
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
export const iconCache: Record<string, string> = {};

/**
 * Icon request cache.
 * Exported for testing purposes.
 * @private
 */
export const requestCache: Record<string, Promise<any>> = {};

export const scaleToPx: Record<Scale, number> = {
  s: 16,
  m: 24,
  l: 32
};

export async function fetchIcon({
  icon,
  scale,
  filled
}: FetchIconProps): Promise<string> {
  const size = scaleToPx[scale];
  const id = `${normalizeIconName(icon)}${size}${filled ? "F" : ""}`;

  if (iconCache[id]) {
    return iconCache[id];
  }

  const request =
    requestCache[id] ||
    (requestCache[id] = import(getAssetPath(`./assets/${id}.js`)));

  const module = await request;
  const pathData = module[id];

  iconCache[id] = pathData;
  return pathData;
}

/**
 * Normalize the icon name to match the path data module exports.
 * Exported for testing purposes.
 * @private
 */
export function normalizeIconName(name: string): string {
  const numberLeadingName = !isNaN(Number(name.charAt(0)));
  const parts = name.split("-");

  if (parts.length === 1) {
    return numberLeadingName ? `i${name}` : name;
  }

  return parts
    .map((part, index) => {
      if (index === 0) {
        return numberLeadingName ? `i${part.toUpperCase()}` : part;
      }

      return part.charAt(0).toUpperCase() + part.slice(1);
    })
    .join("");
}
