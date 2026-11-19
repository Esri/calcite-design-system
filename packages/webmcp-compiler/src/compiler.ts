import ts from "typescript";
import type { JsonSchema } from "@lit-labs/webmcp/controller.js";
import { objectSchema, type ToolOptions, type ToolSignalParameter } from "@lit-labs/webmcp/tool.js";

type ToolMember = ts.PropertyDeclaration | ts.GetAccessorDeclaration | ts.MethodDeclaration;

/** An annotated source member and the key used in its generated tool module. */
export interface ToolMarker {
  call: ts.CallExpression;
  member: ToolMember;
  key: string;
  options: ts.ObjectLiteralExpression | undefined;
}

export const toolModule = "@lit-labs/webmcp/tool.js";

/** Finds markers that require inference, without creating a semantic program. */
export function findInferredTools(file: ts.SourceFile): ToolMarker[] {
  const bindings = new Set<string>();
  for (const statement of file.statements) {
    if (
      !ts.isImportDeclaration(statement) ||
      !ts.isStringLiteral(statement.moduleSpecifier) ||
      statement.moduleSpecifier.text !== toolModule
    ) {
      continue;
    }
    const imports = statement.importClause?.namedBindings;
    if (imports && ts.isNamedImports(imports)) {
      for (const binding of imports.elements) {
        if ((binding.propertyName ?? binding.name).text === "tool") {
          bindings.add(binding.name.text);
        }
      }
    }
  }
  if (!bindings.size) {
    return [];
  }

  const markers: ToolMarker[] = [];
  for (const statement of file.statements) {
    if (!ts.isClassDeclaration(statement)) {
      continue;
    }
    for (const member of statement.members) {
      if (!ts.canHaveDecorators(member)) {
        continue;
      }
      for (const { expression } of ts.getDecorators(member) ?? []) {
        if (!ts.isCallExpression(expression) || !ts.isIdentifier(expression.expression)) {
          continue;
        }
        if (!bindings.has(expression.expression.text)) {
          continue;
        }
        const options = expression.arguments[0];
        if (expression.arguments.length > 1 || (options && !ts.isObjectLiteralExpression(options))) {
          continue;
        }
        if (
          !statement.name ||
          !(
            ts.isPropertyDeclaration(member) ||
            ts.isGetAccessorDeclaration(member) ||
            ts.isMethodDeclaration(member)
          ) ||
          !ts.isIdentifier(member.name) ||
          ts
            .getModifiers(member)
            ?.some(({ kind }) =>
              [ts.SyntaxKind.PrivateKeyword, ts.SyntaxKind.ProtectedKeyword, ts.SyntaxKind.StaticKeyword].includes(
                kind,
              ),
            )
        ) {
          throw new Error(`${file.fileName}: @tool requires a named public instance member of a named class.`);
        }
        const marker = { call: expression, member, key: `${statement.name.text}.${member.name.text}`, options };
        if (
          !hasOption(marker, "description") ||
          (ts.isMethodDeclaration(member)
            ? !hasOption(marker, "parameters") || !hasOption(marker, "inputSchema")
            : !hasOption(marker, "schema"))
        ) {
          markers.push(marker);
        }
      }
    }
  }
  return markers;
}

/** Extracts JSON-compatible tool metadata using the caller's TypeScript program. */
export function generateToolMetadata(
  program: ts.Program,
  fileName: string,
  getDescription?: (member: ToolMember) => string | undefined,
): Record<string, ToolOptions> {
  const file = program.getSourceFile(fileName);
  if (!file) {
    throw new Error(`${fileName} is not in the TypeScript project used for WebMCP inference.`);
  }
  const checker = program.getTypeChecker();
  return Object.fromEntries(
    findInferredTools(file).map((marker) => {
      try {
        const { member } = marker;
        const description = hasOption(marker, "description")
          ? undefined
          : getDescription?.(member) || documentation(checker, checker.getSymbolAtLocation(member.name));
        if (!description && !hasOption(marker, "description")) {
          throw new Error("Add a JSDoc description or supply an explicit description.");
        }
        const metadata = ts.isMethodDeclaration(member)
          ? describeMethod(checker, marker, member)
          : describeProperty(checker, marker, member);
        return [marker.key, { ...(description && { description }), ...metadata }];
      } catch (error) {
        const { line } = file.getLineAndCharacterOfPosition(marker.call.getStart(file));
        throw new Error(`${fileName}:${line + 1}: @tool ${marker.key}: ${String(error)}`, { cause: error });
      }
    }),
  );
}

function describeMethod(checker: ts.TypeChecker, marker: ToolMarker, method: ts.MethodDeclaration): ToolOptions {
  if (
    checker.getTypeAtLocation(method.name).getCallSignatures().length !== 1 ||
    method.typeParameters?.length ||
    method.parameters.some((parameter) => parameter.dotDotDotToken || !ts.isIdentifier(parameter.name))
  ) {
    throw new Error("Inferred methods must have a single non-generic signature with named, non-rest parameters.");
  }
  const properties: Record<string, JsonSchema> = Object.create(null);
  const required: string[] = [];
  const inferInput = !hasOption(marker, "inputSchema");
  const parameters = method.parameters.map((parameter): string | ToolSignalParameter => {
    const name = parameter.name.getText();
    const type = checker.getTypeAtLocation(parameter);
    if (isSignal(checker, type)) {
      return { signal: true };
    }
    if (inferInput) {
      const optional = Boolean(parameter.questionToken || parameter.initializer);
      properties[name] = describedSchema(checker, type, checker.getSymbolAtLocation(parameter.name), optional);
      if (!optional) {
        required.push(name);
      }
    }
    return name;
  });
  const metadata: ToolOptions = {};
  if (!hasOption(marker, "parameters")) {
    metadata.parameters = parameters;
  }
  if (inferInput) {
    metadata.inputSchema = objectSchema(properties, required);
  }
  if (!hasOption(marker, "outputSchema")) {
    const result = checker.getAwaitedType(
      checker.getReturnTypeOfSignature(checker.getSignatureFromDeclaration(method)!),
    );
    if (!result) {
      throw new Error("This return type requires an explicit output schema.");
    }
    const optional = canBeUndefined(result);
    metadata.outputSchema =
      result.flags & (ts.TypeFlags.Void | ts.TypeFlags.Undefined)
        ? objectSchema({})
        : objectSchema({ value: schemaFor(checker, result, optional) }, optional ? [] : ["value"]);
  }
  return metadata;
}

function describeProperty(
  checker: ts.TypeChecker,
  marker: ToolMarker,
  member: ts.PropertyDeclaration | ts.GetAccessorDeclaration,
): ToolOptions {
  const type = checker.getTypeAtLocation(member.name);
  const optional = canBeUndefined(type);
  const setter = checker.getSymbolAtLocation(member.name)?.declarations?.find(ts.isSetAccessorDeclaration);
  const readOnly = ts.isGetAccessorDeclaration(member)
    ? !setter
    : !!ts.getModifiers(member)?.some(({ kind }) => kind === ts.SyntaxKind.ReadonlyKeyword);
  const metadata: ToolOptions = { readOnly, optional };
  if (!hasOption(marker, "schema")) {
    metadata.schema = schemaFor(checker, type, optional);
    if (setter && !hasOption(marker, "setSchema")) {
      const [parameter] = setter.parameters;
      if (!parameter) {
        throw new Error("Tool setters must declare a parameter.");
      }
      metadata.setSchema = schemaFor(checker, checker.getTypeAtLocation(parameter));
    }
  }
  return metadata;
}

function schemaFor(checker: ts.TypeChecker, type: ts.Type, optional = false, stack = new Set<ts.Type>()): JsonSchema {
  const flags = type.flags;
  if (flags & ts.TypeFlags.String) return { type: "string" };
  if (flags & ts.TypeFlags.Number) return { type: "number" };
  if (flags & ts.TypeFlags.Boolean) return { type: "boolean" };
  if (flags & ts.TypeFlags.Null) return { type: "null" };
  if (type.isStringLiteral()) return { type: "string", const: type.value };
  if (type.isNumberLiteral()) return { type: "number", const: type.value };
  if (flags & ts.TypeFlags.BooleanLiteral) return { type: "boolean", const: checker.typeToString(type) === "true" };
  if (stack.has(type) || stack.size >= 20) {
    throw new Error(`Recursive or deeply nested type ${checker.typeToString(type)} requires an explicit schema.`);
  }
  const next = new Set(stack).add(type);
  if (type.isUnion()) {
    const parts = optional ? type.types.filter((part) => !canBeUndefined(part)) : type.types;
    const schemas = parts.map((part) => schemaFor(checker, part, false, next));
    const [first] = schemas;
    if (!first) {
      throw new Error(`Type ${checker.typeToString(type)} requires an explicit JSON schema.`);
    }
    return schemas.length === 1 ? first : { anyOf: schemas };
  }
  if (checker.isArrayType(type)) {
    return {
      type: "array",
      items: schemaFor(checker, checker.getIndexTypeOfType(type, ts.IndexKind.Number)!, false, next),
    };
  }
  if (
    flags & ts.TypeFlags.Object &&
    !type.isClass() &&
    !checker.isTupleType(type) &&
    !type.getCallSignatures().length &&
    !type.getConstructSignatures().length
  ) {
    const indexes = checker.getIndexInfosOfType(type);
    if (indexes.some(({ keyType }) => !(keyType.flags & ts.TypeFlags.String))) {
      throw new Error(`Non-string index in ${checker.typeToString(type)} requires an explicit schema.`);
    }
    const properties: Record<string, JsonSchema> = Object.create(null);
    const required: string[] = [];
    for (const property of type.getProperties()) {
      if (property.name.startsWith("__@")) {
        throw new Error(`Symbol-keyed property in ${checker.typeToString(type)} requires an explicit schema.`);
      }
      const optional = Boolean(property.flags & ts.SymbolFlags.Optional);
      properties[property.name] = describedSchema(checker, checker.getTypeOfSymbol(property), property, optional, next);
      if (!optional) {
        required.push(property.name);
      }
    }
    const schema = objectSchema(properties, required);
    const [index] = indexes;
    return index ? { ...schema, additionalProperties: schemaFor(checker, index.type, false, next) } : schema;
  }
  throw new Error(`Type ${checker.typeToString(type)} requires an explicit JSON schema.`);
}

function describedSchema(
  checker: ts.TypeChecker,
  type: ts.Type,
  symbol: ts.Symbol | undefined,
  optional: boolean,
  stack?: Set<ts.Type>,
): JsonSchema {
  const schema = schemaFor(checker, type, optional, stack);
  const description = documentation(checker, symbol);
  return description ? { ...schema, description } : schema;
}

function documentation(checker: ts.TypeChecker, symbol: ts.Symbol | undefined): string {
  return ts.displayPartsToString(symbol?.getDocumentationComment(checker));
}

function canBeUndefined(type: ts.Type): boolean {
  return (
    !!(type.flags & (ts.TypeFlags.Undefined | ts.TypeFlags.Void)) || (type.isUnion() && type.types.some(canBeUndefined))
  );
}

function isSignal(checker: ts.TypeChecker, type: ts.Type): boolean {
  const parts = (type.isUnion() ? type.types : [type]).filter((part) => !canBeUndefined(part));
  const signal = checker.resolveName("AbortSignal", undefined, ts.SymbolFlags.Type, false);
  return !!signal && parts.length === 1 && parts[0]?.symbol === signal;
}

function hasOption({ options }: ToolMarker, name: keyof ToolOptions): boolean {
  return (
    options?.properties.some(
      ({ name: key }) => key && (ts.isIdentifier(key) || ts.isStringLiteral(key)) && key.text === name,
    ) ?? false
  );
}
