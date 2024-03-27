import { Component, Element, h, Host, Prop, VNode } from "@stencil/core";
import { CSS } from "./resources";
import {
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";

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
   * When `true`, the component is active if it has a parent `calcite-carousel`.
   */
  @Prop({ reflect: true }) active = false;

  /**
   * The component label text, used to populate tooltips in the `calcite-carousel`'s controls.
   */
  @Prop() label!: string;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteCarouselItemElement;

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
    return (
      <Host>
        <div aria-label={this.label} class={CSS.container + `${this.active ? " active" : ""}`}>
          <slot />
        </div>
      </Host>
    );
  }
}
