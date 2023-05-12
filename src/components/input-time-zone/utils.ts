import { BasicTimeZoneGroup, TimeZone, TimeZoneGroup } from "./interfaces";
import { SupportedLocales } from "../../utils/locale";
import { InputTimeZoneMessages } from "./assets/input-time-zone/t9n";

const hourToMinutes = 60;

function toGMT0(offset: string): string {
  return offset.replace(/\s?[0-9+\-−:]/g, "");
}

function toOffsetValue(offset: string): number {
  const gmt0 = toGMT0(offset);
  const offsetValue =
    Number(offset === gmt0 ? 0 : offset.replace(gmt0, "").replace(":30", ".5").replace(":45", ".75")) * hourToMinutes;

  if (isNaN(offsetValue)) {
    debugger;
  }

  return offsetValue;
}

export function getUserTimeZoneOffset(): number {
  const localDate = new Date();
  return localDate.getTimezoneOffset() * -1;
}

function getTimeZoneOffset(locale: SupportedLocales, timeZone: TimeZone): string {
  const dataFormatter = new Intl.DateTimeFormat(locale, {
    timeZone,
    timeZoneName: "shortOffset"
  });

  return dataFormatter.formatToParts(Date.now()).find((part) => part.type === "timeZoneName")?.value;
}

function getFallbackTimeZoneGroups(): BasicTimeZoneGroup[] {
  const timeZoneOffsets = [
    -11, -10, -9.5, -9, -8, -7, -6, -5, -4, -3, -2.5, -2, -1, 0, 1, 2, 3, 3.5, 4, 4.5, 5, 6, 6.5, 7, 8, 8.75, 9, 9.5,
    10, 10.5, 11, 12, 12.75, 13, 14
  ];

  return timeZoneOffsets.map((offset) => {
    return {
      offsetValue: offset * hourToMinutes,
      offsetLabel: `GMT${offset.toLocaleString("en", { signDisplay: "always" })}`
    };
  });
}

export async function generateTimeZoneGroups(
  locale: SupportedLocales,
  messages: InputTimeZoneMessages
): Promise<TimeZoneGroup[] | BasicTimeZoneGroup[]> {
  if (!("supportedValuesOf" in Intl)) {
    return getFallbackTimeZoneGroups();
  }

  return Intl.supportedValuesOf("timeZone")
    .map((timeZone) => {
      const groupLabel = messages[timeZone];

      if (!groupLabel) {
        return;
      }

      const offsetLabel = getTimeZoneOffset(locale, timeZone);
      const offsetValue = toOffsetValue(offsetLabel);
      const offsetGroupLabel = createGroupLabel(messages, offsetLabel, groupLabel);

      return {
        offsetLabel,
        offsetValue,
        offsetGroupLabel,
        offsetGroupRepTimeZone: timeZone
      };
    })
    .filter((group) => !!group)
    .sort((groupA, groupB) => groupA.offsetValue - groupB.offsetValue);
}

export function isBasicTimeZoneGroup(group: TimeZoneGroup | BasicTimeZoneGroup): group is BasicTimeZoneGroup {
  return !("offsetGroupRepTimeZone" in group);
}

function createGroupLabel(messages: InputTimeZoneMessages, offsetLabel: string, groupLabel: string): string {
  return messages.timeZoneLabel.replace("{offset}", offsetLabel).replace("{cities}", groupLabel);
}

export function createBasicGroupLabel(
  messages: InputTimeZoneMessages,
  offsetLabel: string,
  offsetValue: number
): string {
  const millisInHour = 60 * 1000;
  const sampleDate = new Date();
  const timeZoneSampleDate = new Date(
    sampleDate.getTime() - sampleDate.getTimezoneOffset() * millisInHour + -offsetValue * millisInHour
  );

  return createGroupLabel(
    messages,
    offsetLabel,
    timeZoneSampleDate.toLocaleTimeString(undefined, { hour: "numeric", minute: "numeric" })
  );
}
