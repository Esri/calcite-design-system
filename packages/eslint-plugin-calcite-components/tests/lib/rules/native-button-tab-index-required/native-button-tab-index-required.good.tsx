// @ts-nocheck
import { LitElement, h, property } from "@arcgis/lumina";

declare global {
  interface DeclareElements {
    "calcite-test-component": TestComponent;
  }
}

export class TestComponent extends LitElement {
  render() {
    return (
      <div>
        <button tabIndex="0">Click me</button>
      </div>
    );
  }
}
