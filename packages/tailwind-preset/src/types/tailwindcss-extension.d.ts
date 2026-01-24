declare module "tailwindcss/lib/util/flattenColorPalette" {
  import type { ColorPalette } from "tailwindcss/types/config";
  function flattenColorPalette(colors: ColorPalette): Record<string, string>;
  export = flattenColorPalette;
}
