// @ts-strict-ignore
import { LitElement, property, createEvent, h, JsxNode } from "@arcgis/lumina";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { MAX_COLUMNS } from "../list-item/resources";
import { Scale } from "../interfaces";
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
   * @private
   */
  @property({ reflect: true }) filterHidden = false;

  /** The header text for all nested `calcite-list-item` rows. */
  @property({ reflect: true }) heading: string;

  /**
   * Specifies the size of the component.
   *
   * @internal
   * */
  @property({ reflect: true }) scale: Scale = "m";

  @property() textTruncation: { heading: "wrap" | "truncate" | "clip" } = { heading: "clip" };

  // #endregion

  // #region Events

  /**
   * Fires when changes occur in the default slot, notifying parent lists of the changes.
   *
   * @private
   */
  calciteInternalListItemGroupDefaultSlotChange = createEvent({ cancelable: false });

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

  private setHeadingElement(el: HTMLDivElement): void {
    if (el) {
      const headingStyle = this.textTruncation.heading;
      el.style.textOverflow = headingStyle === "truncate" ? "ellipsis" : "clip";
      el.style.whiteSpace = headingStyle === "wrap" ? "wrap" : "nowrap";
      el.style.overflow = headingStyle === "wrap" ? "visible" : "hidden";
    }
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { disabled, heading } = this;
    return (
      <InteractiveContainer disabled={disabled}>
        <div class={CSS.container} role="row">
          <div
            ariaColSpan={MAX_COLUMNS}
            class={CSS.heading}
            ref={this.setHeadingElement}
            role="cell"
          >
            {heading}
          </div>
        </div>
        <slot onSlotChange={this.handleDefaultSlotChange} />
      </InteractiveContainer>
    );
  }

  // #endregion
}
