// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, JsxNode } from "@arcgis/lumina";
import { getElementDir } from "../../utils/dom";
import {
  InteractiveComponent,
  InteractiveContainer,
  updateHostInteraction,
} from "../../utils/interactive";
import { HeadingLevel } from "../functional/Heading";
import { SLOTS as PANEL_SLOTS } from "../panel/resources";
import { OverlayPositioning } from "../../utils/floating-ui";
import { CollapseDirection, Scale } from "../interfaces";
import { useT9n } from "../../controllers/useT9n";
import type { Panel } from "../panel/panel";
import type { Action } from "../action/action";
import { useSetFocus } from "../../controllers/useSetFocus";
import { IconNameOrString } from "../icon/interfaces";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, ICONS, SLOTS } from "./resources";
import { styles } from "./flow-item.scss";

declare global {
  interface DeclareElements {
    "calcite-flow-item": FlowItem;
  }
}

/**
 * @slot - A slot for adding custom content.
 * @slot action-bar - A slot for adding a `calcite-action-bar` to the component.
 * @slot alerts - A slot for adding `calcite-alert`s to the component.
 * @slot content-top - A slot for adding content above the unnamed (default) slot and below the action-bar slot (if populated).
 * @slot content-bottom - A slot for adding content below the unnamed (default) slot and above the footer slot (if populated)
 * @slot header-actions-start - A slot for adding `calcite-action`s or content to the start side of the component's header.
 * @slot header-actions-end - A slot for adding `calcite-action`s or content to the end side of the component's header.
 * @slot header-content - A slot for adding custom content to the component's header.
 * @slot header-menu-actions - A slot for adding an overflow menu with `calcite-action`s inside a `calcite-dropdown`.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer - A slot for adding custom content to the component's footer. Should not be used with the `"footer-start"` or `"footer-end"` slots.
 * @slot footer-actions - [Deprecated] Use the `"footer"` slot instead. A slot for adding `calcite-button`s to the component's footer.
 * @slot footer-end - A slot for adding a trailing footer custom content. Should not be used with the `"footer"` slot.
 * @slot footer-start - A slot for adding a leading footer custom content. Should not be used with the `"footer"` slot.
 */
export class FlowItem extends LitElement implements InteractiveComponent {
  //#region Static Members

  static override styles = styles;

  //#endregion

  //#region Private Properties

  private backButtonEl: Action["el"];

  private containerEl: Panel["el"];

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  private focusSetter = useSetFocus<this>()(this);

  //#endregion

  //#region Public Properties

  /** When provided, the method will be called before it is removed from its parent `calcite-flow`. */
  @property() beforeBack?: () => Promise<void>;

  /** Passes a function to run before the component closes. */
  @property() beforeClose: () => Promise<void>;

  /** When present, displays a close button in the trailing side of the component's header. */
  @property({ reflect: true }) closable = false;

  /** When present, the component will be hidden. */
  @property({ reflect: true }) closed = false;

  /**
   * Specifies the direction of the collapse.
   *
   * @private
   */
  @property() collapseDirection: CollapseDirection = "down";

  /** When present, hides the component's content area. */
  @property({ reflect: true }) collapsed = false;

  /** When present, the component is collapsible. */
  @property({ reflect: true }) collapsible = false;

  /** A description for the component. */
  @property() description: string;

  /** When present, interaction is prevented and the component is displayed with lower opacity. */
  @property({ reflect: true }) disabled = false;

  /** The component header text. */
  @property() heading: string;

  /** Specifies the heading level of the component's `heading` for proper document structure, without affecting visual styling. */
  @property({ type: Number, reflect: true }) headingLevel: HeadingLevel;

  /** Specifies an icon to display. */
  @property({ reflect: true }) icon: IconNameOrString;

  /** When present, the icon will be flipped when the element direction is right-to-left (`"rtl"`). */
  @property({ reflect: true }) iconFlipRtl = false;

  /** When present, a busy indicator is displayed. */
  @property({ reflect: true }) loading = false;

  /** When present, the action menu items in the `header-menu-actions` slot are open. */
  @property({ reflect: true }) menuOpen = false;

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Specifies the size of the component. */
  @property({ reflect: true }) scale: Scale = "m";

  /** When present, flow-item is displayed within a parent flow. */
  @property({ reflect: true }) selected = false;

  /**
   * When present, displays a back button in the component's header.
   *
   * @internal
   */
  @property() showBackButton = false;

  //#endregion

  //#region Public Methods

  /**
   * Scrolls the component's content to a specified set of coordinates.
   *
   * @example
   * myCalciteFlowItem.scrollContentTo({
   *   left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
   *   top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
   *   behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
   * });
   * @param options - allows specific coordinates to be defined.
   * @returns - promise that resolves once the content is scrolled to.
   */
  @method()
  async scrollContentTo(options?: ScrollToOptions): Promise<void> {
    await this.containerEl?.scrollContentTo(options);
  }

  /**
   * Sets focus on the component.
   *
   * @param options - When specified an optional object customizes the component's focusing process. When `preventScroll` is `true`, scrolling will not occur on the component.
   *
   * @mdn [focus(options)](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/focus#options)
   * @returns promise.
   */
  @method()
  async setFocus(options?: FocusOptions): Promise<void> {
    return this.focusSetter(() => {
      return this.backButtonEl || this.containerEl;
    }, options);
  }

  //#endregion

  //#region Events

  /** Fires when the back button is clicked. */
  calciteFlowItemBack = createEvent();

  /** Fires when the close button is clicked. */
  calciteFlowItemClose = createEvent({ cancelable: false });

  /** Fires when the component's content area is collapsed. */
  calciteFlowItemCollapse = createEvent({ cancelable: false });

  /** Fires when the component's content area is expanded. */
  calciteFlowItemExpand = createEvent({ cancelable: false });

  /** Fires when the content is scrolled. */
  calciteFlowItemScroll = createEvent({ cancelable: false });

  /** Fires when the collapse button is clicked. */
  calciteFlowItemToggle = createEvent({ cancelable: false });

  /** @private */
  calciteInternalFlowItemChange = createEvent({ cancelable: false });

  //#endregion

  //#region Lifecycle

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("selected") && (this.hasUpdated || this.selected !== false)) {
      this.calciteInternalFlowItemChange.emit();
    }
    if (changes.has("collapsed") && this.hasUpdated) {
      if (this.collapsed) {
        this.calciteFlowItemCollapse.emit();
      } else {
        this.calciteFlowItemExpand.emit();
      }
    }
  }

  override updated(): void {
    updateHostInteraction(this);
  }

  //#endregion

  //#region Private Methods

  private handleInternalPanelScroll(event: CustomEvent<void>): void {
    if (event.target !== this.containerEl) {
      return;
    }

    event.stopPropagation();
    this.calciteFlowItemScroll.emit();
  }

  private handleInternalPanelClose(event: CustomEvent<void>): void {
    if (event.target !== this.containerEl) {
      return;
    }

    event.stopPropagation();
    this.closed = true;
    this.calciteFlowItemClose.emit();
  }

  private handleInternalPanelToggle(event: CustomEvent<void>): void {
    if (event.target !== this.containerEl) {
      return;
    }

    event.stopPropagation();
    this.collapsed = (event.target as Panel["el"]).collapsed;
    this.calciteFlowItemToggle.emit();
  }

  private backButtonClick(): void {
    this.calciteFlowItemBack.emit();
  }

  private setBackRef(node: Action["el"]): void {
    this.backButtonEl = node;
  }

  private setContainerRef(node: Panel["el"]): void {
    this.containerEl = node;
  }

  //#endregion

  //#region Rendering

  private renderBackButton(): JsxNode {
    const { el } = this;

    const rtl = getElementDir(el) === "rtl";
    const { showBackButton, backButtonClick, messages } = this;
    const label = messages.back;
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;

    return showBackButton ? (
      <calcite-action
        ariaLabel={label}
        class={CSS.backButton}
        icon={icon}
        key="flow-back-button"
        onClick={backButtonClick}
        ref={this.setBackRef}
        scale="s"
        slot={SLOTS.headerActionsStart}
        text={label}
        title={label}
      />
    ) : null;
  }

  override render(): JsxNode {
    const {
      collapsed,
      collapseDirection,
      collapsible,
      closable,
      closed,
      description,
      disabled,
      heading,
      headingLevel,
      loading,
      menuOpen,
      messages,
      overlayPositioning,
      beforeClose,
      icon,
      iconFlipRtl,
    } = this;
    return (
      <InteractiveContainer disabled={disabled}>
        <calcite-panel
          beforeClose={beforeClose}
          closable={closable}
          closed={closed}
          collapseDirection={collapseDirection}
          collapsed={collapsed}
          collapsible={collapsible}
          description={description}
          disabled={disabled}
          heading={heading}
          headingLevel={headingLevel}
          icon={icon}
          iconFlipRtl={iconFlipRtl}
          loading={loading}
          menuOpen={menuOpen}
          messageOverrides={messages}
          oncalcitePanelClose={this.handleInternalPanelClose}
          oncalcitePanelScroll={this.handleInternalPanelScroll}
          oncalcitePanelToggle={this.handleInternalPanelToggle}
          overlayPositioning={overlayPositioning}
          ref={this.setContainerRef}
          scale={this.scale}
        >
          {this.renderBackButton()}
          <slot name={SLOTS.actionBar} slot={PANEL_SLOTS.actionBar} />
          <slot name={SLOTS.alerts} slot={PANEL_SLOTS.alerts} />
          <slot name={SLOTS.headerActionsStart} slot={PANEL_SLOTS.headerActionsStart} />
          <slot name={SLOTS.headerActionsEnd} slot={PANEL_SLOTS.headerActionsEnd} />
          <slot name={SLOTS.headerContent} slot={PANEL_SLOTS.headerContent} />
          <slot name={SLOTS.headerMenuActions} slot={PANEL_SLOTS.headerMenuActions} />
          <slot name={SLOTS.fab} slot={PANEL_SLOTS.fab} />
          <slot name={SLOTS.contentTop} slot={PANEL_SLOTS.contentTop} />
          <slot name={SLOTS.contentBottom} slot={PANEL_SLOTS.contentBottom} />
          <slot name={SLOTS.footerStart} slot={PANEL_SLOTS.footerStart} />
          <slot name={SLOTS.footer} slot={PANEL_SLOTS.footer} />
          <slot name={SLOTS.footerEnd} slot={PANEL_SLOTS.footerEnd} />
          <slot name={SLOTS.footerActions} slot={PANEL_SLOTS.footerActions} />
          <slot />
        </calcite-panel>
      </InteractiveContainer>
    );
  }

  //#endregion
}
