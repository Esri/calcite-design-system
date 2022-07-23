import { Component, Element, Event, EventEmitter, h, Prop, VNode, Watch } from "@stencil/core";
import { CSS } from "./resources";
import { ButtonAppearance, ButtonColor, DropdownIconType } from "../button/interfaces";
import { DeprecatedEventPayload, FlipContext, Scale, Width } from "../interfaces";
import { OverlayPositioning } from "../../utils/floating-ui";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

/**
 * @slot - A slot for adding `calcite-dropdown` content.
 */
@Component({
  tag: "calcite-split-button",
  styleUrl: "split-button.scss",
  shadow: true
})
export class SplitButton implements InteractiveComponent {
  @Element() el: HTMLCalciteSplitButtonElement;

  /** specify the appearance style of the button, defaults to solid. */
  @Prop({ reflect: true }) appearance: ButtonAppearance = "solid";

  /** specify the color of the control, defaults to blue */
  @Prop({ reflect: true }) color: ButtonColor = "blue";

  /** is the control disabled  */
  @Prop({ reflect: true }) disabled = false;

  @Watch("disabled")
  handleDisabledChange(value: boolean): void {
    if (!value) {
      this.active = false;
    }
  }

  /**
   * Is the dropdown currently active or not
   *
   * @internal
   */
  @Prop({ mutable: true, reflect: true }) active = false;

  @Watch("active")
  activeHandler(): void {
    if (this.disabled) {
      this.active = false;
    }
  }

  /** specify the icon used for the dropdown menu, defaults to chevron */
  @Prop({ reflect: true }) dropdownIconType: DropdownIconType = "chevron";

  /** aria label for overflow button */
  @Prop({ reflect: true }) dropdownLabel?: string;

  /**
    optionally add a calcite-loader component to the control,
   disabling interaction. with the primary button
   */
  @Prop({ reflect: true }) loading = false;

  /** Describes the type of positioning to use for the dropdown. If your element is in a fixed container, use the 'fixed' value. */
  @Prop() overlayPositioning: OverlayPositioning = "absolute";

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

  /**
   * fired when the primary button is clicked
   *
   * **Note:** The event payload is deprecated, please use separate mouse event listeners to get info about click.
   */
  @Event() calciteSplitButtonPrimaryClick: EventEmitter<DeprecatedEventPayload>;

  /**
   * fired when the secondary button is clicked
   *
   * **Note:** The event payload is deprecated, please use separate mouse event listeners to get info about click.
   */
  @Event() calciteSplitButtonSecondaryClick: EventEmitter<DeprecatedEventPayload>;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  render(): VNode {
    const widthClasses = {
      [CSS.container]: true,
      [CSS.widthAuto]: this.width === "auto",
      [CSS.widthHalf]: this.width === "half",
      [CSS.widthFull]: this.width === "full"
    };
    const buttonWidth = this.width === "auto" ? "auto" : "full";

    return (
      <div class={widthClasses}>
        <calcite-button
          appearance={this.appearance}
          color={this.color}
          disabled={this.disabled}
          icon-end={this.primaryIconEnd ? this.primaryIconEnd : null}
          icon-start={this.primaryIconStart ? this.primaryIconStart : null}
          iconFlipRtl={this.primaryIconFlipRtl ? this.primaryIconFlipRtl : null}
          label={this.primaryLabel}
          loading={this.loading}
          onClick={this.calciteSplitButtonPrimaryClickHandler}
          scale={this.scale}
          splitChild={"primary"}
          type="button"
          width={buttonWidth}
        >
          {this.primaryText}
        </calcite-button>
        <div class={CSS.dividerContainer}>
          <div class={CSS.divider} />
        </div>
        <calcite-dropdown
          active={this.active}
          disabled={this.disabled}
          onClick={this.calciteSplitButtonSecondaryClickHandler}
          overlayPositioning={this.overlayPositioning}
          placement="bottom-end"
          scale={this.scale}
          width={this.scale}
        >
          <calcite-button
            appearance={this.appearance}
            color={this.color}
            disabled={this.disabled}
            icon-start={this.dropdownIcon}
            label={this.dropdownLabel}
            scale={this.scale}
            slot="dropdown-trigger"
            splitChild={"secondary"}
            type="button"
          />
          <slot />
        </calcite-dropdown>
      </div>
    );
  }

  private calciteSplitButtonPrimaryClickHandler = (event: MouseEvent): CustomEvent =>
    this.calciteSplitButtonPrimaryClick.emit(event);

  private calciteSplitButtonSecondaryClickHandler = (event: MouseEvent): CustomEvent =>
    this.calciteSplitButtonSecondaryClick.emit(event);

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
