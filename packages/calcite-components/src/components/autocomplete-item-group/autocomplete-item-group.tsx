// @ts-strict-ignore
import { LitElement, property, h, JsxNode } from "@arcgis/lumina";
import { Scale } from "../interfaces";
import { CSS } from "./resources";
import { styles } from "./autocomplete-item-group.scss";

declare global {
  interface DeclareElements {
    "calcite-autocomplete-item-group": AutocompleteItemGroup;
  }
}

/** @slot - A slot for adding `calcite-autocomplete-item`s. */
export class AutocompleteItemGroup extends LitElement {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Public Properties

  /**
   * When `true`, signifies that the group should not have extra spacing. Used for styling.
   *
   * @private
   */
  @property() disableSpacing = false;

  /**
   * Specifies heading text for the component.
   *
   * @required
   */
  @property() heading: string;

  /** Accessible name for the component. */
  @property() label: any;

  /**
   * Specifies the size of the component inherited from the `calcite-autocomplete`, defaults to `m`.
   *
   * @private
   */
  @property() scale: Scale = "m";

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { scale } = this;
    return (
      <div
        aria-label={this.label ?? this.heading}
        class={{
          [CSS.container]: true,
          [CSS.containerNoSpacing]: this.disableSpacing,
          [`scale--${scale}`]: true,
        }}
        role="group"
      >
        <div class={CSS.heading} role="presentation">
          {this.heading}
        </div>
        <slot />
      </div>
    );
  }

  //#endregion
}
