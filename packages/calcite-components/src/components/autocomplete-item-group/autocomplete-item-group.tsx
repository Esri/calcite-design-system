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
   * When present, signifies that the group should not have extra spacing. Used for styling.
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
   * Specifies the position of the group in the autocomplete menu.
   *
   * @internal
   */
  @property() position: number = 0;

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
    const autocompleteSeparator =
      this.position > 0 ? <div class={CSS.separator} role="separator" /> : null;
    return (
      <div
        aria-label={this.label ?? this.heading}
        class={{
          [CSS.container]: true,
          [CSS.containerNoSpacing]: this.disableSpacing,
          [CSS.scale(scale)]: true,
        }}
        role="group"
      >
        {autocompleteSeparator}
        <div class={{ [CSS.heading]: true, [CSS.firstTitle]: this.position === 0 }}>
          {this.heading}
        </div>
        <slot />
      </div>
    );
  }

  //#endregion
}
