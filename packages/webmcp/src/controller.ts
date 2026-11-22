import type { ReactiveController, ReactiveControllerHost } from "lit";
import { getDecoratedTools } from "./tool.js";

/** A JSON Schema object accepted by WebMCP. */
export type JsonSchema = { readonly [keyword: string]: unknown };

/** Advisory hints for WebMCP clients. They do not grant permission to execute a tool. */
export interface ToolAnnotations {
  readOnlyHint?: boolean;
  untrustedContentHint?: boolean;
  consequentialHint?: boolean;
  debugging?: boolean;
}

/** A tool definition before the controller prefixes its name with the host's tag. */
export interface ToolDefinition<Host extends HTMLElement> {
  name: string;
  description: string;
  inputSchema?: JsonSchema;
  outputSchema?: JsonSchema;
  annotations?: ToolAnnotations;
  execute(host: Host, input: Record<string, unknown>, options: { signal: AbortSignal }): unknown;
}

/** The element and reactive lifecycle required by the controller. */
export type WebMcpHost = HTMLElement & ReactiveControllerHost;

/** Supplies tools and controls whether the application exposes them. */
export interface WebMcpControllerOptions<Host extends WebMcpHost> {
  enabled(): boolean;
  /** The connected DOM element when the reactive host is rendered through a proxy. */
  element?(): HTMLElement;
  tools?(host: Host): readonly ToolDefinition<Host>[] | Promise<readonly ToolDefinition<Host>[]>;
}

interface BrowserTool extends Omit<ToolDefinition<HTMLElement>, "execute"> {
  execute(input: Record<string, unknown>, options?: { signal?: AbortSignal }): Promise<unknown>;
}

interface ModelContext {
  registerTool(tool: BrowserTool, options: { signal: AbortSignal }): Promise<undefined>;
}

interface Candidate {
  start(): void;
  abort(): void;
}

const registrations = new WeakMap<Document, Map<string, Set<Candidate>>>();

/** Registers the first connected, enabled host of each tag in a document. */
export class WebMcpController<Host extends WebMcpHost> implements ReactiveController {
  private readonly host: Host;
  private readonly options: WebMcpControllerOptions<Host>;
  #connected = false;
  #leave: (() => void) | undefined;

  constructor(host: Host, options: WebMcpControllerOptions<Host>) {
    this.host = host;
    this.options = options;
    host.addController(this);
  }

  hostConnected(): void {
    this.#connected = true;
    this.#sync();
  }

  hostUpdated(): void {
    this.#sync();
  }

  hostDisconnected(): void {
    this.#connected = false;
    this.#sync();
  }

  #sync(): void {
    if (!this.#connected || !this.options.enabled()) {
      this.#leave?.();
      return;
    }
    if (this.#leave) {
      return;
    }
    const { ownerDocument, localName } = this.options.element ? this.options.element() : this.host;
    const context = (ownerDocument as Document & { modelContext?: ModelContext }).modelContext;
    if (!context) {
      return;
    }

    const registration = new AbortController();
    const candidate: Candidate = {
      start: () => {
        void this.#register(context, localName, registration.signal).catch((error: unknown) => {
          if (!registration.signal.aborted) {
            this.#leave?.();
            queueMicrotask(() => {
              throw error;
            });
          }
        });
      },
      abort: () => registration.abort(),
    };
    this.#leave = () => {
      this.#leave = undefined;
      leaveQueue(ownerDocument, localName, candidate);
    };
    joinQueue(ownerDocument, localName, candidate);
  }

  async #register(context: ModelContext, tag: string, signal: AbortSignal): Promise<void> {
    await this.host.updateComplete;
    if (signal.aborted || !this.options.enabled()) {
      return;
    }
    const tools = await (this.options.tools ? this.options.tools(this.host) : getDecoratedTools(this.host));
    if (signal.aborted || !this.options.enabled()) {
      return;
    }
    await Promise.all(
      tools.map(({ name, execute, ...metadata }) =>
        context.registerTool(
          {
            ...metadata,
            name: `${tag}.${name}`,
            execute: async (input, options) => {
              signal.throwIfAborted();
              const executionSignal = options?.signal ? AbortSignal.any([signal, options.signal]) : signal;
              executionSignal.throwIfAborted();
              const result = await execute(this.host, input, { signal: executionSignal });
              executionSignal.throwIfAborted();
              return result;
            },
          },
          { signal },
        ),
      ),
    );
  }
}

function joinQueue(document: Document, tag: string, candidate: Candidate): void {
  let tags = registrations.get(document);
  if (!tags) {
    tags = new Map();
    registrations.set(document, tags);
  }
  let queue = tags.get(tag);
  if (!queue) {
    queue = new Set();
    tags.set(tag, queue);
  }
  queue.add(candidate);
  if (queue.size === 1) {
    candidate.start();
  }
}

function leaveQueue(document: Document, tag: string, candidate: Candidate): void {
  const tags = registrations.get(document)!;
  const queue = tags.get(tag)!;
  const wasFirst = queue.values().next().value === candidate;
  queue.delete(candidate);
  candidate.abort();
  if (queue.size === 0) {
    tags.delete(tag);
  } else if (wasFirst) {
    queue.values().next().value!.start();
  }
}
