// @ts-strict-ignore
import { LitElement, property, Fragment, h, state, JsxNode } from "@arcgis/lumina";
import { Position, Scale } from "../interfaces";
import { slotChangeGetAssignedElements } from "../../utils/dom";
import { logger } from "../../utils/logger";
import type { ActionBar } from "../action-bar/action-bar";
import { CSS, SLOTS } from "./resources";
import { styles } from "./shell-center-row.scss";

declare global {
  interface DeclareElements {
    "calcite-shell-center-row": ShellCenterRow;
  }
}

/**
 * @deprecated Use the `calcite-shell-panel` component instead.
 * @slot - A slot for adding content to the `calcite-shell-panel`.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the `calcite-shell-panel`.
 */
export class ShellCenterRow extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region State Properties

  @state() actionBar: ActionBar["el"];

  // #endregion

  // #region Public Properties

  /** When `true`, the content area displays like a floating panel. */
  @property({ reflect: true }) detached = false;

  /** Specifies the maximum height of the component. */
  @property({ reflect: true }) heightScale: Scale = "s";

  /** Specifies the component's position. Will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) position: Extract<"start" | "end", Position> = "end";

  // #endregion

  // #region Lifecycle

  load(): void {
    logger.deprecated("component", {
      name: "shell-center-row",
      removalVersion: 4,
      suggested: "shell-panel",
    });
  }

  loaded(): void {
    if (this.actionBar?.position === "end") {
      this.requestUpdate();
    }
  }

  // #endregion

  // #region Private Methods

  private handleActionBarSlotChange(event: Event): void {
    this.actionBar = slotChangeGetAssignedElements(event).filter((el): el is ActionBar["el"] =>
      el.matches("calcite-action-bar"),
    )[0];
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { actionBar } = this;

    const contentNode = (
      <div class={CSS.content}>
        <slot />
      </div>
    );

    const actionBarNode = (
      <div class={CSS.actionBarContainer} hidden={!this.actionBar} key="action-bar">
        <slot name={SLOTS.actionBar} onSlotChange={this.handleActionBarSlotChange} />
      </div>
    );

    const children: JsxNode[] = [actionBarNode, contentNode];

    if (actionBar?.position === "end") {
      children.reverse();
    }

    return <>{children}</>;
  }

  // #endregion
}
