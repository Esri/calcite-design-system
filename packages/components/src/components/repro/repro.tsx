/* eslint-disable no-console -- test logging */
import { LitElement, h, JsxNode } from "@arcgis/lumina";

declare global {
  interface DeclareElements {
    "calcite-repro": Repro;
  }
}

export class Repro extends LitElement {
  //#region Lifecycle

  override connectedCallback(): void {
    console.log("connected");
  }

  override disconnectedCallback(): void {
    console.log("disconnected");
    throw new Error("we are expecting this error");
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    return <div>👋😃</div>;
  }

  //#endregion
}
