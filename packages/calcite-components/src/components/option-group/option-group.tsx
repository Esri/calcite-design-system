import { PropertyValues } from "lit";
import { LitElement, property, createEvent, Fragment, h, JsxNode } from "@arcgis/lumina";
import { styles } from "./option-group.scss";

declare global {
  interface DeclareElements {
    "calcite-option-group": OptionGroup;
  }
}
/** @slot - A slot for adding `calcite-option`s. */
export class OptionGroup extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({
    reflect: true,
  })
  disabled = false;

  /**
   * Accessible name for the component.
   * TODO: [MIGRATION] This property was marked as required in your Stencil component. If you didn't mean it to be required, feel free to remove `@required` tag.
   * Otherwise, read the documentation about required properties: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-properties--docs#string-properties
   *
   * @required
   */
  @property() label: string;

  // #endregion

  // #region Events

  /** @private */

  private calciteInternalOptionGroupChange = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (
      (changes.has("disabled") && (this.hasUpdated || this.disabled !== false)) ||
      changes.has("label")
    ) {
      this.calciteInternalOptionGroupChange.emit();
    }
  }

  // #endregion
  // #region Private Methods
  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <>
        <div>{this.label}</div>
        <slot />
      </>
    );
  }

  // #endregion
}
