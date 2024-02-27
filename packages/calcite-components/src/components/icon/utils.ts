import { CalciteIconPath } from "@esri/calcite-ui-icons";
import { getAssetPath } from "@stencil/core";
import { Scale } from "../interfaces";

export interface FetchIconProps {
  icon: string;
  scale: Scale;
}

/**
 * Icon data cache.
 * Exported for testing purposes.
 *
 * @private
 */
export const iconCache: Record<string, CalciteIconPath> = {};

/**
 * Icon request cache.
 * Exported for testing purposes.
 *
 * @private
 */
export const requestCache: Record<string, Promise<CalciteIconPath>> = {};

export const scaleToPx: Record<Scale, number> = {
  s: 16,
  m: 24,
  l: 32,
};

export async function fetchIcon({ icon, scale }: FetchIconProps): Promise<CalciteIconPath> {
  const size = scaleToPx[scale];
  const name = normalizeIconName(icon);
  const filled = name.charAt(name.length - 1) === "F";
  const iconName = filled ? name.substring(0, name.length - 1) : name;
  const id = `${iconName}${size}${filled ? "F" : ""}`;

  if (iconCache[id]) {
    return iconCache[id];
  }
  if (!requestCache[id]) {
    requestCache[id] = fetch(getAssetPath(`./assets/icon/${id}.json`))
      .then((resp) => resp.json())
      .catch(() => {
        console.error(`"${id}" is not a valid calcite-ui-icon name`);
        return "";
      });
  }

  const path = await requestCache[id];
  iconCache[id] = path;

  return path;
}

/**
 * Normalize the icon name to match the path data module exports.
 * Exported for testing purposes.
 *
 * @param name – an icon name that can be either kebab or camel-cased
 * @private
 */
export function normalizeIconName(name: string): string {
  const numberLeadingName = !isNaN(Number(name.charAt(0)));
  const parts = name.split("-");
  const kebabCased = parts.length > 0;

  if (kebabCased) {
    const firstNonDigitInPartPattern = /[a-z]/i;

    name = parts
      .map((part, partIndex) => {
        return part.replace(firstNonDigitInPartPattern, function replacer(match, offset) {
          const isFirstCharInName = partIndex === 0 && offset === 0;

          if (isFirstCharInName) {
            return match;
          }

          return match.toUpperCase();
        });
      })
      .join("");
  }

  return numberLeadingName ? `i${name}` : name;
}
