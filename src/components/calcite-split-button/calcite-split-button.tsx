import { Component, Element, Event, EventEmitter, h, Prop, VNode } from "@stencil/core";
import { CSS } from "./resources";
import { getElementDir } from "../../utils/dom";
import { ButtonAppearance, ButtonColor, DropdownIconType } from "../calcite-button/interfaces";
import { FlipContext, Scale, Width } from "../interfaces";

/**
 * @slot - A slot for adding `calcite-dropdown` content.
 */
@Component({
  tag: "calcite-split-button",
  styleUrl: "calcite-split-button.scss",
  shadow: true
})
export class CalciteSplitButton {
  @Element() el: HTMLCalciteSplitButtonElement;

  /** specify the appearance style of the button, defaults to solid. */
  @Prop({ reflect: true }) appearance: ButtonAppearance = "solid";

  /** specify the color of the control, defaults to blue */
  @Prop({ reflect: true }) color: ButtonColor = "blue";

  /** is the control disabled  */
  @Prop({ reflect: true }) disabled = false;

  /**
   * Is the dropdown currently active or not
   * @internal
   */
  @Prop({ reflect: true }) active = false;

  /** specify the icon used for the dropdown menu, defaults to chevron */
  @Prop({ reflect: true }) dropdownIconType: DropdownIconType = "chevron";

  /** aria label for overflow button */
  @Prop({ reflect: true }) dropdownLabel?: string;

  /** optionally add a calcite-loader component to the control,
   disabling interaction. with the primary button */
  @Prop({ reflect: true }) loading = false;

  /** optionally pass an icon to display at the end of the primary button - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) primaryIconEnd?: string;

  /** flip the primary icon(s) in rtl */
  @Prop({ reflect: true }) primaryIconFlipRtl?: FlipContext;

  /** optionally pass an icon to display at the start of the primary button - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) primaryIconStart?: string;

  /** optionally pass an aria-label for the primary button */
  @Prop({ reflect: true }) primaryLabel?: string;

  /** text for primary action button  */
  @Prop({ reflect: true }) primaryText: string;

  /** specify the scale of the control, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** specify the width of the button, defaults to auto */
  @Prop({ reflect: true }) width: Width = "auto";

  /** fired when the primary button is clicked */
  @Event() calciteSplitButtonPrimaryClick: EventEmitter;

  /** fired when the secondary button is clicked */
  @Event() calciteSplitButtonSecondaryClick: EventEmitter;

  render(): VNode {
    const dir = getElementDir(this.el);
    const widthClasses = {
      [CSS.container]: true,
      [CSS.widthAuto]: this.width === "auto",
      [CSS.widthHalf]: this.width === "half",
      [CSS.widthFull]: this.width === "full"
    };
    const buttonWidth = this.width === "auto" ? "auto" : "full";

    return (
      <div class={widthClasses} dir={dir}>
        <calcite-button
          appearance={this.appearance}
          color={this.color}
          dir={dir}
          disabled={this.disabled}
          icon-end={this.primaryIconEnd ? this.primaryIconEnd : null}
          icon-start={this.primaryIconStart ? this.primaryIconStart : null}
          iconFlipRtl={this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null}
          label={this.primaryLabel}
          loading={this.loading}
          onClick={this.calciteSplitButtonPrimaryClickHandler}
          scale={this.scale}
          splitChild={"primary"}
          width={buttonWidth}
        >
          {this.primaryText}
        </calcite-button>
        <div class={CSS.dividerContainer}>
          <div class={CSS.divider} />
        </div>
        <calcite-dropdown
          active={this.active}
          dir={dir}
          onClick={this.calciteSplitButtonSecondaryClickHandler}
          placement="bottom-trailing"
          scale={this.scale}
          width={this.scale}
        >
          <calcite-button
            appearance={this.appearance}
            color={this.color}
            dir={dir}
            disabled={this.disabled}
            icon-start={this.dropdownIcon}
            label={this.dropdownLabel}
            scale={this.scale}
            slot="dropdown-trigger"
            splitChild={"secondary"}
          />
          <slot />
        </calcite-dropdown>
      </div>
    );
  }

  private calciteSplitButtonPrimaryClickHandler = (e: MouseEvent): CustomEvent =>
    this.calciteSplitButtonPrimaryClick.emit(e);

  private calciteSplitButtonSecondaryClickHandler = (e: MouseEvent): CustomEvent =>
    this.calciteSplitButtonSecondaryClick.emit(e);

  private get dropdownIcon(): string {
    return this.dropdownIconType === "chevron"
      ? "chevronDown"
      : this.dropdownIconType === "caret"
      ? "caretDown"
      : this.dropdownIconType === "ellipsis"
      ? "ellipsis"
      : "handle-vertical";
  }
}
