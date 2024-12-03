import type { FlowItem } from "../flow-item/flow-item";

export type FlowDirection = "advancing" | "retreating" | "standby";

/**
 * Interface for defining the structure of a flow item.
 *
 * See the following examples for a custom flow item implementation:
 * https://github.com/Esri/calcite-design-system/blob/dev/packages/calcite-components/src/demos/flow.html
 * https://codepen.io/driskull/pen/gOVzLbx?editors=0010
 *
 * @example
 * class CustomFlowItem extends HTMLElement {
 *   constructor() {
 *     super();
 *     const shadow = this.attachShadow({ mode: "open" });
 *
 *     shadow.innerHTML = `
 *       <style>
 *         :host {
 *           display: none;
 *         }
 *         :host([selected]) {
 *           display:flex;
 *         }
 *
 *       </style>
 *       <calcite-flow-item id="internalFlowItem">
 *         <slot></slot>
 *       </calcite-flow-item>
 *     `;
 *
 *     this.flowItemEl = shadow.getElementById("internalFlowItem");
 *   }
 *
 *   connectedCallback() {
 *     this.flowItemEl.setAttribute("heading", this.getAttribute("heading"));
 *     this.flowItemEl.setAttribute(
 *       "description",
 *       this.getAttribute("description")
 *     );
 *     this.flowItemEl.setAttribute("scale", this.getAttribute("scale"));
 *     this.flowItemEl.setAttribute(
 *       "show-back-button",
 *       this.getAttribute("show-back-button")
 *     );
 *     this.flowItemEl.setAttribute("menu-open", this.getAttribute("menu-open"));
 *     this.flowItemEl.setAttribute("selected", this.getAttribute("selected"));
 *     this.selected = this.hasAttribute("selected");
 *     this.showBackButton = this.hasAttribute("show-back-button");
 *     this.menuOpen = this.hasAttribute("menu-open");
 *     this.heading = this.getAttribute("heading");
 *   }
 *
 *   get heading() {
 *     return this.getAttribute("heading");
 *   }
 *
 *   set heading(value) {
 *     this.flowItemEl.heading = value;
 *   }
 *
 *   get hidden() {
 *     return this.hasAttribute("hidden");
 *   }
 *
 *   set hidden(value) {
 *     this.toggleAttribute("hidden", value);
 *     this.flowItemEl.toggleAttribute("hidden", value);
 *   }
 *
 *   get selected() {
 *     return this.hasAttribute("selected");
 *   }
 *
 *   set selected(value) {
 *     this.toggleAttribute("selected", value);
 *     this.flowItemEl.toggleAttribute("selected", value);
 *   }
 *
 *   get menuOpen() {
 *     return this.hasAttribute("menu-open");
 *   }
 *
 *   set menuOpen(value) {
 *     this.toggleAttribute("menu-open", value);
 *     this.flowItemEl.menuOpen = value;
 *   }
 *
 *   get showBackButton() {
 *     return this.hasAttribute("show-back-button");
 *   }
 *
 *   set showBackButton(value) {
 *     this.toggleAttribute("show-back-button", value);
 *     this.flowItemEl.showBackButton = value;
 *   }
 *
 *   async beforeBack() {
 *     // no op
 *   }
 *
 *   async setFocus() {
 *     await this.flowItemEl.setFocus();
 *   }
 * }
 *
 * customElements.define("custom-flow-item", CustomFlowItem);
 */
export type FlowItemLike = Pick<FlowItem["el"], "beforeBack" | "menuOpen" | "setFocus" | "showBackButton" | "selected">;

export type FlowItemLikeElement = FlowItemLike & HTMLElement;
