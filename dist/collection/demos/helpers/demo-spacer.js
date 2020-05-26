class DemoSpacer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = `
          <style>
            :host {
              display: grid;
              grid-template-columns: 1fr;
              grid-gap: 12px;
            }
          </style>
          <slot></slot>
        `;
  }
}
customElements.define("demo-spacer", DemoSpacer);