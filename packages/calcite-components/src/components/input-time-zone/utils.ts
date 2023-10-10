import { TimeZoneItem, TimeZoneMode, TimeZoneName } from "./interfaces";
import { getDateTimeFormat, SupportedLocale } from "../../utils/locale";
import { InputTimeZoneMessages } from "./assets/input-time-zone/t9n";

const hourToMinutes = 60;

const timeZoneNameBlockList = [
  "CET",
  "CST6CDT",
  "EET",
  "EST",
  "EST5EDT",
  "Etc/GMT+1",
  "Etc/GMT+10",
  "Etc/GMT+11",
  "Etc/GMT+12",
  "Etc/GMT+2",
  "Etc/GMT+3",
  "Etc/GMT+4",
  "Etc/GMT+5",
  "Etc/GMT+6",
  "Etc/GMT+7",
  "Etc/GMT+8",
  "Etc/GMT+9",
  "Etc/GMT-1",
  "Etc/GMT-10",
  "Etc/GMT-11",
  "Etc/GMT-12",
  "Etc/GMT-13",
  "Etc/GMT-14",
  "Etc/GMT-2",
  "Etc/GMT-3",
  "Etc/GMT-4",
  "Etc/GMT-5",
  "Etc/GMT-6",
  "Etc/GMT-7",
  "Etc/GMT-8",
  "Etc/GMT-9",
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

function toOffsetValue(timeZoneName: TimeZoneName, referenceDateInMs: number): number {
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

/**
 * The lazy-loaded timezone-groups lib to be used across instances.
 */
let timeZoneGroups: Promise<[any, any]>;

export async function createTimeZoneItems(
  locale: SupportedLocale,
  messages: InputTimeZoneMessages,
  mode: TimeZoneMode,
  referenceDate: Date
): Promise<TimeZoneItem[]> {
  const referenceDateInMs: number = referenceDate.getTime();
  const timeZoneNames = Intl.supportedValuesOf("timeZone");

  if (mode === "offset") {
    if (!timeZoneGroups) {
      timeZoneGroups = Promise.all([
        import("timezone-groups/dist/index.js"),
        import("timezone-groups/dist/strategy/native/index.js"),
      ]);
    }

    return timeZoneGroups.then(async ([{ groupTimeZones }, { DateEngine }]) => {
      const timeZoneGroups: { labelTzIndices: number[]; tzs: TimeZoneName[] }[] = await groupTimeZones({
        dateEngine: new DateEngine(),
        groupDateRange: 1,
        startDate: new Date(referenceDateInMs).toISOString(),
      });

      const listFormatter = new Intl.ListFormat(locale, { style: "long", type: "conjunction" });

      // we remove blocked entries from tzs and adjust label indices accordingly
      timeZoneGroups.forEach((group) => {
        const indexOffsets: number[] = [];
        let removedSoFar = 0;

        group.tzs = group.tzs.filter((tz) => {
          if (timeZoneNameBlockList.includes(tz)) {
            removedSoFar++;
            return false;
          }

          indexOffsets.push(removedSoFar);
          return true;
        });

        group.labelTzIndices = group.labelTzIndices
          .map((index) => index - (indexOffsets[index] || 0))
          .filter((index) => index < group.tzs.length);
      });

      return timeZoneGroups
        .map<TimeZoneItem<number>>(({ labelTzIndices, tzs }) => {
          const groupRepTz = tzs[0];
          const decimalOffset = timeZoneOffsetToDecimal(getTimeZoneShortOffset(groupRepTz, locale, referenceDateInMs));
          const value = toOffsetValue(groupRepTz, referenceDateInMs);
          const tzLabels = labelTzIndices.map((index: number) => {
            const timeZone = tzs[index];
            const timeZoneLabel = messages[timeZone];
            return (
              timeZoneLabel ||
              // get city token
              timeZone.split("/").pop()
            );
          });

          const label = createTimeZoneOffsetLabel(messages, decimalOffset, listFormatter.format(tzLabels));

          return {
            label,
            value,
            filterValue: tzs.map((tz) => toUserFriendlyName(tz)),
          };
        })
        .filter((group) => !!group)
        .sort((groupA, groupB) => groupA.value - groupB.value);
    });
  }

  return timeZoneNames
    .map<TimeZoneItem<string>>((timeZone) => {
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
  timeZone: TimeZoneName,
  locale: SupportedLocale,
  referenceDateInMs: number = Date.now()
): string {
  const dateTimeFormat = getDateTimeFormat(locale, { timeZone, timeZoneName: "shortOffset" });
  const parts = dateTimeFormat.formatToParts(referenceDateInMs);
  return parts.find(({ type }) => type === "timeZoneName").value;
}
