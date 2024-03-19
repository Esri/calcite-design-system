import { Component, Element, h, Prop, VNode } from "@stencil/core";
import { guid } from "../../utils/guid";
import { ComboboxChildElement } from "../combobox/interfaces";
import { getAncestors, getDepth } from "../combobox/utils";
import { Scale } from "../interfaces";
import { CSS } from "./resources";

/**
 * @slot - A slot for adding `calcite-combobox-item`s.
 */
@Component({
  tag: "calcite-combobox-item-group",
  styleUrl: "combobox-item-group.scss",
  shadow: true,
})
export class ComboboxItemGroup {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, signifies that the group comes after another group without any children (items or sub-groups), otherwise indicates that the group comes after another group that has children. Used for styling.
   *
   * @internal
   */
  @Prop({ reflect: true }) afterEmptyGroup = false;

  /** Specifies the parent and grandparent `calcite-combobox-item`s, which are set on `calcite-combobox`. */
  @Prop({ mutable: true }) ancestors: ComboboxChildElement[];

  /** Specifies the title of the component. */
  @Prop() label!: string;

  /**
   * Specifies the size of the component inherited from the `calcite-combobox`, defaults to `m`.
   *
   * @internal
   */
  @Prop() scale: Scale = "m";

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.ancestors = getAncestors(this.el);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteComboboxItemGroupElement;

  guid: string = guid();

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { el, scale } = this;
    const depth = getDepth(el);

    return (
      <ul
        aria-labelledby={this.guid}
        class={{ [CSS.list]: true, [`scale--${scale}`]: true }}
        role="group"
      >
        <li
          class={{ [CSS.label]: true }}
          id={this.guid}
          role="presentation"
          style={{ "--calcite-internal-combobox-item-group-depth": `${depth}` }}
        >
          <span class={CSS.title}>{this.label}</span>
        </li>
        <slot />
      </ul>
    );
  }
}
