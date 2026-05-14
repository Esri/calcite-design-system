import { html } from "../../../support/formatting";
import { DomSwapper } from "./demo-dom-swapper";

class DemoOptions extends HTMLElement {
  constructor() {
    super();
    const shadow: ShadowRoot = this.attachShadow({ mode: "open" });

    shadow.innerHTML = html`
      <link rel="stylesheet" href="/src/demos/_assets/demo-options.css" />
      <div class="demo-switches">
        <calcite-label class="demo-switches__label" layout="inline" scale="s">
          <calcite-switch scale="s" id="toggle-dir"></calcite-switch>
          RTL
        </calcite-label>
        <calcite-label class="demo-switches__label" layout="inline" scale="s">
          <calcite-switch scale="s" id="toggle-mode"></calcite-switch>
          Dark Mode
        </calcite-label>
        <calcite-label class="demo-switches__label" layout="inline" scale="s">
          <calcite-switch scale="s" id="toggle-dom"></calcite-switch>
          Shadowed
        </calcite-label>
      </div>
    `;
  }

  connectedCallback(): void {
    this.removeDuplicateHeadings();
    this.setHeadingFromTitle();
    this.addEventListeners();
  }

  disconnectedCallback(): void {
    this.removeEventListeners();
  }

  get toggleDirSwitch(): HTMLElement {
    return this.shadowRoot!.getElementById("toggle-dir")!;
  }

  get toggleModeSwitch(): HTMLElement {
    return this.shadowRoot!.getElementById("toggle-mode")!;
  }

  get toggleDomSwitch(): HTMLElement {
    return this.shadowRoot!.getElementById("toggle-dom")!;
  }

  get demoHeading(): HTMLElement {
    return this.shadowRoot!.getElementById("demo-heading")!;
  }

  removeDuplicateHeadings(): void {
    document.querySelectorAll("h1:not(#demo-heading)").forEach((heading: Element) => heading.remove());
  }

  setHeadingFromTitle(): void {
    if (this.demoHeading) {
      this.demoHeading.textContent = document.title;
    }
  }

  addEventListeners(): void {
    this.toggleDirSwitch.addEventListener("calciteSwitchChange", this.handleToggleDir);
    this.toggleModeSwitch.addEventListener("calciteSwitchChange", this.handleToggleMode);
    this.toggleDomSwitch.addEventListener("calciteSwitchChange", this.handleToggleDom);
  }

  removeEventListeners(): void {
    this.toggleDirSwitch?.removeEventListener("calciteSwitchChange", this.handleToggleDir);
    this.toggleModeSwitch?.removeEventListener("calciteSwitchChange", this.handleToggleMode);
    this.toggleDomSwitch?.removeEventListener("calciteSwitchChange", this.handleToggleDom);
  }

  handleToggleDir = (): void => {
    document.dir = document.dir === "rtl" ? "ltr" : "rtl";
  };

  handleToggleMode = (): void => {
    document.body.classList.toggle("calcite-mode-dark");
  };

  handleToggleDom = (event: Event): void => {
    const mover: DomSwapper | null = document.querySelector<DomSwapper>("demo-dom-swapper");
    if (!mover) {
      return;
    }

    const switchElement = event.currentTarget as HTMLInputElement;

    mover.moveTo(switchElement.checked ? "shadow" : "light");
  };
}

customElements.define("demo-options", DemoOptions);
