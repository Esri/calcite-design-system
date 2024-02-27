declare global {
  namespace Intl {
    function supportedValuesOf(key: "timeZone"): TimeZoneName[];
  }
}

export type TimeZoneName = string;

export type TimeZoneMode = "offset" | "name";

export interface TimeZoneItem<T extends number | string = number | string> {
  label: string;
  value: T;
  filterValue: string | string[];
}
