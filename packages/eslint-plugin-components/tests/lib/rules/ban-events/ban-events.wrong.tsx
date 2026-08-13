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
    document.addEventListener("some-unsupported-event", this.handleDisallowedEvent);

    this.listen(window, "keypress", this.handleDisallowedEvent);
    this.listenOn(window, "keypress", this.handleDisallowedEvent);
  }

  disconnectedCallback(): void {
    document.removeEventListener("some-unsupported-event", this.handleDisallowedEvent);
  }

  handleDisallowedEvent(): void {}

  //#endregion
}
