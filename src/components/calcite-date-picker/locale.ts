/**
 * Convert eastern arbic numerals and remove right-to-left control marks
 */
export function replaceArabicNumerals(str: string = ""): string {
  return str
    .replace(/[\u0660-\u0669]/g, (c => c.charCodeAt(0) - 0x0660 as any))
    .replace(/[\u06f0-\u06f9]/g, (c => c.charCodeAt(0) - 0x06f0 as any))
    .replace(/[^\x00-\x7F]/g, "");
}

interface DateFormattingData {
  order: string[],
  separator: string;
  /** Uses the buddhist era years, rather than common era */
  buddhist: boolean;
  /** Uses arabic numerals */
  arabic: boolean;
  /** Placeholder string with correct order */
  placeholder: string;
}

export function getLocaleFormatData (locale: string): DateFormattingData {
  let data = [
    { unit: "month", num: "11", placeholder: "MM" },
    { unit: "day", num: "22", placeholder: "DD" },
    { unit: "year", num: "3333", placeholder: "YYYY" }
  ];

  // create a new localized string from a known date
  let test = new Date("11/22/3333").toLocaleDateString(locale);
  const arabic = test !== replaceArabicNumerals(test);
  const buddhist = test.indexOf("3876") > -1;
  // replace arabic numerals and adjust for buddhist era
  test = replaceArabicNumerals(test).replace("3876", "3333");
  const placeholder = data.reduce((str, d) => str.replace(d.num, d.placeholder), test);
  // given the localized test string, determine the order of day, month, year
  const order = data
    .sort((a, b) => (test.indexOf(a.num) < test.indexOf(b.num) ? -1 : 1))
    .map(d => d.unit);
  const separator = [". ", ".", "-", "/", "/"].find(char => test.indexOf(char) > -1);
  return {
    order,
    separator,
    buddhist,
    arabic,
    placeholder
  }
}

/**
 * Get a standard date object from a localized string
 * this is essentially the reverse of `toLocaleDateString`
 */
export function localeToDate(str: string, locale: string): Date {
  const {separator, order, buddhist } = getLocaleFormatData(locale);
  str = replaceArabicNumerals(str);
  const values = str.split(separator).filter(part => part !== separator).map(part => part.replace(".", ""));
  const day = values[order.indexOf("day")];
  const month = values[order.indexOf("month")];
  let year = values[order.indexOf("year")];
  if (buddhist) {
    year = `${parseInt(year) - 543}`;
  }
  // generate a new date object formed via the en-US standard
  return new Date(`${month}/${day}/${year}`);
}
