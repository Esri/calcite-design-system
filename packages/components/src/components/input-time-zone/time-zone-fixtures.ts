export type TestTimeZone = {
  name: string;
  offset: number;
  label: string;
};

export const testTimeZones: TestTimeZone[] = [
  { name: "America/Mexico_City", offset: -360, label: "GMT-6" },
  { name: "America/Phoenix", offset: -420, label: "GMT-7" },
  { name: "Pacific/Guam", offset: 600, label: "GMT+10" },
  { name: "Pacific/Galapagos", offset: -360, label: "GMT-6" },
];
