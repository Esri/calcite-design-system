// @ts-nocheck
import { LitElement, h, property } from "@arcgis/lumina";

declare global {
  interface DeclareElements {
    "calcite-test-component": TestComponent;
  }
}

export class TestComponent extends LitElement {
  //#region Public Properties

  @property() aBoolean: boolean = true;

  //#endregion
}
