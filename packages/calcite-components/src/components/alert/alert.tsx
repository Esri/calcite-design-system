// @ts-strict-ignore
import { PropertyValues } from "lit";
import {
  LitElement,
  property,
  createEvent,
  h,
  method,
  state,
  JsxNode,
  stringOrBoolean,
} from "@arcgis/lumina";
import { setRequestedIcon, slotChangeHasAssignedElement } from "../../utils/dom";
import { MenuPlacement } from "../../utils/floating-ui";
import { getIconScale } from "../../utils/component";
import { NumberingSystem, NumberStringFormat } from "../../utils/locale";
import { toggleOpenClose, OpenCloseComponent } from "../../utils/openCloseComponent";
import { Kind, Scale } from "../interfaces";
import { KindIcons } from "../resources";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import { useSetFocus } from "../../controllers/useSetFocus";
import T9nStrings from "./assets/t9n/messages.en.json";
import { AlertDuration, AlertQueue } from "./interfaces";
import { CSS, DURATIONS, SLOTS } from "./resources";
import AlertManager from "./AlertManager";
import { styles } from "./alert.scss";

declare global {
  interface DeclareElements {
    "calcite-alert": Alert;
  }
}

const manager = new AlertManager();

/**
 * Alerts are meant to provide a way to communicate urgent or important information to users, frequently as a result of an action they took in your app. Alerts are positioned
 * at the bottom of the page. Multiple opened alerts will be added to a queue, allowing users to dismiss them in the order they are provided.
 *
 * @slot title - A slot for adding a title to the component.
 * @slot message - A slot for adding main text to the component.
 * @slot link - A slot for adding a `calcite-action` to take from the component such as: "undo", "try again", "link to page", etc.
 * @slot actions-end - A slot for adding `calcite-action`s to the end of the component. It is recommended to use two or fewer actions.
 */
export class Alert extends LitElement implements OpenCloseComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private autoCloseTimeoutId: number = null;

  private initialOpenTime: number;

  private isHovered: boolean;

  private lastMouseOverBegin: number;

  transitionProp = "opacity" as const;

  private totalHoverTime = 0;

  private totalOpenTime = 0;

  transitionEl: HTMLDivElement;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region State Properties

  @state() hasEndActions = false;

  @state() isFocused = false;

  @state() numberStringFormatter = new NumberStringFormat();

  //#endregion

  //#region Public Properties

  /**
   * This internal property, managed by the AlertManager, is used
   * to inform the component if it is the active open Alert.
   *
   * @private
   */
  @property() active = false;

  /** When `true`, the component closes automatically. Recommended for passive, non-blocking alerts. */
  @property({ reflect: true }) autoClose = false;

  /** Specifies the duration before the component automatically closes - only use with `autoClose`. */
  @property({ reflect: true }) autoCloseDuration: AlertDuration = "medium";

  /**
   * This internal property, managed by a containing calcite-shell, is used
   * to inform the component if special configuration or styles are needed
   *
   * @private
   */
  @property() embedded = false;

  /**
   * When `true`, shows a default recommended icon. Alternatively,
   * pass a Calcite UI Icon name to display a specific icon.
   */
  @property({ reflect: true, converter: stringOrBoolean }) icon: IconNameOrString | boolean;

  /** When `true`, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** Specifies the kind of the component, which will apply to top border and icon. */
  @property({ reflect: true }) kind: Extract<
    "brand" | "danger" | "info" | "success" | "warning",
    Kind
  > = "brand";

  /**
   * Specifies an accessible name for the component.
   *
   * @required
   */
  @property() label: string;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /** Specifies the Unicode numeral system used by the component for localization. */
  @property({ reflect: true }) numberingSystem: NumberingSystem;

  /** When `true`, displays and positions the component. */
  @property({ reflect: true }) open = false;

  /**
   * This internal property, managed by the AlertManager, is used
   * to inform the component of how many alerts are currently open.
   *
   * @private
   */
  @property() openAlertCount = 0;

  /** Specifies the placement of the component. */
  @property({ reflect: true }) placement: MenuPlacement = "bottom";

  /** Specifies the ordering priority of the component when opened. */
  @property({ reflect: true }) queue: AlertQueue = "last";

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  //#endregion

  //#region Public Methods

  /**
   * Sets focus on the component's "close" button, the first focusable item.
   *
   * `@returns` {Promise<void>}
   *
   * @param options
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.el;
    }, options);
  }

  //#endregion

  //#region Events

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteAlertBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteAlertBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteAlertClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteAlertOpen = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    const open = this.open;

    if (open) {
      manager.registerElement(this.el);
    }

    this.numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      signDisplay: "always",
    };
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("open") && (this.hasUpdated || this.open !== false)) {
      this.openHandler();
    }

    if (changes.has("active") && (this.hasUpdated || this.active !== false)) {
      this.handleActiveChange();
    }

    if (
      changes.has("autoCloseDuration") &&
      (this.hasUpdated || this.autoCloseDuration !== "medium")
    ) {
      this.updateDuration();
    }

    if (changes.has("queue") && (this.hasUpdated || this.queue !== "last")) {
      this.handleQueueChange();
    }

    if (changes.has("numberingSystem")) {
      this.numberingSystemChange();
    }

    if (changes.has("messages")) {
      this.effectiveLocaleChange();
    }
  }

  override disconnectedCallback(): void {
    manager.unregisterElement(this.el);
    this.clearAutoCloseTimeout();
    this.embedded = false;
  }

  //#endregion

  //#region Private Methods

  private handleActiveChange(): void {
    toggleOpenClose(this);
    this.clearAutoCloseTimeout();
    if (this.active && this.autoClose && !this.autoCloseTimeoutId) {
      this.initialOpenTime = Date.now();
      this.autoCloseTimeoutId = window.setTimeout(
        () => this.closeAlert(),
        DURATIONS[this.autoCloseDuration],
      );
    }
  }

  private openHandler(): void {
    if (this.open) {
      manager.registerElement(this.el);
    } else {
      manager.unregisterElement(this.el);
    }
  }

  private updateDuration(): void {
    if (this.autoClose && this.autoCloseTimeoutId) {
      this.clearAutoCloseTimeout();
      this.autoCloseTimeoutId = window.setTimeout(
        () => this.closeAlert(),
        DURATIONS[this.autoCloseDuration],
      );
    }
  }

  private handleQueueChange(): void {
    if (this.open) {
      manager.unregisterElement(this.el);
      manager.registerElement(this.el);
    }
  }

  private handleKeyBoardFocus(): void {
    this.isFocused = true;
    this.handleFocus();
  }

  private handleKeyBoardBlur(): void {
    this.isFocused = false;
    if (!this.isHovered) {
      this.handleBlur();
    }
  }

  private effectiveLocaleChange(): void {
    this.numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      signDisplay: "always",
    };
  }

  private numberingSystemChange(): void {
    this.numberStringFormatter.numberFormatOptions = {
      locale: this.messages._lang,
      numberingSystem: this.numberingSystem,
      signDisplay: "always",
    };
  }

  private clearAutoCloseTimeout(): void {
    window.clearTimeout(this.autoCloseTimeoutId);
    this.autoCloseTimeoutId = null;
  }

  private setTransitionEl(el: HTMLDivElement): void {
    if (!el) {
      return;
    }

    this.transitionEl = el;
  }

  /** close and emit calciteInternalAlertSync event with the updated queue payload */
  private closeAlert(): void {
    this.open = false;
    this.clearAutoCloseTimeout();
  }

  onBeforeOpen(): void {
    this.calciteAlertBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteAlertOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteAlertBeforeClose.emit();
  }

  onClose(): void {
    this.calciteAlertClose.emit();
  }

  private actionsEndSlotChangeHandler(event: Event): void {
    this.hasEndActions = slotChangeHasAssignedElement(event);
  }

  private handleMouseOver(): void {
    this.isHovered = true;
    this.handleFocus();
  }

  private handleMouseLeave(): void {
    this.isHovered = false;
    if (!this.isFocused) {
      this.handleBlur();
    }
  }

  private handleFocus(): void {
    this.clearAutoCloseTimeout();
    this.totalOpenTime = Date.now() - this.initialOpenTime;
    this.lastMouseOverBegin = Date.now();
  }

  private handleBlur(): void {
    const hoverDuration = Date.now() - this.lastMouseOverBegin;
    const timeRemaining =
      DURATIONS[this.autoCloseDuration] - this.totalOpenTime + this.totalHoverTime;
    this.totalHoverTime = this.totalHoverTime ? hoverDuration + this.totalHoverTime : hoverDuration;
    this.autoCloseTimeoutId = window.setTimeout(() => this.closeAlert(), timeRemaining);
  }

  //#endregion

  //#region Rendering

  override render(): JsxNode {
    const { open, autoClose, label, placement, active, openAlertCount } = this;
    const role = autoClose ? "alert" : "alertdialog";
    const hidden = !open;
    const effectiveIcon = setRequestedIcon(KindIcons, this.icon, this.kind);
    const hasQueuedAlerts = openAlertCount > 1;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.inert = hidden;
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.ariaLabel = label;
    this.el.toggleAttribute("calcite-hydrated-hidden", hidden);
    /* TODO: [MIGRATION] This used <Host> before. In Stencil, <Host> props overwrite user-provided props. If you don't wish to overwrite user-values, replace "=" here with "??=" */
    this.el.role = role;

    return (
      <div
        class={{
          [CSS.container]: true,
          [CSS.containerActive]: active,
          [`${CSS.container}--${placement}`]: true,
          [CSS.containerEmbedded]: this.embedded,
          [CSS.focused]: this.isFocused,
        }}
        onPointerEnter={this.autoClose && this.autoCloseTimeoutId ? this.handleMouseOver : null}
        onPointerLeave={this.autoClose ? this.handleMouseLeave : null}
        ref={this.setTransitionEl}
      >
        {effectiveIcon && this.renderIcon(effectiveIcon)}
        <div
          class={CSS.textContainer}
          onFocusIn={this.autoClose && this.autoCloseTimeoutId ? this.handleKeyBoardFocus : null}
          onFocusOut={this.autoClose ? this.handleKeyBoardBlur : null}
        >
          <slot name={SLOTS.title} />
          <slot name={SLOTS.message} />
          <slot name={SLOTS.link} />
        </div>
        {this.renderActionsEnd()}
        {hasQueuedAlerts ? this.renderQueueCount() : null}
        {this.renderCloseButton()}
        {open && active && autoClose ? <div class={CSS.dismissProgress} /> : null}
      </div>
    );
  }

  private renderCloseButton(): JsxNode {
    return (
      <button
        ariaLabel={this.messages.close}
        class={CSS.close}
        key="close"
        onClick={this.closeAlert}
        onFocusIn={this.autoClose ? this.handleKeyBoardFocus : null}
        onFocusOut={this.autoClose ? this.handleKeyBoardBlur : null}
        type="button"
      >
        <calcite-icon icon="x" scale={getIconScale(this.scale)} />
      </button>
    );
  }

  private renderQueueCount(): JsxNode {
    const { openAlertCount } = this;
    const queueNumber = openAlertCount > 2 ? openAlertCount - 1 : 1;
    const queueText = this.numberStringFormatter.numberFormatter.format(queueNumber);

    return (
      <div
        class={{
          [CSS.queueCount]: true,
          [CSS.queueCountActive]: openAlertCount > 1,
        }}
        key="queue-count"
      >
        <calcite-chip label={queueText} scale={this.scale} value={queueText}>
          {queueText}
        </calcite-chip>
      </div>
    );
  }

  private renderActionsEnd(): JsxNode {
    return (
      <div class={CSS.actionsEnd}>
        <slot name={SLOTS.actionsEnd} onSlotChange={this.actionsEndSlotChangeHandler} />
      </div>
    );
  }

  private renderIcon(icon: IconNameOrString): JsxNode {
    return (
      <div class={CSS.icon}>
        <calcite-icon flipRtl={this.iconFlipRtl} icon={icon} scale={getIconScale(this.scale)} />
      </div>
    );
  }

  //#endregion
}
