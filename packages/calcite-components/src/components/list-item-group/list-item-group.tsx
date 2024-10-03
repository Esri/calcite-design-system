import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { MAX_COLUMNS } from "../list-item/resources";
import { CSS } from "./resources";
import { styles } from "./list-item-group.scss";

declare global {
  interface DeclareElements {
    "calcite-list-item-group": ListItemGroup;
  }
}
/** @slot - A slot for adding `calcite-list-item` and `calcite-list-item-group` elements. */
export class ListItemGroup extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Hides the component when filtered.
   *
   * @notPublic
   */
  @property({ reflect: true }) filterHidden = false;

  /** The header text for all nested `calcite-list-item` rows. */
  @property({ reflect: true }) heading: string;

  // #endregion

  // #region Events

  /** Fires when changes occur in the default slot, notifying parent lists of the changes. */
  calciteInternalListItemGroupDefaultSlotChange = createEvent<void>({ cancelable: false });

  // #endregion

  // #region Lifecycle

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Private Methods

  private handleDefaultSlotChange(): void {
    this.calciteInternalListItemGroupDefaultSlotChange.emit();
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { disabled, heading } = this;
    return (
      <InteractiveContainer disabled={disabled}>
        <tr class={CSS.container}>
          <td class={CSS.heading} colSpan={MAX_COLUMNS}>
            {heading}
          </td>
        </tr>
        <slot onSlotChange={this.handleDefaultSlotChange} />
      </InteractiveContainer>
    );
  }

  // #endregion
}
