import { LitElement, property, h, JsxNode } from "@arcgis/lumina";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { logger } from "../../utils/logger";
import { TileSelectGroupLayout } from "./interfaces";
import { styles } from "./tile-select-group.scss";

declare global {
  interface DeclareElements {
    "calcite-tile-select-group": TileSelectGroup;
  }
}

/**
 * @deprecated Use the `calcite-tile-group` component instead.
 * @slot - A slot for adding `calcite-tile-select` elements.
 */
export class TileSelectGroup extends LitElement implements InteractiveComponent {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /** When present, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /**
   * Defines the layout of the component.
   *
   * Use `"horizontal"` for rows, and `"vertical"` for a single column.
   */
  @property({ reflect: true }) layout: TileSelectGroupLayout = "horizontal";

  // #endregion

  // #region Lifecycle

  load(): void {
    logger.deprecated("component", {
      name: "tile-select-group",
      removalVersion: 4,
      suggested: ["tile", "tile-group"],
    });
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return (
      <InteractiveContainer disabled={this.disabled}>
        <slot />
      </InteractiveContainer>
    );
  }

  // #endregion
}
