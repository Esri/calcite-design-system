import { Component, Element, h, Host, Prop, VNode } from "@stencil/core";
import {
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
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
export class CarouselItem implements LoadableComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, the component is selected.
   */
  @Prop({ reflect: true }) selected = false;

  /**
   * Accessible name for the component.
   */
  @Prop() label!: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteCarouselItemElement;

  private guid = `calcite-carousel-item-${guid()}`;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  render(): VNode {
    const id = this.el.id || this.guid;
    return (
      <Host id={id} role="tabpanel">
        <div
          aria-label={this.label}
          class={{ [CSS.container]: true, [CSS.selected]: this.selected }}
        >
          <slot />
        </div>
      </Host>
    );
  }
}
