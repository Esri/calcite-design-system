import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import { MAX_COLUMNS } from "../list-item/resources";
import { Scale } from "../types";
import { useInteractive } from "../../controllers/useInteractive";
import { CSS } from "./resources";
import { styles } from "./list-item-group.scss";

declare global {
  interface DeclareElements {
    "calcite-list-item-group": ListItemGroup;
  }
}

declare module "@arcgis/lumina" {
  interface DeclareCssProperties {
    /**
     * Specifies the component's background color.
     */
    "--calcite-list-background-color": "*";
    /**
     * Specifies the component's color.
     */
    "--calcite-list-color": "*";
  }
}

interface ListItemGroupSlots {
  /**
   * A slot for adding `calcite-list-item` and `calcite-list-item-group` elements.
   */
  "": Node[];
}
export class ListItemGroup extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  override ["@slots"]!: ListItemGroupSlots;

  private interactiveContainer = useInteractive(this);

  //#endregion

  //#region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Hides the component when filtered.
   *
   * @private
   */
  @property({ reflect: true }) filterHidden = false;

  /** @copyDoc */
  @property({ reflect: true }) heading?: string;

  /**
   * Specifies the size of the component.
   *
   * @internal
   * */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Events

  /**
   * Fires when group property changes should notify parent lists.
   *
   * @private
   */
  calciteInternalListItemGroupChange = createEvent({ cancelable: false });

  /**
   * Fires when changes occur in the default slot, notifying parent lists of the changes.
   *
   * @private
   */
  calciteInternalListItemGroupDefaultSlotChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    if (changes.has("heading")) {
      this.calciteInternalListItemGroupChange.emit();
    }
  }

  //#endregion

  //#region Private Methods

  private handleDefaultSlotChange(): void {
    this.calciteInternalListItemGroupDefaultSlotChange.emit();
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { disabled, heading } = this;
    return (
      <this.interactiveContainer disabled={disabled}>
        <div class={CSS.container} role="row">
          <div ariaColSpan={MAX_COLUMNS} class={CSS.heading} role="cell">
            {heading}
          </div>
        </div>
        <slot onSlotChange={this.handleDefaultSlotChange} />
      </this.interactiveContainer>
    );
  }

  //#endregion
}
