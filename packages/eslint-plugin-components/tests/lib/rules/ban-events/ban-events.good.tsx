// @ts-nocheck
import { LitElement, h } from "@arcgis/lumina";

declare global {
  interface DeclareElements {
    "calcite-test-component": TestComponent;
  }
}

export class TestComponent extends LitElement {
  //#region Private Methods

  connectedCallback(): void {
    document.addEventListener("click", this.handleAllowedEvent);

    this.listen(window, "keydown", this.handleAllowedEvent);
    this.listenOn(window, "keydown", this.handleAllowedEvent);
  }

  disconnectedCallback(): void {
    document.removeEventListener("click", this.handleAllowedEvent);
  }

  handleAllowedEvent(): void {}

  //#endregion
}
