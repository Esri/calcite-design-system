import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop
} from "@stencil/core";


/** Notices are intended to be used to present users with important-but-not-crucial contextual tips or copy. Because
 * notices are displayed inline, a common use case is displaying them on page-load to present users with short hints or contextual copy.
 * They are optionally dismissible - useful for keeping track of whether or not a user has dismissed the notice. You can also choose not
 * to display a notice on page load and set the "active" attribute as needed to contextually provide inline messaging to users.
 */

/**
 * @slot notice-title - Title of the notice (optional)
 * @slot notice-message - Main text of the notice
 * @slot notice-link - Optional action to take from the notice (undo, try again, link to page, etc.)
 */

@Component({
  tag: "calcite-notice",
  styleUrl: "calcite-notice.scss",
  shadow: true
})
export class CalciteNotice {
  //--------------------------------------------------------------------------
  //
  //  Element
  //
  //--------------------------------------------------------------------------

  @Element() el: HTMLElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------------------------------

  /** Is the notice currently active or not */
  @Prop({ reflect: true, mutable: true }) active: boolean = false;

  /** Color for the notice (will apply to top border and icon) */
  @Prop({ reflect: true, mutable: true }) color:
    | "blue"
    | "green"
    | "red"
    | "yellow" = "blue";

  /** Select theme (light or dark) */
  @Prop({ reflect: true, mutable: true }) theme: "light" | "dark";

  /** specify the scale of the notice, defaults to m */
  @Prop({ mutable: true, reflect: true }) scale: "s" | "m" | "l" = "m";

  /** specify the scale of the button, defaults to m */
  @Prop({ mutable: true, reflect: true }) width: "auto" | "half" | "full" =
    "auto";

  /** Select theme (light or dark) */
  @Prop({ reflect: true, mutable: true }) dismissible?: boolean = false;

  /** If false, no icon will be shown in the notice */
  @Prop() icon: boolean = false;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  connectedCallback() {
    // prop validations
    let colors = ["blue", "red", "green", "yellow"];
    if (!colors.includes(this.color)) this.color = "blue";


    let scales = ["s", "m", "l"];
    if (!scales.includes(this.scale)) this.scale = "m";

    let widths = ["auto", "half", "full"];
    if (!widths.includes(this.width)) this.width = "auto";
  }

  componentDidLoad() {
    this.noticeLinkEl = this.el.querySelectorAll(
      "calcite-button"
    )[0] as HTMLCalciteButtonElement;
  }

  render() {
    const closeButton = (
      <button
        class="notice-close"
        aria-label="close"
        onClick={() => this.close()}
        ref={el => (this.closeButton = el)}
      >
        <calcite-icon icon="x" scale="s"></calcite-icon>
      </button>
    );

    return (
      <Host active={this.active}>
        {this.icon ? this.setIcon() : null}
        <div class="notice-content">
          <slot name="notice-title"></slot>
          <slot name="notice-message"></slot>
          <slot name="notice-link"></slot>
        </div>
        {this.dismissible ? closeButton : null}
      </Host>
    );
  }

  //--------------------------------------------------------------------------
  //
  //  Events
  //
  //--------------------------------------------------------------------------

  /** Fired when an notice is closed */
  @Event() calciteNoticeClose: EventEmitter;

  /** Fired when an Notice is opened */
  @Event() calciteNoticeOpen: EventEmitter;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** close the notice emit the `calciteNoticeClose` event - <calcite-notice> listens for this */
  @Method() async close() {
    this.active = false;
    this.calciteNoticeClose.emit({ requestedNotice: this.noticeId });
  }

  /** open the notice and emit the `calciteNoticeOpen` event - <calcite-notice> listens for this  */
  @Method() async open() {
    this.active = true;
    this.calciteNoticeOpen.emit({ requestedNotice: this.noticeId });
  }

  /** focus the close button, if present and requested */
  @Method()
  async setFocus() {
    if (!this.closeButton && !this.noticeLinkEl) {
      return;
    }
    if (this.noticeLinkEl) this.noticeLinkEl.setFocus();
    else if (this.closeButton) {
      this.closeButton.focus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** Unique ID for this notice */
  private noticeId: string = this.el.id;

  /** the close button element */
  private closeButton?: HTMLElement;

  /** the notice link child element  */
  private noticeLinkEl?: HTMLCalciteButtonElement;

  private iconDefaults = {
    green: "checkCircle",
    yellow: "exclamationMarkTriangle",
    red: "exclamationMarkTriangle",
    blue: "lightbulb"
  };

  private setIcon() {
    var path = this.iconDefaults[this.color];
    return (
      <div class="notice-icon">
        <calcite-icon icon={path} filled scale="s"></calcite-icon>
      </div>
    );
  }
}
