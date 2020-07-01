import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Prop,
  Watch,
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-split-button",
  styleUrl: "calcite-split-button.scss",
  shadow: true,
})
export class CalciteSplitButton {
  @Element() el: HTMLElement;

  /** specify the color of the control, defaults to blue */
  @Prop({ mutable: true, reflect: true }) color:
    | "blue"
    | "dark"
    | "light"
    | "red" = "blue";

  /** select theme (light or dark), defaults to light */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark";

  /** specify the scale of the control, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify the icon used for the dropdown menu, defaults to chevron */
  @Prop({ mutable: true, reflect: true }) dropdownIconType:
    | "chevron"
    | "caret"
    | "ellipsis" = "chevron";

  /** text for primary action button  */
  @Prop({ reflect: true }) primaryText: string;

  /** optionally pass an icon to display on the primary button - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) primaryIcon?: string;

  /** optionally pass an aria-label for the primary button */
  @Prop({ reflect: true }) primaryLabel?: string;

  /** aria label for overflow button */
  @Prop({ reflect: true }) dropdownLabel?: string;

  /** optionally add a calcite-loader component to the control,
    disabling interaction. with the primary button */
  @Prop({ reflect: true }) loading?: boolean = false;

  /** is the control disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  /** fired when the primary button is clicked */
  @Event() calciteSplitButtonPrimaryClick: EventEmitter;

  @Watch("color")
  validateColor() {
    let color = ["blue", "red", "dark", "light"];
    if (!color.includes(this.color)) this.color = "blue";
  }

  @Watch("scale")
  validateScale() {
    let scale = ["s", "m", "l"];
    if (!scale.includes(this.scale)) this.scale = "m";
  }

  @Watch("theme")
  validateTheme() {
    let theme = ["dark", "light"];
    if (!theme.includes(this.theme)) this.theme = "light";
  }

  @Watch("dropdownIconType")
  validateDropdownIconType() {
    let dropdownIconType = ["chevron", "caret", "ellipsis"];
    if (!dropdownIconType.includes(this.dropdownIconType))
      this.dropdownIconType = "chevron";
  }

  connectedCallback() {
    this.validateColor();
    this.validateScale();
    this.validateTheme();
    this.validateDropdownIconType();
  }

  render() {
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>
        <div class="split-button__container">
          <calcite-button
            dir={dir}
            aria-label={this.primaryLabel}
            color={this.color}
            scale={this.scale}
            loading={this.loading}
            icon={this.primaryIcon}
            iconPosition="start"
            disabled={this.disabled}
            theme={this.theme}
            onClick={this.calciteSplitButtonPrimaryClickHandler}
          >
            {this.primaryText}
          </calcite-button>
          <div class="split-button__divider-container">
            <div class="split-button__divider" />
          </div>
          <calcite-dropdown
            alignment="end"
            dir={dir}
            theme={this.theme}
            scale={this.scale}
            width={this.scale}
          >
            <calcite-button
              dir={dir}
              aria-label={this.dropdownLabel}
              slot="dropdown-trigger"
              scale={this.scale}
              color={this.color}
              disabled={this.disabled}
              theme={this.theme}
              icon={this.dropdownIcon}
            />
            <slot />
          </calcite-dropdown>
        </div>
      </Host>
    );
  }

  private calciteSplitButtonPrimaryClickHandler = (e: MouseEvent) =>
    this.calciteSplitButtonPrimaryClick.emit(e);

  private get dropdownIcon() {
    return this.dropdownIconType === "chevron"
      ? "chevronDown"
      : this.dropdownIconType === "caret"
      ? "caretDown"
      : "ellipsis";
  }
}
