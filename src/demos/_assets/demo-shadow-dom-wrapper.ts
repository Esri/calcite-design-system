type DomMode = "light" | "shadow";

/**
 * This component helps test existing components work when encapsulated in another component's shadow DOM.
 *
 * Demo pages should set this component as the root, under `<body>`
 *
 * Note:* due to style encapsulation, demo styles need to be a child of the component
 */
class DemoDomMover extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const slot = document.createElement("slot");
    shadow.append(slot);
    this._slot = slot;
  }

  private _slot: HTMLSlotElement;

  private _state: DomMode = "light";

  get state(): DomMode {
    return this._state;
  }

  set state(value: DomMode) {
    this._state = value;
  }

  /**
   * moves content between light and shadow DOM
   *
   * @param dom
   */
  moveTo(dom: DomMode): void {
    if (dom === "light") {
      this.append(...Array.from(this.shadowRoot.children).filter((node) => node !== this._slot));
      this._state = "light";
    } else {
      this.shadowRoot.append(...this.shadowRoot.querySelector("slot").assignedNodes());
      this._state = "shadow";
    }
  }
}

customElements.define("demo-dom-mover", DemoDomMover);
