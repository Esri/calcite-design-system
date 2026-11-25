export const timeZoneBrowserTestMatch = "**/*.time-zone.browser.{e2e,spec}.?(c|m)[jt]s?(x)";

export const timeZoneTestSuites = [
  {
    include: [`src/components/input-time-zone/${timeZoneBrowserTestMatch}`],
    timeZones: ["America/Mexico_City", "America/Phoenix", "Pacific/Guam", "Pacific/Galapagos"],
  },
  {
    include: [`src/components/{date-picker,input-date-picker}/${timeZoneBrowserTestMatch}`],
    timeZones: ["America/Los_Angeles", "Europe/Zurich"],
  },
];
