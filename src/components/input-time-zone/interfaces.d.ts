declare global {
  namespace Intl {
    function supportedValuesOf(key: "timeZone"): TimeZone[];
  }
}

export type TimeZone = string;

export interface TimeZoneGroup extends BasicTimeZoneGroup {
  offsetGroupLabel: string;
  offsetGroupRepTimeZone: string;
}

export interface BasicTimeZoneGroup {
  offsetLabel: string;
  offsetValue: number;
}
