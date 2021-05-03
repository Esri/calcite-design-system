import { Component, Element, Event, EventEmitter, h, Host, Prop, VNode } from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { ButtonAppearance, ButtonColor, DropdownIconType } from "../calcite-button/interfaces";
import { FlipContext, Scale, Theme } from "../interfaces";

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
  @Prop({ reflect: true }) disabled?: boolean;

  /** specify the icon used for the dropdown menu, defaults to chevron */
  @Prop({ reflect: true }) dropdownIconType: DropdownIconType = "chevron";

  /** aria label for overflow button */
  @Prop({ reflect: true }) dropdownLabel?: string;

  /** optionally add a calcite-loader component to the control,
   disabling interaction. with the primary button */
  @Prop({ reflect: true }) loading?: boolean = false;

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

  /** select theme (light or dark), defaults to light */
  @Prop({ reflect: true }) theme: Theme;

  /** fired when the primary button is clicked */
  @Event() calciteSplitButtonPrimaryClick: EventEmitter;

  /** fired when the secondary button is clicked */
  @Event() calciteSplitButtonSecondaryClick: EventEmitter;

  render(): VNode {
    const dir = getElementDir(this.el);
    return (
      <Host>
        <div class="split-button__container" dir={dir}>
          <calcite-button
            appearance={this.appearance}
            aria-label={this.primaryLabel}
            color={this.color}
            dir={dir}
            disabled={this.disabled}
            icon-end={this.primaryIconEnd ? this.primaryIconEnd : null}
            icon-start={this.primaryIconStart ? this.primaryIconStart : null}
            iconFlipRtl={this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null}
            loading={this.loading}
            onClick={this.calciteSplitButtonPrimaryClickHandler}
            scale={this.scale}
            splitChild={"primary"}
            theme={this.theme}
          >
            {this.primaryText}
          </calcite-button>
          <div class="split-button__divider-container">
            <div class="split-button__divider" />
          </div>
          <calcite-dropdown
            dir={dir}
            onClick={this.calciteSplitButtonSecondaryClickHandler}
            placement="bottom-trailing"
            scale={this.scale}
            theme={this.theme}
            width={this.scale}
          >
            <calcite-button
              appearance={this.appearance}
              aria-label={this.dropdownLabel}
              color={this.color}
              dir={dir}
              disabled={this.disabled}
              icon-start={this.dropdownIcon}
              scale={this.scale}
              slot="dropdown-trigger"
              splitChild={"secondary"}
              theme={this.theme}
            />
            <slot />
          </calcite-dropdown>
        </div>
      </Host>
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
