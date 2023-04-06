import { Component, Element, Fragment, h, Method, Prop, State, VNode, Watch } from "@stencil/core";
import { CalciteActionMenuCustomEvent } from "../../components";
import {
  ConditionalSlotComponent,
  connectConditionalSlotComponent,
  disconnectConditionalSlotComponent
} from "../../utils/conditionalSlot";
import { getSlotted } from "../../utils/dom";
import {
  componentLoaded,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent
} from "../../utils/loadable";
import { connectLocalized, disconnectLocalized, LocalizedComponent } from "../../utils/locale";
import {
  connectMessages,
  disconnectMessages,
  setUpMessages,
  T9nComponent,
  updateMessages
} from "../../utils/t9n";
import { SLOTS as ACTION_MENU_SLOTS } from "../action-menu/resources";
import { Columns, Layout, Scale } from "../interfaces";
import { ActionGroupMessages } from "./assets/action-group/t9n";
import { ICONS, SLOTS } from "./resources";

/**
 * @slot - A slot for adding a group of `calcite-action`s.
 * @slot menu-actions - A slot for adding an overflow menu with `calcite-action`s inside a `calcite-dropdown`.
 * @slot menu-tooltip - A slot for adding a `calcite-tooltip` for the menu.
 */
@Component({
  tag: "calcite-action-group",
  styleUrl: "action-group.scss",
  shadow: {
    delegatesFocus: true
  },
  assetsDirs: ["assets"]
})
export class ActionGroup
  implements ConditionalSlotComponent, LoadableComponent, LocalizedComponent, T9nComponent
{
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
   * Indicates the layout of the component.
   *
   * @deprecated Use the `layout` property on the component's parent component instead.
   */
  @Prop({ reflect: true }) layout: Layout = "vertical";

  /**
   * Indicates number of columns.
   */
  @Prop({ reflect: true }) columns: Columns;

  /**
   * When `true`, the `calcite-action-menu` is open.
   */
  @Prop({ reflect: true, mutable: true }) menuOpen = false;

  /**
   * Specifies the size of the `calcite-action-menu`.
   */
  @Prop({ reflect: true }) scale: Scale;

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

  //--------------------------------------------------------------------------
  //
  //  Public Methods
  //
  //--------------------------------------------------------------------------

  /** Sets focus on the component's first focusable element. */
  @Method()
  async setFocus(): Promise<void> {
    await componentLoaded(this);
    this.el.focus();
  }
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    connectConditionalSlotComponent(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
    disconnectConditionalSlotComponent(this);
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

  renderTooltip(): VNode {
    const { el } = this;
    const hasTooltip = getSlotted(el, SLOTS.menuTooltip);

    return hasTooltip ? <slot name={SLOTS.menuTooltip} slot={ACTION_MENU_SLOTS.tooltip} /> : null;
  }

  renderMenu(): VNode {
    const { el, expanded, menuOpen, scale, layout, messages } = this;

    const hasMenuItems = getSlotted(el, SLOTS.menuActions);

    return hasMenuItems ? (
      <calcite-action-menu
        expanded={expanded}
        flipPlacements={["left", "right"]}
        label={messages.more}
        onCalciteActionMenuOpen={this.setMenuOpen}
        open={menuOpen}
        placement={layout === "horizontal" ? "bottom-start" : "leading-start"}
        scale={scale}
      >
        <calcite-action
          icon={ICONS.menu}
          scale={scale}
          slot={ACTION_MENU_SLOTS.trigger}
          text={messages.more}
          textEnabled={expanded}
        />
        <slot name={SLOTS.menuActions} />
        {this.renderTooltip()}
      </calcite-action-menu>
    ) : null;
  }

  render(): VNode {
    return (
      <Fragment>
        <slot />
        {this.renderMenu()}
      </Fragment>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  setMenuOpen = (event: CalciteActionMenuCustomEvent<void>): void => {
    this.menuOpen = !!(event.target as HTMLCalciteActionMenuElement).open;
  };
}
