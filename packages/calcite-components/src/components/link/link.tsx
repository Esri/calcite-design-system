// @ts-strict-ignore
import { LitElement } from "@arcgis/lumina";

declare global {
  interface DeclareElements {
    "calcite-link": Link;
  }
}

export class Link extends LitElement {}
