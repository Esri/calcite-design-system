import { TimeZoneItem, TimeZoneMode, TimeZoneName } from "./interfaces";
import { getDateTimeFormat, SupportedLocale } from "../../utils/locale";
import { InputTimeZoneMessages } from "./assets/input-time-zone/t9n";

const hourToMinutes = 60;

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
        import("timezone-groups/dist/index.mjs"),
        import("timezone-groups/dist/strategy/native/index.mjs"),
      ]);
    }

    return timeZoneGroups.then(async ([{ groupTimeZones }, { DateEngine }]) => {
      const timeZoneGroups: { labelTZIndices: number[]; tzs: TimeZoneName[] }[] = await groupTimeZones({
        dateEngine: new DateEngine(),
        groupDateRange: 1,
        startDate: new Date(referenceDateInMs).toISOString(),
      });

      const listFormatter = new Intl.ListFormat(locale, { style: "long", type: "conjunction" });

      return timeZoneGroups
        .map<TimeZoneItem<number>>(({ labelTZIndices, tzs }) => {
          const groupRepTz = tzs[0];
          const decimalOffset = timeZoneOffsetToDecimal(getTimeZoneShortOffset(groupRepTz, locale, referenceDateInMs));
          const value = toOffsetValue(groupRepTz, referenceDateInMs);
          const label = createTimeZoneOffsetLabel(
            messages,
            decimalOffset,
            listFormatter.format(labelTZIndices.map((index: number) => messages[tzs[index]]))
          );

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
