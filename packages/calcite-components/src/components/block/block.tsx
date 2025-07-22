// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { focusFirstTabbable, slotChangeHasAssignedElement } from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { Heading, HeadingLevel } from "../functional/Heading";
import { FlipContext, Position, Status } from "../interfaces";
import { componentFocusable } from "../../utils/component";
import { toggleOpenClose, OpenCloseComponent } from "../../utils/openCloseComponent";
import {
  defaultEndMenuPlacement,
  FlipPlacement,
  LogicalPlacement,
  OverlayPositioning,
} from "../../utils/floating-ui";
import { IconNameOrString } from "../icon/interfaces";
import { useT9n } from "../../controllers/useT9n";
import { logger } from "../../utils/logger";
import { MoveTo } from "../sort-handle/interfaces";
import { SortHandle } from "../sort-handle/sort-handle";
import { styles as sortableStyles } from "../../assets/styles/_sortable.scss";
import { CSS, ICONS, IDS, SLOTS } from "./resources";
import T9nStrings from "./assets/t9n/messages.en.json";
import { styles } from "./block.scss";

declare global {
  interface DeclareElements {
    "calcite-block": Block;
  }
}

/**
 * @slot - A slot for adding custom content.
 * @slot actions-end - A slot for adding actionable `calcite-action` elements after the content of the component. It is recommended to use two or fewer actions.
 * @slot icon - [Deprecated] A slot for adding a leading header icon with `calcite-icon`. Use `icon-start` instead.
 * @slot content-start - A slot for adding non-actionable elements before content of the component.
 * @slot control - [Deprecated] A slot for adding a single HTML input element in a header. Use `actions-end` instead.
 * @slot header-menu-actions - A slot for adding an overflow menu with `calcite-action`s inside a dropdown menu.
 */
export class Block extends LitElement implements InteractiveComponent, OpenCloseComponent {
  //#region Static Members

  static override styles = [styles, sortableStyles];

  //#endregion

  //#region Private Properties

  transitionProp = "margin-top" as const;

  transitionEl: HTMLElement;

  private sortHandleEl: SortHandle["el"];

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  //#endregion

  //#region State Properties

  @state() hasContentStart = false;

  @state() hasControl = false;

  @state() hasEndActions = false;

  @state() hasIcon = false;

  @state() hasMenuActions = false;

  //#endregion

  //#region Public Properties

  /** When `true`, the component is collapsible. */
  @property({ reflect: true }) collapsible = false;

  /** A description for the component, which displays below the heading. */
  @property() description: string;

  /** When `true`, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** When `true`, and a parent Block Group is `dragEnabled`, the component is not draggable. */
  @property({ reflect: true }) dragDisabled = false;

  /**
   * When `true`, the component displays a draggable button.
   *
   * @deprecated No longer necessary. Use Block Group for draggable functionality.
   */
  @property({ reflect: true }) dragHandle = false;

  /** When `true`, the component is expanded to show child components. */
  @property({ reflect: true }) expanded = false;

  /**
   * The component header text.
   *
   */
  @property() heading: string;

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** Specifies an icon to display at the end of the component. */
  @property({ reflect: true }) iconEnd: IconNameOrString;

  /** Displays the `iconStart` and/or `iconEnd` as flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl: FlipContext;

  /** Specifies an icon to display at the start of the component. */
  @property({ reflect: true }) iconStart: IconNameOrString;

  /** When `true`, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /**
   * Specifies an accessible name for the component.
   */
  @property() label: string;

  /** Specifies the component's fallback menu `placement` when it's initial or specified `placement` has insufficient space available. */
  @property() menuFlipPlacements: FlipPlacement[];

  /** Determines where the action menu will be positioned. */
  @property({ reflect: true }) menuPlacement: LogicalPlacement = defaultEndMenuPlacement;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Sets the item to display a border.
   *
   * @private
   */
  @property() moveToItems: MoveTo[] = [];

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
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Used to determine what menu options are available in the sort-handle
   *
   * @private
   */
  @property() setPosition: number = null;

  /**
   * Used to determine what menu options are available in the sort-handle
   *
   * @private
   */
  @property() setSize: number = null;

  /** When `true`, displays and positions the sort handle. */
  @property({ reflect: true }) sortHandleOpen = false;

  /**
   * Displays a status-related indicator icon.
   *
   * @deprecated Use `icon-start` instead.
   */
  @property({ reflect: true }) status: Status;

  //#endregion

  //#region Public Methods

  /** Sets focus on the component's first tabbable element. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }

  //#endregion

  //#region Events

  /**
   *
   * @private
   */
  calciteInternalBlockUpdateMoveToItems = createEvent({ cancelable: false });

  /** Fires when the component is requested to be closed and before the closing transition begins. */
  calciteBlockBeforeClose = createEvent({ cancelable: false });

  /** Fires when the component is added to the DOM but not rendered, and before the opening transition begins. */
  calciteBlockBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the component is closed and animation is complete. */
  calciteBlockClose = createEvent({ cancelable: false });

  /** Fires when the component is open and animation is complete. */
  calciteBlockOpen = createEvent({ cancelable: false });

  /** Fires when the sort handle is requested to be closed and before the closing transition begins. */
  calciteBlockSortHandleBeforeClose = createEvent({ cancelable: false });

  /** Fires when the sort handle is added to the DOM but not rendered, and before the opening transition begins. */
  calciteBlockSortHandleBeforeOpen = createEvent({ cancelable: false });

  /** Fires when the sort handle is closed and animation is complete. */
  calciteBlockSortHandleClose = createEvent({ cancelable: false });

  /** Fires when the sort handle is open and animation is complete. */
  calciteBlockSortHandleOpen = createEvent({ cancelable: false });

  /**
   * Fires when the component's header is clicked.
   *
   * @deprecated Use `openClose` events such as `calciteBlockOpen`, `calciteBlockClose`, `calciteBlockBeforeOpen`, and `calciteBlockBeforeClose` instead.
   */
  calciteBlockToggle = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override connectedCallback(): void {
    this.transitionEl = this.el;
  }

  load(): void {
    if (!this.heading && !this.label) {
      logger.warn(
        `${this.el.tagName} is missing both heading & label. Please provide a heading or label for the component to be accessible.`,
      );
    }
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("expanded") && (this.hasUpdated || this.expanded !== false)) {
      toggleOpenClose(this);
    }

    if (changes.has("sortHandleOpen") && (this.hasUpdated || this.sortHandleOpen !== false)) {
      this.sortHandleOpenHandler();
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  //#endregion

  //#region Private Methods

  onBeforeOpen(): void {
    this.calciteBlockBeforeOpen.emit();
  }

  onOpen(): void {
    this.calciteBlockOpen.emit();
  }

  onBeforeClose(): void {
    this.calciteBlockBeforeClose.emit();
  }

  onClose(): void {
    this.calciteBlockClose.emit();
  }

  private sortHandleOpenHandler(): void {
    if (!this.sortHandleEl) {
      return;
    }

    // we set the property instead of the attribute to ensure expanded/collapsed events are emitted properly
    this.sortHandleEl.open = this.sortHandleOpen;
  }

  private setSortHandleEl(el: SortHandle["el"]): void {
    this.sortHandleEl = el;
    this.sortHandleOpenHandler();
  }

  private handleSortHandleBeforeOpen(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteBlockSortHandleBeforeOpen.emit();
    this.calciteInternalBlockUpdateMoveToItems.emit();
  }

  private handleSortHandleBeforeClose(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.calciteBlockSortHandleBeforeClose.emit();
  }

  private handleSortHandleClose(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.sortHandleOpen = false;
    this.calciteBlockSortHandleClose.emit();
  }

  private handleSortHandleOpen(event: CustomEvent<void>): void {
    event.stopPropagation();
    this.sortHandleOpen = true;
    this.calciteBlockSortHandleOpen.emit();
  }

  private onHeaderClick(): void {
    this.expanded = !this.expanded;
    this.calciteBlockToggle.emit();
  }

  private controlSlotChangeHandler(event: Event): void {
    this.hasControl = slotChangeHasAssignedElement(event);
  }

  private menuActionsSlotChangeHandler(event: Event): void {
    this.hasMenuActions = slotChangeHasAssignedElement(event);
  }

  private iconSlotChangeHandler(event: Event): void {
    this.hasIcon = slotChangeHasAssignedElement(event);
  }

  private actionsEndSlotChangeHandler(event: Event): void {
    this.hasEndActions = slotChangeHasAssignedElement(event);
  }

  private handleContentStartSlotChange(event: Event): void {
    this.hasContentStart = slotChangeHasAssignedElement(event);
  }

  //#endregion

  //#region Rendering

  private renderScrim(): JsxNode {
    const { loading } = this;
    const defaultSlot = <slot />;

    return [loading ? <calcite-scrim loading={loading} /> : null, defaultSlot];
  }

  private renderLoaderStatusIcon(): JsxNode {
    const { loading, messages, status } = this;

    return loading ? (
      <div class={CSS.icon} key="loader">
        <calcite-loader inline label={messages.loading} />
      </div>
    ) : status ? (
      <div class={CSS.icon} key="status-icon">
        <calcite-icon
          class={{
            [CSS.statusIcon]: true,
            [CSS.valid]: status == "valid",
            [CSS.invalid]: status == "invalid",
          }}
          icon={ICONS[status]}
          scale="s"
        />
      </div>
    ) : (
      <div class={CSS.icon} hidden={!this.hasIcon} key="icon-slot">
        <slot key="icon-slot" name={SLOTS.icon} onSlotChange={this.iconSlotChangeHandler} />
      </div>
    );
  }

  private renderActionsEnd(): JsxNode {
    return (
      <div class={CSS.actionsEnd} hidden={!this.hasEndActions}>
        <slot name={SLOTS.actionsEnd} onSlotChange={this.actionsEndSlotChangeHandler} />
      </div>
    );
  }

  private renderContentStart(): JsxNode {
    return (
      <div class={CSS.contentStart} hidden={!this.hasContentStart}>
        <slot name={SLOTS.contentStart} onSlotChange={this.handleContentStartSlotChange} />
      </div>
    );
  }

  private renderTitle(): JsxNode {
    const { heading, headingLevel, description } = this;
    return heading || description ? (
      <div class={CSS.title}>
        <Heading class={CSS.heading} level={headingLevel}>
          {heading}
        </Heading>
        {description ? <div class={CSS.description}>{description}</div> : null}
      </div>
    ) : null;
  }

  private renderIcon(position: Extract<"start" | "end", Position>): JsxNode {
    const { iconFlipRtl } = this;

    const flipRtl =
      iconFlipRtl === "both" || position === "start"
        ? iconFlipRtl === "start"
        : iconFlipRtl === "end";

    const iconValue = position === "start" ? this.iconStart : this.iconEnd;
    const iconClass = position === "start" ? CSS.iconStart : CSS.iconEnd;

    if (!iconValue) {
      return undefined;
    }

    /** Icon scale is not variable as the component does not have a scale property */
    return (
      <calcite-icon
        class={iconClass}
        flipRtl={flipRtl}
        icon={iconValue}
        key={iconValue}
        scale="s"
      />
    );
  }

  override render(): JsxNode {
    const {
      collapsible,
      loading,
      expanded,
      label,
      heading,
      messages,
      description,
      menuFlipPlacements,
      menuPlacement,
      moveToItems,
      setPosition,
      setSize,
      dragDisabled,
    } = this;

    const toggleLabel = expanded ? messages.collapse : messages.expand;

    const headerContent = (
      <header
        class={{ [CSS.header]: true, [CSS.headerHasText]: !!(heading || description) }}
        id={IDS.header}
      >
        {this.renderIcon("start")}
        {this.renderContentStart()}
        {this.renderLoaderStatusIcon()}
        {this.renderTitle()}
      </header>
    );

    const collapseIcon = expanded ? ICONS.expanded : ICONS.collapsed;

    const headerNode = (
      <div class={CSS.headerContainer}>
        {this.dragHandle ? (
          <calcite-sort-handle
            disabled={dragDisabled}
            label={heading || label}
            moveToItems={moveToItems}
            oncalciteSortHandleBeforeClose={this.handleSortHandleBeforeClose}
            oncalciteSortHandleBeforeOpen={this.handleSortHandleBeforeOpen}
            oncalciteSortHandleClose={this.handleSortHandleClose}
            oncalciteSortHandleOpen={this.handleSortHandleOpen}
            overlayPositioning="fixed"
            ref={this.setSortHandleEl}
            setPosition={setPosition}
            setSize={setSize}
          />
        ) : null}
        {collapsible ? (
          <button
            aria-controls={IDS.content}
            aria-describedby={IDS.header}
            ariaExpanded={collapsible ? expanded : null}
            class={CSS.toggle}
            id={IDS.toggle}
            onClick={this.onHeaderClick}
            title={toggleLabel}
          >
            {headerContent}
            <div class={CSS.iconEndContainer}>
              {this.renderIcon("end")}
              <calcite-icon class={CSS.toggleIcon} icon={collapseIcon} scale="s" />
            </div>
          </button>
        ) : this.iconEnd ? (
          <div>
            {headerContent}
            <div class={CSS.iconEndContainer}>{this.renderIcon("end")}</div>
          </div>
        ) : (
          headerContent
        )}
        <div aria-labelledby={IDS.header} class={CSS.controlContainer} hidden={!this.hasControl}>
          <slot name={SLOTS.control} onSlotChange={this.controlSlotChangeHandler} />
        </div>
        <calcite-action-menu
          flipPlacements={menuFlipPlacements ?? ["top", "bottom"]}
          hidden={!this.hasMenuActions}
          label={messages.options}
          overlayPositioning={this.overlayPositioning}
          placement={menuPlacement}
        >
          <slot name={SLOTS.headerMenuActions} onSlotChange={this.menuActionsSlotChangeHandler} />
        </calcite-action-menu>
        {this.renderActionsEnd()}
      </div>
    );

    return (
      <InteractiveContainer disabled={this.disabled}>
        <article
          aria-label={label}
          ariaBusy={loading}
          class={{
            [CSS.container]: true,
          }}
        >
          {headerNode}
          <section
            aria-labelledby={IDS.toggle}
            class={CSS.content}
            hidden={!expanded}
            id={IDS.content}
          >
            {this.renderScrim()}
          </section>
        </article>
      </InteractiveContainer>
    );
  }

  //#endregion
}
