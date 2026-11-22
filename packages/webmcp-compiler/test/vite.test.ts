import { mkdtemp, realpath, rm, writeFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createServer } from "vite";
import { expect, it, onTestFinished, vi } from "vitest";
import { useWebMcp } from "../src/vite.js";

it("loads inferred metadata separately and reloads when an imported type changes", async () => {
  const toolModule = "@lit-labs/webmcp/tool.js";
  const root = await realpath(await mkdtemp(join(tmpdir(), "lit-labs-webmcp-")));
  const source = join(root, "demo.ts");
  const dependency = join(root, "mode.ts");
  await Promise.all([
    writeFile(join(root, "tsconfig.json"), JSON.stringify({ compilerOptions: { strict: true } })),
    writeFile(
      source,
      [
        `import { tool as expose } from "${toolModule}";`,
        'import type { Mode } from "./mode";',
        "export class Panel {",
        "  /** Selected mode. */",
        '  @expose() accessor mode: Mode = "compact";',
        "}",
      ].join("\n"),
    ),
    writeFile(dependency, 'export type Mode = "compact" | "expanded";'),
  ]);
  const server = await createServer({
    configFile: false,
    root,
    plugins: [useWebMcp()],
    optimizeDeps: { noDiscovery: true },
    server: { middlewareMode: true, watch: null },
    resolve: { alias: { [toolModule]: createRequire(import.meta.url).resolve(toolModule) } },
  });
  onTestFinished(async () => {
    await server.close();
    await rm(root, { force: true, recursive: true });
  });

  const entry = await server.transformRequest("/demo.ts");
  const id = /import\("\/@id\/__x00__(virtual:lit-labs-webmcp\/[^"\n]+)"\)/.exec(entry!.code)![1];
  expect(entry!.code).not.toContain('"const":"expanded"');
  const metadata = await server.transformRequest(id);
  expect(metadata!.code).toContain('"description":"Selected mode."');
  expect(metadata!.code).toContain('"const":"expanded"');

  const reload = vi.spyOn(server.ws, "send");
  await writeFile(dependency, 'export type Mode = "compact" | "full";');
  server.watcher.emit("change", dependency);
  await expect.poll(() => reload.mock.calls).toContainEqual([{ type: "full-reload" }]);
  expect((await server.transformRequest(id))!.code).toContain('"const":"full"');
});
