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
   * @deprecated Removal target v5. Use `anotherProperty` instead.
   */
  @property() aProperty: boolean = false;

  //#endregion
}
