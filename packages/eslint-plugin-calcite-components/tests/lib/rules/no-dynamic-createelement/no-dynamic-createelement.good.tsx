// @ts-nocheck
import { LitElement, h, property } from "@arcgis/lumina";

declare global {
  interface DeclareElements {
    "calcite-test-component": TestComponent;
  }
}

export class TestComponent extends LitElement {
  //#region Public Properties

  @property() type: "one" | "two" = "one";

  //#endregion

  //#region Lifecycle

  createPart() {
    const child =
      this.type === "one"
        ? document.createElement("my-component-1")
        : document.createElement("my-component-2");
    this.el.append(child);
    this.internalEl = child;
  }

  //#endregion
}
