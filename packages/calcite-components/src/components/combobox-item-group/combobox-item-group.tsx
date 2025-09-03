// @ts-strict-ignore
import { LitElement, property, h, JsxNode } from "@arcgis/lumina";
import { guid } from "../../utils/guid";
import { ComboboxChildElement } from "../combobox/interfaces";
import { getAncestors, getDepth } from "../combobox/utils";
import { Scale } from "../interfaces";
import { CSS } from "./resources";
import { styles } from "./combobox-item-group.scss";

declare global {
  interface DeclareElements {
    "calcite-combobox-item-group": ComboboxItemGroup;
  }
}

/** @slot - A slot for adding `calcite-combobox-item`s. */
export class ComboboxItemGroup extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private guid: string = guid();

  // #endregion

  // #region Public Properties

  /**
   * When present, signifies that the group comes after another group without any children (items or sub-groups), otherwise indicates that the group comes after another group that has children. Used for styling.
   *
   * @private
   */
  @property({ reflect: true }) afterEmptyGroup = false;

  /** Specifies the parent and grandparent `calcite-combobox-item`s, which are set on `calcite-combobox`. */
  @property() ancestors: ComboboxChildElement[];

  /**
   * Specifies the title of the component.
   *
   * @required
   */
  @property() label: string;

  /**
   * Specifies the size of the component inherited from the `calcite-combobox`, defaults to `m`.
   *
   * @private
   */
  @property() scale: Scale = "m";

  /**
   * When present, the item will be hidden
   *
   * @private
   *  */
  @property({ reflect: true }) itemHidden = false;

  // #endregion

  // #region Lifecycle

  override connectedCallback(): void {
    this.ancestors = getAncestors(this.el);
  }

  // #endregion

  // #region Rendering

  override render(): JsxNode {
    const { el, scale } = this;
    const depth = getDepth(el);

    return (
      <ul
        aria-labelledby={this.guid}
        class={{ [CSS.list]: true, [CSS.scale(scale)]: true }}
        role="group"
      >
        <li
          class={{ [CSS.label]: true }}
          id={this.guid}
          role="presentation"
          style={{ "--calcite-combobox-item-spacing-indent-multiplier": `${depth}` }}
        >
          <span class={CSS.title}>{this.label}</span>
        </li>
        <slot />
      </ul>
    );
  }

  // #endregion
}
