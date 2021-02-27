import { Component, Host, Prop, h, VNode, Element } from "@stencil/core";
import { CSS } from "./resources";
import { guid } from "../../utils/guid";
import { AncestorElement } from "../calcite-combobox/interfaces";

@Component({
  tag: "calcite-combobox-item-group",
  styleUrl: "./calcite-combobox-item-group.scss",
  shadow: true
})
export class CalciteComboboxItemGroup {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** Parent and grandparent combobox items, this is set internally for use from combobox */
  @Prop({ mutable: true }) anscestors: AncestorElement[];

  /** Title of the group */
  @Prop() label!: string;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentWillLoad(): void {
    const parent: AncestorElement = this.el.parentElement?.closest(
      "calcite-combobox-item-group, calcite-combobox-item"
    );
    const grandparent: AncestorElement = parent?.parentElement?.closest(
      "calcite-combobox-item-group, calcite-combobox-item"
    );
    this.anscestors = [parent, grandparent].filter((el) => el);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteComboboxItemGroupElement;

  /** Unique identifier, used for accessibility */
  guid: string = guid();

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    return (
      <Host>
        <ul aria-labelledby={this.guid} role="group">
          <li id={this.guid} role="presentation">
            <span class={CSS.title}>{this.label}</span>
          </li>
          <slot />
        </ul>
      </Host>
    );
  }
}
