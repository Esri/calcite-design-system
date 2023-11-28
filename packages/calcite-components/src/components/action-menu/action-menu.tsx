import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Listen,
  Method,
  Prop,
  State,
  Watch,
} from "@stencil/core";
import { Fragment, VNode } from "@stencil/core/internal";
import { getRoundRobinIndex } from "../../utils/array";
import { focusElement, isPrimaryPointerButton, toAriaBoolean } from "../../utils/dom";
import { EffectivePlacement, LogicalPlacement, OverlayPositioning } from "../../utils/floating-ui";
import { guid } from "../../utils/guid";
import { isActivationKey } from "../../utils/key";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { Appearance, Scale } from "../interfaces";
import { activeAttr, CSS, ICONS, SLOTS } from "./resources";

const SUPPORTED_MENU_NAV_KEYS = ["ArrowUp", "ArrowDown", "End", "Home"];

/**
 * @slot - A slot for adding `calcite-action`s.
 * @slot trigger - A slot for adding a `calcite-action` to trigger opening the menu.
 * @slot tooltip - A slot for adding an tooltip for the menu.
 */
@Component({
  tag: "calcite-action-menu",
  styleUrl: "action-menu.scss",
  shadow: true,
})
export class ActionMenu implements LoadableComponent {
  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  componentWillLoad(): void {
    setUpLoadableComponent(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    this.disconnectMenuButtonEl();
  }

  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** Specifies the appearance of the component. */
  @Prop({ reflect: true }) appearance: Extract<"solid" | "transparent", Appearance> = "solid";

  /**
   * When `true`, the component is expanded.
   */
  @Prop({ reflect: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(): void {
    this.open = false;
    this.setTooltipReferenceElement();
  }

  /**
   * Defines the available placements that can be used when a flip occurs.
   */
  @Prop() flipPlacements: EffectivePlacement[];

  /**
   *  Specifies the text string for the component.
   */
  @Prop() label!: string;

  /**
   * When `true`, the component is open.
   */
  @Prop({ reflect: true, mutable: true }) open = false;

  @Watch("open")
  openHandler(open: boolean): void {
    this.activeMenuItemIndex = this.open ? 0 : -1;
    if (this.menuButtonEl) {
      this.menuButtonEl.active = open;
    }
    this.calciteActionMenuOpen.emit();

    this.setTooltipReferenceElement();
  }

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /**
   * Determines where the component will be positioned relative to the `referenceElement`.
   */
  @Prop({ reflect: true }) placement: LogicalPlacement = "auto";

  /**
   * Specifies the size of the component's trigger `calcite-action`.
   */
  @Prop({ reflect: true }) scale: Scale;

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Emits when the `open` property is toggled.
   *
   */
  @Event({ cancelable: false }) calciteActionMenuOpen: EventEmitter<void>;

  @Listen("pointerdown", { target: "window" })
  closeCalciteActionMenuOnClick(event: PointerEvent): void {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    const composedPath = event.composedPath();

    if (composedPath.includes(this.el)) {
      return;
    }

    this.open = false;
  }

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionMenuElement;

  @State() menuButtonEl: HTMLCalciteActionElement;

  slottedMenuButtonEl: HTMLCalciteActionElement;

  defaultMenuButtonEl: HTMLCalciteActionElement;

  actionElements: HTMLCalciteActionElement[] = [];

  guid = `calcite-action-menu-${guid()}`;

  menuId = `${this.guid}-menu`;

  menuButtonId = `${this.guid}-menu-button`;

  tooltipEl: HTMLCalciteTooltipElement;

  @State() activeMenuItemIndex = -1;

  @Watch("activeMenuItemIndex")
  activeMenuItemIndexHandler(): void {
    this.updateActions(this.actionElements);
  }

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /** Sets focus on the component. */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    return focusElement(this.menuButtonEl);
  }

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  connectMenuButtonEl = (): void => {
    const { menuButtonId, menuId, open, label } = this;
    const menuButtonEl = this.slottedMenuButtonEl || this.defaultMenuButtonEl;

    if (this.menuButtonEl === menuButtonEl) {
      return;
    }

    this.disconnectMenuButtonEl();

    this.menuButtonEl = menuButtonEl;

    this.setTooltipReferenceElement();

    if (!menuButtonEl) {
      return;
    }

    menuButtonEl.active = open;
    menuButtonEl.setAttribute("aria-controls", menuId);
    menuButtonEl.setAttribute("aria-expanded", toAriaBoolean(open));
    menuButtonEl.setAttribute("aria-haspopup", "true");

    if (!menuButtonEl.id) {
      menuButtonEl.id = menuButtonId;
    }

    if (!menuButtonEl.label) {
      menuButtonEl.label = label;
    }

    if (!menuButtonEl.text) {
      menuButtonEl.text = label;
    }

    menuButtonEl.addEventListener("pointerdown", this.menuButtonClick);
    menuButtonEl.addEventListener("keydown", this.menuButtonKeyDown);
  };

  disconnectMenuButtonEl = (): void => {
    const { menuButtonEl } = this;

    if (!menuButtonEl) {
      return;
    }

    menuButtonEl.removeEventListener("pointerdown", this.menuButtonClick);
    menuButtonEl.removeEventListener("keydown", this.menuButtonKeyDown);
  };

  setMenuButtonEl = (event: Event): void => {
    const actions = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true,
      })
      .filter((el) => el?.matches("calcite-action")) as HTMLCalciteActionElement[];

    this.slottedMenuButtonEl = actions[0];
    this.connectMenuButtonEl();
  };

  setDefaultMenuButtonEl = (el: HTMLCalciteActionElement): void => {
    this.defaultMenuButtonEl = el;
    this.connectMenuButtonEl();
  };

  renderMenuButton(): VNode {
    const { appearance, label, scale, expanded } = this;

    const menuButtonSlot = (
      <slot name={SLOTS.trigger} onSlotchange={this.setMenuButtonEl}>
        <calcite-action
          appearance={appearance}
          class={CSS.defaultTrigger}
          icon={ICONS.menu}
          scale={scale}
          text={label}
          textEnabled={expanded}
          // eslint-disable-next-line react/jsx-sort-props -- ref should be last so node attrs/props are in sync (see https://github.com/Esri/calcite-design-system/pull/6530)
          ref={this.setDefaultMenuButtonEl}
        />
      </slot>
    );

    return menuButtonSlot;
  }

  renderMenuItems(): VNode {
    const {
      actionElements,
      activeMenuItemIndex,
      open,
      menuId,
      menuButtonEl,
      label,
      placement,
      overlayPositioning,
      flipPlacements,
    } = this;

    const activeAction = actionElements[activeMenuItemIndex];
    const activeDescendantId = activeAction?.id || null;

    return (
      <calcite-popover
        flipPlacements={flipPlacements}
        focusTrapDisabled={true}
        label={label}
        offsetDistance={0}
        open={open}
        overlayPositioning={overlayPositioning}
        placement={placement}
        pointerDisabled={true}
        referenceElement={menuButtonEl}
      >
        <div
          aria-activedescendant={activeDescendantId}
          aria-labelledby={menuButtonEl?.id}
          class={CSS.menu}
          id={menuId}
          onClick={this.handleCalciteActionClick}
          role="menu"
          tabIndex={-1}
        >
          <slot onSlotchange={this.handleDefaultSlotChange} />
        </div>
      </calcite-popover>
    );
  }

  render(): VNode {
    return (
      <Fragment>
        {this.renderMenuButton()}
        {this.renderMenuItems()}
        <slot name={SLOTS.tooltip} onSlotchange={this.updateTooltip} />
      </Fragment>
    );
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handleCalciteActionClick = (): void => {
    this.open = false;
    this.setFocus();
  };

  menuButtonClick = (event: PointerEvent): void => {
    if (!isPrimaryPointerButton(event)) {
      return;
    }

    this.toggleOpen();
  };

  updateTooltip = (event: Event): void => {
    const tooltips = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true,
      })
      .filter((el) => el?.matches("calcite-tooltip")) as HTMLCalciteTooltipElement[];

    this.tooltipEl = tooltips[0];
    this.setTooltipReferenceElement();
  };

  setTooltipReferenceElement = (): void => {
    const { tooltipEl, expanded, menuButtonEl, open } = this;

    if (tooltipEl) {
      tooltipEl.referenceElement = !expanded && !open ? menuButtonEl : null;
    }
  };

  updateAction = (action: HTMLCalciteActionElement, index: number): void => {
    const { guid, activeMenuItemIndex } = this;
    const id = `${guid}-action-${index}`;

    action.tabIndex = -1;
    action.setAttribute("role", "menuitem");

    if (!action.id) {
      action.id = id;
    }

    // data attribute is used to style the "activeMenuItemIndex" action using token focus styling.
    action.toggleAttribute(activeAttr, index === activeMenuItemIndex);
  };

  updateActions = (actions: HTMLCalciteActionElement[]): void => {
    actions?.forEach(this.updateAction);
  };

  handleDefaultSlotChange = (event: Event): void => {
    const actions = (event.target as HTMLSlotElement)
      .assignedElements({
        flatten: true,
      })
      .reduce((previousValue: HTMLCalciteActionElement[], currentValue) => {
        if (currentValue?.matches("calcite-action")) {
          return previousValue.push(currentValue as HTMLCalciteActionElement);
        }

        if (currentValue?.matches("calcite-action-group")) {
          const groupActions = Array.from(
            currentValue.querySelectorAll("calcite-action")
          ) as HTMLCalciteActionElement[];

          return previousValue.concat(groupActions);
        }

        return previousValue;
      }, []) as HTMLCalciteActionElement[];

    this.actionElements = actions;
  };

  isValidKey(key: string, supportedKeys: string[]): boolean {
    return !!supportedKeys.find((k) => k === key);
  }

  menuButtonKeyDown = (event: KeyboardEvent): void => {
    const { key } = event;
    const { actionElements, activeMenuItemIndex, open } = this;

    if (!actionElements.length) {
      return;
    }

    if (isActivationKey(key)) {
      event.preventDefault();

      if (!open) {
        this.toggleOpen();
        return;
      }

      const action = actionElements[activeMenuItemIndex];
      action ? action.click() : this.toggleOpen(false);
    }

    if (key === "Tab") {
      this.open = false;
      return;
    }

    if (key === "Escape") {
      this.toggleOpen(false);
      event.preventDefault();
      return;
    }

    this.handleActionNavigation(event, key, actionElements);
  };

  handleActionNavigation = (
    event: KeyboardEvent,
    key: string,
    actions: HTMLCalciteActionElement[]
  ): void => {
    if (!this.isValidKey(key, SUPPORTED_MENU_NAV_KEYS)) {
      return;
    }

    event.preventDefault();

    if (!this.open) {
      this.toggleOpen();

      if (key === "Home" || key === "ArrowDown") {
        this.activeMenuItemIndex = 0;
      }

      if (key === "End" || key === "ArrowUp") {
        this.activeMenuItemIndex = actions.length - 1;
      }

      return;
    }

    if (key === "Home") {
      this.activeMenuItemIndex = 0;
    }

    if (key === "End") {
      this.activeMenuItemIndex = actions.length - 1;
    }

    const currentIndex = this.activeMenuItemIndex;

    if (key === "ArrowUp") {
      this.activeMenuItemIndex = getRoundRobinIndex(Math.max(currentIndex - 1, -1), actions.length);
    }

    if (key === "ArrowDown") {
      this.activeMenuItemIndex = getRoundRobinIndex(currentIndex + 1, actions.length);
    }
  };

  toggleOpenEnd = (): void => {
    this.setFocus();
    this.el.removeEventListener("calcitePopoverOpen", this.toggleOpenEnd);
  };

  toggleOpen = (value = !this.open): void => {
    this.el.addEventListener("calcitePopoverOpen", this.toggleOpenEnd);
    this.open = value;
  };
}
