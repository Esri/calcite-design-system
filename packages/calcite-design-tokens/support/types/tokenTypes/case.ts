export enum TypeCase {
  CAMEL = "camel",
  PASCAL = "pascal",
  SNAKE = "snake",
  KEBAB = "kebab",
  CONSTANT = "constant",
}

export type TypeCaseUnion = `${TypeCase}`;
