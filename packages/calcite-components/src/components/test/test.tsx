import { h, LitElement, JsxNode } from "@arcgis/lumina";

declare global {
  interface DeclareElements {
    "calcite-test": Test;
  }
}

export class Test extends LitElement {
  internalEl!: HTMLDivElement;

  private setInternalEl(el: HTMLDivElement): void {
    this.internalEl = el;
    console.log("[ref callback]::setInternalEl", el);
  }

  override connectedCallback(): void {
    console.log("[connectedCallback()]");
  }

  load(): void {
    console.log("[load()]");
  }

  override firstUpdated(): void {
    console.log("[firstUpdated()]::internalEl:", this.internalEl);
  }

  override updated(): void {
    console.log("[updated()]::internalEl:", this.internalEl);
  }

  loaded(): void {
    console.log("[loaded()]");
  }

  override disconnectedCallback(): void {
    console.log("[disconnectedCallback()]");
  }

  override render(): JsxNode {
    console.log("[render()]");
    return <div ref={this.setInternalEl} />;
  }
}
