import { Component, Element, EventEmitter, h, Host, Prop, Event } from "@stencil/core";
import { CSS } from "./resources";

@Component({
  tag: "calcite-nav-logo",
  styleUrl: "nav-logo.scss",
  shadow: {
    delegatesFocus: true
  }
})
export class CalciteNavLogo {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------
  @Element() el: HTMLCalciteNavLogoElement;

  //--------------------------------------------------------------------------
  //
  //  Public Properties
  //
  //--------------------------------------------------------------------------
  /** When `true`, visually highlight the component */
  @Prop({ reflect: true }) active: boolean;

  /** Specifies the href destination of the component */
  @Prop({ reflect: true }) href: string;

  /** Specifies accesible label for the component */
  @Prop() label: string;

  /** Specifies the subtext to display, for example an organization or application description */
  @Prop() subText: string;

  /** Specifies the text to display, for example a product name */
  @Prop() text: string;

  /** When `true`, makes `text` and `subText` visible */
  @Prop({ reflect: true }) textEnabled: boolean;

  /** Specifies the `src` to an image  */
  @Prop() thumbnail: string;

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Emits when user select the component. */
  @Event() calciteNavLogoSelect: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  private clickHandler = (): void => {
    this.calciteNavLogoSelect.emit();
  };

  private keyDownHandler = (event: KeyboardEvent): void => {
    if (event.key === "Enter" || event.key === " ") {
      this.calciteNavLogoSelect.emit();
      event.preventDefault();
    }
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------
  render() {
    return (
      <Host>
        <a
          aria-label={this.label}
          href={this.href}
          onClick={this.clickHandler}
          onKeyDown={this.keyDownHandler}
          tabIndex={0}
        >
          {this.thumbnail && <img src={this.thumbnail} />}
          {(this.text || this.subText) && this.textEnabled && (
            <div class={CSS.textContainer}>
              {this.text && this.textEnabled ? (
                <span class={CSS.logoText} key={CSS.logoText}>
                  {this.text}
                </span>
              ) : null}
              {this.subText && this.textEnabled ? (
                <span class={CSS.logoSubtext} key={CSS.logoSubtext}>
                  {this.subText}
                </span>
              ) : null}
            </div>
          )}
        </a>
      </Host>
    );
  }
}
