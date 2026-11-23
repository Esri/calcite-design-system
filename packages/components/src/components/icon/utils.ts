import { CalciteIconPath } from "@esri/calcite-ui-icons";
import { Scale } from "../types";
import { getAssetPath } from "../../runtime";
import { logger } from "../../utils/logger";
import { IconName } from "./types";

export interface FetchIconProps {
  icon: IconName;
  scale: Scale;
}

/**
 * Icon data cache.
 * Exported for testing purposes.
 */
export const iconCache: Record<string, CalciteIconPath> = {};

/**
 * Icon request cache.
 * Exported for testing purposes.
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
 * Normalize a kebab-case icon name to match the path data module exports.
 * Exported for testing purposes.
 *
 * @param name – a kebab-case icon name
 */
export function normalizeIconName(name: IconName): string {
  const numberLeadingName = !isNaN(Number(name.charAt(0)));
  const firstNonDigitInPartPattern = /[a-z]/i;
  const normalizedName = name
    .split("-")
    .map((part, partIndex) =>
      part.replace(firstNonDigitInPartPattern, (match, offset) => {
        const isFirstCharInName = partIndex === 0 && offset === 0;

        return isFirstCharInName ? match : match.toUpperCase();
      }),
    )
    .join("");

  return numberLeadingName ? `i${normalizedName}` : normalizedName;
}
