import { Component, Element, h, Method, Prop, State, VNode, Watch } from "@stencil/core";
import { CalciteActionMenuCustomEvent } from "../../components";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages,
} from "../../utils/t9n";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import { Layout, Scale } from "../interfaces";
import { FlipPlacement, LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
import { focusFirstTabbable, slotChangeHasAssignedElement } from "../../utils/dom";
import { Columns } from "./interfaces";
import { ActionGroupMessages } from "./assets/action-group/t9n";
import { ICONS, SLOTS, CSS } from "./resources";

/**
 * @slot - A slot for adding a group of `calcite-action`s.
 * @slot menu-actions - A slot for adding an overflow menu with `calcite-action`s inside a `calcite-dropdown`.
 * @slot menu-tooltip - A slot for adding a `calcite-tooltip` for the menu.
 */
@Component({
  tag: "calcite-action-group",
  styleUrl: "action-group.scss",
  shadow: {
    delegatesFocus: true,
  },
  assetsDirs: ["assets"],
})
export class ActionGroup implements LoadableComponent, LocalizedComponent, T9nComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * When `true`, the component is expanded.
   */
  @Prop({ reflect: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(): void {
    this.menuOpen = false;
  }

  /**
   *  Accessible name for the component.
   */
  @Prop() label: string;

  /**
   * Indicates the layout of the component.
   *
   * @deprecated Use the `layout` property on the component's parent instead.
   */
  @Prop({ reflect: true }) layout: Extract<"horizontal" | "vertical" | "grid", Layout> = "vertical";

  /**
   * Indicates number of columns.
   */
  @Prop({ reflect: true }) columns: Columns;

  /**
   * When `true`, the `calcite-action-menu` is open.
   */
  @Prop({ reflect: true, mutable: true }) menuOpen = false;

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Specifies the size of the `calcite-action-menu`.
   */
  @Prop({ reflect: true }) scale: Scale;

  /**
   * Specifies the component's fallback menu `placement` when it's initial or specified `placement` has insufficient space available.
   */
  @Prop() menuFlipPlacements: FlipPlacement[];

  /**
   * Determines where the action menu will be positioned.
   */
  @Prop({ reflect: true }) menuPlacement: LogicalPlacement;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ActionGroupMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ActionGroupMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------
  @Element() el: HTMLCalciteActionGroupElement;

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: ActionGroupMessages;

  @State() hasMenuActions = false;

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component's first focusable element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  renderMenu(): VNode {
    const {
      expanded,
      menuOpen,
      scale,
      layout,
      messages,
      overlayPositioning,
      hasMenuActions,
      menuFlipPlacements,
      menuPlacement,
    } = this;

    return (
      <calcite-action-menu
        expanded={expanded}
        flipPlacements={
          menuFlipPlacements ?? (layout === "horizontal" ? ["top", "bottom"] : ["left", "right"])
        }
        hidden={!hasMenuActions}
        label={messages.more}
        onCalciteActionMenuOpen={this.setMenuOpen}
        open={menuOpen}
        overlayPositioning={overlayPositioning}
        placement={menuPlacement ?? (layout === "horizontal" ? "bottom-start" : "leading-start")}
        scale={scale}
      >
        <calcite-action
          icon={ICONS.menu}
          scale={scale}
          slot={ACTION_MENU_SLOTS.trigger}
          text={messages.more}
          textEnabled={expanded}
        />
        <slot name={SLOTS.menuActions} onSlotchange={this.handleMenuActionsSlotChange} />
        <slot name={SLOTS.menuTooltip} slot={ACTION_MENU_SLOTS.tooltip} />
      </calcite-action-menu>
    );
  }

  render(): VNode {
    return (
      <div aria-label={this.label} class={CSS.container} role="group">
        <slot />
        {this.renderMenu()}
      </div>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setMenuOpen = (event: CalciteActionMenuCustomEvent<void>): void => {
    this.menuOpen = !!event.target.open;
  };

  handleMenuActionsSlotChange = (event: Event): void => {
    this.hasMenuActions = slotChangeHasAssignedElement(event);
  };
}
