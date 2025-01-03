import { defineWorkspace } from "vitest/config";
import { workspaces } from "./package.json";

/**
 * This helps Vitest VS Code extensions discover all vite config files in the
 * monorepo in a more performant way
 *
 * @see [Vitest Workspace](https://vitest.dev/guide/workspace.html)
 */
export default defineWorkspace(workspaces.map((workspace) => `${workspace}/vite.config.ts`));
