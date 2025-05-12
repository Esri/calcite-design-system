import { isServer } from "lit";

interface NavigatorUAData {
  brands: Array<{ brand: string; version: string }>;
  mobile: boolean;
  platform: string;
}

function getUserAgentData(): NavigatorUAData | undefined {
  return (navigator as any).userAgentData;
}

export function getUserAgentString(): string {
  if (isServer) {
    return "";
  }

  const uaData = getUserAgentData();

  return uaData?.brands
    ? uaData.brands.map(({ brand, version }) => `${brand}/${version}`).join(" ")
    : navigator.userAgent;
}

export function getUserAgentPlatform(): string {
  return (navigator as any).platform;
}
