import {
  Component,
  Element,
  Prop,
  h,
  VNode,
  Host,
  Method,
  Event,
  EventEmitter
} from "@stencil/core";
import { getElementDir } from "../../utils/dom";
import { HeadingLevel } from "../functional/Heading";
import { Scale } from "../interfaces";
import { CSS, ICONS, TEXT } from "./resources";

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
export class FlowItem {
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
  @Prop() headingLevel: HeadingLevel;

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

  // --------------------------------------------------------------------------
  //
  //  Events
  //
  // --------------------------------------------------------------------------

  /**
   * Fires when the back button is clicked.
   */
  @Event({ cancelable: false }) calcitePanelBackClick: EventEmitter<void>;

  // --------------------------------------------------------------------------
  //
  //  Private Properties
  //
  // --------------------------------------------------------------------------

  @Element() el: HTMLCalciteFlowItemElement;

  containerEl: HTMLCalcitePanelElement;

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
   * ```
   *   myCalcitePanel.scrollContentTo({
   *     left: 0, // Specifies the number of pixels along the X axis to scroll the window or element.
   *     top: 0, // Specifies the number of pixels along the Y axis to scroll the window or element
   *     behavior: "auto" // Specifies whether the scrolling should animate smoothly (smooth), or happen instantly in a single jump (auto, the default value).
   *   });
   * ```
   *
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

  backButtonClick = (): void => {
    this.calcitePanelBackClick.emit();
  };

  setBackRef = (node: HTMLCalciteActionElement): void => {
    this.backButtonEl = node;
  };

  // --------------------------------------------------------------------------
  //
  //  Render Methods
  //
  // --------------------------------------------------------------------------

  renderBackButton(): VNode {
    const { el } = this;

    const rtl = getElementDir(el) === "rtl";
    const { showBackButton, intlBack, backButtonClick } = this;
    const label = intlBack || TEXT.back;
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
      widthScale
    } = this;
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
          widthScale={widthScale}
        >
          <slot name="header-actions-start" slot="header-actions-start" />
          <slot name="header-actions-end" slot="header-actions-end" />
          <slot name="header-content" slot="header-content" />
          <slot name="header-menu-actions" slot="header-menu-actions" />
          <slot name="fab" slot="fab" />
          <slot name="footer-actions" slot="footer-actions" />
          <slot name="footer" slot="footer" />
          <slot />
          {this.renderBackButton()}
        </calcite-panel>
      </Host>
    );
  }
}
