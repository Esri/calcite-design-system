import { Component, Element, h, Host, Prop, VNode } from "@stencil/core";
import { CalciteVersion } from "../resources";
import { guid } from "../../utils/guid";
import { CSS } from "./resources";

/**
 * @slot - A slot for adding content.
 */
@Component({
  tag: "calcite-carousel-item",
  styleUrl: "carousel-item.scss",
  shadow: true,
})
export class CarouselItem {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Accessible name for the component.
   */
  @Prop() label!: string;

  /**
   * When `true`, the component is selected.
   */
  @Prop({ reflect: true }) selected = false;

  @Prop() version = CalciteVersion;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteCarouselItemElement;

  private guid = `calcite-carousel-item-${guid()}`;

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const id = this.el.id || this.guid;
    return (
      <Host id={id}>
        <div
          aria-label={this.label}
          class={{ [CSS.container]: true, [CSS.selected]: this.selected }}
          role="tabpanel"
        >
          <slot />
        </div>
      </Host>
    );
  }
}
