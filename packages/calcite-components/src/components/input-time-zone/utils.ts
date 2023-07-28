import { BasicTimeZoneGroup } from "./interfaces";

const hourToMinutes = 60;

export function getUserTimeZoneOffset(): number {
  const localDate = new Date();
  return localDate.getTimezoneOffset() * -1;
}

function getFallbackTimeZoneGroups(): BasicTimeZoneGroup[] {
  const timeZoneOffsets = [
    -11, -10, -9.5, -9, -8, -7, -6, -5, -4, -3, -2.5, -2, -1, 0, 1, 2, 3, 3.5, 4, 4.5, 5, 6, 6.5, 7, 8, 8.75, 9, 9.5,
    10, 10.5, 11, 12, 12.75, 13, 14,
  ];

  return timeZoneOffsets.map((offset) => {
    return {
      offsetValue: offset * hourToMinutes,
      offsetLabel: toGMTLabel(offset),
    };
  });
}

/**
 * Exported for testing-purposes only
 *
 * @internal
 */
export function toGMTLabel(offsetInHours: number): string {
  return `GMT${offsetInHours === 0 ? "" : offsetInHours.toLocaleString("en", { signDisplay: "always" })}`;
}

let timeZoneGeneration: Promise<BasicTimeZoneGroup[]>;

export async function generateTimeZoneGroups(): Promise<BasicTimeZoneGroup[]> {
  if (timeZoneGeneration) {
    return timeZoneGeneration;
  }

  timeZoneGeneration = Promise.resolve(getFallbackTimeZoneGroups());

  return timeZoneGeneration;
}
