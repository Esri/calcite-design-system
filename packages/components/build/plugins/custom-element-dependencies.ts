import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import type { LuminaPlugins } from "@arcgis/lumina-compiler";
import type { PluginOption } from "vite";

export default function (lumina: LuminaPlugins): PluginOption {
  return {
    name: "custom-element-dependencies",
    buildEnd: async () => {
      if (!process.env.STORYBOOK_SCREENSHOT_TEST_BUILD) {
        return;
      }
      const outFile = resolve(import.meta.dirname, "custom-element-dependencies.json");
      await writeFile(outFile, JSON.stringify((lumina.context as any)._customElementDependencies));
    },
  };
}
