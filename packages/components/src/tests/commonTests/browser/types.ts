import { type RenderResult } from "@arcgis/lumina-compiler/testing";
import { type LitElement } from "@arcgis/lumina";

export interface TestSetup<C extends LitElement = LitElement> {
  (): Promise<RenderResult<C>>;
}
