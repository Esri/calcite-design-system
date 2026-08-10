import { defineConfig } from "vitest/config";
import packageJson from "./package.json" with { type: "json" };

/**
 * This helps Vitest VS Code extensions discover all vite config files in the
 * monorepo in a more performant way
 *
 * @see [Vitest Projects](https://vitest.dev/guide/projects.html)
 */
export default defineConfig({
  test: {
    projects: packageJson.workspaces.map((workspace) => `${workspace}/vite.config.ts`)
  },
});
