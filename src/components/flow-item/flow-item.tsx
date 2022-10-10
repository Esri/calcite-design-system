import {
  Component,
  Element,
  Prop,
  h,
  VNode,
  Host,
  Method,
  Event,
  EventEmitter,
  State
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { HeadingLevel } from "../functional/Heading";
import { Scale } from "../interfaces";
import { CSS, ICONS, TEXT, SLOTS } from "./resources";
import { SLOTS as PANEL_SLOTS } from "../panel/resources";
import { InteractiveComponent, updateHostInteraction } from "../../utils/interactive";

/**
 * @slot - A slot for adding custom content.
 * @slot header-actions-start - A slot for adding actions or content to the start side of the header.
 * @slot header-actions-end - A slot for adding actions or content to the end side of the header.
 * @slot header-content - A slot for adding custom content to the header.
 * @slot header-menu-actions - A slot for adding an overflow menu with actions inside a `calcite-dropdown`.
 * @slot fab - A slot for adding a `calcite-fab` (floating action button) to perform an action.
 * @slot footer-actions - A slot for adding buttons to the footer.
 * @slot footer - A slot for adding custom content to the footer.
 */
@Component({
  tag: "calcite-flow-item",
  styleUrl: "flow-item.scss",
  shadow: true
})
export class FlowItem implements InteractiveComponent {
  // --------------------------------------------------------------------------
  //
  //  Properties
  //
  // --------------------------------------------------------------------------

  /** When true, displays a close button in the trailing side of the header */
  @Prop({ mutable: true, reflect: true }) closable = false;

  /** When true, flow-item will be hidden */
  @Prop({ mutable: true, reflect: true }) closed = false;

  /**
   * When provided, this method will be called before it is removed from the parent flow.
   */
  @Prop() beforeBack?: () => Promise<void>;

  /** A description for the component. */
  @Prop() description: string;

  /**
   *  When true, interaction is prevented and the component is displayed with lower opacity.
   */
  @Prop({ reflect: true }) disabled = false;

  /**
   * The component header text.
   */
  @Prop() heading?: string;

  /**
   * Specifies the number at which section headings should start.
   */
  @Prop({ reflect: true }) headingLevel: HeadingLevel;

  /**
   * Specifies the maximum height of the component.
   */
  @Prop({ reflect: true }) heightScale?: Scale;

  /**
   * Accessible name for the component's back button. The back button will only be shown when 'showBackButton' is true.
   */
  @Prop() intlBack?: string;

  /**
   * Accessible name for the component's close button. The close button will only be shown when 'dismissible' is true.
   */
  @Prop() intlClose?: string;

  /**
   * Accessible name for the component's actions menu.
   */
  @Prop() intlOptions?: string;

  /**
   * When true, a busy indicator is displayed.
   */
  @Prop({ reflect: true }) loading = false;

  /**
   * When true, the action menu items in the `header-menu-actions` slot are open.
   */
  @Prop({ reflect: true }) menuOpen = false;

  /**
   * When true, displays a back button in the header.
   */
  @Prop({ reflect: true }) showBackButton = false;

  /**
   * Specifies the width of the component.
   */
  @Prop({ reflect: true }) widthScale?: Scale;

  //--------------------------------------------------------------------------
  //
  //  Lifecycle
  //
  //--------------------------------------------------------------------------

  componentDidRender(): void {
    updateHostInteraction(this);
  }

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the back button is clicked.
   */
  @Event({ cancelable: false }) calciteFlowItemBack: EventEmitter<void>;

  /**
   * Fires when the back button is clicked.
   *
   * @deprecated use calciteFlowItemBack instead.
   */
  @Event({ cancelable: false }) calciteFlowItemBackClick: EventEmitter<void>;

  /**
   * Fires when the close button is clicked.
   */
  @Event({ cancelable: false }) calciteFlowItemClose: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteFlowItemElement;

  containerEl: HTMLCalcitePanelElement;

  @State()
  backButtonEl: HTMLCalciteActionElement;

  // --------------------------------------------------------------------------
  //
  //  Methods
  //
  // --------------------------------------------------------------------------

  /**
   * Sets focus on the component.
   */
  @Method()
  async setFocus(): Promise<void> {
    const { backButtonEl, containerEl } = this;

    if (backButtonEl) {
      backButtonEl.setFocus();
      return;
    }

    containerEl?.setFocus();
  }

  /**
   * Scrolls the component's content to a specified set of coordinates.
   *
   * @example
   * myCalciteFlowItem.scrollContentTo({
   *   left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
   *   top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
   *   behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
   * });
   * @param options
   */
  @Method()
  async scrollContentTo(options?: ScrollToOptions): Promise<void> {
    this.containerEl?.scrollContentTo(options);
  }

  // --------------------------------------------------------------------------
  //
  //  Private Methods
  //
  // --------------------------------------------------------------------------

  handlePanelClose = (event: CustomEvent<void>): void => {
    event.stopPropagation();
    this.calciteFlowItemClose.emit();
  };

  backButtonClick = (): void => {
    this.calciteFlowItemBackClick.emit();
    this.calciteFlowItemBack.emit();
  };

  setBackRef = (node: HTMLCalciteActionElement): void => {
    this.backButtonEl = node;
  };

  getBackLabel = (): string => {
    return this.intlBack || TEXT.back;
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderBackButton(): VNode {
    const { el } = this;

    const rtl = getElementDir(el) === "rtl";
    const { showBackButton, backButtonClick } = this;
    const label = this.getBackLabel();
    const icon = rtl ? ICONS.backRight : ICONS.backLeft;

    return showBackButton ? (
      <calcite-action
        aria-label={label}
        class={CSS.backButton}
        icon={icon}
        key="flow-back-button"
        onClick={backButtonClick}
        ref={this.setBackRef}
        scale="s"
        slot="header-actions-start"
        text={label}
      />
    ) : null;
  }

  render(): VNode {
    const {
      closable,
      closed,
      description,
      disabled,
      heading,
      headingLevel,
      heightScale,
      intlBack,
      intlClose,
      intlOptions,
      loading,
      menuOpen,
      widthScale,
      backButtonEl
    } = this;
    const label = this.getBackLabel();
    return (
      <Host>
        <calcite-panel
          closable={closable}
          closed={closed}
          description={description}
          disabled={disabled}
          heading={heading}
          headingLevel={headingLevel}
          heightScale={heightScale}
          intlBack={intlBack}
          intlClose={intlClose}
          intlOptions={intlOptions}
          loading={loading}
          menuOpen={menuOpen}
          onCalcitePanelClose={this.handlePanelClose}
          widthScale={widthScale}
        >
          <slot name={SLOTS.headerActionsStart} slot={PANEL_SLOTS.headerActionsStart} />
          <slot name={SLOTS.headerActionsEnd} slot={PANEL_SLOTS.headerActionsEnd} />
          <slot name={SLOTS.headerContent} slot={PANEL_SLOTS.headerContent} />
          <slot name={SLOTS.headerMenuActions} slot={PANEL_SLOTS.headerMenuActions} />
          <slot name={SLOTS.fab} slot={PANEL_SLOTS.fab} />
          <slot name={SLOTS.footerActions} slot={PANEL_SLOTS.footerActions} />
          <slot name={SLOTS.footer} slot={PANEL_SLOTS.footer} />
          <slot />
          {this.renderBackButton()}
        </calcite-panel>
        {backButtonEl ? (
          <calcite-tooltip label={label} placement="auto" referenceElement={backButtonEl}>
            {label}
          </calcite-tooltip>
        ) : null}
      </Host>
    );
  }
}
