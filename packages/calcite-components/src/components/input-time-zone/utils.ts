// @ts-strict-ignore
import { getDateTimeFormat, SupportedLocale } from "../../utils/locale";
import type { InputTimeZone } from "./input-time-zone";
import { OffsetStyle, TimeZone, TimeZoneItem, TimeZoneItemGroup, TimeZoneMode } from "./interfaces";

const hourToMinutes = 60;

function timeZoneOffsetToDecimal(shortOffsetTimeZoneName: string): string {
  const minusSign = "−";
  const hyphen = "-";

  return (
    shortOffsetTimeZoneName
      .replace(":15", ".25")
      .replace(":30", ".5")
      .replace(":45", ".75")

      // ensures decimal string representation is parsable
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

export async function getNormalizer(mode: TimeZoneMode): Promise<(timeZone: TimeZone) => TimeZone> {
  if (mode === "offset") {
    return (timeZone: TimeZone) => timeZone;
  }

  const { normalize } = await import("timezone-groups/utils/time-zones");
  return normalize;
}

export async function createTimeZoneItems(
  locale: SupportedLocale,
  messages: InputTimeZone["messages"],
  mode: TimeZoneMode,
  referenceDate: Date,
  standardTime: OffsetStyle,
): Promise<TimeZoneItem[] | TimeZoneItemGroup[]> {
  if (mode === "name") {
    const { groupByName } = await import("timezone-groups/groupByName");
    const groups = await groupByName();

    return groups
      .map<TimeZoneItem<string>>(({ label: timeZone }) => {
        const label = timeZone;
        const value = timeZone;

        return {
          label,
          value,
          metadata: {
            filterValue: timeZone,
          },
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
    const [{ groupByRegion }, { getCountry, global: globalLabel }] = await Promise.all([
      import("timezone-groups/groupByRegion"),
      import("timezone-groups/utils/region"),
    ]);
    const groups = await groupByRegion();

    return groups
      .map<TimeZoneItemGroup>(({ label: region, tzs }) => {
        tzs.sort((timeZoneA, timeZoneB) => {
          const labeledTimeZoneA = getTimeZoneLabel(timeZoneA, messages);
          const labeledTimeZoneB = getTimeZoneLabel(timeZoneB, messages);
          const gmtTimeZoneString = "Etc/GMT";

          if (timeZoneA.startsWith(gmtTimeZoneString) && timeZoneB.startsWith(gmtTimeZoneString)) {
            // we use the IANA timezone for simpler and consistent sorting across locales
            const offsetStringA = timeZoneA.substring(gmtTimeZoneString.length);
            const offsetStringB = timeZoneB.substring(gmtTimeZoneString.length);

            const offsetA = offsetStringA === "" ? 0 : parseInt(offsetStringA);
            const offsetB = offsetStringB === "" ? 0 : parseInt(offsetStringB);

            return offsetB - offsetA;
          }

          return labeledTimeZoneA.localeCompare(labeledTimeZoneB);
        });

        return {
          label: getMessageOrKeyFallback(messages, region),
          items: tzs.map((timeZone) => {
            const decimalOffset = timeZoneOffsetToDecimal(
              getTimeZoneShortOffset(timeZone, effectiveLocale, referenceDateInMs),
            );
            const label = getTimeZoneLabel(timeZone, messages);
            const filterValue =
              region === globalLabel
                ? // we rely on the label for search since GMT items have their signs inverted (see https://en.wikipedia.org/wiki/Tz_database#Area)
                  // in addition to the label we also add "Global" and "Etc" to allow searching for these items
                  `${getTimeZoneLabel(globalLabel, messages)} Etc`
                : toUserFriendlyName(timeZone);

            const countryCode = getCountry(timeZone);
            const country = getMessageOrKeyFallback(messages, countryCode);

            return {
              label,
              value: timeZone,
              metadata: {
                country: country === label ? undefined : country,
                filterValue,
                offset: decimalOffset,
              },
            };
          }),
        };
      })
      .sort((groupA, groupB) =>
        groupA.label === globalLabel ? -1 : groupB.label === globalLabel ? 1 : groupA.label.localeCompare(groupB.label),
      );
  }

  const [{ groupByOffset }, { DateEngine }] = await Promise.all([
    import("timezone-groups/groupByOffset"),
    import("timezone-groups/groupByOffset/strategy/native"),
  ]);

  const groups = await groupByOffset({
    dateEngine: new DateEngine(),
    groupDateRange: 1,
    startDate: new Date(referenceDateInMs).toISOString(),
  });

  const listFormatter = new Intl.ListFormat(locale, { style: "long", type: "conjunction" });
  const offsetTimeZoneNameBlockList = ["Factory", "Etc/UTC"];

  // we remove blocked entries from tzs and adjust label indices accordingly
  groups.forEach((group) => {
    const indexOffsets: number[] = [];
    let removedSoFar = 0;

    group.tzs.forEach((tz, index) => {
      if (offsetTimeZoneNameBlockList.includes(tz)) {
        removedSoFar++;
      }
      indexOffsets[index] = removedSoFar;
    });

    group.tzs = group.tzs.filter((tz) => !offsetTimeZoneNameBlockList.includes(tz));

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
        metadata: {
          filterValue: tzs.map((tz) => toUserFriendlyName(tz)),
        },
      };
    })
    .filter((group) => !!group)
    .sort((groupA, groupB) => groupA.value - groupB.value);
}

function getTimeZoneLabel(timeZone: string, messages: InputTimeZone["messages"]): string {
  return messages[timeZone] || getCity(timeZone);
}

export function getSelectedRegionTimeZoneLabel(
  city: string,
  country: string,
  messages: InputTimeZone["messages"],
): string {
  const template = messages.timeZoneRegionLabel;
  return template.replace("{city}", city).replace("{country}", getMessageOrKeyFallback(messages, country));
}

export function getMessageOrKeyFallback(messages: InputTimeZone["messages"], key: string): string {
  return messages[key] || key;
}

/**
 * Exported for testing purposes only
 *
 * @private
 */
export function getCity(timeZone: string): string {
  return timeZone.split("/").pop();
}

/**
 * Exported for testing purposes only
 *
 * @private
 */
export function toUserFriendlyName(timeZoneName: string): string {
  return timeZoneName.replace(/_/g, " ");
}

function createTimeZoneOffsetLabel(
  messages: InputTimeZone["messages"],
  offsetLabel: string,
  groupLabel: string,
): string {
  return messages.timeZoneLabel.replace("{offset}", offsetLabel).replace("{cities}", groupLabel);
}

function getTimeZoneShortOffset(
  timeZone: TimeZone,
  locale: SupportedLocale,
  referenceDateInMs: number = Date.now(),
): string {
  // workaround for https://issues.chromium.org/issues/381620359
  // see https://github.com/Esri/calcite-design-system/issues/10895 for more info
  if (timeZone === "Factory") {
    timeZone = "Etc/GMT";
  }

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
