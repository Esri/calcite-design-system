// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import { createObserver } from "../../utils/observers";
import { styles } from "./option.scss";

declare global {
  interface DeclareElements {
    "calcite-option": Option;
  }
}

export class Option extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private internallySetLabel: string;

  private internallySetValue: any;

  private mutationObserver: MutationObserver = createObserver("mutation", () => {
    this.ensureTextContentDependentProps();
    this.calciteInternalOptionChange.emit();
  });

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({
    reflect: true,
  })
  disabled = false;

  /** Accessible name for the component. */
  @property() label: string;

  /** When `true`, the component is selected. */
  @property({
    reflect: true,
  })
  selected: boolean;

  /** The component's value. */
  @property() value: any;

  // #endregion

  // #region Events

  /** @private */

  private calciteInternalOptionChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.ensureTextContentDependentProps();
    this.mutationObserver?.observe(this.el, {
      attributeFilter: ["label", "value"],
      characterData: true,
      childList: true,
      subtree: true,
    });
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) {
      this.handlePropChange(this.disabled, changes.get("disabled"), "disabled");
    }

    if (changes.has("label")) {
      this.handlePropChange(this.label, changes.get("label"), "label");
    }

    if (changes.has("selected")) {
      this.handlePropChange(this.selected, changes.get("selected"), "selected");
    }

    if (changes.has("value")) {
      this.handlePropChange(this.value, changes.get("value"), "value");
    }
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods

  protected handlePropChange(_newValue: any, _oldValue: any, propName: string): void {
    if (propName === "label" || propName === "value") {
      this.ensureTextContentDependentProps();
    }

    this.calciteInternalOptionChange.emit();
  }

  private ensureTextContentDependentProps(): void {
    const {
      el: { textContent },
      internallySetLabel,
      internallySetValue,
      label,
      value,
    } = this;

    if (!label || label === internallySetLabel) {
      this.label = textContent;
      this.internallySetLabel = textContent;
    }

    if (
      value == null /* intentional loose equals to handle both undefined & null */ ||
      value === internallySetValue
    ) {
      this.value = textContent;
      this.internallySetValue = textContent;
    }
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return <slot>{this.label}</slot>;
  }

  // #endregion
}
