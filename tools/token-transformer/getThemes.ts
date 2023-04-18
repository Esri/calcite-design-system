export type Theme = {
  name: string;
  enabled: string[];
  disabled: string[];
  source: string[];
}

export async function getThemes( themeFile: string ): Promise<Theme[]> {
  return []
}
