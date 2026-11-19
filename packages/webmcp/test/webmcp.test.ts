import { ReactiveElement } from "lit";
import { expect, it, vi } from "vitest";
import { WebMcpController } from "../src/controller.js";
import { tool } from "../src/tool.js";

it("uses explicit metadata on a plain Lit element without a build integration", async () => {
  interface RegisteredTool {
    name: string;
    execute(input: object, options?: { signal: AbortSignal }): Promise<unknown>;
  }
  const registered = vi.fn<(tool: RegisteredTool) => Promise<undefined>>(async () => undefined);

  class ExplicitPanel extends ReactiveElement {
    @tool({ description: "Collapse state.", schema: { type: "boolean" } })
    accessor collapsed = false;

    @tool({
      description: "Returns the supplied name.",
      inputSchema: { type: "object", properties: { name: { type: "string" } } },
      parameters: ["name"],
    })
    echo(name: string): string {
      return name;
    }
  }

  customElements.define("explicit-panel", ExplicitPanel);
  const panel = new ExplicitPanel();
  const document = { modelContext: { registerTool: registered } } as unknown as Document;
  const controller = new WebMcpController(panel, {
    enabled: () => true,
    element: () => ({ localName: "explicit-panel", ownerDocument: document }) as HTMLElement,
  });
  panel.connectedCallback();
  await expect.poll(() => registered.mock.calls.length).toBe(3);

  const tools = registered.mock.calls.map(([definition]) => definition);
  const options = { signal: new AbortController().signal };
  await tools.find(({ name }) => name === "explicit-panel.set.collapsed")!.execute({ value: true }, options);
  expect(panel.collapsed).toBe(true);
  expect(await tools.find(({ name }) => name === "explicit-panel.echo")!.execute({ name: "example" })).toEqual({
    value: "example",
  });

  controller.hostDisconnected();
  await expect(tools[0].execute({}, options)).rejects.toMatchObject({ name: "AbortError" });
});
