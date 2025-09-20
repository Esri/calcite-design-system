import { CalciteIconPath } from "@esri/calcite-ui-icons";
import { Scale } from "../interfaces";
import { getAssetPath } from "../../runtime";
import { logger } from "../../utils/logger";
import { IconNameOrString } from "./interfaces";

export interface FetchIconProps {
  icon: IconNameOrString;
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

function generateIconId({ icon, scale }: FetchIconProps): string {
  const size = scaleToPx[scale];
  const name = normalizeIconName(icon);
  const filled = name.charAt(name.length - 1) === "F";
  const iconName = filled ? name.substring(0, name.length - 1) : name;

  return `${iconName}${size}${filled ? "F" : ""}`;
}

export async function fetchIcon(props: FetchIconProps): Promise<CalciteIconPath> {
  /*
   * option 2: allow developers to fetch icons by name and scale for their own use
   *
   * pros:
   *
   * - flexible
   *   - allows developers to fetch icons by name and scale
   *   - can customize rules for icon name/scale matching
   * - allows passing icons by name
   * - similar DX
   *
   * cons:
   *
   * - will require type overrides until we provide a way to extend supported icon types
   * - icons need to match scale
   */
  const cachedIconKey = generateIconId(props);
  const cachedIconData = getCachedIconDataByKey(cachedIconKey);

  if (cachedIconData) {
    return cachedIconData;
  }

  if (!requestCache[cachedIconKey]) {
    requestCache[cachedIconKey] = fetch(getAssetPath(`./assets/icon/${cachedIconKey}.json`))
      .then((resp) => resp.json())
      .catch(() => {
        logger.error(`${props.icon} (${props.scale}) icon failed to load`);
        return "";
      });
  }

  const path = await requestCache[cachedIconKey];
  iconCache[cachedIconKey] = path;

  return path;
}

/**
 * Util to retrieve cached icon data based on icon name and scale.
 *
 * @param props – icon properties
 */
export function getCachedIconData(props: FetchIconProps): CalciteIconPath {
  return getCachedIconDataByKey(generateIconId(props));
}

function getCachedIconDataByKey(id: string): CalciteIconPath {
  return iconCache[id];
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
