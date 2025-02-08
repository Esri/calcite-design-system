import {
  Component,
  Element,
  Event,
  EventEmitter,
  h,
  Host,
  Method,
  Prop,
  State,
  VNode,
  Watch,
} from "@stencil/core";
import { slotChangeGetAssignedElements } from "../../utils/dom";
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
import { ExpandToggle, toggleChildActionText } from "../functional/ExpandToggle";
import { Layout, Position, Scale } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { OverlayPositioning } from "../../utils/floating-ui";
import { ActionPadMessages } from "./assets/action-pad/t9n";
import { CSS, SLOTS } from "./resources";

/**
 * @slot - A slot for adding `calcite-action`s to the component.
 * @slot expand-tooltip - A slot to set the `calcite-tooltip` for the expand toggle.
 */
@Component({
  tag: "calcite-action-pad",
  styleUrl: "action-pad.scss",
  shadow: {
    delegatesFocus: true,
  },
  assetsDirs: ["assets"],
})
export class ActionPad implements LoadableComponent, LocalizedComponent, T9nComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /**
   * Specifies the accessible label for the last `calcite-action-group`.
   */
  @Prop() actionsEndGroupLabel: string;

  /**
   * When `true`, the expand-toggling behavior is disabled.
   */
  @Prop({ reflect: true }) expandDisabled = false;

  /**
   * When `true`, the component is expanded.
   */
  @Prop({ reflect: true, mutable: true }) expanded = false;

  @Watch("expanded")
  expandedHandler(expanded: boolean): void {
    toggleChildActionText({ el: this.el, expanded });
  }

  /**
   * Indicates the layout of the component.
   */
  @Prop({ reflect: true }) layout: Extract<"horizontal" | "vertical" | "grid", Layout> = "vertical";

  @Watch("layout")
  layoutHandler(): void {
    this.updateGroups();
  }

  /**
   * Arranges the component depending on the element's `dir` property.
   */
  @Prop({ reflect: true }) position: Extract<"start" | "end", Position>;

  /**
   * Specifies the size of the expand `calcite-action`.
   */
  @Prop({ reflect: true }) scale: Scale;

  /**
   * Made into a prop for testing purposes only
   *
   * @internal
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messages: ActionPadMessages;

  /**
   * Use this property to override individual strings used by the component.
   */
  // eslint-disable-next-line @stencil-community/strict-mutable -- updated by t9n module
  @Prop({ mutable: true }) messageOverrides: Partial<ActionPadMessages>;

  @Watch("messageOverrides")
  onMessagesChange(): void {
    /* wired up by t9n util */
  }

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   *
   */
  @Prop({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the `expanded` property is toggled.
   */
  @Event({ cancelable: false }) calciteActionPadToggle: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteActionPadElement;

  @State() expandTooltip: HTMLCalciteTooltipElement;

  mutationObserver = createObserver("mutation", () => this.updateGroups());

  actionGroups: HTMLCalciteActionGroupElement[];

  @State() effectiveLocale = "";

  @Watch("effectiveLocale")
  effectiveLocaleChange(): void {
    updateMessages(this, this.effectiveLocale);
  }

  @State() defaultMessages: ActionPadMessages;

  // --------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  // --------------------------------------------------------------------------

  connectedCallback(): void {
    connectLocalized(this);
    connectMessages(this);
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  async componentWillLoad(): Promise<void> {
    setUpLoadableComponent(this);
    await setUpMessages(this);
  }

  componentDidLoad(): void {
    setComponentLoaded(this);
  }

  disconnectedCallback(): void {
    disconnectLocalized(this);
    disconnectMessages(this);
    this.mutationObserver?.disconnect();
  }

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Sets focus on the component's first focusable element.
   */
  @Method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);

    this.el?.focus();
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  actionMenuOpenHandler = (event: CustomEvent<void>): void => {
    if ((event.target as HTMLCalciteActionGroupElement).menuOpen) {
      const composedPath = event.composedPath();
      this.actionGroups?.forEach((group) => {
        if (!composedPath.includes(group)) {
          group.menuOpen = false;
        }
      });
    }
  };

  toggleExpand = (): void => {
    this.expanded = !this.expanded;
    this.calciteActionPadToggle.emit();
  };

  updateGroups(): void {
    const groups = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = groups;
    this.setGroupLayout(groups);
  }

  setGroupLayout(groups: HTMLCalciteActionGroupElement[]): void {
    groups.forEach((group) => (group.layout = this.layout));
  }

  handleDefaultSlotChange = (): void => {
    this.updateGroups();
  };

  handleTooltipSlotChange = (event: Event): void => {
    const tooltips = slotChangeGetAssignedElements(event).filter(
      (el): el is HTMLCalciteTooltipElement => el?.matches("calcite-tooltip"),
    );

    this.expandTooltip = tooltips[0];
  };

  // --------------------------------------------------------------------------
  //
  //  Component Methods
  //
  // --------------------------------------------------------------------------

  renderBottomActionGroup(): VNode {
    const {
      expanded,
      expandDisabled,
      messages,
      el,
      position,
      toggleExpand,
      scale,
      layout,
      actionsEndGroupLabel,
      overlayPositioning,
    } = this;

    const expandToggleNode = !expandDisabled ? (
      <ExpandToggle
        collapseLabel={messages.collapseLabel}
        collapseText={messages.collapse}
        el={el}
        expandLabel={messages.expandLabel}
        expandText={messages.expand}
        expanded={expanded}
        position={position}
        scale={scale}
        toggle={toggleExpand}
        tooltip={this.expandTooltip}
      />
    ) : null;

    return expandToggleNode ? (
      <calcite-action-group
        class={CSS.actionGroupEnd}
        label={actionsEndGroupLabel}
        layout={layout}
        overlayPositioning={overlayPositioning}
        scale={scale}
      >
        <slot name={SLOTS.expandTooltip} onSlotchange={this.handleTooltipSlotChange} />
        {expandToggleNode}
      </calcite-action-group>
    ) : null;
  }

  render(): VNode {
    return (
      <Host onCalciteActionMenuOpen={this.actionMenuOpenHandler}>
        <div class={CSS.container}>
          <slot onSlotchange={this.handleDefaultSlotChange} />
          {this.renderBottomActionGroup()}
        </div>
      </Host>
    );
  }
}
