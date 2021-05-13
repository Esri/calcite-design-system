import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  VNode,
  Watch
} from "@stencil/core";

import { SLOTS, TEXT } from "./calcite-notice.resources";
import { Scale, Theme, Width } from "../interfaces";
import { StatusColor, StatusIcons } from "../calcite-alert/interfaces";
import { getElementDir, setRequestedIcon } from "../../utils/dom";
import { CSS_UTILITY } from "../../utils/resources";

/** Notices are intended to be used to present users with important-but-not-crucial contextual tips or copy. Because
 * notices are displayed inline, a common use case is displaying them on page-load to present users with short hints or contextual copy.
 * They are optionally dismissible - useful for keeping track of whether or not a user has dismissed the notice. You can also choose not
 * to display a notice on page load and set the "active" attribute as needed to contextually provide inline messaging to users.
 */

/**
 * @slot title - Title of the notice (optional)
 * @slot message - Main text of the notice
 * @slot link - Optional action to take from the notice (undo, try again, link to page, etc.)
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

  @Element() el: HTMLCalciteNoticeElement;

  //--------------------------------------------------------------------------
  //
  //  Properties
  //
  //---------------------------------------------------------------------------

  /** Is the notice currently active or not */
  @Prop({ reflect: true, mutable: true }) active = false;

  /** Color for the notice (will apply to top border and icon) */
  @Prop({ reflect: true }) color: StatusColor = "blue";

  /** Optionally show a button the user can click to dismiss the notice */
  @Prop({ reflect: true }) dismissible?: boolean = false;

  /** when used as a boolean set to true, show a default recommended icon. You can
   * also pass a calcite-ui-icon name to this prop to display a requested icon */
  @Prop({ reflect: true }) icon: string | boolean;

  /** String for the close button. */
  @Prop({ reflect: false }) intlClose: string = TEXT.close;

  /** specify the scale of the notice, defaults to m */
  @Prop({ reflect: true }) scale: Scale = "m";

  /** Select theme (light or dark) */
  @Prop({ reflect: true }) theme: Theme;

  /** specify the width of the notice, defaults to auto */
  @Prop({ reflect: true }) width: Width = "auto";

  @Watch("icon")
  @Watch("color")
  updateRequestedIcon(): void {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentWillLoad(): void {
    this.requestedIcon = setRequestedIcon(StatusIcons, this.icon, this.color);
  }

  componentDidLoad(): void {
    this.noticeLinkEl = this.el.querySelectorAll("calcite-link")[0] as HTMLCalciteLinkElement;
  }

  render(): VNode {
    const dir = getElementDir(this.el);
    const closeButton = (
      <button
        aria-label={this.intlClose}
        class="notice-close"
        onClick={this.close}
        ref={() => this.closeButton}
      >
        <calcite-icon icon="x" scale="m" />
      </button>
    );

    return (
      <Host>
        <div class={{ container: true, [CSS_UTILITY.rtl]: dir === "rtl" }}>
          {this.requestedIcon ? (
            <div class="notice-icon">
              <calcite-icon icon={this.requestedIcon} scale="m" />
            </div>
          ) : null}
          <div class="notice-content">
            <slot name={SLOTS.title} />
            <slot name={SLOTS.message} />
            <slot name={SLOTS.link} />
          </div>
          {this.dismissible ? closeButton : null}
        </div>
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
  /** focus the close button, if present and requested */
  @Method()
  async setFocus(): Promise<void> {
    if (!this.closeButton && !this.noticeLinkEl) {
      return;
    }
    if (this.noticeLinkEl) {
      this.noticeLinkEl.setFocus();
    } else if (this.closeButton) {
      this.closeButton.focus();
    }
  }

  //--------------------------------------------------------------------------
  //
  //  Private Methods
  //
  //--------------------------------------------------------------------------
  private close = (): void => {
    this.active = false;
    this.calciteNoticeClose.emit();
  };

  //--------------------------------------------------------------------------
  //
  //  Private State/Props
  //
  //--------------------------------------------------------------------------

  /** the close button element */
  private closeButton?: HTMLElement;

  /** the notice link child element  */
  private noticeLinkEl?: HTMLCalciteLinkElement;

  /** the computed icon to render */
  private requestedIcon?: string;
}
