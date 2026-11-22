import { createHash } from "node:crypto";
import { basename, extname, relative, resolve } from "node:path";
import MagicString from "magic-string";
import ts from "typescript";
import type { Plugin } from "vite";
import { findInferredTools, generateToolMetadata, toolModule } from "./compiler.js";

/** Options for lazy tool generation in a Vite project. */
export interface WebMcpPluginOptions {
  /** Path to the TypeScript config, relative to the Vite root. */
  tsconfig?: string;
  /** An optional semantic program already owned by the build. */
  getProgram?: () => ts.Program | undefined | Promise<ts.Program | undefined>;
}

const prefix = "virtual:lit-labs-webmcp/";
const tsExtension = /\.[cm]?tsx?$/;

/** Generates and lazy-loads metadata for @tool declarations that need inference. */
export function useWebMcp(options: WebMcpPluginOptions = {}): Plugin {
  let root: string;
  let project: ReturnType<typeof readProject> | undefined;
  const files = new Map<string, string>();
  const modules = new Map<string, string>();

  async function renderModule(file: string): Promise<string> {
    const program = await options.getProgram?.();
    if (program) {
      return serialize(program, file);
    }
    project ??= readProject(root, options.tsconfig);
    return serialize(project.getProgram(), file);
  }

  return {
    name: "lit-labs-webmcp",
    enforce: "pre",
    configResolved(config) {
      root = config.root;
    },
    transform(code, id) {
      if (!tsExtension.test(id) || !code.includes(toolModule)) {
        return;
      }
      const sourceFile = ts.createSourceFile(id, code, ts.ScriptTarget.Latest, true);
      const markers = findInferredTools(sourceFile);
      if (!markers.length) {
        return;
      }
      const name = basename(id, extname(id));
      const hash = createHash("sha256").update(relative(root, id)).digest("hex").slice(0, 12);
      const moduleId = `${prefix}${name}-${hash}`;
      files.set(`\0${moduleId}`, id);
      const source = new MagicString(code);
      for (const { call, key, options } of markers) {
        const lazy = `() => import(${JSON.stringify(moduleId)}), ${JSON.stringify(key)}`;
        const separator = call.arguments.hasTrailingComma ? " " : ", ";
        source.appendLeft(call.arguments.end, `${options ? "" : "{}"}${separator}${lazy}`);
      }
      return { code: source.toString(), map: source.generateMap({ hires: true }) };
    },
    resolveId(id) {
      return id.startsWith(prefix) ? `\0${id}` : undefined;
    },
    async load(id) {
      const file = files.get(id);
      if (!file) {
        return;
      }
      const code = await renderModule(file);
      modules.set(id, code);
      return code;
    },
    async handleHotUpdate({ file, server }) {
      if (!tsExtension.test(file) || !modules.size) {
        return;
      }
      project?.invalidate(file);
      let changed = false;
      for (const [id, previous] of modules) {
        const next = await renderModule(files.get(id)!);
        if (next !== previous) {
          const module = server.moduleGraph.getModuleById(id);
          if (module) {
            server.moduleGraph.invalidateModule(module);
          }
          modules.set(id, next);
          changed = true;
        }
      }
      if (!changed) {
        return;
      }
      server.ws.send({ type: "full-reload" });
      return [];
    },
    closeBundle() {
      project?.dispose();
      project = undefined;
    },
  };
}

function serialize(program: ts.Program, file: string): string {
  return `export default ${JSON.stringify(generateToolMetadata(program, file))};`;
}

function readProject(root: string, tsconfig?: string) {
  const configPath = tsconfig ? resolve(root, tsconfig) : ts.findConfigFile(root, ts.sys.fileExists);
  if (!configPath) {
    throw new Error("WebMCP inference needs a tsconfig.json or an existing TypeScript program.");
  }
  const config = ts.getParsedCommandLineOfConfigFile(
    configPath,
    {},
    {
      ...ts.sys,
      onUnRecoverableConfigFileDiagnostic: throwDiagnostic,
    },
  )!;
  const [diagnostic] = config.errors;
  if (diagnostic) {
    throwDiagnostic(diagnostic);
  }

  const versions = new Map<string, number>();
  let revision = 0;
  const service = ts.createLanguageService({
    ...ts.sys,
    useCaseSensitiveFileNames: () => ts.sys.useCaseSensitiveFileNames,
    getCurrentDirectory: () => root,
    getCompilationSettings: () => config.options,
    getScriptFileNames: () => config.fileNames,
    getProjectReferences: () => config.projectReferences,
    getProjectVersion: () => String(revision),
    getScriptVersion: (fileName) => String(versions.get(fileName) ?? 0),
    getScriptSnapshot: (fileName) => {
      const content = ts.sys.readFile(fileName);
      return content === undefined ? undefined : ts.ScriptSnapshot.fromString(content);
    },
    getDefaultLibFileName: ts.getDefaultLibFilePath,
  });
  return {
    getProgram: () => service.getProgram()!,
    invalidate(file: string) {
      versions.set(file, ++revision);
    },
    dispose: () => service.dispose(),
  };
}

function throwDiagnostic(diagnostic: ts.Diagnostic): never {
  throw new Error(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
}
