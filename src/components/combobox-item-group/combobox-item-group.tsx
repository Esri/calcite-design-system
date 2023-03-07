import { Component, Element, h, Prop, VNode } from "@stencil/core";
import { getElementProp } from "../../utils/dom";
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
  shadow: true
})
export class ComboboxItemGroup {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** Specifies the parent and grandparent `calcite-combobox-item`s, which are set on `calcite-combobox`. */
  @Prop({ mutable: true }) ancestors: ComboboxChildElement[];

  /** Specifies the title of the component. */
  @Prop() label!: string;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    this.ancestors = getAncestors(this.el);
    this.scale = getElementProp(this.el, "scale", this.scale);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteComboboxItemGroupElement;

  guid: string = guid();

  scale: Scale = "m";

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const { el, scale } = this;
    const indent = `${CSS.label}--indent-${getDepth(el)}`;

    return (
      <ul
        aria-labelledby={this.guid}
        class={{ [CSS.list]: true, [`scale--${scale}`]: true }}
        role="group"
      >
        <li class={{ [CSS.label]: true, [indent]: true }} id={this.guid} role="presentation">
          <span class={CSS.title}>{this.label}</span>
        </li>
        <slot />
      </ul>
    );
  }
}
