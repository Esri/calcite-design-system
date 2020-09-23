import { Component, Element, Event, EventEmitter, h, Host, Prop } from "@stencil/core";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-split-button",
  styleUrl: "calcite-split-button.scss",
  shadow: true
})
export class CalciteSplitButton {
  @Element() el: HTMLCalciteSplitButtonElement;

  /** specify the color of the control, defaults to blue */
  @Prop({ reflect: true }) color: "blue" | "dark" | "light" | "red" = "blue";

  /** is the control disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  /** specify the icon used for the dropdown menu, defaults to chevron */
  @Prop({ reflect: true }) dropdownIconType: "chevron" | "caret" | "ellipsis" | "overflow" =
    "chevron";

  /** aria label for overflow button */
  @Prop({ reflect: true }) dropdownLabel?: string;

  /** optionally add a calcite-loader component to the control,
   disabling interaction. with the primary button */
  @Prop({ reflect: true }) loading?: boolean = false;

  /** optionally pass an icon to display at the end of the primary button - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) primaryIconEnd?: string;

  /** optionally pass an icon to display at the start of the primary button - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) primaryIconStart?: string;

  /** optionally pass an aria-label for the primary button */
  @Prop({ reflect: true }) primaryLabel?: string;

  /** text for primary action button  */
  @Prop({ reflect: true }) primaryText: string;

  /** specify the scale of the control, defaults to m */
  @Prop({ reflect: true }) scale: "s" | "m" | "l" = "m";

  /** select theme (light or dark), defaults to light */
  @Prop({ reflect: true }) theme: "light" | "dark";

  /** fired when the primary button is clicked */
  @Event() calciteSplitButtonPrimaryClick: EventEmitter;

  /** fired when the secondary button is clicked */
  @Event() calciteSplitButtonSecondaryClick: EventEmitter;

  render() {
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>
        <div class="split-button__container">
          <calcite-button
            aria-label={this.primaryLabel}
            color={this.color}
            dir={dir}
            disabled={this.disabled}
            icon-end={this.primaryIconEnd ? this.primaryIconEnd : null}
            icon-start={this.primaryIconStart ? this.primaryIconStart : null}
            loading={this.loading}
            onClick={this.calciteSplitButtonPrimaryClickHandler}
            scale={this.scale}
            theme={this.theme}
          >
            {this.primaryText}
          </calcite-button>
          <div class="split-button__divider-container">
            <div class="split-button__divider" />
          </div>
          <calcite-dropdown
            alignment="end"
            dir={dir}
            onClick={this.calciteSplitButtonSecondaryClickHandler}
            scale={this.scale}
            theme={this.theme}
            width={this.scale}
          >
            <calcite-button
              aria-label={this.dropdownLabel}
              color={this.color}
              dir={dir}
              disabled={this.disabled}
              icon-start={this.dropdownIcon}
              scale={this.scale}
              slot="dropdown-trigger"
              theme={this.theme}
            />
            <slot />
          </calcite-dropdown>
        </div>
      </Host>
    );
  }

  private calciteSplitButtonPrimaryClickHandler = (e: MouseEvent) =>
    this.calciteSplitButtonPrimaryClick.emit(e);

  private calciteSplitButtonSecondaryClickHandler = (e: MouseEvent) =>
    this.calciteSplitButtonSecondaryClick.emit(e);

  private get dropdownIcon() {
    return this.dropdownIconType === "chevron"
      ? "chevronDown"
      : this.dropdownIconType === "caret"
      ? "caretDown"
      : this.dropdownIconType === "ellipsis"
      ? "ellipsis"
      : "handle-vertical";
  }
}
