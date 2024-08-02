import { getDateTimeFormat, SupportedLocale } from "../../utils/locale";
import { OffsetStyle, TimeZone, TimeZoneItem, TimeZoneItemGroup, TimeZoneMode } from "./interfaces";
import { InputTimeZoneMessages } from "./assets/input-time-zone/t9n";

const hourToMinutes = 60;

const timeZoneNameBlockList = [
  "CET",
  "CST6CDT",
  "EET",
  "EST",
  "EST5EDT",
  "Factory",
  "HST",
  "MET",
  "MST",
  "MST7MDT",
  "PST8PDT",
  "UTC",
  "WET",
];

function timeZoneOffsetToDecimal(shortOffsetTimeZoneName: string): string {
  const minusSign = "−";
  const hyphen = "-";

  return (
    shortOffsetTimeZoneName
      .replace(":15", ".25")
      .replace(":30", ".5")
      .replace(":45", ".75")

      // ensures decimal string representation is parseable
      .replace(minusSign, hyphen)
  );
}

function toOffsetValue(timeZoneName: TimeZone, referenceDateInMs: number): number {
  // we use "en-US" to allow us to reliably remove the standard time token
  const offset = getTimeZoneShortOffset(timeZoneName, "en-US", referenceDateInMs).replace("GMT", "");

  if (offset === "") {
    return 0;
  }

  return Number(timeZoneOffsetToDecimal(offset)) * hourToMinutes;
}

export function getUserTimeZoneOffset(): number {
  const localDate = new Date();
  return localDate.getTimezoneOffset() * -1;
}

export function getUserTimeZoneName(): string {
  const dateFormatter = new Intl.DateTimeFormat();
  return dateFormatter.resolvedOptions().timeZone;
}

export async function createTimeZoneItems(
  locale: SupportedLocale,
  messages: InputTimeZoneMessages,
  mode: TimeZoneMode,
  referenceDate: Date,
  standardTime: OffsetStyle,
): Promise<TimeZoneItem[] | TimeZoneItemGroup[]> {
  if (mode === "name") {
    const { groupByName } = await import("timezone-groups/dist/groupByName/index.mjs");
    const groups = await groupByName();

    return groups
      .map<TimeZoneItem<string>>(({ label: timeZone }) => {
        const label = toUserFriendlyName(timeZone);
        const value = timeZone;

        return {
          label,
          value,
          filterValue: timeZone,
        };
      })
      .filter((group) => !!group)
      .sort();
  }

  const effectiveLocale =
    standardTime === "user"
      ? locale
      : // we use locales that will always yield a short offset that matches `standardTime`
        standardTime === "utc"
        ? "fr"
        : "en-GB";
  const referenceDateInMs: number = referenceDate.getTime();

  if (mode === "region") {
    const [{ groupByRegion }, { getCountry }] = await Promise.all([
      import("timezone-groups/dist/groupByRegion/index.mjs"),
      import("timezone-groups/dist/utils/country.mjs"),
    ]);
    const groups = await groupByRegion();

    return groups
      .map<TimeZoneItemGroup>(({ label: region, tzs }) => {
        return {
          label: region,
          items: tzs.map((timeZone) => {
            const decimalOffset = timeZoneOffsetToDecimal(
              getTimeZoneShortOffset(timeZone, effectiveLocale, referenceDateInMs),
            );

            return {
              label: getTimeZoneLabel(timeZone, messages),
              value: timeZone,
              filterValue: toUserFriendlyName(timeZone),
              metadata: {
                offset: decimalOffset,
                country: getCountry(timeZone),
              },
            };
          }),
        };
      })
      .sort((groupA, groupB) => groupA.label.localeCompare(groupB.label));
  }

  const [{ groupByOffset }, { DateEngine }] = await Promise.all([
    import("timezone-groups/dist/groupByOffset/index.mjs"),
    import("timezone-groups/dist/groupByOffset/strategy/native/index.mjs"),
  ]);

  const groups = await groupByOffset({
    dateEngine: new DateEngine(),
    groupDateRange: 1,
    startDate: new Date(referenceDateInMs).toISOString(),
  });

  const listFormatter = new Intl.ListFormat(locale, { style: "long", type: "conjunction" });

  // we remove blocked entries from tzs and adjust label indices accordingly
  groups.forEach((group) => {
    const indexOffsets: number[] = [];
    let removedSoFar = 0;

    group.tzs.forEach((tz, index) => {
      if (timeZoneNameBlockList.includes(tz)) {
        removedSoFar++;
      }
      indexOffsets[index] = removedSoFar;
    });

    group.tzs = group.tzs.filter((tz) => !timeZoneNameBlockList.includes(tz));

    group.labelTzIdx = group.labelTzIdx
      .map((index) => index - indexOffsets[index])
      .filter((index) => index >= 0 && index < group.tzs.length);
  });

  return groups
    .map<TimeZoneItem<number>>(({ labelTzIdx, tzs }) => {
      const groupRepTz = tzs[0];
      const decimalOffset = timeZoneOffsetToDecimal(
        getTimeZoneShortOffset(groupRepTz, effectiveLocale, referenceDateInMs),
      );
      const value = toOffsetValue(groupRepTz, referenceDateInMs);
      const tzLabels = labelTzIdx.map((index: number) => getTimeZoneLabel(tzs[index], messages));
      const label = createTimeZoneOffsetLabel(messages, decimalOffset, listFormatter.format(tzLabels));

      return {
        label,
        value,
        filterValue: tzs.map((tz) => toUserFriendlyName(tz)),
      };
    })
    .filter((group) => !!group)
    .sort((groupA, groupB) => groupA.value - groupB.value);
}

function getTimeZoneLabel(timeZone: string, messages: InputTimeZoneMessages): string {
  return messages[timeZone] || getCity(timeZone);
}

/**
 * Exported for testing purposes only
 *
 * @internal
 */
export function getCity(timeZone: string): string {
  return timeZone.split("/").pop();
}

/**
 * Exported for testing purposes only
 *
 * @internal
 */
export function toUserFriendlyName(timeZoneName: string): string {
  return timeZoneName.replace(/_/g, " ");
}

function createTimeZoneOffsetLabel(messages: InputTimeZoneMessages, offsetLabel: string, groupLabel: string): string {
  return messages.timeZoneLabel.replace("{offset}", offsetLabel).replace("{cities}", groupLabel);
}

function getTimeZoneShortOffset(
  timeZone: TimeZone,
  locale: SupportedLocale,
  referenceDateInMs: number = Date.now(),
): string {
  const dateTimeFormat = getDateTimeFormat(locale, { timeZone, timeZoneName: "shortOffset" });
  const parts = dateTimeFormat.formatToParts(referenceDateInMs);
  return parts.find(({ type }) => type === "timeZoneName").value;
}

function isGroup(item: TimeZoneItem | TimeZoneItemGroup): item is TimeZoneItemGroup {
  return (item as TimeZoneItemGroup).items !== undefined;
}

function flattenTimeZoneItems(timeZoneItems: TimeZoneItem[] | TimeZoneItemGroup[]): TimeZoneItem[] {
  return isGroup(timeZoneItems[0]) ? timeZoneItems.flatMap((item) => item.items) : timeZoneItems;
}

export function findTimeZoneItemByProp(
  timeZoneItems: TimeZoneItem[] | TimeZoneItemGroup[],
  prop: string,
  valueToMatch: string | number | null,
): TimeZoneItem | null {
  return valueToMatch == null
    ? null
    : flattenTimeZoneItems(timeZoneItems).find(
        (item) =>
          // intentional == to match string to number
          item[prop] == valueToMatch,
      );
}
