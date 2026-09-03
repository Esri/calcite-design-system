import { type RenderResult } from "@arcgis/lumina-compiler/testing";
import { type LitElement } from "@arcgis/lumina";

export interface TestSetUp<C extends LitElement = LitElement> {
  (): Promise<RenderResult<C>>;
}
