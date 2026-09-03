import { type RenderResult } from "@arcgis/lumina-compiler/testing";
import { type LitElement } from "@arcgis/lumina";

export type ComponentTag = keyof DeclareElements;

export interface TestSetUp<C extends LitElement = LitElement> {
  (): Promise<RenderResult<C>>;
}
