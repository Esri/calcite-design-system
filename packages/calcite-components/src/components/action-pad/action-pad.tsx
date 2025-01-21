// @ts-strict-ignore
import { PropertyValues } from "lit";
import { LitElement, property, createEvent, h, method, state, JsxNode } from "@arcgis/lumina";
import { focusFirstTabbable, slotChangeGetAssignedElements } from "../../utils/dom";
import {
  componentFocusable,
  LoadableComponent,
  setComponentLoaded,
  setUpLoadableComponent,
} from "../../utils/loadable";
import { ExpandToggle, toggleChildActionText } from "../functional/ExpandToggle";
import { Layout, Position, Scale } from "../interfaces";
import { createObserver } from "../../utils/observers";
import { OverlayPositioning } from "../../utils/floating-ui";
import { useT9n } from "../../controllers/useT9n";
import type { Tooltip } from "../tooltip/tooltip";
import type { ActionGroup } from "../action-group/action-group";
import T9nStrings from "./assets/t9n/messages.en.json";
import { CSS, SLOTS } from "./resources";
import { styles } from "./action-pad.scss";

declare global {
  interface DeclareElements {
    "calcite-action-pad": ActionPad;
  }
}

/**
 * @slot - A slot for adding `calcite-action`s to the component.
 * @slot expand-tooltip - A slot to set the `calcite-tooltip` for the expand toggle.
 */
export class ActionPad extends LitElement implements LoadableComponent {
  // #region Static Members

  static override shadowRootOptions = { mode: "open" as const, delegatesFocus: true };

  static override styles = styles;

  // #endregion

  // #region Private Properties

  private actionGroups: ActionGroup["el"][];

  private mutationObserver = createObserver("mutation", () => this.updateGroups());

  private toggleExpand = (): void => {
    this.expanded = !this.expanded;
    this.calciteActionPadToggle.emit();
  };

  // #endregion

  // #region State Properties

  @state() expandTooltip: Tooltip["el"];

  // #endregion

  // #region Public Properties

  /** Specifies the accessible label for the last `calcite-action-group`. */
  @property() actionsEndGroupLabel: string;

  /** When `true`, the expand-toggling behavior is disabled. */
  @property({ reflect: true }) expandDisabled = false;

  /** When `true`, the component is expanded. */
  @property({ reflect: true }) expanded = false;

  /** Indicates the layout of the component. */
  @property({ reflect: true }) layout: Extract<"horizontal" | "vertical" | "grid", Layout> =
    "vertical";

  /** Use this property to override individual strings used by the component. */
  @property() messageOverrides?: typeof this.messages._overrides;

  /**
   * Made into a prop for testing purposes only
   *
   * @private
   */
  messages = useT9n<typeof T9nStrings>();

  /**
   * Determines the type of positioning to use for the overlaid content.
   *
   * Using `"absolute"` will work for most cases. The component will be positioned inside of overflowing parent containers and will affect the container's layout.
   *
   * `"fixed"` should be used to escape an overflowing parent container, or when the reference element's `position` CSS property is `"fixed"`.
   */
  @property({ reflect: true }) overlayPositioning: OverlayPositioning = "absolute";

  /** Arranges the component depending on the element's `dir` property. */
  @property({ reflect: true }) position: Extract<"start" | "end", Position>;

  /** Specifies the size of the expand `calcite-action`. */
  @property({ reflect: true }) scale: Scale = "m";

  // #endregion

  // #region Public Methods

  /** Sets focus on the component's first focusable element. */
  @method()
  async setFocus(): Promise<void> {
    await componentFocusable(this);
    focusFirstTabbable(this.el);
  }

  // #endregion

  // #region Events

  /** Fires when the `expanded` property is toggled. */
  calciteActionPadToggle = createEvent({ cancelable: false });

  // #endregion

  // #region Lifecycle

  constructor() {
    super();
    this.listen("calciteActionMenuOpen", this.actionMenuOpenHandler);
  }

  override connectedCallback(): void {
    this.mutationObserver?.observe(this.el, { childList: true, subtree: true });
  }

  async load(): Promise<void> {
    setUpLoadableComponent(this);
  }

  override willUpdate(changes: PropertyValues<this>): void {
    /* TODO: [MIGRATION] First time Lit calls willUpdate(), changes will include not just properties provided by the user, but also any default values your component set.
    To account for this semantics change, the checks for (this.hasUpdated || value != defaultValue) was added in this method
    Please refactor your code to reduce the need for this check.
    Docs: https://qawebgis.esri.com/arcgis-components/?path=/docs/lumina-transition-from-stencil--docs#watching-for-property-changes */
    if (changes.has("expanded") && this.hasUpdated) {
      toggleChildActionText({ el: this.el, expanded: this.expanded });
    }

    if (changes.has("layout") && (this.hasUpdated || this.layout !== "vertical")) {
      this.updateGroups();
    }
  }

  loaded(): void {
    setComponentLoaded(this);
  }

  override disconnectedCallback(): void {
    this.mutationObserver?.disconnect();
  }

  // #endregion

  // #region Private Methods
  private actionMenuOpenHandler(event: CustomEvent<void>): void {
    if ((event.target as ActionGroup["el"]).menuOpen) {
      const composedPath = event.composedPath();
      this.actionGroups?.forEach((group) => {
        if (!composedPath.includes(group)) {
          group.menuOpen = false;
        }
      });
    }
  }

  private updateGroups(): void {
    const groups = Array.from(this.el.querySelectorAll("calcite-action-group"));
    this.actionGroups = groups;
    this.setGroupLayout(groups);
  }

  private setGroupLayout(groups: ActionGroup["el"][]): void {
    groups.forEach((group) => (group.layout = this.layout));
  }

  private handleDefaultSlotChange(): void {
    this.updateGroups();
  }

  private handleTooltipSlotChange(event: Event): void {
    const tooltips = slotChangeGetAssignedElements(event).filter((el): el is Tooltip["el"] =>
      el?.matches("calcite-tooltip"),
    );

    this.expandTooltip = tooltips[0];
  }

  // #endregion

  // #region Rendering

  private renderBottomActionGroup(): JsxNode {
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
        <slot name={SLOTS.expandTooltip} onSlotChange={this.handleTooltipSlotChange} />
        {expandToggleNode}
      </calcite-action-group>
    ) : null;
  }

  override render(): JsxNode {
    return (
      <div class={CSS.container}>
        <slot onSlotChange={this.handleDefaultSlotChange} />
        {this.renderBottomActionGroup()}
      </div>
    );
  }

  // #endregion
}
