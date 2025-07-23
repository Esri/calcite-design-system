// @ts-strict-ignore
import { LitElement, property, createEvent, Fragment, h, method, JsxNode } from "@arcgis/lumina";
import { isActivationKey } from "../../utils/key";
import { FlipContext, Status } from "../interfaces";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import { logger } from "../../utils/logger";
import { useSetFocus } from "../../controllers/useSetFocus";
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
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region Public Properties

  /** When `true`, the component is expanded to show child components. */
  @property({ reflect: true }) expanded = false;

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * When `true`, expands the component and its contents.
   *
   * @deprecated Use `expanded` prop instead.
   */
  @property({ reflect: true })
  get open(): boolean {
    return this.expanded;
  }
  set open(value: boolean) {
    logger.deprecated("property", {
      name: "open",
      removalVersion: 4,
      suggested: "expanded",
    });
    this.expanded = value;
  }

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

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component's first tabbable element.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    }, options);
  }

  //#endregion

  //#region Events

  /** Fires when the header has been clicked. */
  calciteBlockSectionToggle = createEvent({ cancelable: false });

  //#endregion

  //#region Private Methods

  private handleHeaderKeyDown(event: KeyboardEvent): void {
    if (isActivationKey(event.key)) {
      this.toggleSection();
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private toggleSection(): void {
    this.expanded = !this.expanded;
    this.calciteBlockSectionToggle.emit();
  }

  //#endregion

  //#region Rendering

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

  private renderIcon(position: "start" | "end"): JsxNode {
    const { iconFlipRtl, iconStart, iconEnd } = this;

    const icon = position === "start" ? iconStart : iconEnd;

    if (icon === undefined) {
      return null;
    }

    const flipRtlStart = iconFlipRtl === "both" || iconFlipRtl === "start";
    const flipRtlEnd = iconFlipRtl === "both" || iconFlipRtl === "end";
    const isIconStart = position === "start";

    /** Icon scale is not variable as the component does not have a scale property */
    return (
      <calcite-icon
        class={isIconStart ? CSS.iconStart : CSS.iconEnd}
        flipRtl={isIconStart ? flipRtlStart : flipRtlEnd}
        icon={isIconStart ? iconStart : iconEnd}
        key={isIconStart ? iconStart : iconEnd}
        scale="s"
      />
    );
  }

  override render(): JsxNode {
    const { messages, expanded, text, toggleDisplay } = this;
    const arrowIcon = expanded ? ICONS.menuExpanded : ICONS.menuCollapsed;

    const toggleLabel = expanded ? messages.collapse : messages.expand;

    const headerNode =
      toggleDisplay === "switch" ? (
        <div
          class={{
            [CSS.toggleContainer]: true,
          }}
        >
          <div
            aria-controls={IDS.content}
            ariaExpanded={expanded}
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
            {this.renderIcon("start")}
            <div class={CSS.toggleSwitchContent}>
              <span class={CSS.toggleSwitchText}>{text}</span>
            </div>

            {this.renderIcon("end")}
            {this.renderStatusIcon()}
            <calcite-switch
              checked={expanded}
              class={CSS.switch}
              inert
              label={toggleLabel}
              scale="s"
            />
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
            ariaExpanded={expanded}
            class={{
              [CSS.sectionHeader]: true,
              [CSS.toggle]: true,
            }}
            id={IDS.toggle}
            onClick={this.toggleSection}
          >
            {this.renderIcon("start")}
            <span class={CSS.sectionHeaderText}>{text}</span>
            {this.renderIcon("end")}
            {this.renderStatusIcon()}
            <calcite-icon class={CSS.chevronIcon} icon={arrowIcon} scale="s" />
          </button>
        </div>
      );

    return (
      <>
        {headerNode}
        <section
          aria-labelledby={IDS.toggle}
          class={CSS.content}
          hidden={!expanded}
          id={IDS.content}
        >
          <slot />
        </section>
      </>
    );
  }

  //#endregion
}
