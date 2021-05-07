import {
  Component,
  h,
  Host,
  Prop,
  Event,
  EventEmitter,
  Element,
  VNode,
  Method
} from "@stencil/core";
import { getElementDir, getSlotted } from "../../utils/dom";
import { guid } from "../../utils/guid";
import { CSS, TEXT } from "./resources";
import { ChipColor } from "./interfaces";
import { Appearance, Scale, Theme } from "../interfaces";
import { CSS_UTILITY } from "../../utils/resources";

@Component({
  tag: "calcite-chip",
  styleUrl: "calcite-chip.scss",
  shadow: true
})
export class CalciteChip {
  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------

  /** specify the appearance style of the button, defaults to solid. */
  @Prop({ reflect: true }) appearance: Extract<"solid" | "clear", Appearance> = "solid";

  /** specify the color of the button, defaults to blue */
  @Prop({ reflect: true }) color: ChipColor = "grey";

  /** Optionally show a button the user can click to dismiss the chip */
  @Prop({ reflect: true }) dismissible?: boolean = false;

  /** Aria label for the "x" button */
  @Prop() dismissLabel?: string = TEXT.close;

  /** optionally pass an icon to display - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) icon?: string;

  /** flip the icon in rtl */
  @Prop({ reflect: true }) iconFlipRtl?: boolean;

  /** specify the scale of the chip, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: Theme;

  @Prop() value!: any;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteChipElement;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  @Method()
  async setFocus(): Promise<void> {
    this.closeButton?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /** Emitted when the dismiss button is clicked */
  @Event() calciteChipDismiss: EventEmitter;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  closeClickHandler = (event: MouseEvent): void => {
    event.preventDefault();
    this.calciteChipDismiss.emit(this.el);
  };

  private closeButton: HTMLButtonElement;

  private guid: string = guid();

  //--------------------------------------------------------------------------
  //
  //  Render Methods
  //
  //--------------------------------------------------------------------------

  renderChipImage(): VNode {
    const { el } = this;
    const hasChipImage = getSlotted(el, "image");

    return hasChipImage ? (
      <div class="chip-image-container">
        <slot name="image" />
      </div>
    ) : null;
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const iconScale = this.scale !== "l" ? "s" : "m";

    const iconEl = (
      <calcite-icon
        class="calcite-chip--icon"
        dir={dir}
        flipRtl={this.iconFlipRtl}
        icon={this.icon}
        scale={iconScale}
      />
    );

    const closeButton = (
      <button
        aria-describedby={this.guid}
        aria-label={this.dismissLabel}
        class={CSS.close}
        onClick={this.closeClickHandler}
        ref={(el) => (this.closeButton = el)}
      >
        <calcite-icon icon="x" scale={iconScale} />
      </button>
    );

    return (
      <Host>
        <div class={{ container: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
          {this.renderChipImage()}
          {this.icon ? iconEl : null}
          <span id={this.guid}>
            <slot />
          </span>
          {this.dismissible ? closeButton : null}
        </div>
      </Host>
    );
  }
}
