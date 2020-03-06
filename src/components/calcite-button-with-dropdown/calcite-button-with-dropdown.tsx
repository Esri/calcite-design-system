import { Component, Element, Event, EventEmitter, h, Host, Prop, Watch } from "@stencil/core";
import { Scale } from "../../interfaces/common";
import { getElementDir } from "../../utils/dom";

@Component({
  tag: "calcite-button-with-dropdown",
  styleUrl: "calcite-button-with-dropdown.scss",
  shadow: true
})
export class CalciteButtonWithDropdown {
  @Element() el: HTMLElement;

  /** specify the color of the control, defaults to blue */
  @Prop({ mutable: true, reflect: true }) color: "blue" | "dark" | "light" | "red" = "blue";

  /** select theme (light or dark), defaults to light */
  @Prop({ mutable: true, reflect: true }) theme: "light" | "dark" = "light";

  /** specify the scale of the control, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: Scale = "m";

  /** text for primary action button  */
  @Prop({ reflect: true }) primaryText: string;

  /** optionally pass an icon to display on the primary button - accepts Calcite UI icon names  */
  @Prop({ reflect: true }) primaryIcon?: string;

  /** aria label for overflow button */
  @Prop({ reflect: true }) dropdownLabel: string;

  /** optionally add a calcite-loader component to the control,
    disabling interaction. with the primary button */
  @Prop({ reflect: true }) loading?: boolean = false;

  /** is the control disabled  */
  @Prop({ reflect: true }) disabled?: boolean;

  /** fired when the modal begins the open animation */
  @Event() primaryButtonClicked: EventEmitter;

  @Watch("color")
  validateColor() {
    let color = ["blue", "red", "dark", "light"];
    if (!color.includes(this.color)) this.color = "blue";
  }

  @Watch("scale")
  validateScale() {
    let scale = ["xs", "s", "m", "l", "xl"];
    if (!scale.includes(this.scale)) this.scale = "m";
  }

  @Watch("theme")
  validateTheme() {
    let theme = ["dark", "light"];
    if (!theme.includes(this.theme)) this.theme = "light";
  }

  connectedCallback() {
    this.validateColor();
    this.validateScale();
    this.validateTheme();
  }

  render() {
    const dir = getElementDir(this.el);
    return (
      <Host dir={dir}>
        <div>
          <calcite-button
            color={this.color}
            scale={this.scale}
            loading={this.loading}
            icon={this.primaryIcon}
            iconPosition={dir === "ltr" ? "start" : "end"}
            disabled={this.disabled}
            theme={this.theme}
            onClick={this.primaryButtonClickedHandler}
          >
            {this.primaryText}
          </calcite-button>
          <div class="button-dropdown__divider-container">
            <div class="button-dropdown__divider" />
          </div>
          <calcite-dropdown
            alignment="end"
            dir={dir}
            theme={this.theme}
            scale={this.dropdownScale}
            width={this.dropdownScale}
          >
            <calcite-button
              aria-label={this.dropdownLabel}
              slot="dropdown-trigger"
              scale={this.scale}
              color={this.color}
              disabled={this.disabled}
              theme={this.theme}
              icon="caretDown"
            />
            <slot />
          </calcite-dropdown>
        </div>
      </Host>
    );
  }

  private primaryButtonClickedHandler = (e: MouseEvent) => this.primaryButtonClicked.emit(e);

  private get dropdownScale() {
    const scaleLookup: { [id in Scale]: "s" | "m" | "l" } = {
      xs: "s",
      s: "s",
      m: "m",
      l: "l",
      xl: "l"
    };
    return scaleLookup[this.scale];
  }
}
