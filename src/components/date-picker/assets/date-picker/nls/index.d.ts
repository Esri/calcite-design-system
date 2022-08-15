export type Strings = {
  "default-calendar": string;
  separator: string;
  unitOrder: string;
  weekStart: number;
  placeholder: string;
  days: Days;
  numerals: string;
  months: Months;
};

export type Days = {
  abbreviated: string[];
  short: string[];
  wide: string[];
};

export type Months = {
  abbreviated: string[];
  wide: string[];
  narrow: string[];
};
