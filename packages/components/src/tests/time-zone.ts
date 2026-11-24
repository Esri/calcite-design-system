export const timeZoneBrowserTestMatch = "**/*.time-zone.browser.{e2e,spec}.?(c|m)[jt]s?(x)";

export const timeZoneTestSuites = [
  {
    include: [`src/components/input-time-zone/${timeZoneBrowserTestMatch}`],
    timeZones: ["America/Mexico_City", "America/Phoenix", "Pacific/Guam", "Pacific/Galapagos"],
  },
];
