import type { JsonSchema, ToolAnnotations, ToolDefinition } from "./controller.js";

/** A method argument supplied by WebMCP rather than by the caller's JSON input. */
export type ToolSignalParameter = { signal: true | string };

/** Metadata for a method or property exposed with `@tool`. */
export interface ToolOptions {
  description?: string;
  annotations?: ToolAnnotations;
  /** The value schema for a property. */
  schema?: JsonSchema;
  /** Overrides the property value schema for a setter that accepts a different type. */
  setSchema?: JsonSchema;
  /** Prevent generating a setter for a writable property. */
  readOnly?: boolean;
  /** Whether a property getter can return undefined. */
  optional?: boolean;
  /** The object schema for a method's named arguments. */
  inputSchema?: JsonSchema;
  /** The schema for a method's result, wrapped in `{ value }`. */
  outputSchema?: JsonSchema;
  /** Maps input object keys (or execution signals) to method arguments in order. */
  parameters?: readonly (string | ToolSignalParameter)[];
}

type ToolModule = { default: Readonly<Record<string, ToolOptions>> };
type StandardContext =
  | ClassAccessorDecoratorContext<object>
  | ClassFieldDecoratorContext<object>
  | ClassGetterDecoratorContext<object>
  | ClassMethodDecoratorContext<object>;

interface ToolDecorator {
  (target: object, name: string | symbol, descriptor?: PropertyDescriptor): void;
  (value: unknown, context: StandardContext): void;
}

interface Member {
  method: boolean;
  options: ToolOptions;
  generated: [] | [load: () => Promise<ToolModule>, key: string];
}

const decorated = new WeakMap<object, Map<string, Member>>();
const emptyObject = objectSchema({});

/** Exposes an existing instance property or method. A build integration can fill in omitted metadata. */
export function tool(options?: ToolOptions): ToolDecorator;
export function tool(options: ToolOptions = {}, ...generated: Member["generated"]): ToolDecorator {
  return (target: unknown, nameOrContext: string | symbol | StandardContext, descriptor?: PropertyDescriptor): void => {
    if (typeof nameOrContext === "object") {
      const { name, kind } = nameOrContext;
      if (nameOrContext.static || nameOrContext.private || typeof name !== "string") {
        throw new TypeError("@tool requires a named public instance member.");
      }
      nameOrContext.addInitializer(function (this: object) {
        mark(this, name, { method: kind === "method", options, generated });
      });
    } else {
      if (typeof target !== "object" || target === null || typeof nameOrContext !== "string") {
        throw new TypeError("@tool requires a named public instance member.");
      }
      mark(target, nameOrContext, { method: typeof descriptor?.value === "function", options, generated });
    }
  };
}

export async function getDecoratedTools<Host extends HTMLElement>(host: Host): Promise<ToolDefinition<Host>[]> {
  const members = new Map<string, Member>();
  for (let target: object | null = host; target; target = Object.getPrototypeOf(target)) {
    for (const [name, member] of decorated.get(target) ?? []) {
      if (!members.has(name)) {
        members.set(name, member);
      }
    }
  }
  const definitions = await Promise.all(
    Array.from(members, async ([name, { method, options, generated }]) => {
      const metadata = generated.length ? (await generated[0]()).default[generated[1]] : undefined;
      return defineMember(host, name, method, { ...metadata, ...options });
    }),
  );
  return definitions.flat();
}

function mark(target: object, name: string, member: Member): void {
  let members = decorated.get(target);
  if (!members) {
    members = new Map();
    decorated.set(target, members);
  }
  members.set(name, member);
}

function defineMember<Host extends HTMLElement>(
  host: Host,
  name: string,
  method: boolean,
  options: ToolOptions,
): ToolDefinition<Host>[] {
  const { description, annotations, schema, optional, inputSchema, outputSchema, parameters } = options;
  const missingMetadata = () =>
    new Error(`${host.localName}.${name} needs explicit @tool metadata or the WebMCP build integration.`);
  if (!description) {
    throw missingMetadata();
  }
  if (method) {
    if (!inputSchema || !parameters) {
      throw missingMetadata();
    }
    return [
      {
        name,
        description,
        inputSchema,
        ...(annotations && { annotations }),
        ...(outputSchema && { outputSchema }),
        execute: async (element, input, { signal }) => {
          const args = parameters.map((parameter) =>
            typeof parameter === "string"
              ? input[parameter]
              : parameter.signal === true
                ? signal
                : { ...(input[parameter.signal] as object), signal },
          );
          const method = Reflect.get(element, name);
          if (typeof method !== "function") {
            throw new TypeError(`${name} is not a method.`);
          }
          return wrapResult(await Reflect.apply(method, element, args));
        },
      },
    ];
  }

  if (!schema) {
    throw missingMetadata();
  }
  const descriptor = findDescriptor(host, name);
  const tools: ToolDefinition<Host>[] = [
    {
      name: `get.${name}`,
      description: `Get ${name}. ${description}`,
      inputSchema: emptyObject,
      outputSchema: objectSchema({ value: schema }, optional ? [] : ["value"]),
      annotations: { ...annotations, readOnlyHint: true },
      execute: (element) => wrapResult(Reflect.get(element, name)),
    },
  ];
  if (!options.readOnly && (descriptor?.get ? descriptor.set : descriptor?.writable !== false)) {
    tools.push({
      name: `set.${name}`,
      description: `Set ${name}. ${description}`,
      inputSchema: objectSchema({ value: options.setSchema ?? schema }),
      outputSchema: emptyObject,
      annotations: { ...annotations, readOnlyHint: false },
      execute: (element, { value }) => {
        if (!Reflect.set(element, name, value)) {
          throw new TypeError(`Cannot set ${name}.`);
        }
        return {};
      },
    });
  }
  return tools;
}

function findDescriptor(target: object, name: string): PropertyDescriptor | undefined {
  for (let current: object | null = target; current; current = Object.getPrototypeOf(current)) {
    const descriptor = Object.getOwnPropertyDescriptor(current, name);
    if (descriptor) {
      return descriptor;
    }
  }
  return undefined;
}

function wrapResult(value: unknown): { value?: unknown } {
  return value === undefined ? {} : { value };
}

export function objectSchema(properties: Record<string, JsonSchema>, required = Object.keys(properties)): JsonSchema {
  return { type: "object", properties, required, additionalProperties: false };
}
