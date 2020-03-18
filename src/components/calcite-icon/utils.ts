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

  return new Promise(async function(resolve) {
    if (iconCache[id]) {
      return resolve(iconCache[id]);
    }
    if (!requestCache[id]) {
      requestCache[id] = fetch(getAssetPath(`./assets/${id}.json`)).then(resp =>
        resp.json()
      )
      .catch(() => {
        console.error(`"${id}" is not a valid calcite-ui-icon name`);
        return "";
      })
    }

    const path = await requestCache[id];
    iconCache[id] = path;

    return resolve(path);
  });
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
