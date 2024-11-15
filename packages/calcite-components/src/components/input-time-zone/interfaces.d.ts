declare global {
  namespace Intl {
    function supportedValuesOf(key: "timeZone"): TimeZone[];
  }
}

export type TimeZone = string;

export interface TimeZoneGroup extends BasicTimeZoneGroup {
  offsetGroupLabel: string;
  offsetGroupRepTimeZone: string;
  offsetGroupTimeZones: string[];
}

export interface BasicTimeZoneGroup {
  offsetLabel: string;
  offsetValue: number;
}

export type TimeZoneMode = "offset" | "name" | "region";

export interface TimeZoneItem<T extends number | string = number | string> {
  label: string;
  value: T;
  metadata: {
    country?: string;
    filterValue: string | string[];
    offset?: string;
  };
}

export interface TimeZoneItemGroup {
  label: string;
  items: TimeZoneItem<string>[];
}

export type OffsetStyle = "user" | "utc" | "gmt";
