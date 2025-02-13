// @ts-strict-ignore
import { LitElement, property, createEvent, Fragment, h, method, JsxNode } from "@arcgis/lumina";
import { focusFirstTabbable } from "../../utils/dom";
import { isActivationKey } from "../../utils/key";
import { FlipContext, Status } from "../interfaces";
import { componentFocusable } from "../../utils/component";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import T9nStrings from "./assets/t9n/messages.en.json";
import { BlockSectionToggleDisplay } from "./interfaces";
import { CSS, ICONS, IDS } from "./resources";
import { styles } from "./block-section.scss";

declare global {
  interface DeclareElements {
    "calcite-block-section": BlockSection;
  }
}

/** @slot - A slot for adding custom content. */
export class BlockSection extends LitElement {
  // #region Static Members

  static override styles = styles;

  // #endregion

  // #region Public Properties

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  /** When `true`, expands the component and its contents. */
  @property({ reflect: true }) open = false;

  /**
   * Displays a status-related indicator icon.
   *
   * @deprecated Use `icon-start` instead.
   */
  @property({ reflect: true }) status: Status;

  /** The component header text. */
  @property() text: string;

  /**
   * Specifies how the component's toggle is displayed, where:
   *
   * `"button"` sets the toggle to a selectable header, and
   *
   * `"switch"` sets the toggle to a switch.
   */
  @property({ reflect: true }) toggleDisplay: BlockSectionToggleDisplay = "button";

  // #endregion

  // #region Public Methods

  /** Sets focus on the component's first tabbable element. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }

  // #endregion

  // #region Events

  /** Fires when the header has been clicked. */
  calciteBlockSectionToggle = createEvent({ cancelable: false });

  // #endregion

  // #region Private Methods

  private handleHeaderKeyDown(event: KeyboardEvent): void {
    if (isActivationKey(event.key)) {
      this.toggleSection();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private toggleSection(): void {
    this.open = !this.open;
    this.calciteBlockSectionToggle.emit();
  }

  // #endregion

  // #region Rendering

  private renderStatusIcon(): JsxNode {
    const { status } = this;
    const statusIcon = ICONS[status] ?? false;
    const statusIconClasses = {
      [CSS.statusIcon]: true,
      [CSS.valid]: status == "valid",
      [CSS.invalid]: status == "invalid",
    };

    return statusIcon ? (
      <calcite-icon class={statusIconClasses} icon={statusIcon} scale="s" />
    ) : null;
  }

  private renderIcon(icon: string): JsxNode {
    const { iconFlipRtl } = this;

    if (icon === undefined) {
      return null;
    }

    const flipRtlStart = iconFlipRtl === "both" || iconFlipRtl === "start";
    const flipRtlEnd = iconFlipRtl === "both" || iconFlipRtl === "end";

    const isIconStart = icon === this.iconStart;

    /** Icon scale is not variable as the component does not have a scale property */
    return (
      <calcite-icon
        class={isIconStart ? CSS.iconStart : CSS.iconEnd}
        flipRtl={isIconStart ? flipRtlStart : flipRtlEnd}
        icon={isIconStart ? this.iconStart : this.iconEnd}
        key={isIconStart ? this.iconStart : this.iconEnd}
        scale="s"
      />
    );
  }

  override render(): JsxNode {
    const { messages, open, text, toggleDisplay } = this;
    const arrowIcon = open ? ICONS.menuOpen : ICONS.menuClosed;

    const toggleLabel = open ? messages.collapse : messages.expand;

    const headerNode =
      toggleDisplay === "switch" ? (
        <div
          class={{
            [CSS.toggleContainer]: true,
          }}
        >
          <div
            aria-controls={IDS.content}
            ariaExpanded={open}
            class={{
              [CSS.toggle]: true,
              [CSS.toggleSwitch]: true,
            }}
            id={IDS.toggle}
            onClick={this.toggleSection}
            onKeyDown={this.handleHeaderKeyDown}
            role="button"
            tabIndex={0}
            title={toggleLabel}
          >
            {this.renderIcon(this.iconStart)}
            <div class={CSS.toggleSwitchContent}>
              <span class={CSS.toggleSwitchText}>{text}</span>
            </div>

            {this.renderIcon(this.iconEnd)}
            {this.renderStatusIcon()}
            <calcite-switch checked={open} class={CSS.switch} inert label={toggleLabel} scale="s" />
          </div>
        </div>
      ) : (
        <div
          class={{
            [CSS.toggleContainer]: true,
          }}
        >
          <button
            aria-controls={IDS.content}
            ariaExpanded={open}
            class={{
              [CSS.sectionHeader]: true,
              [CSS.toggle]: true,
            }}
            id={IDS.toggle}
            onClick={this.toggleSection}
          >
            {this.renderIcon(this.iconStart)}
            <span class={CSS.sectionHeaderText}>{text}</span>
            {this.renderIcon(this.iconEnd)}
            {this.renderStatusIcon()}
            <calcite-icon class={CSS.chevronIcon} icon={arrowIcon} scale="s" />
          </button>
        </div>
      );

    return (
      <>
        {headerNode}
        <section aria-labelledby={IDS.toggle} class={CSS.content} hidden={!open} id={IDS.content}>
          <slot />
        </section>
      </>
    );
  }

  // #endregion
}
