// @ts-strict-ignore
import { LitElement, property, h, JsxNode } from "@arcgis/lumina";
import { logger } from "../../utils/logger";
import { styles } from "./tip-group.scss";

declare global {
  interface DeclareElements {
    "calcite-tip-group": TipGroup;
  }
}

/**
 * @deprecated Use the `calcite-carousel` and `calcite-carousel-item` components instead.
 * @slot - A slot for adding `calcite-tip`s.
 */
export class TipGroup extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /** The component header text for all nested `calcite-tip`s. */
  @property() groupTitle: string;

  // #endregion

  // #region Lifecycle

  load(): void {
    logger.deprecated("component", {
      name: "tip-group",
      removalVersion: 4,
      suggested: ["carousel", "carousel-item"],
    });
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    return <slot />;
  }

  // #endregion
}
