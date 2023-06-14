interface NavigatorUAData {
  brands: Array<{ brand: string; version: string }>;
  mobile: boolean;
  platform: string;
}

export function getUserAgentData(): NavigatorUAData | undefined {
  return (navigator as any).userAgentData;
}

export function getUserAgentString(): string {
  const uaData = getUserAgentData();

  return uaData?.brands
    ? uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ")
    : navigator.userAgent;
}
