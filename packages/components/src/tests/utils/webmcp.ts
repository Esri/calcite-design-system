import { expect, onTestFinished } from "vitest";

interface RegisteredTool {
  name: string;
  inputSchema: unknown;
  execute: (input: Record<string, unknown>, options: { signal: AbortSignal }) => Promise<unknown>;
}

export function mockWebMcp(): Map<string, RegisteredTool> {
  const registered = new Map<string, RegisteredTool>();
  const original = Object.getOwnPropertyDescriptor(document, "modelContext");
  Object.defineProperty(document, "modelContext", {
    configurable: true,
    value: {
      async registerTool(tool: RegisteredTool, { signal }: { signal: AbortSignal }) {
        expect(registered.has(tool.name)).toBe(false);
        registered.set(tool.name, tool);
        signal.addEventListener("abort", () => registered.delete(tool.name), { once: true });
      },
    },
  });
  onTestFinished(() => {
    if (original) {
      Object.defineProperty(document, "modelContext", original);
    } else {
      Reflect.deleteProperty(document, "modelContext");
    }
  });
  return registered;
}
