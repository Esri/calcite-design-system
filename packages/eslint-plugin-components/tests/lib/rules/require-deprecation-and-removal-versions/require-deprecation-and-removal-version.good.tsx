// @ts-nocheck
import { LitElement, h, property } from "@arcgis/lumina";

declare global {
  interface DeclareElements {
    "calcite-test-component": TestComponent;
  }
}

export class TestComponent extends LitElement {
  //#region Public Properties

  /**
   * A boolean property
   * @deprecated in v1.2.3, removal target v2.0.0 - Use `anotherProperty` instead.
   */
  @property() aProperty: boolean = false;

  //#endregion
}
