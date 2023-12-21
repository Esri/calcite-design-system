type DomContext = "light" | "shadow";

/**
 * This component helps test existing components work when encapsulated in another component's shadow DOM.
 *
 * Demo pages should set this component as the root, under `<body>`
 *
 * Note:* due to style encapsulation, demo styles need to be a child of the component
 */
class DomSwapper extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const slot = document.createElement("slot");
    shadow.append(slot);
    this._slot = slot;
  }

  private _headStyles: HTMLStyleElement[];

  private _slot: HTMLSlotElement;

  private _context: DomContext = "light";

  get context(): DomContext {
    return this._context;
  }

  set context(value: DomContext) {
    this._context = value;
  }

  /**
   * moves content between light and shadow DOM
   *
   * @param context
   */
  moveTo(context: DomContext): void {
    if (context === "light" && this.shadowRoot?.children) {
      this.append(...Array.from(this.shadowRoot.children).filter((node) => node !== this._slot));
      this._context = "light";
    } else {
      if (!this._headStyles) {
        this._headStyles = this.recreateDemoStyle();
      }
      const slot = this.shadowRoot?.querySelector("slot");
      slot && this.shadowRoot?.append(...this._headStyles, ...slot.assignedNodes());
      this._context = "shadow";
    }
  }

  private recreateDemoStyle(): HTMLStyleElement[] {
    return Array.from(document.querySelectorAll("head style:not([data-styles]), head link[rel=stylesheet]")).map(
      (style) => style.cloneNode(true) as HTMLStyleElement,
    );
  }
}

customElements.define("demo-dom-swapper", DomSwapper);
